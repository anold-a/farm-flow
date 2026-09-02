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

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, FieldsModule, FieldUpdatesModule, WeatherModule],
  controllers: [AppController, WeatherController],
  providers: [AppService, PrismaService, WeatherService],
})
export class AppModule {}
