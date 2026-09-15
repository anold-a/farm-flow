"use client";

import RoleGuard from "@/components/auth/RoleGuard";
import { useAuditLogs } from "@/hooks/useAuditLogs";

export default function AuditLogsPage() {
  const { logs, loading, error } = useAuditLogs();

  if (loading) return <p>Loading audit logs...</p>;
  if (error) return <div className="rounded-lg bg-red-100 p-4 text-red-700">{error}</div>;

  return (
    <RoleGuard allowedRoles={["ADMIN"]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Audit Logs</h1>
          <p className="text-gray-500">A record of important actions taken in SmartSeason.</p>
        </div>

        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50 text-left">
                <th className="p-3">User</th>
                <th className="p-3">Action</th>
                <th className="p-3">Resource</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-b">
                  <td className="p-3">{log.user.fullName}</td>
                  <td className="p-3">{log.action}</td>
                  <td className="p-3">{log.resource}</td>
                  <td className="p-3 text-gray-500">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </RoleGuard>
  );
}