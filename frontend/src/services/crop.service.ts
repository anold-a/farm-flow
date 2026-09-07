import { apiFetch } from "./api";
import { getAccessToken } from "@/lib/auth";

import { Crop,CreateCropDto } from "@/types/crop";

export const cropService = {

  getActiveByField(){
    return apiFetch<Crop>(`/:fieldId/crops/active`,{
    token: getAccessToken() ?? undefined,
    })
  },


  getHistoryByField(){
      return apiFetch<Crop>(`/:fieldId/crops/history`,{
    token: getAccessToken() ?? undefined,
    })
  }
}