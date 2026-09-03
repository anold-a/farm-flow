import { apiFetch } from "./api";
import { ReportsResponse } from "@/types/reports";
import { getAccessToken } from "@/lib/auth";

export const reportsService = {
  getReports() {
    return apiFetch<ReportsResponse>(
      "/reports",{
        token: getAccessToken() ?? undefined,
      }  
    ) 
  },
};