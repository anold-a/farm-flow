"use client";

import DashboardCard from "@/components/dashboard/DashboardCard";
import { useAnalytics } from "@/hooks/useAnalytics";

export default function AnalyticsPage() {
  const { analytics, loading, error } = useAnalytics();

  if (loading) {
    return <p>Loading analytics...</p>;
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-100 p-4 text-red-700">{error}</div>
    );
  }

  if (!analytics) {
    return <div>No analytics available.</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-gray-500">Farm and field performance overview.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardCard title="Total Fields" value={analytics.fieldStats.totalFields} />
        <DashboardCard title="Active Fields" value={analytics.fieldStats.activeFields} />
        <DashboardCard title="Completed Fields" value={analytics.fieldStats.completedFields} />
        <DashboardCard title="Total Acreage" value={analytics.fieldStats.totalAcreage} />
        {analytics.fieldStats.updatesSubmitted !== undefined && (
          <DashboardCard title="Updates Submitted" value={analytics.fieldStats.updatesSubmitted} />
        )}
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Crop Distribution</h2>
        <ul className="space-y-2">
          {analytics.cropDistribution.map((item) => (
            <li key={item.crop} className="flex justify-between border-b pb-2">
              <span>{item.crop}</span>
              <span className="font-semibold">{item.count}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Field Updates (last 4 weeks)</h2>
        <ul className="space-y-2">
          {analytics.updateTrends.map((item) => (
            <li key={item.weekLabel} className="flex justify-between border-b pb-2">
              <span>{item.weekLabel}</span>
              <span className="font-semibold">{item.count}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Crop Growth Stages</h2>
        <ul className="space-y-2">
          <li className="flex justify-between border-b pb-2"><span>Planted</span><span>{analytics.growthStageDistribution.planted}</span></li>
          <li className="flex justify-between border-b pb-2"><span>Germination</span><span>{analytics.growthStageDistribution.germination}</span></li>
          <li className="flex justify-between border-b pb-2"><span>Vegetative</span><span>{analytics.growthStageDistribution.vegetative}</span></li>
          <li className="flex justify-between border-b pb-2"><span>Flowering</span><span>{analytics.growthStageDistribution.flowering}</span></li>
          <li className="flex justify-between border-b pb-2"><span>Fruiting</span><span>{analytics.growthStageDistribution.fruiting}</span></li>
          <li className="flex justify-between border-b pb-2"><span>Harvest Ready</span><span>{analytics.growthStageDistribution.harvestReady}</span></li>
        </ul>
      </div>

      {analytics.agentPerformance && (
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Agent Performance</h2>
          <ul className="space-y-3">
            {analytics.agentPerformance.map((agent) => (
              <li key={agent.id} className="border-b pb-3">
                <p className="font-semibold">{agent.fullName}</p>
                <p className="text-sm text-gray-500">
                  Assigned Fields: {agent.assignedFields} · Updates: {agent.updatesSubmitted}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}