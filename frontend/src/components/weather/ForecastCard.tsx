import { DailyForecast } from "@/types/weather";
import Card from "@/components/ui/Card";

interface Props{
  forecast:DailyForecast
}

export default function ForecastCard({forecast}:Props){

  return(
      <Card className="p-5">
      <p className="font-medium text-gray-900">
        {new Date(forecast.date).toLocaleDateString()}
      </p>

      <p className="mt-3 text-gray-700">
        {forecast.condition}
      </p>

      <div className="mt-4 space-y-2 text-sm text-gray-600">

        <p>
          High:
          <strong className="text-gray-900">
            {" "}
            {forecast.maximumTemperature}°C
          </strong>
        </p>

        <p>
          Low:
          <strong className="text-gray-900">
            {" "}
            {forecast.minimumTemperature}°C
          </strong>
        </p>

        <p>
          Rain Chance:
          <strong className="text-emerald-600">
            {" "}
            {forecast.chanceOfRain}%
          </strong>
        </p>

      </div>
    </Card>
    
  )

}