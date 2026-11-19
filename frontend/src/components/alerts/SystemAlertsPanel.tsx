"use client";

import Link from "next/link";
import { useAlerts } from "@/hooks/useAlerts";
import { AlertTriangle, Info, OctagonAlert } from "lucide-react";

const severity: Record<string, { icon: React.ReactNode; pill: string }> = {
  CRITICAL: { icon: <OctagonAlert size={16} className="text-red-600" />, pill: "bg-red-100 text-red-700" },
  WARNING: { icon: <AlertTriangle size={16} className="text-amber-600" />, pill: "bg-amber-100 text-amber-700" },
  INFO: { icon: <Info size={16} className="text-slate-500" />, pill: "bg-slate-200 text-slate-600" },
};

export default function SystemAlertsPanel() {
  const { alerts, loading } = useAlerts();
  const recent = alerts.slice(0, 2);

  return (
    <section>
   
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-[13px] text-neutral-700">Recent alerts</h2>
        <Link href="/alerts" className="text-xs text-emerald-700 hover:underline">View all</Link>
      </div>

      
      <div >
        {loading ? (
          <p className="px-3 py-2 text-sm text-neutral-500">Loading...</p>
        ) : recent.length === 0 ? (
          <p className="px-3 py-2 text-sm text-neutral-500">No active alerts.</p>
        ) : (
          <ul className="space-y-1">
            {recent.map((alert) => {
              const s = severity[alert.severity] ?? severity.INFO;
              return (
                <li key={alert.id} className="flex items-start gap-3 rounded-xl px-3 py-3 hover:bg-black/3">
                  <span className="mt-0.5 shrink-0" aria-hidden="true">{s.icon}</span>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[14px] text-neutral-900">{alert.message}</p>
                    <p className="mt-0.5 text-xs text-neutral-500">{alert.field?.name ?? "System"}</p>
                  </div>

                  
                  <span className={`shrink-0 rounded-md px-2 py-1 text-[11px] font-medium ${s.pill}`}>
                    {alert.severity.charAt(0) + alert.severity.slice(1).toLowerCase()}
                    {alert.createdAt && ` · ${new Date(alert.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}`}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}