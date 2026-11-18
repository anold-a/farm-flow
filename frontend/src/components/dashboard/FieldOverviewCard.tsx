import Link from "next/link";
import { Sprout } from "lucide-react";
import { FieldOverview } from "@/hooks/useFieldOverview";
import { timeAgo } from "@/lib/timeAgo";




export default function FieldOverviewCard({ item }: { item: FieldOverview }) {
  const { field, crop, latestUpdate } = item;

  
  const stage = crop?.actualGrowthStage?.replace(/_/g, " ") ?? "No crop";

  return (
    
    <li>
      <Link
        href={`/fields/${field.id}`}
        className="flex items-start gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-black/3"
      >
        
        <Sprout size={16} className="mt-0.5 shrink-0 text-neutral-500" aria-hidden="true" />

        <div className="min-w-0 flex-1">
          
          <p className="flex items-center gap-2 truncate text-[14px] text-neutral-900">
            
            <span className="truncate">
              {field.name}
              <span className="text-neutral-400"> · </span>
              {crop?.name ?? "No crop"}
            </span>
          </p>


          <p className="mt-0.5 text-xs text-neutral-500">
            <span className="uppercase">{stage}</span>
            {" · "}Moisture {latestUpdate?.moisture ?? "—"}%
            {" · "}Temp {latestUpdate?.temperature ?? "—"}°C
          </p>
        </div>

        
        <span className="shrink-0 text-xs text-neutral-400">{timeAgo(latestUpdate?.createdAt)}</span>
      </Link>
    </li>
  );
}