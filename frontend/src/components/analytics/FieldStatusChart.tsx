"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { FieldStatusBreakdown } from "@/types/analytics";

interface Props {
  data: FieldStatusBreakdown;
}

export default function FieldStatusChart({ data }: Props) {
  const chartData = [
    { status: "Active", count: data.active },
    { status: "Completed", count: data.completed },
    { status: "Needs Care", count: data.needsCare },
  ];

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">Field Status</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="status" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#16a34a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}