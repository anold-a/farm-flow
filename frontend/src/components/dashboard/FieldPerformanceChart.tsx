"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useAnalytics } from "@/hooks/useAnalytics";

export default function FieldPerformanceChart() {
  const { analytics } = useAnalytics();
  if (!analytics) return null;

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-sm font-medium text-slate-400">Field Performance — Moisture Levels</h2>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={analytics.moistureTrend}>
          <XAxis dataKey="day" stroke="#64748b" fontSize={11} /> 
          <YAxis stroke="#64748b" fontSize={11} />
          <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", color: "#e2e8f0" }} /> 
          <Line type="monotone" dataKey="moisture" stroke="#34d399" strokeWidth={2} dot={false} /> 
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}