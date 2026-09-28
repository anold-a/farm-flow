"use client";

import { useCropIntelligence } from "@/hooks/useCropIntelligence";
import { Crop } from "@/types/crop";

interface Props {
  fieldId: string;
  fieldName: string;
  crop: Crop;
}

const comparisonStyles: Record<string, string> = {
  BEHIND: "bg-red-50 text-red-700 border-red-300",
  ON_TRACK: "bg-green-50 text-green-700 border-green-300",
  AHEAD: "bg-blue-50 text-blue-700 border-blue-300",
};

export default function CropStageCard({
  fieldId,
  fieldName,
  crop,
}: Props) {
  const { intelligence, loading, error } = useCropIntelligence(fieldId);

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900">
        {fieldName}
      </h2>

      <div className="mt-4 space-y-3">
        <div>
          <p className="text-sm text-gray-500">Crop</p>
          <p className="font-semibold">{crop.name}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Variety</p>
          <p className="font-semibold">{crop.variety}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Planting Date</p>
          <p className="font-semibold">
            {new Date(crop.plantingDate).toLocaleDateString()}
          </p>
        </div>

        {loading ? (
          <p className="text-sm text-gray-500">
            Loading growth stage comparison...
          </p>
        ) : error ? (
          <p className="text-sm text-red-500">
            {error}
          </p>
        ) : intelligence ? (
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm text-gray-500">
                Expected Stage
              </p>
              <p className="font-semibold">
                {intelligence.expectedGrowthStage.replace("_", " ")}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Actual Stage
              </p>
              <p className="font-semibold">
                {intelligence.growthStage.replace("_", " ")}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Comparison
              </p>

              <span
                className={`inline-block rounded-full border px-3 py-1 text-sm font-semibold ${
                  comparisonStyles[intelligence.stageComparison]
                }`}
              >
                {intelligence.stageComparison.replace("_", " ")}
              </span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}