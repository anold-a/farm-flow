export interface CropStats {
  
  [growthStage: string]: number;
}


export interface DashboardStats {
  totalUsers: number;  
  totalFields: number;
  activeFields: number;
  completedFields: number;    
  totalFieldUpdates: number; 
  totalAgents: number;
  cropStats: CropStats;
  
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export interface DashboardSummary {
  stats: DashboardStats;
  activities: any[];
}