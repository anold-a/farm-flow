import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AuthenticatedUser } from '../auth/types/authenticated-user.type';
import { AnalyticsResponseDto } from './dto/create-analysis.dto';

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAnalytics(
    currentUser: AuthenticatedUser,
  ): Promise<AnalyticsResponseDto> {
    if (currentUser.role === Role.ADMIN) {
      return this.getAdminAnalytics();
    }
    return this.getAgentAnalytics(currentUser.id);
  }

  private async getAdminAnalytics(): Promise<AnalyticsResponseDto> {
    const fields = await this.prisma.field.findMany();

    const totalFields = fields.length;
    const totalAcreage = fields.reduce((sum, f) => sum + f.acreage, 0);
    const completedFields = fields.filter(
      (f) => f.status === 'Harvested',
    ).length;
    const needsCareFields = fields.filter(
      (f) => f.status === 'Needs Attention' || f.status === 'Critical',
    ).length;
    const activeFields = totalFields - completedFields;

    const cropRows = await this.prisma.crop.groupBy({
      by: ['name'],
      where: { growthStage: { not: 'HARVESTED' } },
      _count: { _all: true },
    });
    const cropDistribution = cropRows.map((row) => ({
      crop: row.name,
      count: row._count._all,
    }));

    const stageRows = await this.prisma.crop.groupBy({
      by: ['growthStage'],
      where: { growthStage: { not: 'HARVESTED' } },
      _count: { _all: true },
    });
    const growthStageDistribution = this.buildStageDistribution(stageRows);

    const updateTrends = await this.getUpdateTrends({});

    const agents = await this.prisma.user.findMany({
      where: { role: Role.AGENT },
      select: {
        id: true,
        fullName: true,
        assignedFields: { select: { id: true } },
        fieldUpdates: { select: { id: true } },
      },
    });
    const agentPerformance = agents.map((agent) => ({
      id: agent.id,
      fullName: agent.fullName,
      assignedFields: agent.assignedFields.length,
      updatesSubmitted: agent.fieldUpdates.length,
    }));

    return {
      fieldStats: {
        totalFields,
        activeFields,
        completedFields,
        totalAcreage,
      },
      cropDistribution,
      fieldStatusBreakdown: {
        active: activeFields,
        completed: completedFields,
        needsCare: needsCareFields,
      },
      updateTrends,
      growthStageDistribution,
      agentPerformance,
    };
  }

  private buildStageDistribution(
    rows: { growthStage: string; _count: { _all: number } }[],
  ) {
    const map: Record<string, number> = {};
    rows.forEach((row) => {
      map[row.growthStage] = row._count._all;
    });

    return {
      planted: map['PLANTED'] ?? 0,
      germination: map['GERMINATION'] ?? 0,
      vegetative: map['VEGETATIVE'] ?? 0,
      flowering: map['FLOWERING'] ?? 0,
      fruiting: map['FRUITING'] ?? 0,
      harvestReady: map['HARVEST_READY'] ?? 0,
      harvested: map['HARVESTED'] ?? 0,
    };
  }

  private async getUpdateTrends(where: { fieldId?: { in: string[] } }) {
    const fourWeeksAgo = new Date();
    fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);

    const updates = await this.prisma.fieldUpdate.findMany({
      where: {
        createdAt: { gte: fourWeeksAgo },
        ...where,
      },
      select: { createdAt: true },
    });

    const buckets = [0, 0, 0, 0]; 
    const now = Date.now();

    updates.forEach((update) => {
      const daysAgo =
        (now - update.createdAt.getTime()) / (1000 * 60 * 60 * 24);
      const weekIndex = Math.min(3, Math.floor(daysAgo / 7)); 
      const bucketFromOldest = 3 - weekIndex;
      buckets[bucketFromOldest]++;
    });

    return buckets.map((count, index) => ({
      weekLabel: `Week ${index + 1}`,
      count,
    }));
  }

  private async getAgentAnalytics(
    agentId: string,
  ): Promise<AnalyticsResponseDto> {
    throw new Error('not implemented yet'); 
  }
}
