"use client";

import AlertCard from "@/components/alerts/AlertCard";
import { useAlerts } from "@/hooks/useAlerts";
import { useAllRecommendations } from "@/hooks/useAllRecommendations";
import { Alert } from "@/types/alert";

export default function AlertsPage() {
  
  const { alerts, loading: alertsLoading, error: alertsError, resolveAlert } = useAlerts();
  const { results: recommendationResults, loading: recommendationLoading } = useAllRecommendations();

  const loading = alertsLoading || recommendationLoading;

  if (loading) return <p className="text-gray-500">Loading alerts...</p>;

  if (alertsError) {
    return <div className="rounded-xl bg-red-950/40 border border-red-500/20 p-4 text-red-400">{alertsError}</div>;
  }

  const escalatedRecommendations: Alert[] = recommendationResults.flatMap(
  (fieldRec) =>
    fieldRec.recommendations
      .filter(
        (item) =>
          (item.priority === "HIGH" || item.priority === "MEDIUM") &&
          !alerts.some(
            (alert) =>
              alert.fieldId === fieldRec.fieldId &&
             alert.type === item.type,
          ),
      )
      .map((item, index) => ({
        id: `rec-alert-${fieldRec.fieldId}-${index}`,
        fieldId: fieldRec.fieldId,
        field: {
          id: fieldRec.fieldId,
          name: fieldRec.fieldName,
        },
        type: "RECOMMENDATION",
        severity: (
          item.priority === "HIGH" ? "CRITICAL" : "WARNING"
        ) as Alert["severity"],
        message: `${item.situation} → ${item.recommendation}`,
        resolved: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })),
);

  
  const allAlerts = [...alerts, ...escalatedRecommendations];

  async function handleResolve(id: string) {
    if (id.startsWith("rec-alert-")) {
      return;
    }
    await resolveAlert(id);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display text-gray-900">Alerts</h1>
        <p className="mt-1 text-gray-600">Issues requiring your attention.</p>
      </div>

      {
      allAlerts.length === 0 ? ( 
        <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
          No active alerts or high-priority recommendations.
        </div>
      ) : (
      <div className="space-y-3">
          {allAlerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} onResolve={handleResolve} /> 
            ))}
        </div>
      )}
    </div>
  );
}