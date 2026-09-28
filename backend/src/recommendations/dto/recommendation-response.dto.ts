export type RecommendationPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface RecommendationItemDto {
  type: string;
  situation: string;
  recommendation: string;
  priority: RecommendationPriority;
}

export interface RecommendationResponseDto {
  fieldId: string;
  cropId: string;
  status: string;
  expectedGrowthStage: string;
  actualGrowthStage: string;
  stageComparison: 'BEHIND' | 'ON_TRACK' | 'AHEAD';
  recommendations: RecommendationItemDto[];
}
