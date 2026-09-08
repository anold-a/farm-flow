import { Module } from '@nestjs/common';
import { CropIntelligenceController } from './crop-intelligence.controller';
import { CropIntelligenceService } from './crop-intelligence.service';
import { PrismaModule } from '../prisma/prisma.module';
import { WeatherModule } from '../weather/weather.module';

@Module({
  imports: [PrismaModule, WeatherModule],
  controllers: [CropIntelligenceController],
  providers: [CropIntelligenceService],
})
export class CropIntelligenceModule {}
