export type UserRole = "ADMIN" | "AGENT";

export type FieldStatus = string;

export interface FieldUser {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
}

export interface Field {
  id: string;
  name: string;
  crop: string;
  location: string;
  acreage: number;
  status: FieldStatus;
  isDemo?: boolean;


  createdById: string;
  createdBy: FieldUser;

  assignedAgentId: string | null;
  assignedAgent: FieldUser | null;

  createdAt: string;
  updatedAt: string;
}

export interface CreateFieldDto {
  name: string;
  crop: string;
  location: string;
  acreage: number;
  status: string;
  assignedAgentId?: string;
}

export interface UpdateFieldDto {
  name?: string;
  crop?: string;
  location?: string;
  acreage?: number;
  status?: string;
  assignedAgentId?: string;
}

export interface AssignAgentDto {
  agentId: string;
}