export type FieldStatus = string;

export interface FieldUser {
  id: string;
  fullName: string;
  email: string;
  role: "ADMIN" | "AGENT";
}

export interface Field {
  id: string;
  name: string;
  crop: string;
  location: string;
  acreage: number;
  status: FieldStatus;

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