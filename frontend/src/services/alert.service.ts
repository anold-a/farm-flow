import { apiFetch } from "./api";
import { getAccessToken } from "@/lib/auth";
import { Alert } from "@/types/alert";

export const alertService = {
  getAll() {
    return apiFetch<Alert[]>("/alerts", {
      token: getAccessToken() ?? undefined,
    });
  },

  getForField(fieldId: string) {
    return apiFetch<Alert[]>(`/alerts/field/${fieldId}`, {
      token: getAccessToken() ?? undefined,
    });
  },

  resolve(alertId: string) {
    return apiFetch<Alert>(`/alerts/${alertId}/resolve`, {
      method: "PATCH",
      token: getAccessToken() ?? undefined,
    });
  },
};