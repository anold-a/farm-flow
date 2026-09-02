import { Module } from '@nestjs/common';
import { FieldUpdatesService } from './field-updates.service';
import { FieldUpdatesController } from './field-updates.controller';

@Module({
  providers: [FieldUpdatesService],
  controllers: [FieldUpdatesController],
  exports: [FieldUpdatesService],
})
export class FieldUpdatesModule {}
