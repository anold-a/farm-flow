import { Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';

import { NotificationsService } from './notifications.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

import { AuthenticatedUser } from '../auth/types/authenticated-user.type';

@Controller('notifications')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @Roles('ADMIN', 'AGENT')
  findMine(
    @CurrentUser()
    currentUser: AuthenticatedUser,
  ) {
    return this.notificationsService.findMine(currentUser);
  }

  @Patch(':id/read')
  @Roles('ADMIN', 'AGENT')
  markAsRead(
    @Param('id') notificationId: string,

    @CurrentUser()
    currentUser: AuthenticatedUser,
  ) {
    return this.notificationsService.markAsRead(notificationId, currentUser);
  }
}
