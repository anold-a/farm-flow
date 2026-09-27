import { FieldOverview } from "@/hooks/useFieldOverview";

const cardTint: Record<string, string> = { 
  Healthy: "border-emerald-500/30 bg-emerald-500/10",
  "Needs Attention": "border-amber-500/30 bg-amber-500/10",
  Critical: "border-red-500/30 bg-red-500/10",
  Harvested: "border-slate-700 bg-slate-800/50",
};

export default function FieldOverviewCard({ item }: { item: FieldOverview }) {
  const tint = cardTint[item.field.status] ?? cardTint.Harvested;

  return (
    <div className={`rounded-xl border p-4 ${tint}`}>
      <div className="flex items-center justify-between">
        <p className="font-display text-slate-100">{item.field.name}</p>
        <span className="text-xs text-slate-400">{item.crop?.actualGrowthStage.replace("_", " ") ?? "No crop"}</span>
      </div>

      <p className="mt-1 text-xs text-slate-500">{item.crop?.name ?? "—"}</p>

      <div className="mt-4 flex gap-4 text-sm">
        <div>
          <p className="text-xs text-slate-500">Moisture</p>
          <p className="font-display text-lg text-slate-100">{item.latestUpdate?.moisture ?? "—"}%</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Temp</p>
          <p className="font-display text-lg text-slate-100">{item.latestUpdate?.temperature ?? "—"}°C</p>
        </div>
      </div>
    </div>
  );
}