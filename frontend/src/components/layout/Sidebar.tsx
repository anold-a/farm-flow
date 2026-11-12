"use client";


import type { ReactNode } from "react";
import Link from "next/link";

import { useAuth } from "@/hooks/useAuth";
import { useNotifications } from "@/hooks/useNotifications";
import { useAlerts } from "@/hooks/useAlerts";
import { usePathname } from "next/navigation";

import {
  FiGrid,
  FiMap,
  FiCloud,
  FiLayers,
  FiAlertTriangle,
  FiFileText,
  FiUsers,
  FiBarChart2,
  FiClipboard,
  FiSettings,
  
  FiExternalLink,
} from "react-icons/fi";

type NavItem = { href: string; label: string; icon: ReactNode; badge?: number };
type NavSection = { title: string; items: NavItem[] };

export default function Sidebar() {
  const { user } = useAuth();
  const role = user?.role ?? "AGENT";
  const { unreadCount } = useNotifications();

  const { criticalCount } = useAlerts();
  const pathname = usePathname();



  const sections: NavSection[] = [
    {
      title: "Overview",
      items: [
        { href: "/dashboard", label: "Dashboard", icon: <FiGrid className="h-4 w-4" /> },
        role === "ADMIN"
          ? { href: "/fields", label: "Fields", icon: <FiMap className="h-4 w-4" /> }
          : { href: "/my-fields", label: "My Fields", icon: <FiMap className="h-4 w-4" /> },
        { href: "/weather", label: "Weather", icon: <FiCloud className="h-4 w-4" /> },
      ],
    },
    {
      title: "Monitoring",
      items: [
        { href: "/crop-stages", label: "Crop Stages", icon: <FiLayers className="h-4 w-4" /> },
        { href: "/alerts", label: "Alerts", icon: <FiAlertTriangle className="h-4 w-4" />, badge: criticalCount },
        { href: "/reports", label: "Reports", icon: <FiFileText className="h-4 w-4" /> },
      ],
    },
    ...(role === "ADMIN"
      ? [
          {
            title: "Admin",
            items: [
              { href: "/users", label: "Users", icon: <FiUsers className="h-4 w-4" /> },
              { href: "/analytics", label: "Analytics", icon: <FiBarChart2 className="h-4 w-4" /> },
              { href: "/audit-logs", label: "Audit Logs", icon: <FiClipboard className="h-4 w-4" /> },
            ],
          },
        ]
      : []),
    {
      title: "Account",
      items: [{ href: "/settings", label: "Settings", icon: <FiSettings className="h-4 w-4" /> }],
    },
  ];

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/");
  }

 

  const initial = (user?.fullName ?? "U").charAt(0).toUpperCase();

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col border-r border-gray-200 bg-[#FAF7F0]">
     
      <div className="flex items-center gap-3 px-5 pb-2 pt-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-sm font-semibold text-white">
          {initial}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-gray-900">{user?.fullName ?? "SmartSeason"}</p>
          <p className="truncate text-[11px] text-gray-500">{user?.email}</p>
        </div>
      </div>

      

      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        
        {sections.map((section) => (
          <div key={section.title} className="mt-4">
            <p className="px-3 pb-1 text-[11px] font-medium text-gray-400">{section.title}</p>

            {section.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive(item.href)
                    ? "bg-white font-medium text-gray-900 shadow-sm"
                    : "text-gray-600 hover:bg-black/5"
                }`}
              >
                <span aria-hidden="true" className="flex items-center justify-center">{item.icon}</span>
                <span>{item.label}</span>

                {item.badge !== undefined && item.badge > 0 && (
                  <span className="ml-auto rounded-md bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      <div className="p-4">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-gray-800 shadow-sm transition hover:bg-gray-50"
        >
          Visit site
          <FiExternalLink className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    </aside>
  );
}