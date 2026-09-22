"use client";

import { SecurityResponse } from "@/types/security";
import { useSecurity } from "@/hooks/useSecurity";
import Card from "@/components/ui/Card";


const permissionLabels: Record<keyof SecurityResponse["permissions"], string> = {
  manageUsers: "Manage users",
  manageFields: "Manage fields",
  viewReports: "View reports",
  viewAuditLogs: "View audit logs",
  manageAssignedFields: "Manage assigned fields",
};


export default function SecurityPage() {

  const { data, loading, error } = useSecurity();

   if (loading) return <p>Loading security overview...</p>;
  if (error) return <div className="rounded-lg bg-red-100 p-4 text-red-700">{error}</div>;
  if (!data) return <div>No security data available.</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display text-gray-900">Security</h1>
        <p className="text-gray-600 mt-1">Monitor your account and farm security.</p>
      </div>

      <Card >
        <h2 className="mb-4 text-xl font-display text-gray-900">🔐 Account Security</h2>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-500">Authentication</dt>
            <dd className="font-medium text-emerald-600">{data.account.authentication}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Role</dt>
            <dd className="font-medium text-gray-900">{data.account.role}</dd>
          </div>
        </dl>
      </Card>

      <Card>
        <h2 className="mb-4 text-xl font-display  text-gray-900">🛡️ Access Control</h2>
        <ul className="space-y-2 text-sm">
          {Object.entries(data.permissions).map(([key, allowed]) => (
            <li key={key} className="flex items-center gap-2 text-gray-700">
              <span className={allowed ? "text-emerald-500" : "text-red-500"}>
                {allowed ? "✓" : "✗"}
              </span>
              {permissionLabels[key as keyof SecurityResponse["permissions"]]}
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <h2 className="mb-4 text-xl font-display text-gray-900">📋 Recent Security Activity</h2>
        {data.recentActivity.length === 0 ? (
          <p className="text-sm text-gray-500">No recent activity.</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {data.recentActivity.map((item, i) => (
              <li key={i} className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-700">{item.action} — {item.resource}</span>
                <span className="text-gray-400">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}