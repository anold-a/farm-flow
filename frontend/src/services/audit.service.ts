import { apiFetch } from "./api";
import { getAccessToken } from "@/lib/auth";
import { AuditLogEntry } from "@/types/audit";

export const auditService = {
  getAll() {
    return apiFetch<AuditLogEntry[]>("/audit-logs", {
      token: getAccessToken() ?? undefined,
    });
  },
};