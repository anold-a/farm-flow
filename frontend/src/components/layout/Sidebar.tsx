"use client";

import Link from "next/link";
import Logo from "./Logo";
import { useAuth } from "@/hooks/useAuth";
import { useNotifications } from "@/hooks/useNotifications";
import { useAlerts } from "@/hooks/useAlerts";

export default function Sidebar() {
  const {user} = useAuth();
  const role = user?.role ?? "AGENT";
  const {
  unreadCount,
} = useNotifications();

const { criticalCount } = useAlerts();
  return (
    <aside className="w-64 border-r bg-white p-6">
      <Logo />

      <nav className="mt-8 flex text-black flex-col gap-4">
        <Link href="/dashboard">Dashboard</Link>
        {role === "ADMIN" ? (
          <Link href="/fields">Fields</Link>
        ) : (
          <Link href="/my-fields">My Fields</Link>
        )}
        <Link href="/weather">Weather</Link>
        <Link href="/reports">Reports</Link>
        {role === "ADMIN" && ( 
          <Link href="/users">Users</Link>
        )}
        {role === "ADMIN" && ( 
          <Link href="/analytics">Analytics</Link>
        )}
        {role === "ADMIN" && ( 
          <Link href="/audit-logs">Audit Logs</Link>
        )}
        <Link href="/notifications" className="relative">
  <span className="text-xl">
    🔔
  </span>

  {unreadCount > 0 && (
    <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs font-bold text-white">
      {unreadCount}
    </span>
  )}
</Link>
<Link href="/alerts" className="relative">
  🚨 Alerts
  {criticalCount > 0 && (
    <span className="ml-2 rounded-full bg-red-600 px-2 py-0.5 text-xs font-bold text-white">
      {criticalCount}
    </span>
  )}
</Link>
        <Link href="/settings">Settings</Link>
      </nav>
    </aside>
  );
}