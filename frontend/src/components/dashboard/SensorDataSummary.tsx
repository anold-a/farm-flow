import { FieldOverview } from "@/hooks/useFieldOverview";

export default function SensorDataSummary({ overview }: { overview: FieldOverview[] }) {
  const readings = overview.map((o) => o.latestUpdate).filter((u): u is NonNullable<typeof u> => !!u);
  const avg = (values: number[]) => (values.length ? Math.round(values.reduce((a, b) => a + b, 0) / values.length) : null);

  const stats = [
    { label: "Temp", value: avg(readings.map((r) => r.temperature).filter((v): v is number => v !== null)), unit: "°C" },
    { label: "Humidity", value: avg(readings.map((r) => r.humidity).filter((v): v is number => v !== null)), unit: "%" },
    { label: "Soil Moisture", value: avg(readings.map((r) => r.moisture).filter((v): v is number => v !== null)), unit: "%" },
  ];

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-sm font-medium text-slate-400">Sensor Data Summary</h2>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg bg-slate-800/50 p-3 text-center">
            <p className="font-display text-lg text-emerald-400">{s.value ?? "—"}{s.unit}</p>
            <p className="mt-1 text-xs text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}