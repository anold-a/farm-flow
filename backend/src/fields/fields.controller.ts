import { Controller, Post, UseGuards,Body } from '@nestjs/common';

import { FieldsService } from './fields.service';
import { CreateFieldDto } from './dto/create-field.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('fields')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FieldsController {
  constructor(private readonly fieldsService: FieldsService) {}

  @Post()
  @Roles('ADMIN')
  create(
    @Body()
    data: CreateFieldDto,

    @CurrentUser()
    user: {
      id: string;
      role: 'ADMIN' | 'AGENT';
    },
  ) {
    return this.fieldsService.create(data, user.id);
  }
}
