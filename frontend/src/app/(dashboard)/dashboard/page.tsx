"use client";


import FieldOverviewGrid from "@/components/dashboard/FieldOverviewGrid";
import CropStagesTimeline from "@/components/dashboard/CropStagesTimeline";
import SystemAlertsPanel from "@/components/alerts/AlertCard"
import UserManagementSummary from "@/components/dashboard/UserManagementSummary";
import SensorDataSummary from "@/components/dashboard/SensorDataSummary";
import DashboardWeatherWidget from "@/components/dashboard/DashboardWeatherWidget";
import FieldPerformanceChart from "@/components/dashboard/FieldPerformanceChart";
import FieldPlotMap from "@/components/dashboard/FieldPlotMap";
import { useFieldOverview } from "@/hooks/useFieldOverview";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardPage() {
  const { overview, loading } = useFieldOverview();
  const { user } = useAuth();
  const primaryField = overview[0];

  if (loading) return <p className="text-slate-500">Loading dashboard...</p>;

  return (
    <div>
     

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <FieldPlotMap overview={overview} />
          {primaryField?.crop && (
            <CropStagesTimeline
              cropName={primaryField.crop.name}
              plantingDate={primaryField.crop.plantingDate ? String(primaryField.crop.plantingDate) : ""}
              currentStage={primaryField.crop.growthStage}
            />
          )}
        </div>

        <div className="space-y-6">
          <FieldOverviewGrid />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <FieldPerformanceChart />
          <SystemAlertsPanel />
        </div>

        <div className="space-y-6">
          {user?.role === "ADMIN" && <UserManagementSummary />}
          <SensorDataSummary overview={overview} />
          <DashboardWeatherWidget />
        </div>
      </div>
    </div>
  );
}