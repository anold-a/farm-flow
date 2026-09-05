import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { ReportsService } from '../reports/reports.service';
import { UsersService } from '../users/users.service';
import { AuthenticatedUser } from '../auth/types/authenticated-user.type';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly reportsService: ReportsService,
    private readonly usersService: UsersService,
  ) {}

  async getSummary(currentUser: AuthenticatedUser) {
    const reports = await this.reportsService.getReports(currentUser);

    const totalUsers =
      currentUser.role === Role.ADMIN
        ? (await this.usersService.findAll()).length
        : 0;

    const totalAgents =
      currentUser.role === Role.ADMIN ? reports.agents.length : 0;

    const completedFields = reports.statistics.harvestedFields;
    const activeFields = reports.statistics.totalFields - completedFields;

    

    const activities = await this.getRecentActivity(currentUser);

    return {
      stats: {
        totalUsers,
        totalAgents,
        totalFields: reports.statistics.totalFields,
        activeFields,
        completedFields,
        totalFieldUpdates: reports.statistics.totalUpdates,
      },
      activities,
    };
  }

  private async getRecentActivity(currentUser: AuthenticatedUser) {
    
    const fieldUpdateWhere =
      currentUser.role === Role.ADMIN ? {} : { userId: currentUser.id };

    const recentUpdates = await this.prisma.fieldUpdate.findMany({
      where: fieldUpdateWhere,
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: {
        field: { select: { name: true } },
        user: { select: { fullName: true } },
      },
    });

    
    const recentNotifications = await this.prisma.notification.findMany({
      where: { userId: currentUser.id },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    const updateActivities = recentUpdates.map((update) => ({
      id: update.id,
      title: 'Field Update',
      description: `${update.user.fullName} updated ${update.field.name} (${update.cropStage})`,
      createdAt: update.createdAt.toISOString(),
    }));

    const notificationActivities = recentNotifications.map((notification) => ({
      id: notification.id,
      title: notification.title,
      description: notification.message,
      createdAt: notification.createdAt.toISOString(),
    }));

    
    return [...updateActivities, ...notificationActivities]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 5);
  }
}
