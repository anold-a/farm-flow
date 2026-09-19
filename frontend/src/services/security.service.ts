import { apiFetch } from "./api";
import { getAccessToken } from "@/lib/auth";
import { SecurityResponse } from "@/types/security";

export const securityService = {
  getOverview() {
    return apiFetch<SecurityResponse>("/security", {
      token: getAccessToken() ?? undefined,
    });
  },
};