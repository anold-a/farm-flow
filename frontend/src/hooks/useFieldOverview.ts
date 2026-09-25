"use client";

import { useEffect, useState } from "react";
import { fieldService } from "@/services/field.service";
import { cropService } from "@/services/crop.service";
import { fieldUpdateService } from "@/services/field-update.service";
import { Field } from "@/types/field";
import { Crop } from "@/types/crop";
import { FieldUpdate } from "@/types/field-update";

export interface FieldOverview { 
  field: Field;
  crop: Crop | null;
  latestUpdate: FieldUpdate | null;
}

export function useFieldOverview() {
  const [overview, setOverview] = useState<FieldOverview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const fields = await fieldService.getAll();

        const results = await Promise.all(
          fields.map(async (field) => {
            const [crop, updates] = await Promise.all([
              cropService.getActiveByField(field.id).catch(() => null),
              fieldUpdateService.getByField(field.id).catch(() => []),
            ]);
            return { field, crop, latestUpdate: updates[0] ?? null };
          }),
        );

        setOverview(results);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to load field overview.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { overview, loading, error };
}