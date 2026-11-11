import Link from "next/link";
import Badge from "@/components/ui/Badge";

import Button from "@/components/ui/Button";
import DeleteFieldButton from "./DeleteFieldButton";
import { Field } from "@/types/field";


export interface FieldCardData {
  id: string;
  name: string;
  crop: string;
  location: string;
  acreage: number;
  status: string;
}

interface Props {
  field: FieldCardData;
  role: "ADMIN" | "AGENT";
  onDelete: (id: string) => void
}



export default function FieldCard({
   field,
  role,
  onDelete
}: Props) {
  return (
     <div className="flex flex-col md:flex-row overflow-hidden rounded-xl border border-gray-100 bg-[#FAF9F6] shadow-sm transition-all hover:shadow-md">
      <div className="relative flex min-h-55 w-full items-center justify-center bg-emerald-50/40 p-6 md:w-2/5 border-b md:border-b-0 md:border-r border-gray-100/60">
        <svg 
          viewBox="0 0 100 100" 
          className="h-32 w-32 text-emerald-700/80 drop-shadow-sm transition-transform hover:scale-105"
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          
          <path d="M5 80 C 25 75, 45 85, 95 80" strokeWidth="1" className="text-emerald-900/20" />
          <path d="M0 85 C 35 80, 65 90, 100 85" strokeWidth="1" className="text-emerald-900/30" />
          
          
          <polygon points="20,75 20,55 45,55 45,75" fill="currentColor" className="text-emerald-100" />
          <polygon points="16,55 32.5,40 49,55" fill="currentColor" className="text-emerald-800" />
          <path d="M20,55 L20,75 L45,75 L45,55 Z" />
          <path d="M16,55 L32.5,40 L49,55 Z" />
          
          
          <rect x="28" y="62" width="10" height="13" fill="white" stroke="currentColor" strokeWidth="1" />
          <line x1="28" y1="62" x2="38" y2="75" strokeWidth="1" />
          <line x1="38" y1="62" x2="28" y2="75" strokeWidth="1" />
          
          
          <rect x="52" y="45" width="10" height="30" rx="1" fill="currentColor" className="text-emerald-50" />
          <path d="M52,75 L52,45 L62,45 L62,75" />
          <path d="M52,45 C 52,38 62,38 62,45 Z" fill="currentColor" className="text-emerald-700" />
          
          
          <path d="M68,85 L72,95" />
          <path d="M76,85 L82,95" />
          <path d="M84,85 L92,95" />
          
          
          <circle cx="80" cy="25" r="5" strokeWidth="1" fill="currentColor" className="text-amber-100" />
          <path d="M80,15 L80,18 M80,32 L80,35 M70,25 L73,25 M87,25 L90,25" strokeWidth="1" className="text-amber-500" />
        </svg>
      </div>
      
      <div className="flex w-full flex-col justify-between p-6 md:w-3/5">
      <div className="space-y-4">

        <div className="flex items-start justify-between gap-4">
          <h2 className="font-display text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
            {field.name}
          </h2>

          <Badge className="px-2.5 py-0.5 text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/60 rounded-full">
            {field.status}
          </Badge>
        </div>



       <p className="text-sm leading-relaxed text-gray-600">
            Active production zone monitoring crop yield lifecycles, terrain analytics, and localized weather metrics.
          </p>

          
          <div className="flex flex-wrap gap-2 pt-1">
            <div className="rounded-lg bg-white border border-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm flex items-center gap-1.5">
              <span>🌾</span> Crop: <span className="font-semibold text-gray-900">{field.crop}</span>
            </div>
            <div className="rounded-lg bg-white border border-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm flex items-center gap-1.5">
              <span>📍</span> Location: <span className="font-semibold text-gray-900">{field.location}</span>
            </div>
            <div className="rounded-lg bg-white border border-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm flex items-center gap-1.5">
              <span>📐</span> Size: <span className="font-semibold text-gray-900">{field.acreage} Acres</span>
            </div>
          </div>
          </div>
        

        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-gray-100/80 pt-4">
          <Link href={`/fields/${field.id}`} className="inline-block">
            <Button className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors shadow-sm">
              View Field Metrics
            </Button>
          </Link>

          <Link href={`/fields/${field.id}/edit`} className="inline-block">
            <Button  className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
              Edit
            </Button>
          </Link>

          {role === "ADMIN" && (
             <div className="ml-auto">
            <DeleteFieldButton fieldId={field.id} onDelete={onDelete}/>
            </div>
          )}
        </div>
  
      </div>
    </div>
  );
}