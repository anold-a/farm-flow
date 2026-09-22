"use client";

import Link from "next/link";
import Logo from "./Logo";
import { useAuth } from "@/hooks/useAuth";
import { useNotifications } from "@/hooks/useNotifications";
import { useAlerts } from "@/hooks/useAlerts";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CloudSun, BarChart3, Settings,Sprout, Users, LineChart, FileSpreadsheet, Bell, Siren  } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/weather", label: "Weather", icon: CloudSun},
  { href: "/reports", label: "Reports", icon: BarChart3},
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const {user} = useAuth();
  const role = user?.role ?? "AGENT";
  const {
  unreadCount,
} = useNotifications();

const { criticalCount } = useAlerts();
const pathname = usePathname();

const fieldsLink =
  role === "ADMIN"
    ? { href: "/fields", label: "Fields", icon: Sprout }
    : { href: "/my-fields", label: "My Fields", icon: Sprout };


const adminLinks = [
  { href: "/users", label: "Users", icon: Users },
  { href: "/analytics", label: "Analytics", icon: LineChart },
  { href: "/audit-logs", label: "Audit Logs", icon: FileSpreadsheet },
];

const FieldsIcon = fieldsLink.icon;


function isActive(href: string) { 
    return pathname === href;
  }

  function linkClass(href: string) { 
    return `flex items-center gap-3 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
      isActive(href)
        ? "bg-emerald-600 text-white"
        : "text-gray-700 hover:bg-emerald-50"
    }`;
  }
  return (
    <aside className="w-64 rounded-2xl border border-gray-200 bg-white p-6">
      <Logo />

      <nav className="mt-8 flex flex-col gap-4">
        {navItems.slice(0, 1).map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className={linkClass(item.href)}>
              <span aria-hidden><Icon className="w-5 h-5" /></span>
              {item.label}
            </Link>
          );
        })}

        <Link href={fieldsLink.href} className={linkClass(fieldsLink.href)}>
          <span aria-hidden><FieldsIcon className="w-5 h-5" /></span>
          {fieldsLink.label}
        </Link>

        {navItems.slice(1).map((item) => { 
          const Icon = item.icon;
          return(
          <Link key={item.href} href={item.href} className={linkClass(item.href)}>
            <span aria-hidden><Icon className="w-5 h-5" /></span>
            {item.label}
          </Link>
          );
          })}

        {role === "ADMIN" &&
          adminLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className={linkClass(item.href)}>
                <span aria-hidden><Icon className="w-5 h-5" /></span>
                {item.label}
              </Link>
            );
          })}

        <Link href="/notifications" className={linkClass("/notifications")}>
          <span aria-hidden>
            <Bell className="w-5 h-5" />
          </span>
          Notifications
          {unreadCount > 0 && (
            <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs font-bold text-white">
              {unreadCount}
            </span>
          )}
        </Link>

        <Link href="/alerts" className={linkClass("/alerts")}>
          <span aria-hidden>
            <Siren className="w-5 h-5" />
          </span>
          Alerts
          {criticalCount > 0 && (
            <span className="ml-auto rounded-full bg-red-600 px-2 py-0.5 text-xs font-bold text-white">
              {criticalCount}
            </span>
          )}
        </Link>
      </nav>
    </aside>
  );
}