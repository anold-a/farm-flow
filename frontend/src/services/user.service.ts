import { apiFetch } from "./api";
import { getAccessToken } from "@/lib/auth";
import { User, CreateUserDto } from "@/types/user";

export interface AgentOption {
  id: string;
  fullName: string;
  email: string;
  role: "AGENT";
}

export const userService = {
  getAll() {                         
    return apiFetch<User[]>("/users", {
      token: getAccessToken() ?? undefined,
    });
  },

  create(data: CreateUserDto) {       
    return apiFetch<User>("/users", {
      method: "POST",
      body: JSON.stringify(data),
      token: getAccessToken() ?? undefined,
    });
  },

  getAgents() {
    return apiFetch<AgentOption[]>("/users/agents", {
      token: getAccessToken() ?? undefined,
    });
  },
};