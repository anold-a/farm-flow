import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FieldsModule } from './fields/fields.module';
import { FieldUpdatesModule } from './field-updates/field-updates.module';
import { WeatherService } from './weather/weather.service';
import { WeatherController } from './weather/weather.controller';
import { WeatherModule } from './weather/weather.module';
import { ReportsModule } from './reports/reports.module';
import { NotificationsModule } from './notifications/notifications.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CropsModule } from './crops/crops.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, FieldsModule, FieldUpdatesModule, WeatherModule, ReportsModule, NotificationsModule, DashboardModule,CropsModule],
  controllers: [AppController, WeatherController],
  providers: [AppService, PrismaService, WeatherService],
})
export class AppModule {}
