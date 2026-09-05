import { apiFetch } from "./api";
import { getAccessToken } from "@/lib/auth";

import { DashboardSummary } from "@/types/dashboard";

export const dashboardService = {
  getSummary() {
    return apiFetch<DashboardSummary>(
      "/dashboard",{
        token:getAccessToken() ?? undefined,
      }
    );
  },
};