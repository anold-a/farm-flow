import { apiFetch } from "./api";

import {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from "@/types/auth";

export const authService = {
  async register(
    data: RegisterRequest
  ): Promise<AuthResponse> {
    return apiFetch<AuthResponse>(
      "/auth/register",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
  },

  async login(
    data: LoginRequest
  ): Promise<AuthResponse> {
    return apiFetch<AuthResponse>(
      "/auth/login",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
  },

  logout() {
    // Local authentication cleanup
    // is handled by AuthContext.
  },
};