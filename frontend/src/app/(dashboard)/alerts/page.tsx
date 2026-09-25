"use client";

import AlertCard from "@/components/alerts/AlertCard";
import { useAlerts } from "@/hooks/useAlerts";
import { useRecommendations } from "@/hooks/useRecommendations";
import { useParams } from "next/navigation";
import { Alert } from "@/types/alert";

export default function AlertsPage() {
   const { fieldId } = useParams<{ fieldId: string }>();
  const { alerts, loading: alertsLoading, error: alertsError, resolveAlert } = useAlerts();
  const { data: recommendationData, loading: recommendationLoading } = useRecommendations(fieldId);

  const loading = alertsLoading || recommendationLoading;

  if (loading) return <p>Loading alerts...</p>;

  if (alertsError) {
    return <div className="rounded-xl bg-red-950/40 border border-red-500/20 p-4 text-red-400">{alertsError}</div>;
  }

  const escalatedRecommendations = recommendationData?.recommendations
    .filter(item => item.priority === "HIGH" || item.priority === "MEDIUM")
    .map((item, index) => ({
      id: `rec-alert-${index}`, 
      severity: (item.priority === "HIGH" ? "CRITICAL" : "WARNING") as Alert["severity"],
      message: `${item.situation} → ${item.recommendation}`,
      field: { name: "Current Field" }, 
      isRecommendation: true 
    })) || [];

  
  const allAlerts = [...alerts, ...escalatedRecommendations];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Alerts</h1>
        <p className="text-gray-500">Issues requiring your attention.</p>
      </div>

      {allAlerts.map((alert) => {
         const isRec = alert.id.toString().startsWith("rec-alert-");
            return (
              <AlertCard 
                key={alert.id} 
                {...(alert as any)} 
               
                onResolve={isRec ? async () => {} : resolveAlert} 
              />
            );
      })}
    </div>
  );
}