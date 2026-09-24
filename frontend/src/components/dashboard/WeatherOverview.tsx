import Link from "next/link";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

interface Props {
  temperature: number;
  condition: string;
  humidity: number;
}

export default function WeatherOverview({
  temperature,
  condition,
  humidity,
}: Props) {
  return (
    <Card>

      <div className="flex items-center justify-between">

        <h2 className="text-xl font-display text-gray-900">
          Weather Overview
        </h2>

        <Link href="/weather">
          <Button>
            View Weather
          </Button>
        </Link>

      </div>

      <div className="mt-6 flex items-end justify-between">

        <div>
          <p className="text-sm text-gray-500">
            Temperature
          </p>
          <h3 className="mt-1 font-display text-5xl text-emerald-600">
            {temperature}°C
          </h3>
        </div>
         <p className="text-right text-sm text-gray-600"> 
          {condition}, {humidity}% humidity
        </p>

      </div>

    </Card>
  );
}