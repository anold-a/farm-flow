"use client";

import { useEffect, useState } from "react";
import { recommendationService } from "@/services/recommendation.service";
import { RecommendationResponse } from "@/types/recommendation";

export function useRecommendations(fieldId: string) {
  const [data, setData] = useState<RecommendationResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");
        const result = await recommendationService.getForField(fieldId);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to load recommendations.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [fieldId]);

  return { data, loading, error };
}