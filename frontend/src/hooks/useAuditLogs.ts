"use client";

import { useEffect, useState } from "react";
import { auditService } from "@/services/audit.service";
import { AuditLogEntry } from "@/types/audit";

export function useAuditLogs() {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");
        const data = await auditService.getAll();
        setLogs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to load audit logs.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { logs, loading, error };
}