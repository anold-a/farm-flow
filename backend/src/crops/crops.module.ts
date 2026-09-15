import { Module } from '@nestjs/common';
import { CropsController } from './crops.controller';
import { CropsService } from './crops.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports:[AuditModule],
  controllers: [CropsController],
  providers: [CropsService],
  exports: [CropsService,PrismaService],
})
export class CropsModule {}
