import { apiFetch } from "./api";
import { getAccessToken } from "@/lib/auth";

import { Crop,CreateCropDto } from "@/types/crop";

export const cropService = {

  getActiveByField(fieldId: string){
    return apiFetch<Crop | null>(`/fields/${fieldId}/crops/active`,{
    token: getAccessToken() ?? undefined,
    })
  },


  getHistoryByField(fieldId:string){
      return apiFetch<Crop[]>(`/fields/${fieldId}/crops/history`,{
    token: getAccessToken() ?? undefined,
    })
  },

  create(fieldId: string, data: CreateCropDto) {
    return apiFetch<Crop>(`/fields/${fieldId}/crops`, {
      method: "POST",
      body: JSON.stringify(data),
       token: getAccessToken() ?? undefined
    });
  },
}