"use client";

import { useEffect, useState } from "react";
import { analyticsService } from "@/services/analytics.service";
import { AnalyticsResponse } from "@/types/analytics";

export function useAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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