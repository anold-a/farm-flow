"use client";

import { useEffect, useState } from "react";
import { analyticsService } from "@/services/analytics.service";
import { AnalyticsResponse } from "@/types/analytics";

export function useAnalytics() {
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");
        const data = await analyticsService.getAnalytics();
        setAnalytics(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to load analytics.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { analytics, loading, error };
}