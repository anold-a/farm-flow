"use client";

import { useFieldOverview } from "@/hooks/useFieldOverview";
import { ArrowBigUp } from "lucide-react";


export default function DashboardPage() {
  const { overview, loading } = useFieldOverview();
  
  

  if (loading) return <p className="text-slate-500">Loading dashboard...</p>;

  return (
    <div className="flex justify-end text-2xl" >
   <ArrowBigUp className="text-neutral-950 " size={16} />

      
    </div>
  );
}