import { apiFetch } from "./api";
import { ReportsResponse } from "@/types/reports";
import { getAccessToken } from "@/lib/auth";


async function downloadCSV(endpoint: string, filename: string) {
  const token = getAccessToken();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  if (!response.ok) {
    throw new Error("Failed to export report.");
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}

export const reportsService = {
  getReports() {
    return apiFetch<ReportsResponse>("/reports", {
      token: getAccessToken() ?? undefined,
    });
  },

  exportCombined: () => downloadCSV("/reports/export", "smartseason-report.csv"),
};