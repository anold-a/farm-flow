import { WeatherAlert as Alert } from "@/types/weather";

interface Props {
  alert: Alert;
}

const alertStyles = {
  LOW: "bg-amber-50 border-amber-200 text-amber-700",
  MEDIUM: "bg-amber-50 border-amber-400 text-amber-800",
  HIGH: "bg-red-50 border-red-500 text-red-700",
};

export default function WeatherAlert({
  alert,
}: Props) {
  return (
    <div
      className={`rounded-lg border p-4 ${alertStyles[alert.severity]}`}
    >
      <h3 className="font-display font-semibold">
        {alert.title}
      </h3>

      <p className="mt-2 text-sm">
        {alert.description}
      </p>
    </div>
  );
}