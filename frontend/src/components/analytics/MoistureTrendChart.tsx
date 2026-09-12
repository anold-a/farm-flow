"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { MoistureTrendPoint } from "@/types/analytics";

interface Props {
  data: MoistureTrendPoint[];
}

export default function MoistureTrendChart({ data }: Props) {
  if (data.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-8 text-center text-gray-500">
        Not enough recent field updates to show a trend.
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">Moisture &amp; Temperature Trend</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="moisture" stroke="#16a34a" name="Moisture (%)" connectNulls />
          <Line type="monotone" dataKey="temperature" stroke="#dc2626" name="Temperature (°C)" connectNulls />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}