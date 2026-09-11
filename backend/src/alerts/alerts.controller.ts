import { Controller, Get, Patch, Param, UseGuards } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { AuthenticatedUser } from '../auth/types/authenticated-user.type';

@Controller('alerts')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Get()
  @Roles('ADMIN', 'AGENT')
  findAll(@CurrentUser() user: AuthenticatedUser) {
    return this.alertsService.findAll(user);
  }

  @Get('field/:fieldId')
  @Roles('ADMIN', 'AGENT')
  findForField(
    @Param('fieldId') fieldId: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.alertsService.findForField(fieldId, user);
  }

  @Patch(':alertId/resolve')
  @Roles('ADMIN', 'AGENT')
  resolve(
    @Param('alertId') alertId: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.alertsService.resolve(alertId, user);
  }
}
