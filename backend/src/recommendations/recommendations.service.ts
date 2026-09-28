import { Injectable } from '@nestjs/common';
import { CropIntelligenceService } from '../crop-intelligence/crop-intelligence.service';
import { AuthenticatedUser } from '../auth/types/authenticated-user.type';
import { RecommendationResponseDto } from './dto/recommendation-response.dto';
import { generateRecommendations } from './recommendation.rules';

@Injectable()
export class RecommendationsService {
  constructor(
    private readonly cropIntelligenceService: CropIntelligenceService,
  ) {}

  async getForField(
    fieldId: string,
    currentUser: AuthenticatedUser,
  ): Promise<RecommendationResponseDto> {
    const intelligence = await this.cropIntelligenceService.getForField(
      fieldId,
      currentUser,
    );

    const recommendations = generateRecommendations(
      intelligence,
      intelligence.weatherForecastRain,
    );

    return {
      fieldId: intelligence.fieldId,
      cropId: intelligence.cropId,
      status: intelligence.status,
      expectedGrowthStage: intelligence.expectedGrowthStage,
      actualGrowthStage: intelligence.growthStage,
      stageComparison: intelligence.stageComparison,
      recommendations,
    };
  }
}
