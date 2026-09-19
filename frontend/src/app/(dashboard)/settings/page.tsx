"use client";

import { SecurityResponse } from "@/types/security";



export default function SecurityPage() {
  //data to be added

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Security</h1>
        <p className="text-gray-500">Monitor your account and farm security.</p>
      </div>

      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">🔐 Account Security</h2>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-500">Authentication</dt>
            <dd className="font-medium text-green-600">{data.account.authentication}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Role</dt>
            <dd className="font-medium">{data.account.role}</dd>
          </div>
        </dl>
      </section>

      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">🛡️ Access Control</h2>
        <ul className="space-y-2 text-sm">
          {Object.entries(data.permissions).map(([key, allowed]) => (
            <li key={key} className="flex items-center gap-2">
              <span className={allowed ? "text-green-600" : "text-red-500"}>
                {allowed ? "✓" : "✗"}
              </span>
              {permissionLabels[key as keyof SecurityResponse["permissions"]]}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">📋 Recent Security Activity</h2>
        {data.recentActivity.length === 0 ? (
          <p className="text-sm text-gray-500">No recent activity.</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {data.recentActivity.map((item, i) => (
              <li key={i} className="flex justify-between border-b pb-2">
                <span>{item.action} — {item.resource}</span>
                <span className="text-gray-400">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}