"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useAnalytics } from "@/hooks/useAnalytics";

export default function FieldPerformanceChart() {
  const { analytics } = useAnalytics();
  const data = analytics?.moistureTrend ?? [];
  if (data.length === 0) return null;

  return (
    <div className=" p-6">
      <h2 className="text-sm font-medium text-slate-400">Field Performance — Moisture Levels</h2>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          <XAxis dataKey="day" stroke="#64748b" fontSize={11} /> 
          <YAxis stroke="#64748b" fontSize={11} />
          <Tooltip contentStyle={{ background: "#1e293b",  color: "#e2e8f0" }} /> 
          <Line type="monotone" dataKey="moisture" stroke="#34d399" strokeWidth={2} dot={false} /> 
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}