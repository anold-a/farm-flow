import { DailyForecast } from "@/types/weather";

interface Props {
  forecast: DailyForecast;
}

export default function ForecastCard({ forecast }: Props) {
  return (
    <div className="flex min-w-27.5 flex-col items-center gap-1 border-r border-gray-100 px-4 py-2 last:border-r-0"> 
      <p className="text-xs text-gray-500">
        {new Date(forecast.date).toLocaleDateString(undefined, { weekday: "short" })} 
      </p>
      <p className="mt-1 font-display text-lg text-gray-900">{forecast.maximumTemperature}°</p> 
      <p className="text-xs text-gray-500">{forecast.minimumTemperature}°</p>
      <p className="mt-1 text-xs text-gray-600">{forecast.condition}</p>
      <p className="text-xs text-emerald-600">{forecast.chanceOfRain}%</p>
    </div>
  );
}