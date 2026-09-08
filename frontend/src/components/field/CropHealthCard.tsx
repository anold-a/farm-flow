import { CropIntelligence } from "@/types/crop-intelligence";

interface Props {
  intelligence: CropIntelligence;
}

const statusStyles: Record<string, string> = {
  HEALTHY: "bg-green-50 text-green-700 border-green-300",
  NEEDS_ATTENTION: "bg-yellow-50 text-yellow-700 border-yellow-300",
  AT_RISK: "bg-red-50 text-red-700 border-red-300",
};

export default function CropHealthCard({ intelligence }: Props) {
  return (
    <div className="space-y-4 rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Crop Health</h2>
        <span className={`rounded-full border px-3 py-1 text-sm font-semibold ${statusStyles[intelligence.status]}`}>
          {intelligence.status.replace("_", " ")}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-sm text-gray-500">Moisture</p>
          <p className="text-lg font-bold">{intelligence.metrics.moisture ?? "N/A"}%</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Temperature</p>
          <p className="text-lg font-bold">{intelligence.metrics.temperature ?? "N/A"}°C</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Humidity</p>
          <p className="text-lg font-bold">{intelligence.metrics.humidity ?? "N/A"}%</p>
        </div>
      </div>

      <div>
        <h3 className="mb-2 font-semibold">💡 Insights</h3>
        <ul className="list-inside list-disc space-y-1 text-sm text-gray-700">
          {intelligence.insights.map((insight, index) => (
            <li key={index}>{insight}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}