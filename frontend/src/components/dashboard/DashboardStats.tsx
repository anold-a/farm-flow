import DashboardCard from "./DashboardCard";

import { DashboardStats } from "@/types/dashboard";

interface Props {
  statistics: DashboardStats;
  role: "ADMIN" | "AGENT";
}

export default function DashboardStats({
  statistics,
  role,
}: Props) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

      {role === "ADMIN" && ( 
        <DashboardCard title="Users" value={statistics.totalUsers} />
      )}

       {role === "ADMIN" && (
        <DashboardCard title="Agents" value={statistics.totalAgents} />
      )}

      <DashboardCard
        title="Fields"
        value={statistics.totalFields}
      />

      <DashboardCard
        title="Completed Fields"
        value={statistics.completedFields}
      />

      <DashboardCard
        title="Active Fields"
        value={statistics.activeFields}
      />

      

      <DashboardCard 
        title="Field Updates"
        value={statistics.totalFieldUpdates}
      />

    </div>
  );
}