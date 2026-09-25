"use client";

import { useCallback, useEffect, useState } from "react";
import { alertService } from "@/services/alert.service";
import { Alert } from "@/types/alert";


export function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAlerts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await alertService.getAll();
      setAlerts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load alerts.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAlerts();
  }, [loadAlerts]);

  const resolveAlert = async (alertId: string) => {
    await alertService.resolve(alertId);
    setAlerts((current) => current.filter((a) => a.id !== alertId));
  };

  const criticalCount = alerts.filter((a) => a.severity === "CRITICAL").length;

  return { alerts, loading, error, resolveAlert, criticalCount, refresh: loadAlerts };
}