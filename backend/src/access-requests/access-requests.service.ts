
import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class AccessRequestsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notifications: NotificationsService,
  ) {}

  async request(user: { id: string; fullName: string; role: string }) {
    if (user.role !== Role.AGENT) return { success: true };

    const link = `/users?assign=${user.id}`;

   
    const recent = await this.prisma.notification.findFirst({
      where: {
        type: 'ACCESS_REQUEST',
        link,
        createdAt: { gt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      },
    });
    if (recent) return { success: true };

    const admins = await this.prisma.user.findMany({
      where: { role: Role.ADMIN },
      select: { id: true },
    });

    await Promise.all(
      admins.map((a) =>
        this.notifications.create(
          a.id,
          'Field access requested',
          `${user.fullName} is requesting field access.`,
          'ACCESS_REQUEST',
          link,
        ),
      ),
    );

    return { success: true };
  }
}
