export interface FieldStats {
  totalFields: number;
  activeFields: number;
  completedFields: number;
  totalAcreage: number;
  updatesSubmitted?: number;
}

export interface CropDistributionItem {
  crop: string;
  count: number;
}

export interface FieldStatusBreakdown {
  active: number;
  completed: number;
  needsCare: number;
}

export interface UpdateTrendItem {
  weekLabel: string;
  count: number;
}

export interface GrowthStageDistribution {
  planted: number;
  germination: number;
  vegetative: number;
  flowering: number;
  fruiting: number;
  harvestReady: number;
  harvested: number;
}

export interface AgentPerformanceItem {
  id: string;
  fullName: string;
  assignedFields: number;
  updatesSubmitted: number;
}

export interface AnalyticsResponse {
  fieldStats: FieldStats;
  cropDistribution: CropDistributionItem[];
  fieldStatusBreakdown: FieldStatusBreakdown;
  updateTrends: UpdateTrendItem[];
  growthStageDistribution: GrowthStageDistribution;
  agentPerformance: AgentPerformanceItem[] | null;
}