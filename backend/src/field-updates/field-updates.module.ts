import { Module } from '@nestjs/common';
import { FieldUpdatesService } from './field-updates.service';
import { FieldUpdatesController } from './field-updates.controller';
import { NotificationsModule } from '../notifications/notifications.module';
import { AlertsModule } from 'src/alerts/alerts.module';

@Module({
  imports: [NotificationsModule,AlertsModule],
  providers: [FieldUpdatesService],
  controllers: [FieldUpdatesController],
  exports: [FieldUpdatesService],
})
export class FieldUpdatesModule {}
