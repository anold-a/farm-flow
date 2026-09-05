"use client";

import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";
import DashboardStats from "@/components/dashboard/DashboardStats";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentUpdates from "@/components/dashboard/RecentUpdates";
import WeatherOverview from "@/components/dashboard/WeatherOverview";
import WelcomeBanner from "@/components/dashboard/WelcomeBanner";
import { useAuth } from "@/hooks/useAuth";

import { useDashboard } from "@/hooks/useDashboard";
import { useWeather } from "@/hooks/useWeather";

export default function DashboardPage() {
  const {
    dashboard,
    loading: dashboardLoading,
    error: dashboardError,
  } = useDashboard();

  const {
    fieldWeatherList,
    loading: weatherLoading,
    error: weatherError,
  } = useWeather();

  const { user } = useAuth(); 
  
  const role = user?.role ?? "AGENT";

  if (dashboardLoading || weatherLoading) {
    return <DashboardSkeleton />;
  }

  if (dashboardError) {
    return (
      <div className="rounded-lg bg-red-100 p-4 text-red-700">
        {dashboardError}
      </div>
    );
  }

  if (weatherError) {
    return (
      <div className="rounded-lg bg-red-100 p-4 text-red-700">
        {weatherError}
      </div>
    );
  }

   const firstFieldWeather = fieldWeatherList[0]?.weather;

  if (!dashboard) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center">
        Dashboard information is unavailable.
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <WelcomeBanner />

      <DashboardStats
        statistics={dashboard.stats}
        role={role}
      />

      <div className="grid gap-8 lg:grid-cols-2">

        {firstFieldWeather ? ( 
          <WeatherOverview
            temperature={firstFieldWeather.current.temperature}
            humidity={firstFieldWeather.current.humidity}
            condition={firstFieldWeather.current.condition}
          />
        ) : (
          <div className="rounded-xl border border-dashed p-6 text-center text-gray-500">
            No fields available for a weather summary.
          </div>
        )}

        <RecentUpdates
          activities={dashboard.activities}
        />

      </div>

      <QuickActions role={role} />

    </div>
  );
}