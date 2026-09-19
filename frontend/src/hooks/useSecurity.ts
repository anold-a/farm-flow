"use client";

import { useEffect, useState } from "react";
import { securityService } from "@/services/security.service";
import { SecurityResponse } from "@/types/security";

export function useSecurity() {
  const [data, setData] = useState<SecurityResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");
        const result = await securityService.getOverview();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to load security data.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { data, loading, error };
}