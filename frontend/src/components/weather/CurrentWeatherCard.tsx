import { CurrentWeather } from "@/types/weather";
import { Section } from "lucide-react";


interface Props {
  weather: CurrentWeather;
}

export default function CurrentWeatherCard({
  weather,
}: Props) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-emerald-50/40 px-8 py-8">
      <p className="text-sm text-gray-600">{weather.location}</p>

      <div className="mt-2 flex items-end gap-4">
        <p className="font-display text-6xl text-emerald-700">{weather.temperature}°C</p> 
        <p className="pb-2 text-lg text-gray-700">{weather.condition}</p> 
      </div>

      <p className="mt-4 text-sm text-gray-600"> 
        {weather.humidity}% humidity · {weather.windSpeed} km/h wind · {weather.rainfall} mm rainfall
      </p>
    </section>
  );
}