export interface AuditLogEntry {
  id: string;
  userId: string;
  user: { fullName: string; role: "ADMIN" | "AGENT" };
  action: string;
  resource: string;
  resourceId: string;
  createdAt: string;
}