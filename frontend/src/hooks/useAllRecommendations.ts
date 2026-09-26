
"use client";

import { useEffect, useState } from "react";
import { fieldService } from "@/services/field.service";
import { recommendationService } from "@/services/recommendation.service";
import { RecommendationItem } from "@/types/recommendation";

export interface FieldRecommendations { 
  fieldId: string;
  fieldName: string;
  recommendations: RecommendationItem[];
}

export function useAllRecommendations() {
  const [results, setResults] = useState<FieldRecommendations[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");

        const fields = await fieldService.getAll(); 

        const perField = await Promise.all(
          fields.map(async (field) => {
            try {
              const data = await recommendationService.getForField(field.id);
              return { fieldId: field.id, fieldName: field.name, recommendations: data.recommendations };
            } catch {
              return null; 
            }
          }),
        );

        setResults(perField.filter((r): r is FieldRecommendations => r !== null));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to load recommendations.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { results, loading, error };
}