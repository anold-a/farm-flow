"use client";

import { useEffect, useState } from "react";
import { cropIntelligenceService } from "@/services/crop-intelligence.service";
import { CropIntelligence } from "@/types/crop-intelligence";

export function useCropIntelligence(fieldId: string) {
  const [intelligence, setIntelligence] = useState<CropIntelligence | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");
        const data = await cropIntelligenceService.getForField(fieldId);
        setIntelligence(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to load crop intelligence.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [fieldId]);

  return { intelligence, loading, error };
}