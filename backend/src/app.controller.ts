import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('health')
  async health(){
    const users = await this.prisma.user.count();
    
    return{
      status:'ok',
      database:'connected',
      users
    }
  }
}
