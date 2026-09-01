import { apiFetch } from "./api";
import { getAccessToken } from "@/lib/auth";

import {
  CreateFieldDto,
  UpdateFieldDto,
  AssignAgentDto,
  Field,
} from "@/types/field";

export const fieldService = {
  getAll() {
    return apiFetch<Field[]>("/fields",
    {
      token: getAccessToken() ?? undefined,
    }
    );
  },

  getMyFields() {
    return apiFetch<Field[]>("/fields/my-fields", {
      token: getAccessToken() ?? undefined,
    });
  },

  getById(id: string) {
    return apiFetch<Field>(`/fields/${id}`,{
      token: getAccessToken() ?? undefined,
    });
  },

  create(data: CreateFieldDto) {
    return apiFetch<Field>("/fields", {
      method: "POST",
      body: JSON.stringify(data),
       token: getAccessToken() ?? undefined
    });
  },

  update(
    id: string,
    data: UpdateFieldDto
  ) {
    return apiFetch<Field>(`/fields/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      token: getAccessToken() ?? undefined,
    });
  },

  delete(id: string) {
    return apiFetch<void>(`/fields/${id}`, {
      method: "DELETE",
      token: getAccessToken() ?? undefined,
    });
  },

  assignAgent(fieldId: string, data: AssignAgentDto) {
    return apiFetch<Field>(`/fields/${fieldId}/assign`, {
      method: "POST",
      body: JSON.stringify(data),
      token: getAccessToken() ?? undefined,
    });
  },

  unassignAgent(fieldId: string) {
    return apiFetch<Field>(`/fields/${fieldId}/assign`, {
      method: "DELETE",
      token: getAccessToken() ?? undefined,
    });
  },
};