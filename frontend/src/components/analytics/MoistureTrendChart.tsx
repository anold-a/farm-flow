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
import Card from "@/components/ui/Card";

interface Props {
  data: MoistureTrendPoint[];
}

export default function MoistureTrendChart({ data }: Props) {
  if (data.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
        Not enough recent field updates to show a trend.
      </div>
    );
  }

  return (
    < Card>
  
      <h2 className="mb-4 text-xl font-display text-gray-900">Moisture &amp; Temperature Trend</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="day" stroke="#6b7280" />
          <YAxis stroke="#6b7280"/>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="moisture" stroke="#059669" name="Moisture (%)" connectNulls />
          <Line type="monotone" dataKey="temperature" stroke="#d97706" name="Temperature (°C)" connectNulls />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}