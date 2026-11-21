"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const tabs = [
  { label: "Profile", href: "/settings" },
  { label: "Security", href: "/settings/security" },
  { label: "Notifications", href: "/settings/notifications" },
];

export default function SettingsLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div>
      
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-display text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your account settings and preferences.</p>
      </div>

     
      <nav className="mt-6 flex gap-1 rounded-lg bg-gray-50 p-1">
        {tabs.map((tab) => {
          
          const active =
            tab.href === "/settings" ? pathname === "/settings" : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={active ? "page" : undefined}
              className={`flex-1 rounded-md px-4 py-2 text-center text-sm transition ${
                active
                  ? "border-b-2 border-gray-900 bg-white font-medium text-gray-900"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>

      
      <div className="mt-6 space-y-6">{children}</div>
    </div>
  );
}