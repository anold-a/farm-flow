export type AlertSeverity = "INFO" | "WARNING" | "CRITICAL";

export interface Alert {
  id: string;
  fieldId: string;
  field?: { id: string; name: string };
  type: string;
  severity: AlertSeverity;
  message: string;
  resolved: boolean;
  createdAt: string;
  updatedAt: string;
}