"use client";

import DashboardCard from "@/components/dashboard/DashboardCard";
import { useAnalytics } from "@/hooks/useAnalytics";
import Card from "@/components/ui/Card";

import MoistureTrendChart from "@/components/analytics/MoistureTrendChart";
import CropDistributionChart from "@/components/analytics/CropDistributionChart";
import FieldStatusChart from "@/components/analytics/FieldStatusChart";

export default function AnalyticsPage() {
  const { analytics, loading, error } = useAnalytics();

  if (loading) {
    return <p className="text-gray-500">Loading analytics...</p>;
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-100 p-4 text-red-700">{error}</div>
    );
  }

  if (!analytics) {
    return <div className="text-gray-500">No analytics available.</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">Farm and field performance overview.</p>
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
      <MoistureTrendChart data={analytics.moistureTrend} />
      
      <div className="grid gap-6 md:grid-cols-2">
  <CropDistributionChart data={analytics.cropDistribution} />
  <FieldStatusChart data={analytics.fieldStatusBreakdown} />
</div>
      

      <Card>
        <h2 className="mb-4 text-xl font-display text-gray-900">Field Updates (last 4 weeks)</h2>
        <ul className="space-y-2">
          {analytics.updateTrends.map((item) => (
            <li key={item.weekLabel} className="flex justify-between border-b  border-gray-100 pb-2 text-gray-700">
              <span>{item.weekLabel}</span>
              <span className="font-medium text-gray-900">{item.count}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card >
        <h2 className="mb-4 font-display text-xl text-gray-900">Crop Growth Stages</h2>
        <ul className="space-y-2">
          <li className="flex justify-between border-b pb-2"><span>Planted</span><span className="font-medium text-gray-900">{analytics.growthStageDistribution.planted}</span></li>
          <li className="flex justify-between border-b pb-2"><span>Germination</span><span className="font-medium text-gray-900">{analytics.growthStageDistribution.germination}</span></li>
          <li className="flex justify-between border-b pb-2"><span>Vegetative</span><span className="font-medium text-gray-900">{analytics.growthStageDistribution.vegetative}</span></li>
          <li className="flex justify-between border-b pb-2"><span>Flowering</span><span className="font-medium text-gray-900">{analytics.growthStageDistribution.flowering}</span></li>
          <li className="flex justify-between border-b pb-2"><span>Fruiting</span><span className="font-medium text-gray-900">{analytics.growthStageDistribution.fruiting}</span></li>
          <li className="flex justify-between  pb-2"><span>Harvest Ready</span><span className="font-medium text-gray-900">{analytics.growthStageDistribution.harvestReady}</span></li>
        </ul>
      </Card>

      {analytics.agentPerformance && (
        <Card> 
          <h2 className="mb-4 font-display text-xl text-gray-900">Agent Performance</h2> 
          <ul className="space-y-3">
            {analytics.agentPerformance.map((agent) => (
              <li key={agent.id} className="border-b border-gray-100 pb-3 last:border-b-0"> 
                <p className="font-medium text-gray-900">{agent.fullName}</p> 
                <p className="text-sm text-gray-500">
                  Assigned Fields: {agent.assignedFields} · Updates: {agent.updatesSubmitted}
                </p>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}