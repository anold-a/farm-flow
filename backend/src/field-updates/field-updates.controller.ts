import { Controller, Get, Param, Post, UseGuards,Body } from '@nestjs/common';

import { FieldUpdatesService } from './field-updates.service';

import { CreateFieldUpdateDto } from './dto/create-field-update.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

import { AuthenticatedUser } from '../auth/types/authenticated-user.type';


@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('field-updates')
export class FieldUpdatesController {
  constructor(private readonly fieldUpdatesService: FieldUpdatesService) {}

  @Roles('AGENT')
  @Post()
  create(
    @Body()
    data: CreateFieldUpdateDto,

    @CurrentUser()
    currentUser: AuthenticatedUser,
  ) {
    return this.fieldUpdatesService.create(data, currentUser);
  }

  @Roles('ADMIN', 'AGENT')
  @Get('fields/:fieldId/updates')
  findByField(
    @Param('fieldId')
    fieldId: string,

    @CurrentUser()
    currentUser: AuthenticatedUser,
  ) {
    return this.fieldUpdatesService.findByField(fieldId, currentUser);
  }
}
