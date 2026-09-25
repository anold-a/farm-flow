import { useFieldOverview } from "@/hooks/useFieldOverview";
import FieldOverviewCard from "./FieldOverviewCard";

export default function FieldOverviewGrid() {
  const { overview, loading, error } = useFieldOverview();

  if (loading) return <p className="text-slate-500">Loading field overview...</p>;
  if (error) return <p className="text-red-400">{error}</p>;

  return (
    <div>
      <h2 className="mb-4 text-sm font-medium text-slate-400">Field Overview</h2>
      <div className="grid grid-cols-2 gap-4">
        {overview.map((item) => (
          <FieldOverviewCard key={item.field.id} item={item} />
        ))}
      </div>
    </div>
  );
}