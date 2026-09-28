"use client";

import { useFieldOverview } from "@/hooks/useFieldOverview";
import CropStageCard from "@/components/crop-stages/CropStageCard";

export default function CropStagesPage() {
  const { overview, loading, error } = useFieldOverview();

  if (loading) {
    return <p className="text-slate-500">Loading crop stages...</p>;
  }

  if (error) {
    return (
      <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display text-gray-900">
          Crop Stages
        </h1>

        <p className="mt-1 text-gray-600">
          Monitor the growth stage of crops across your fields.
        </p>
      </div>

     {overview.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
          No fields found.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {overview.map((item) =>
            item.crop ? (
              <CropStageCard
                key={item.field.id}
                fieldId={item.field.id}
                fieldName={item.field.name}
                crop={item.crop}
              />
            ) : (
              <div
                key={item.field.id}
                className="rounded-xl border bg-white p-6 shadow-sm"
              >
                <h2 className="text-xl font-semibold text-gray-900">
                  {item.field.name}
                </h2>

                <p className="mt-3 text-sm text-gray-500">
                  No active crop assigned to this field.
                </p>
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
}