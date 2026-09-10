import { apiFetch } from "./api";
import { getAccessToken } from "@/lib/auth";
import { RecommendationResponse } from "@/types/recommendation";

export const recommendationService = {
  getForField(fieldId: string) {
    return apiFetch<RecommendationResponse>(`/fields/${fieldId}/recommendations`, {
      token: getAccessToken() ?? undefined,
    });
  },
};