"use client";

import { Sprout } from "lucide-react"; 
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FieldsSection from "./FieldsSection";
import FieldOverviewGrid from "./FieldOverviewGrid";
import SystemAlertsPanel from "../alerts/SystemAlertsPanel";


type DashboardHeaderProps = {
  stages: string[]; 
  fieldCounts: {
    all: number;
    planted: number;
    unplanted: number;
  };
  stageCounts: Record<string, number>;
  isAdmin?: boolean;   
  userCount?: number;
  alertCount?: number;
};

const clean = (v: string) => v.replace(/_/g, " ");

export default function DashboardHeader({
  stages,
  fieldCounts,
  stageCounts,
  isAdmin = false,
  userCount,
  alertCount,
}: DashboardHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  
  const tabs = [
    { value: "", label: "Summary" },
    ...(isAdmin ? [{ value: "users", label: "Users", count: userCount }] : []),
    { value: "fields", label: "Fields", count: fieldCounts.all },
    { value: "crops", label: "Crops", count: fieldCounts.planted },
    { value: "alerts", label: "Alerts", count: alertCount },
    { value: "data", label: "Data" },
  ];

  const activeView = searchParams.get("view") ?? "";

  function setView(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set("view", value);
    else params.delete("view");
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  return (
    <div className="mb-6">
      <p className="flex items-center gap-1.5 text-xs text-neutral-500">
        <Sprout size={13} aria-hidden="true" />
        Summary
      </p>

      <h1 className="mt-1 font-serif text-[32px] leading-tight tracking-tight text-neutral-900">
        Dashboard
      </h1>

     
      <p className="mt-2 text-[13px] text-neutral-500">
        Every field, crop and alert in one place.
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <div
          role="group"
          aria-label="Dashboard sections"
          className="inline-flex flex-wrap items-center gap-0.5 rounded-xl bg-white/50 p-1"
        >
          {tabs.map((tab) => {
            const active = activeView === tab.value;
            return (
              <button
                key={tab.label}
                type="button"
                aria-pressed={active}
                onClick={() => setView(tab.value)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors ${
                  active
                    ? "bg-white text-neutral-900 shadow-sm"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span className="text-[11px] font-normal text-neutral-400">{tab.count}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      
      {activeView === "" && (
        
        <div >
          <div className="mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
           <FieldOverviewGrid />
           <SystemAlertsPanel />
         </div>
        <FieldsSection />
        </div>
      )}
    </div>
  );
}