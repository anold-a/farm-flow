import Link from "next/link";
import { FiFolder } from "react-icons/fi";
import { Field } from "@/types/field";
import { timeAgo } from "@/lib/timeAgo";

const statusDot: Record<string, string> = {
  Healthy: "bg-emerald-500",
  "Needs Attention": "bg-amber-500",
  Critical: "bg-red-500",
  Harvested: "bg-slate-400",
};


export default function FieldSummaryCard({ field }: { field: Field }) {
  return (
    <Link
      href={`/fields/${field.id}`}
      className="flex min-h-42.5 flex-col rounded-sm bg-[#F8F7F4] p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <h3 className="truncate text-[15px] text-neutral-900">{field.name}</h3>

      
      <p className="mt-3 text-[13px] leading-relaxed text-neutral-500">
        {field.crop || "No crop"} · {field.status} · {field.location} · {field.acreage} acres
      </p>

      
      <div className="mt-auto flex items-center gap-2 pt-6 text-xs text-neutral-400">
        <FiFolder size={13} aria-hidden="true" />
        <span className="flex items-center gap-1.5 uppercase">
          <span className={`h-1.5 w-1.5 rounded-full ${statusDot[field.status] ?? statusDot.Harvested}`} />
          {field.status}
        </span>
       
        {field.createdAt && <span>· {timeAgo(field.createdAt)}</span>}
      </div>
    </Link>
  );
}