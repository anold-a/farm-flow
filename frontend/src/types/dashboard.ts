export interface DashboardStats {
  totalUsers: number;  
  totalFields: number;
  activeFields: number;
  completedFields: number;    
  totalFieldUpdates: number; 
  totalAgents: number;
  
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export interface DashboardSummary {
  stats: DashboardStats;
  activities: Activity[];
}