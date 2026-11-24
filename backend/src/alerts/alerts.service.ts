import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';

import { Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { WeatherService } from '../weather/weather.service';
import { NotificationsService } from '../notifications/notifications.service';
import { AuthenticatedUser } from '../auth/types/authenticated-user.type';
import {
  detectMoistureAlerts,
  detectTemperatureAlerts,
  detectOverdueUpdateAlert,
  detectRainMoistureConflict,
  detectGrowthStageAlert,
} from './alert.rules';
import { AlertCandidate } from './dto/alert.dto';

@Injectable()
export class AlertsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly weatherService: WeatherService,
    private readonly notificationsService: NotificationsService,
  ) {}

  async evaluateField(fieldId: string): Promise<void> {
    const field = await this.prisma.field.findUnique({
      where: { id: fieldId },
    });
    if (!field) return;

    const recentUpdates = await this.prisma.fieldUpdate.findMany({
      where: { fieldId },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    const latest = recentUpdates[0];
    const latestUpdateDate = latest?.createdAt ?? null;
    const crop = await this.prisma.crop.findFirst({
      where: {
        fieldId,
        actualGrowthStage: {
          not: 'HARVESTED',
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    let chanceOfRain: number | null = null;
    try {
      const weather = await this.weatherService.getByLocation(field.location);
      chanceOfRain = weather.forecast[0]?.chanceOfRain ?? null;
    } catch {
      chanceOfRain = null;
    }

    const candidates: AlertCandidate[] = [
      ...detectMoistureAlerts(recentUpdates),
      ...detectTemperatureAlerts(latest),
      ...detectOverdueUpdateAlert(latestUpdateDate),
      ...detectRainMoistureConflict(latest?.moisture ?? null, chanceOfRain),
      ...(crop
        ? detectGrowthStageAlert(
            crop.expectedGrowthStage,
            crop.actualGrowthStage,
          )
        : []),
    ];

    for (const candidate of candidates) {
      await this.createIfNotDuplicate(field, candidate);
    }
  }

  private async createIfNotDuplicate(
    field: {
      id: string;
      name: string;
      createdById: string;
      assignedAgentId: string | null;
    },
    candidate: AlertCandidate,
  ) {
    const existing = await this.prisma.alert.findFirst({
      where: {
        fieldId: field.id,
        type: candidate.type,
        resolved: false,
      },
    });

    if (existing) {
      return; 
    }

    const alert = await this.prisma.alert.create({
      data: {
        fieldId: field.id,
        type: candidate.type,
        severity: candidate.severity,
        message: candidate.message,
      },
    });

    const recipientId = field.assignedAgentId ?? field.createdById;
    await this.notificationsService.create(
      recipientId,
      `Alert: ${field.name}`,
      candidate.message,
      'ALERT',
    );

    if (field.assignedAgentId && field.assignedAgentId !== field.createdById) {
      await this.notificationsService.create(
        field.createdById,
        `Alert: ${field.name}`,
        candidate.message,
        'ALERT',
      );
    }

    return alert;
  }

  async findForField(fieldId: string, currentUser: AuthenticatedUser) {
    const field = await this.prisma.field.findUnique({
      where: { id: fieldId },
    });

    if (!field) {
      throw new NotFoundException('Field not found');
    }

    if (
      currentUser.role === Role.AGENT &&
      field.assignedAgentId !== currentUser.id
    ) {
      throw new ForbiddenException('You do not have access to this field');
    }

    return this.prisma.alert.findMany({
      where: { fieldId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAll(currentUser: AuthenticatedUser) {
    const fieldWhere =
      currentUser.role === Role.ADMIN
        ? {}
        : { assignedAgentId: currentUser.id };

    const fields = await this.prisma.field.findMany({
      where: fieldWhere,
      select: { id: true },
    });
    const fieldIds = fields.map((f) => f.id);

    return this.prisma.alert.findMany({
      where: {  fieldId: { in: fieldIds }, resolved: false, field:{isDemo:false}},
      include: { field: { select: { id: true, name: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async resolve(alertId: string, currentUser: AuthenticatedUser) {
    const alert = await this.prisma.alert.findUnique({
      where: { id: alertId },
      include: { field: true },
    });

    if (!alert) {
      throw new NotFoundException('Alert not found');
    }

    if (
      currentUser.role === Role.AGENT &&
      alert.field.assignedAgentId !== currentUser.id
    ) {
      throw new ForbiddenException('You do not have access to this alert');
    }

    return this.prisma.alert.update({
      where: { id: alertId },
      data: { resolved: true },
    });
  }
}
