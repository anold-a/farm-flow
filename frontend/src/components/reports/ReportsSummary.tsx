import ReportCard from "./ReportCard";
import { ReportStatistics } from "@/types/reports";

interface Props {
  statistics: ReportStatistics;
  role: "ADMIN" | "AGENT";
}

export default function ReportsSummary({ statistics, role }: Props) {
  return (
    
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <ReportCard
        title="Total Fields"
        value={statistics.totalFields}
      />

      <ReportCard
        title="Healthy Fields"
        value={statistics.healthyFields}
      />

      <ReportCard
        title="Harvested Fields"
        value={statistics.harvestedFields}
      />

      {role === "ADMIN" && (
        
        <ReportCard
          title="Critical Fields"
          value={statistics.criticalFields}
        />
      )}
    </div>
  );
}
