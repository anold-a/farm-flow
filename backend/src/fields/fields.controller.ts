import { Controller, Post, UseGuards,Body,Get,Param, Patch, Delete, } from '@nestjs/common';

import { FieldsService } from './fields.service';
import { CreateFieldDto } from './dto/create-field.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

import { AssignFieldDto } from './dto/assign-field.dto';

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

  @Get('my-fields')
  @Roles('AGENT')
  findMyFields(@CurrentUser() user: { id: string; role: 'ADMIN' | 'AGENT' }) {
    return this.fieldsService.findMyFields(user);
  }

  @Get('my-fields/:id')
  @Roles('AGENT')
  findMyFieldById(
    @Param('id') id: string,
    @CurrentUser() user: { id: string; role: 'ADMIN' | 'AGENT' },
  ) {
    return this.fieldsService.findMyFieldById(id, user);
  }

  @Get()
  @Roles('ADMIN', 'AGENT')
  findAll(@CurrentUser() user: { id: string; role: 'ADMIN' | 'AGENT' }) {
    return this.fieldsService.findAll(user);
  }

  @Get(':id')
  @Roles('ADMIN', 'AGENT')
  findOne(
    @Param('id') id: string,
    @CurrentUser() user: { id: string; role: 'ADMIN' | 'AGENT' },
  ) {
    return this.fieldsService.findOne(id, user);
  }

  @Patch(':id')
  @Roles('ADMIN')
  update(
    @Param('id') id: string,
    @Body() data: Partial<CreateFieldDto>,
    @CurrentUser() user: { id: string; role: 'ADMIN' | 'AGENT' },
  ) {
    return this.fieldsService.update(id, data, user);
  }

  @Delete(':id')
  @Roles('ADMIN')
  remove(
    @Param('id') id: string,
    @CurrentUser() user: { id: string; role: 'ADMIN' | 'AGENT' },
  ) {
    return this.fieldsService.remove(id, user);
  }

  @Post(':fieldId/assign')
  @Roles('ADMIN')
  assignAgent(
    @Param('fieldId') fieldId: string,
    @Body() data: AssignFieldDto,
    @CurrentUser() user: { id: string; role: 'ADMIN' | 'AGENT' },
  ) {
    return this.fieldsService.assignAgent(fieldId, data.agentId, user);
  }
}
