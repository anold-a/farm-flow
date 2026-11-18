"use client";



import CropStagesTimeline from "@/components/dashboard/CropStagesTimeline";


import SensorDataSummary from "@/components/dashboard/SensorDataSummary";
import DashboardWeatherWidget from "@/components/dashboard/DashboardWeatherWidget";
import FieldPerformanceChart from "@/components/dashboard/FieldPerformanceChart";

import { useFieldOverview } from "@/hooks/useFieldOverview";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardPage() {
  const { overview, loading } = useFieldOverview();
  const { user } = useAuth();
  

  if (loading) return <p className="text-slate-500">Loading dashboard...</p>;

  return (
    <div >
   

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
         
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
         
          <SensorDataSummary overview={overview} />
          <DashboardWeatherWidget />
        </div>
      </div>
    </div>
  );
}