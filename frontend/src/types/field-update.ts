export interface FieldUpdate {
  id: string;

  cropStage: string;
  notes: string;

  moisture?: number | null;
  temperature?: number | null;
  humidity?: number | null;

  fieldId: string;
  userId: string;

  createdAt: string;
  updatedAt: string;

  user?: {
    id: string;
    fullName: string;
    role: "ADMIN" | "AGENT";
  };

  field?: {
    id: string;
    name: string;
    crop: string;
  };
}

export interface CreateFieldUpdateDto {
  fieldId: string;
  cropStage: string;
  notes: string;
  moisture?: number;
  temperature?: number;
  humidity?: number;
}