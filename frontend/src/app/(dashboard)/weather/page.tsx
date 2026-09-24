"use client";

import CurrentWeatherCard from "@/components/weather/CurrentWeatherCard";
import ForecastGrid from "@/components/weather/ForecastGrid";
import WeatherAlert from "@/components/weather/WeatherAlert";
import WeatherSkeleton from "@/components/weather/WeatherSkeleton";


import { useWeather } from "@/hooks/useWeather";

export default function WeatherPage() {
  const { fieldWeatherList, loading, error } = useWeather(); 

  if (loading) {
    return <WeatherSkeleton />;
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-100 p-4 text-red-700">{error}</div>
    );
  }

  
  if (fieldWeatherList.length === 0) {
    return <div className="text-gray-500">No fields available to show weather for.</div>;
  }

  return (
    <div className="space-y-12"> 
      <div>
        <h1 className="text-3xl font-display text-gray-900">Weather Dashboard</h1>
        <p className="text-gray-600">
          Current weather conditions and forecast for your fields. </p>
      </div>

      
      {fieldWeatherList.map(({ field, weather }) => (
        <div key={field.id} className="space-y-6 border-t pt-8 first:border-t-0 first:pt-0">
          <h2 className="text-2xl font-display text-gray-900">{field.name}</h2> 
          <CurrentWeatherCard weather={weather.current} /> 
          <WeatherStats weather={weather.current} /> 
          <div>
            <h3 className="mb-4 text-xl font-display text-gray-900">7-Day Forecast</h3> 
            <ForecastGrid forecasts={weather.forecast} /> 
          </div>

          <div>
            <h3 className="mb-4 text-xl font-display text-gray-900">Weather Alerts</h3> 
            <div className="space-y-4">
              {weather.alerts.length === 0 ? (
                <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-gray-500">
                  No active weather alerts.
                </div>
              ) : (
                weather.alerts.map((alert) => (
                  <WeatherAlert key={alert.id} alert={alert} /> 
                ))
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}