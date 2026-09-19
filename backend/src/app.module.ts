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
import { CropIntelligenceService } from './crop-intelligence/crop-intelligence.service';
import { CropIntelligenceModule } from './crop-intelligence/crop-intelligence.module';
import { AnalyticsService } from './analytics/analytics.service';
import { AnalyticsController } from './analytics/analytics.controller';
import { AnalyticsModule } from './analytics/analytics.module';
import { RecommendationsService } from './recommendations/recommendations.service';
import { RecommendationsController } from './recommendations/recommendations.controller';
import { RecommendationsModule } from './recommendations/recommendations.module';
import { AlertsModule } from './alerts/alerts.module';
import { AuditService } from './audit/audit.service';
import { AuditController } from './audit/audit.controller';
import { AuditModule } from './audit/audit.module';
import { SecurityService } from './security/security.service';
import { SecurityController } from './security/security.controller';
import { SecurityModule } from './security/security.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, FieldsModule, FieldUpdatesModule, WeatherModule, ReportsModule, NotificationsModule, DashboardModule,CropsModule, CropIntelligenceModule, AnalyticsModule, RecommendationsModule, AlertsModule, AuditModule, SecurityModule],
  controllers: [AppController, WeatherController, AnalyticsController, RecommendationsController, AuditController, SecurityController],
  providers: [AppService, PrismaService, WeatherService, CropIntelligenceService, AnalyticsService, RecommendationsService, AuditService, SecurityService],
})
export class AppModule {}
