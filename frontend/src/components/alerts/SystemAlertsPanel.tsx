"use client";

import Link from "next/link";
import { useAlerts } from "@/hooks/useAlerts";

const severityIcon: Record<string, string> = { CRITICAL: "", WARNING: "", INFO: "" };

export default function SystemAlertsPanel() {
  const { alerts, loading } = useAlerts();
  const recent = alerts.slice(0, 3);

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-slate-400">Recent System Alerts</h2>
        <Link href="/alerts" className="text-xs text-emerald-400 hover:underline">View all</Link>
      </div>

      {loading ? (
        <p className="mt-4 text-sm text-slate-500">Loading...</p>
      ) : recent.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">No active alerts.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {recent.map((alert) => (
            <li key={alert.id} className="flex items-start gap-2 text-sm">
              <span aria-hidden>{severityIcon[alert.severity]}</span>
              <div>
                <p className="text-slate-200">{alert.message}</p>
                <p className="text-xs text-slate-500">{alert.field?.name}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}