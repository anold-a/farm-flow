import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { AuthenticatedUser } from '../auth/types/authenticated-user.type';

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async getReports(currentUser: AuthenticatedUser) {
    const fieldWhere =
      currentUser.role === Role.ADMIN
        ? {}
        : {
            assignedAgentId: currentUser.id,
          };

    const fields = await this.prisma.field.findMany({
      where: fieldWhere,
      include: {
        assignedAgent: {
          select: {
            id: true,
            fullName: true,
          },
        },
        fieldUpdates: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    const totalFields = fields.length;

    const totalAcreage = fields.reduce(
      (total, field) => total + field.acreage,
      0,
    );

    const activeFields = fields.filter(
      (field) => field.status.toUpperCase() === 'ACTIVE',
    ).length;

    const completedFields = fields.filter(
      (field) => field.status.toUpperCase() === 'COMPLETED',
    ).length;

    const crops = fields.map((field) => ({
      fieldId: field.id,
      fieldName: field.name,
      crop: field.crop,
      acreage: field.acreage,
      status: field.status,
      updateCount: field.fieldUpdates.length,
    }));

    const weatherUpdates = fields.flatMap((field) =>
      field.fieldUpdates
        .filter(
          (update) =>
            update.temperature !== null ||
            update.humidity !== null ||
            update.moisture !== null,
        )
        .map((update) => ({
          fieldId: field.id,
          fieldName: field.name,
          temperature: update.temperature,
          humidity: update.humidity,
          moisture: update.moisture,
          recordedAt: update.createdAt,
        })),
    );

    let agents: {
      id: string;
      fullName: string;
      fieldCount: number;
      updateCount: number;
    }[] = [];

    if (currentUser.role === Role.ADMIN) {
      const users = await this.prisma.user.findMany({
        where: {
          role: Role.AGENT,
        },
        select: {
          id: true,
          fullName: true,
          assignedFields: {
            select: {
              id: true,
            },
          },
          fieldUpdates: {
            select: {
              id: true,
            },
          },
        },
      });

      agents = users.map((agent) => ({
        id: agent.id,
        fullName: agent.fullName,
        fieldCount: agent.assignedFields.length,
        updateCount: agent.fieldUpdates.length,
      }));
    }

    return {
      statistics: {
        totalFields,
        totalAcreage,
        activeFields,
        completedFields,
        totalUpdates: fields.reduce(
          (total, field) => total + field.fieldUpdates.length,
          0,
        ),
      },

      crops,

      weather: weatherUpdates,

      agents,
    };
  }
}
