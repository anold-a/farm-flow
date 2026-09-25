"use client";

import { useWeather } from "@/hooks/useWeather";

export default function DashboardWeatherWidget() {
  const { fieldWeatherList } = useWeather();
  const weather = fieldWeatherList[0]?.weather.current;

  if (!weather) return null;

  return (
    <div className="rounded-xl border border-slate-800 bg-linear-br from-emerald-500/20 to-slate-900 p-6">
      <p className="text-xs text-slate-400">{fieldWeatherList[0].field.name}</p>
      <div className="mt-2 flex items-baseline gap-2">
        <p className="font-display text-3xl text-slate-100">{weather.temperature}°C</p>
        <p className="text-sm text-slate-400">{weather.condition}</p>
      </div>
    </div>
  );
}