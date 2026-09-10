import { RecommendationResponse } from "@/types/recommendation";

interface Props {
  data: RecommendationResponse;
}

const priorityStyles: Record<string, string> = {
  HIGH: "border-red-300 bg-red-50 text-red-700",
  MEDIUM: "border-yellow-300 bg-yellow-50 text-yellow-700",
  LOW: "border-green-300 bg-green-50 text-green-700",
};

const priorityIcon: Record<string, string> = {
  HIGH: "🔴",
  MEDIUM: "💧",
  LOW: "✅",
};

export default function RecommendationsCard({ data }: Props) {
  return (
    <div className="space-y-4 rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">Recommendations</h2>

      <div className="space-y-3">
        {data.recommendations.map((item, index) => (
          <div
            key={index}
            className={`rounded-lg border p-4 ${priorityStyles[item.priority]}`}
          >
            <p className="text-sm opacity-80">{item.situation}</p>
            <p className="mt-1 font-medium">
              {priorityIcon[item.priority]} {item.recommendation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}