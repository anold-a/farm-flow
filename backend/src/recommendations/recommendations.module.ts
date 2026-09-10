import { Module } from '@nestjs/common';
import { RecommendationsController } from './recommendations.controller';
import { RecommendationsService } from './recommendations.service';
import { CropIntelligenceModule } from '../crop-intelligence/crop-intelligence.module';

@Module({
  imports: [CropIntelligenceModule],
  controllers: [RecommendationsController],
  providers: [RecommendationsService],
})
export class RecommendationsModule {}
