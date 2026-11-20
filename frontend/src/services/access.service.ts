
import { apiFetch } from "./api";

export const accessService = {
  
  async request(): Promise<void> {
    return apiFetch<void>("/access-requests", {
      method: "POST",
    });
  },
};