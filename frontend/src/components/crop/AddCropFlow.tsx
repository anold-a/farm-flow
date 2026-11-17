"use client";

import { useState } from "react";
import { useFieldOverview } from "@/hooks/useFieldOverview";
import CropForm from "@/components/crop/CropForm"; 
import { Field } from "@/types/field";

type Props = { onSuccess?: () => void; onCancel?: () => void };

export default function AddCropFlow({ onSuccess, onCancel }: Props) {
  const { overview, loading, error } = useFieldOverview();
  const [selected, setSelected] = useState<Field | null>(null);

  
  const viable = overview.map((item) => item.field);

  
  if (selected) {
    return (
      <div>
        <div className="flex items-center gap-2 border-b border-black/5 px-6 py-3">
          <button type="button" onClick={() => setSelected(null)}
            className="text-sm text-neutral-500 hover:text-neutral-900">
            ← Back
          </button>
          <span className="text-sm text-neutral-400">/</span>
          <span className="text-sm font-medium text-neutral-900">{selected.name}</span>
        </div>
        <CropForm fieldId={selected.id} onSuccess={onSuccess} onCancel={onCancel} />
      </div>
    );
  }

 
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-neutral-900">Add a new crop</h2>
      <p className="mb-4 text-sm text-neutral-500">Choose the field this crop is for.</p>

      {loading && <p className="text-sm text-neutral-500">Loading fields...</p>}
      {error && <p className="rounded-lg bg-red-100 p-3 text-sm text-red-700">{error}</p>}

      {!loading && !error && viable.length === 0 && (
        <p className="text-sm text-neutral-500">Every field already has an active crop.</p>
      )}

      <ul className="max-h-80 space-y-2 overflow-y-auto">
        {viable.map((field) => (
          <li key={field.id}>
            <button
              type="button"
              onClick={() => setSelected(field)}
              className="flex w-full items-center justify-between rounded-lg border border-black/10 px-4 py-3 text-left hover:bg-emerald-50"
            >
              <span>
                <span className="block text-sm font-medium text-neutral-900">{field.name}</span>
                <span className="block text-xs text-neutral-500">{field.location}</span>
              </span>
              <span className="text-neutral-400">→</span>
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex justify-end">
        <button type="button" onClick={onCancel}
          className="rounded-md px-4 py-2 text-sm text-neutral-600 hover:bg-black/5">
          Cancel
        </button>
      </div>
    </div>
  );
}