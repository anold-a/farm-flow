import { Injectable,NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { AuthenticatedUser } from '../auth/types/authenticated-user.type';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async findMine(currentUser: AuthenticatedUser) {
    return this.prisma.notification.findMany({
      where: {
        userId: currentUser.id,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async markAsRead(notificationId: string, currentUser: AuthenticatedUser) {
    const notification = await this.prisma.notification.findFirst({
      where: {
        id: notificationId,
        userId: currentUser.id,
      },
    });

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    return this.prisma.notification.update({
      where: {
        id: notificationId,
      },

      data: {
        isRead: true,
      },
    });
  }

  async create(
    userId: string,
    title: string,
    message: string,
    type: string,
    link?: string,
  ) {
    return this.prisma.notification.create({
      data: {
        userId,
        title,
        message,
        type,
        link,
      },
    });
  }
}
