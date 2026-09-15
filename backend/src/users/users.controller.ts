import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

import { CreateUserDto } from './dto/create-user.dto';
import { AuthenticatedUser } from 'src/auth/types/authenticated-user.type';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('agents')
  findAgents() {
    return this.usersService.findAgents();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Post()
  create(@Body() data: CreateUserDto, @CurrentUser() user: AuthenticatedUser) {
     return this.usersService.create(data, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Partial<CreateUserDto> , @CurrentUser() user: AuthenticatedUser,,) {
    return this.usersService.update(id, data,user);
  }

  @Delete(':id')
  remove(@Param('id') id: string,@CurrentUser() user: AuthenticatedUser,) {
    return this.usersService.remove(id,user);
  }
}
