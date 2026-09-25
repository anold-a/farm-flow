"use client";

import Link from "next/link";

import { useAuth } from "@/hooks/useAuth";
import { useNotifications } from "@/hooks/useNotifications";
import { useAlerts } from "@/hooks/useAlerts";
import { usePathname } from "next/navigation";
import {  CloudSun, BarChart3,Siren, FileSpreadsheet  } from "lucide-react";

const icons = { 
  dashboard: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>,
  fields: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5"><path d="M3 12h18M3 6h18M3 18h18"/></svg>,
  users: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5"><circle cx="9" cy="7" r="4"/><path d="M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2M17 11l2 2 4-4"/></svg>,
  cropStages: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5"><path d="M4 19h16M4 15h10M4 11h6M4 7h3"/></svg>,
  analytics: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5"><path d="M3 3v18h18M7 15l4-4 4 4 5-5"/></svg>,
  alerts: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5"><path d="M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/></svg>,
  settings: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"/></svg>,
};


export default function Sidebar() {
  const {user} = useAuth();
  const role = user?.role ?? "AGENT";
  const {
  unreadCount,
} = useNotifications();

const { criticalCount } = useAlerts();
const pathname = usePathname();

const navigationLinks = [
    { href: "/dashboard", label: "Dashboard", icon: icons.dashboard },
    
    
    role === "ADMIN"
      ? { href: "/fields", label: "Fields", icon: icons.fields }
      : { href: "/my-fields", label: "My Fields", icon: icons.fields },

    { href: "/weather", label: "Weather", icon: <CloudSun className="h-5 w-5" />},
    { href: "/reports", label: "Reports", icon: <BarChart3 className="h-5 w-5" />},

    
    ...(role === "ADMIN" 
      ? [
          { href: "/users", label: "Users", icon: icons.users},
          { href: "/analytics", label: "Analytics", icon: icons.analytics },
          { href: "/audit-logs", label: "Audit Logs", icon: <FileSpreadsheet className="h-5 w-5" /> },
        ]
      : []
    ),
    { href: "/crop-stages", label: "Crop Stages", icon: icons.cropStages },
    { href: "/alerts", label: "Alerts", icon: <Siren className="h-5 w-5" />, badge: criticalCount },

    { href: "/settings", label: "Settings", icon:icons.settings},
  ];




function isActive(href: string) { 
    return pathname === href;
  }

  function linkClass(href: string) { 
    return `flex items-center gap-3 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
      isActive(href)
        ? "bg-emerald-500/15 text-emerald-400"
        : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
    }`;
  }
  return (
    <aside className="sticky top-0 self-start  w-64 shrink-0 border-r border-slate-800 bg-slate-900 p-6 flex flex-col justify-between overflow-y-auto">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-500 text-sm font-display text-slate-900">S</div>
        <span className="font-display text-lg text-slate-100">SmartSeason</span>
      </div>

      <nav className="mt-2 flex flex-col gap-4">
        {navigationLinks.map((item) => (
          <Link 
            key={item.href} 
            href={item.href} 
            className={linkClass(item.href)} 
            aria-current={isActive(item.href) ? "page" : undefined}
          >
            <span aria-hidden="true" className="flex items-center justify-center">{item.icon}</span>
            <span>{item.label}</span>
           
            {"badge" in item && item.badge !== undefined && item.badge > 0 && (
              <span className="ml-auto rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </nav>
    </aside>
  );
}