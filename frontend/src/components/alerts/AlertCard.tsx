"use client";

import { Alert } from "@/types/alert";

interface Props {
  alert: Alert;
  onResolve: (id: string) => void;
}

const severityStyles: Record<string, string> = {
  CRITICAL: "border-red-300 bg-red-50 text-red-700",
  WARNING: "border-yellow-300 bg-yellow-50 text-yellow-700",
  INFO: "border-blue-300 bg-blue-50 text-blue-700",
};

export default function AlertCard({ alert, onResolve }: Props) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        severityStyles[alert.severity]
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-semibold">
            {alert.severity}
          </p>

          <p className="mt-1">
            {alert.message}
          </p>

          {alert.field?.name && (
            <p className="mt-1 text-sm opacity-70">
              Field: {alert.field.name}
            </p>
          )}
        </div>

        {!alert.resolved && (
          <button
            type="button"
            onClick={() => onResolve(alert.id)}
            className="rounded-lg border border-current px-3 py-1 text-sm font-medium hover:bg-white/50"
          >
            Resolve
          </button>
        )}
      </div>
    </div>
  );
}