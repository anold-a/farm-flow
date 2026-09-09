import { apiFetch } from "./api";
import { getAccessToken } from "@/lib/auth";
import { AnalyticsResponse } from "@/types/analytics";

export const analyticsService = {
  getAnalytics() {
    return apiFetch<AnalyticsResponse>("/analytics", {
      token: getAccessToken() ?? undefined,
    });
  },
};