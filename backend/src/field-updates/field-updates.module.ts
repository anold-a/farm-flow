import { Module } from '@nestjs/common';
import { FieldUpdatesService } from './field-updates.service';
import { FieldUpdatesController } from './field-updates.controller';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [NotificationsModule],
  providers: [FieldUpdatesService],
  controllers: [FieldUpdatesController],
  exports: [FieldUpdatesService],
})
export class FieldUpdatesModule {}
