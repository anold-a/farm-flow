export type CropStatus = 'HEALTHY' | 'NEEDS_ATTENTION' | 'AT_RISK';
export type CropTrend = 'IMPROVING' | 'STABLE' | 'DECLINING' | 'UNKNOWN';
export type CropStageComparison = 'BEHIND' | 'ON_TRACK' | 'AHEAD';

export class cropIntelligenceDto {
  cropId: string;
  fieldId: string;
  fieldName: string;
  cropName: string;
  variety: string;
  growthStage: string;
  weatherForecastRain: number | null;
  expectedGrowthStage: string;
  stageComparison: CropStageComparison;
  status: CropStatus;
  trend: CropTrend;
  metrics: {
    moisture: number | null;
    temperature: number | null;
    humidity: number | null;
  };
  insights: string[];
}
