import DashboardCard from "./DashboardCard";
import { CropStageBreakdown } from "./CropStageBreakdown"; 

import { DashboardStats as IDashboardStats  } from "@/types/dashboard";

interface Props {
  statistics: IDashboardStats;
  role: "ADMIN" | "AGENT";
}

export default function DashboardStats({
  statistics,
  role,
}: Props) {

  const ledgerRows = [ 
    ...(role === "ADMIN" ? [{ label: "Users", value: statistics.totalUsers }] : []),
    ...(role === "ADMIN" ? [{ label: "Agents", value: statistics.totalAgents }] : []),
    { label: "Completed fields", value: statistics.completedFields },
    { label: "Field updates", value: statistics.totalFieldUpdates },
  ];
  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <div className="rounded-2xl border border-gray-200 bg-white p-6"> 
        <p className="text-sm text-gray-500">Active Fields</p>
        <p className="mt-2 font-display text-5xl text-emerald-600">{statistics.activeFields}</p>
        <p className="mt-2 text-sm text-gray-500">out of {statistics.totalFields} total</p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6"> 
        <div className="divide-y divide-gray-100">
          {ledgerRows.map((row) => (
            <div key={row.label} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
              <span className="text-sm text-gray-600">{row.label}</span>
              <span className="font-display text-xl text-gray-900">{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2"> 
        <CropStageBreakdown cropStats={statistics.cropStats} /> 
      </div>
      

    </div>
  );
}