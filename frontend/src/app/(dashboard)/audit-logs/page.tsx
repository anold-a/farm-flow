"use client";

import { useState } from "react";
import RoleGuard from "@/components/auth/RoleGuard";
import { useAuditLogs } from "@/hooks/useAuditLogs";


const actionColors: Record<string, string> = {
  CREATE: "text-emerald-700",
  UPDATE: "text-indigo-600",
  PUBLISH: "text-emerald-700",
  UNPUBLISH: "text-orange-600",
  DELETE: "text-red-600",
};

const initials = (name: string) =>
  name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

export default function AuditLogsPage() {
  const { logs, loading, error } = useAuditLogs();

   const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  if (loading) return <p>Loading audit logs...</p>;
  if (error) return <div className="rounded-lg bg-red-100 p-4 text-red-700">{error}</div>;

    const filtered = (logs ?? []).filter((log) =>
    `${log.user.fullName} ${log.action} ${log.resource}`
      .toLowerCase()
      .includes(filter.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageLogs = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <RoleGuard allowedRoles={["ADMIN"]}>
      <div className="space-y-6">
        <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-display text-gray-900">Audit Logs</h1>
        <p className="text-gray-500 text-sm mt-1">A record of important actions taken in SmartSeason.</p>
      </div>
        



        <div className="overflow-x-auto  rounded-sm border border-gray-200 bg-[#FAF7F0] shadow-sm">
           <div className="p-3">
            <input
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setPage(1); 
              }}
              placeholder="Filter"
              className="w-full max-w-xs rounded-md border border-gray-200 px-3 py-2 text-xs text-neutral-950 outline-none focus:border-indigo-400"
            />
          </div>
         <div className="overflow-x-auto">
            <table className="w-full text-xs">
              
              <thead>
                <tr className="border-y border-gray-200 bg-white text-left font-normal text-gray-500">
                  <th className="px-4 py-2.5 font-normal">User</th>
                  <th className="px-4 py-2.5 font-normal">Entity ID</th> 
                  <th className="px-4 py-2.5 font-normal">Action</th>
                  <th className="px-4 py-2.5 font-normal">Type</th> 
                  <th className="px-4 py-2.5 font-normal">Timestamp</th> 
                </tr>
              </thead>
              <tbody>
                {pageLogs.map((log) => (
                 
                  <tr key={log.id} className="group border-b border-gray-100 hover:bg-black/5">
                    
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 text-[10px] font-medium text-gray-600">
                          {initials(log.user.fullName)} 
                        </span>
                        <div>
                          <p className="font-medium text-gray-900">{log.user.fullName}</p>
                          
                          <p className="text-[11px] capitalize text-gray-400">
                            {log.user.role?.toLowerCase()}
                          </p>
                        </div>
                      </div>
                    </td>

                    
                    <td className="px-4 py-3">
                      <span className="rounded bg-gray-100 px-2 py-0.5 font-mono text-[11px] text-gray-500">
                        {String(log.id).slice(0, 8)}…
                      </span>
                    </td>

                    
                    <td className="px-4 py-3">
                      <span
                        className={`text-[11px] font-semibold uppercase tracking-wide ${
                          actionColors[log.action.toUpperCase()] ?? "text-gray-600"
                        }`}
                      >
                        {log.action}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-gray-700">{log.resource}</td>

                    
                    <td className="px-4 py-3">
                      <div className="group-hover:hidden">
                        <p className="text-gray-700">
                          {new Date(log.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                        <p className="text-[11px] text-gray-400">
                          {new Date(log.createdAt).toLocaleTimeString("en-GB", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      
                      <button className="hidden text-indigo-600 group-hover:block">View detail</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

         
          <div className="flex items-center justify-between px-4 py-3 text-xs text-gray-500">
            <span>{filtered.length} items</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="text-indigo-600 disabled:text-indigo-300"
              >
                Previous
              </button>
              <span>
                Page <span className="mx-1 rounded border border-gray-200 px-2 py-1">{page}</span> of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="text-indigo-600 disabled:text-indigo-300"
              >
                Next
              </button>
            </div>
            <label className="flex items-center gap-2">
              Show
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPage(1); 
                }}
                className="rounded border border-gray-200 px-2 py-1"
              >
                {[10, 25, 50].map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
            </label>
          </div>

        </div>
      </div>
    </RoleGuard>
  );
}