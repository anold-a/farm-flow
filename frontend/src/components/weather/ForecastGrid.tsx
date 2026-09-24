import { DailyForecast } from "@/types/weather";
import ForecastCard from "./ForecastCard";

interface Props {
  forecasts: DailyForecast[];
}

export default function ForecastGrid({ forecasts }: Props) {
  return (
    <div className="flex overflow-x-auto rounded-2xl border border-gray-200 bg-white"> 
      {forecasts.map((forecast) => (
        <ForecastCard key={forecast.date} forecast={forecast} />
      ))}
    </div>
  );
}