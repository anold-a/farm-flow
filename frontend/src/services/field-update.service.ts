import { apiFetch } from "./api";
import { getAccessToken } from "@/lib/auth";

import {
  CreateFieldUpdateDto,
  FieldUpdate,
} from "@/types/field-update";

export const fieldUpdateService = {
  getByField(fieldId: string) {
    return apiFetch<FieldUpdate[]>(
      `/field-updates/fields/${fieldId}/updates`,{
      token: getAccessToken() ?? undefined,
    }
    );
  },

  create(data: CreateFieldUpdateDto) {
    return apiFetch<FieldUpdate>(
      "/field-updates",
      {
        method: "POST",
        body: JSON.stringify(data),
      token: getAccessToken() ?? undefined,
      }
    );
  },
};