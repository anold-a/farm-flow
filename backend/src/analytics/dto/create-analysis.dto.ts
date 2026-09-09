export interface FieldStatsDto {
  totalFields: number;
  activeFields: number;
  completedFields: number;
  totalAcreage: number;
  updatesSubmitted?: number; 
}

export interface CropDistributionItemDto {
  crop: string;
  count: number;
}

export interface FieldStatusBreakdownDto {
  active: number;
  completed: number;
  needsCare: number;
}

export interface UpdateTrendItemDto {
  weekLabel: string;
  count: number;
}

export interface GrowthStageDistributionDto {
  planted: number;
  germination: number;
  vegetative: number;
  flowering: number;
  fruiting: number;
  harvestReady: number;
  harvested: number;
}

export interface AgentPerformanceItemDto {
  id: string;
  fullName: string;
  assignedFields: number;
  updatesSubmitted: number;
}

export interface AnalyticsResponseDto {
  fieldStats: FieldStatsDto;
  cropDistribution: CropDistributionItemDto[];
  fieldStatusBreakdown: FieldStatusBreakdownDto;
  updateTrends: UpdateTrendItemDto[];
  growthStageDistribution: GrowthStageDistributionDto;
  agentPerformance: AgentPerformanceItemDto[] | null; 
}
