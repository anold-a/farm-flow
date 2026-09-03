export interface ReportStatistics {
  totalFields: number;
  healthyFields: number;
  harvestedFields: number;
  criticalFields: number;
  averageAcreage:number;
}

export interface CropReportItem {
  id: string;
  crop: string;
  fields: number;
  fieldName:string;
  averageAcreage: number;
}

export interface WeatherReportItem {
  date: string;
  rainfall: number;
  temperature: number;
}

export interface AgentReportItem {
  id: string;
  fullName: string;
  assignedFields: number;
  completedUpdates: number;
}

export interface ReportsResponse {
  statistics: ReportStatistics;
  crops: CropReportItem[];
  weather: WeatherReportItem[];
  agents: AgentReportItem[];
}