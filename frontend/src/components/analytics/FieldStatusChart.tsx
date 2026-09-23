"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { FieldStatusBreakdown } from "@/types/analytics";
import Card from "@/components/ui/Card";

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
    <Card>
      <h2 className="mb-4 text-xl font-display text-gray-900">Field Status</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb"  />
          <XAxis dataKey="status" stroke="#6b7280"  />
          <YAxis allowDecimals={false} stroke="#6b7280"  />
          <Tooltip />
          <Bar dataKey="count" fill="#059669"/>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}