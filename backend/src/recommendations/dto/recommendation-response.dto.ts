export type RecommendationPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface RecommendationItemDto {
  situation: string;
  recommendation: string;
  priority: RecommendationPriority;
}

export interface RecommendationResponseDto {
  fieldId: string;
  cropId: string;
  status: string;
  recommendations: RecommendationItemDto[];
}
