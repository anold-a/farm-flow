
import { apiFetch } from "./api";
import { getAccessToken } from "@/lib/auth";

export const accessService = {
  
  async request(): Promise<void> {
    return apiFetch<void>("/access-requests", {
      method: "POST",
       token: getAccessToken() ?? undefined,
    });
  },
};