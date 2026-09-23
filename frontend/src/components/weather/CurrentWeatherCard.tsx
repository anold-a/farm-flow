import { CurrentWeather } from "@/types/weather";
import Card from "@/components/ui/Card";

interface Props {
  weather: CurrentWeather;
}

export default function CurrentWeatherCard({
  weather,
}: Props) {
  return (
    <Card>
      <h3 className="text-2xl font-display text-gray-900">
        Current Weather
      </h3>

      <p className="mt-1 text-gray-500">
        {weather.location}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">
            Temperature
          </p>

          <p className="text-3xl font-display text-emerald-600">
            {weather.temperature}°C
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Condition
          </p>

          <p className="text-lg font-semibold text-gray-900">
            {weather.condition}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Humidity
          </p>

          <p className="text-gray-900">{weather.humidity}%</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Wind Speed
          </p>

          <p className="text-gray-900">{weather.windSpeed} km/h</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Rainfall
          </p>

          <p className="text-gray-900">{weather.rainfall} mm</p>
        </div>
      </div>
    </Card>
  );
}