import { CurrentWeather } from "@/types/weather";
import Card from "@/components/ui/Card";

interface Props {
  weather: CurrentWeather;
}

export default function WeatherStats({
  weather,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
 
      <Card className="p-5">
        <p className="text-sm text-gray-500">
          Humidity
        </p>

        <p className="mt-2 font-display text-3xl  text-emerald-600">
          {weather.humidity}%
        </p>
      </Card>

      <Card className="p-5">
        <p className="text-sm text-gray-500">Wind Speed</p>
        <p className="mt-2 font-display text-3xl text-emerald-600">{weather.windSpeed} km/h</p> 
      </Card>

      <Card className="p-5">
        <p className="text-sm text-gray-500">Rainfall</p>
        <p className="mt-2 font-display text-3xl text-emerald-600">{weather.rainfall} mm</p> 
      </Card>

    </div>
  );
}