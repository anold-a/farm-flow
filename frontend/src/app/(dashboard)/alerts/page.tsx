"use client";

import AlertCard from "@/components/alerts/AlertCard";
import { useAlerts } from "@/hooks/useAlerts";

export default function AlertsPage() {
  const { alerts, loading, error, resolveAlert } = useAlerts();

  if (loading) return <p>Loading alerts...</p>;

  if (error) {
    return <div className="rounded-lg bg-red-100 p-4 text-red-700">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Alerts</h1>
        <p className="text-gray-500">Issues requiring your attention.</p>
      </div>

      {alerts.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center text-gray-500">
          No active alerts. Everything looks good.
        </div>
      ) : (
        <div className="space-y-3">
          {alerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} onResolve={resolveAlert} />
          ))}
        </div>
      )}
    </div>
  );
}