import { useFieldOverview } from "@/hooks/useFieldOverview";
import FieldOverviewCard from "./FieldOverviewCard";

export default function FieldOverviewGrid() {
  const { overview, loading, error } = useFieldOverview();

  if (loading) return <p className="text-slate-500">Loading field overview...</p>;
  if (error) return <p className="text-red-400">{error}</p>;

  return (
    <section>
      <h2 className="mb-3 text-[13px] text-neutral-700">Field Overview</h2>
      <div className="rounded-sm bg-[#F8F7F4] p-3 shadow-sm">
        {loading && <p className="px-3 py-2 text-sm text-neutral-500">Loading field overview...</p>}
        {error && <p className="px-3 py-2 text-sm text-red-600">{error}</p>}
        {!loading && !error && overview.length === 0 && (
          <p className="px-3 py-2 text-sm text-neutral-500">No fields registered yet.</p>
        )}

        <ul className="space-y-1">
          {overview.map((item) => (
            <FieldOverviewCard key={item.field.id} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
}