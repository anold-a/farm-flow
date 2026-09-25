import { FieldOverview } from "@/hooks/useFieldOverview";

const statusColor: Record<string, string> = {
  Healthy: "bg-emerald-500/70",
  "Needs Attention": "bg-amber-500/70",
  Critical: "bg-red-500/70",
  Harvested: "bg-slate-700",
};

export default function FieldPlotMap({ overview }: { overview: FieldOverview[] }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-sm font-medium text-slate-400">Field Overview Map</h2>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {overview.map((item) => (
          <div
            key={item.field.id}
            className={`flex h-20 flex-col justify-end rounded-lg p-2 ${statusColor[item.field.status] ?? statusColor.Harvested}`}
          >
            <p className="truncate text-xs font-medium text-slate-950">{item.field.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}