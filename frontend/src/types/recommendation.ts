export type RecommendationPriority = "LOW" | "MEDIUM" | "HIGH";

export interface RecommendationItem {
  situation: string;
  recommendation: string;
  priority: RecommendationPriority;
}

export interface RecommendationResponse {
  fieldId: string;
  cropId: string;
  status: string;
  recommendations: RecommendationItem[];
}