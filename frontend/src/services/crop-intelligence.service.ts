import { apiFetch } from "./api";
import { getAccessToken } from "@/lib/auth";
import { CropIntelligence } from "@/types/crop-intelligence";

export const cropIntelligenceService = {
  getForField(fieldId: string) {
    return apiFetch<CropIntelligence>(`/fields/${fieldId}/crop-intelligence`, {
      token: getAccessToken() ?? undefined,
    });
  },
};