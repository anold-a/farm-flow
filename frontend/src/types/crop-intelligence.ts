export type CropStatus = "HEALTHY" | "NEEDS_ATTENTION" | "AT_RISK";
export type CropTrend = "IMPROVING" | "STABLE" | "DECLINING" | "UNKNOWN";
export type StageComparison =  "BEHIND" | "ON_TRACK" | "AHEAD";

export interface CropIntelligence {
  cropId: string;
  fieldId: string;
  fieldName: string;
  cropName: string;
  variety: string;
  growthStage: string;
  expectedGrowthStage: string;
  stageComparison:StageComparison;
  status: CropStatus;
  trend: CropTrend;
  metrics: {
    moisture: number | null;
    temperature: number | null;
    humidity: number | null;
  };
  insights: string[];
}