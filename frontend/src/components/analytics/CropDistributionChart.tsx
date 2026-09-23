"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { CropDistributionItem } from "@/types/analytics";
import Card from "@/components/ui/Card";

interface Props {
  data: CropDistributionItem[];
}

const COLORS = ["#059669", "#10b981", "#34d399", "#d97706", "#f59e0b", "#6b7280"];

export default function CropDistributionChart({ data }: Props) {
  if (data.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
        No active crops to display.
      </div>
    );
  }

  return (
    <Card>
      <h2 className="mb-4 text-xl font-display text-gray-900">Crop Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey="count" nameKey="crop" cx="50%" cy="50%" outerRadius={100} label>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}