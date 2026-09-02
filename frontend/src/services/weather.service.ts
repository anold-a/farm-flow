import { apiFetch } from "./api";
import { WeatherResponse } from "@/types/weather";
import { getAccessToken } from "@/lib/auth";

export const weatherService = {
  getCurrentWeather(location: string) {
    return apiFetch<WeatherResponse>(`/weather?location=${encodeURIComponent(location)}`, {
      token: getAccessToken() ?? undefined,
    });
  },

  getWeatherByField(fieldId: string) { 
    return apiFetch<WeatherResponse>(`/weather/field/${fieldId}`, {
      token: getAccessToken() ?? undefined,
    });
  },
};