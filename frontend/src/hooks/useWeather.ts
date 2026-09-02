"use client";

import { useEffect, useState } from "react";
import { fieldService } from "@/services/field.service"; 
import { weatherService } from "@/services/weather.service";
import { WeatherResponse } from "@/types/weather";
import { Field } from "@/types/field"; 
import { useAuth } from "@/hooks/useAuth";

interface FieldWeather { 
  field: Field;
  weather: WeatherResponse;
}

export function useWeather() {
  const { user } = useAuth();
  const [fieldWeatherList, setFieldWeatherList] = useState<FieldWeather[]>([]);;

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadFieldWeather() { 
      try {
        const fields = await fieldService.getAll(); 

        
        const results = await Promise.all(
          fields.map(async (field) => {
            const weather = await weatherService.getWeatherByField(field.id);
            return { field, weather };
          }),
        );

        setFieldWeatherList(results); 
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to load weather.");
        }
      } finally {
        setLoading(false);
      }
    }

    loadFieldWeather();
  }, []);

  return { fieldWeatherList, loading, error }; 
        
}