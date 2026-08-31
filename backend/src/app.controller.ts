import { Controller, Get,Body,Post } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  @Get('health')
  async health() {
    const users = await this.prisma.user.count();

    return {
      status: 'ok',
      database: 'connected',
      users,
    };
  }

 
}
