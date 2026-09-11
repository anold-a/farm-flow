import { Alert } from "@/types/alert";
import Button from "@/components/ui/Button";

interface Props {
  alert: Alert;
  onResolve: (id: string) => void;
}

const severityStyles: Record<string, string> = {
  CRITICAL: "border-red-400 bg-red-50 text-red-800",
  WARNING: "border-yellow-400 bg-yellow-50 text-yellow-800",
  INFO: "border-blue-300 bg-blue-50 text-blue-800",
};

const severityIcon: Record<string, string> = {
  CRITICAL: "🔴",
  WARNING: "🟡",
  INFO: "🔵",
};

export default function AlertCard({ alert, onResolve }: Props) {
  return (
    <div className={`rounded-lg border p-4 ${severityStyles[alert.severity]}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-semibold">
            {severityIcon[alert.severity]} {alert.field?.name ?? "Field"}
          </p>
          <p className="mt-1 text-sm">{alert.message}</p>
          <p className="mt-2 text-xs opacity-70">
            {new Date(alert.createdAt).toLocaleString()}
          </p>
        </div>

        <Button type="button" onClick={() => onResolve(alert.id)}>
          Resolve
        </Button>
      </div>
    </div>
  );
}