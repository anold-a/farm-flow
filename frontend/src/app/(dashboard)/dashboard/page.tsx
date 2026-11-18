"use client";


import FieldOverviewGrid from "@/components/dashboard/FieldOverviewGrid";
import CropStagesTimeline from "@/components/dashboard/CropStagesTimeline";
import SystemAlertsPanel from "@/components/alerts/SystemAlertsPanel"
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
  

  if (loading) return <p className="text-slate-500">Loading dashboard...</p>;

  return (
    <div >
     <div className="mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
  <FieldOverviewGrid />
  <SystemAlertsPanel />
</div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <FieldPlotMap overview={overview} />
          {overview
  .filter((item) => item.crop)
  .map((item) => (
    <CropStagesTimeline
      key={item.crop!.id}
      cropName={item.crop!.name}
      plantingDate={
        item.crop!.plantingDate
          ? String(item.crop!.plantingDate)
          : ""
      }
      currentStage={item.crop!.actualGrowthStage}
    />
  ))}
        </div>

        
      </div>

      <div className="mt-6 grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <FieldPerformanceChart />
         
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