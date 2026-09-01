import { Module } from '@nestjs/common';
import { FieldsService } from './fields.service';
import { FieldsController } from './fields.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [FieldsService],
  controllers: [FieldsController],
  exports:[FieldsService],
})
export class FieldsModule {}
