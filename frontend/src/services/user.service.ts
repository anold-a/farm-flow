import { apiFetch } from "./api";
import { getAccessToken } from "@/lib/auth";

export interface AgentOption {
  id: string;
  fullName: string;
  email: string;
  role: "AGENT";
}

export const userService = {
  getAgents() {
    return apiFetch<AgentOption[]>("/users/agents", {
      token: getAccessToken() ?? undefined,
    });
  },
};