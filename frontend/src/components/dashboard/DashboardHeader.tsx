"use client";

import { useEffect, useState } from "react";
import { Sprout } from "lucide-react"; 
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FieldsSection from "./FieldsSection";
import FieldOverviewGrid from "./FieldOverviewGrid";
import SystemAlertsPanel from "../alerts/SystemAlertsPanel";
import AgentWelcome from "./AgentWelcome";       
import { useFields } from "@/hooks/useFields";

import Alerts from "../alerts/Alerts";

import { useAuth } from "@/hooks/useAuth";
import UsersPage from "@/app/(dashboard)/users/page";
import CropStagesTimeline from "./CropStagesTimeline";
import { useFieldOverview } from "@/hooks/useFieldOverview";
import SensorDataSummary from "./SensorDataSummary";
import FieldPerformanceChart from "./FieldPerformanceChart";
import FieldsList from "./FieldsList";


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



export default function DashboardHeader({
  fieldCounts,
  
  isAdmin = false,
  userCount,
  alertCount,
}: DashboardHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const {user} = useAuth();
  const { overview, loading } = useFieldOverview();
  const { fields, loading: fieldsLoading } = useFields();

  
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
  const showWelcome =
  user?.role === "AGENT" &&
  !fieldsLoading &&
  fields.filter((f) => !f.isDemo).length === 0;

  const storageKey = user ? `access-requested:${user.id}` : null;
const [requested, setRequested] = useState(false);
const [requestedReady, setRequestedReady] = useState(false);

useEffect(() => {
  if (!storageKey) return;
  try {
    setRequested(localStorage.getItem(storageKey) === "1");
  } catch {}
  setRequestedReady(true);
}, [storageKey]);

function handleRequested() {
  setRequested(true);
  try {
    if (storageKey) localStorage.setItem(storageKey, "1");
  } catch {}
}


const hideRest = showWelcome && !requested;


if (showWelcome && !requestedReady) return null;

  return (
    <div className="mb-6">
       {hideRest && (
      <div className="mb-5">
        <AgentWelcome name={user?.fullName} sent={requested} onRequested={handleRequested} />
      </div>
    )}
      {!hideRest && (
      <>

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
      {activeView === "users" && (
        <div>

          {user?.role === "ADMIN" && <UsersPage />}
        </div>
      )}
      {activeView === "fields" && (
        <div>
          
          <FieldsList limit={1} />
        </div>
      )}
      {activeView === "alerts" && (
        <div>

         <Alerts />
        </div>
      )}
      {activeView === "crops" && (
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
      )}
      {activeView === "data" && (
        <div>
                 <div className="space-y-6">
                  <SensorDataSummary overview={overview} />
                 </div>
                 <div className="mt-6 grid grid-cols-3 gap-6">
                         <div className="col-span-2 space-y-6">
                           <FieldPerformanceChart />
                          
                         </div>
                       </div>            
</div>             
      )}

      </>
    )}

    </div>
  );
}