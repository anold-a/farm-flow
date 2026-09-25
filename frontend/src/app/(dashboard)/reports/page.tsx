"use client";

import { useState } from "react";

import ReportsSummary from "@/components/reports/ReportsSummary";
import ReportFilters from "@/components/reports/ReportFilters";
import CropReport from "@/components/reports/CropReport";
import WeatherReport from "@/components/reports/WeatherReport";
import AgentReport from "@/components/reports/AgentReport";
import ExportButtons from "@/components/reports/ExportButtons";
import ReportsSkeleton from "@/components/reports/ReportsSkeleton";
import { useAuth } from "@/hooks/useAuth";
import { reportsService } from "@/services/reports.service";

import { useReports } from "@/hooks/useReports";

export default function ReportsPage() {
  const {
    reports,
    loading,
    error,
  } = useReports();

  const {user} = useAuth();

 const role = user?.role ?? "AGENT";

  const [crop, setCrop] = useState("");
  const [period, setPeriod] = useState("30");
  const [exportingCsv, setExportingCsv] = useState(false);


  
async function handleExportCsv() {
  setExportingCsv(true);
  try {
    await reportsService.exportCombined();
  } catch (err) {
    console.error("Export failed", err);
  } finally {
    setExportingCsv(false);
  }
}


  if (loading) {
    return <ReportsSkeleton />;
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700 shadow-sm animate-fade-in">
        {error}
      </div>
    );
  }

  if (!reports) {
    return (
      <div>No reports available.</div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-6 lg:p-8">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-5">

        <div>

          <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
            Reports & Analytics
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Farm performance reports.
          </p>

        </div>

        <ExportButtons
  onExportCsv={handleExportCsv} 
  onExportPdf={() => alert("PDF export coming soon")} 
/>

      </div>

      <ReportsSummary
        statistics={reports.statistics}
        role={role}
      />

      <ReportFilters
        selectedCrop={crop}
        onCropChange={setCrop}
        selectedPeriod={period}
        onPeriodChange={setPeriod}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 items-start">
        <div className="lg:col-span-2">
          <CropReport reports={reports.crops} statistics={reports.statistics} />
        </div>
        <div className="lg:col-span-1">
          <WeatherReport reports={reports.weather} />
        </div>
      </div>

      {role === "ADMIN" && (
        <AgentReport
          reports={reports.agents}
        />
      )}

    </div>
  );
}