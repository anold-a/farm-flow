"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function DashboardShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();


  useEffect(() => setMenuOpen(false), [pathname]);


  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <div className="min-h-screen bg-emerald-50">
      
      <div className="fixed inset-y-0 left-0 z-40 hidden w-64 md:block">
        <Sidebar />
      </div>

      
      {menuOpen && (
        <div className="fixed inset-0 z-70 md:hidden">
          <div className="absolute inset-0 bg-slate-900/40" onClick={() => setMenuOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-64 shadow-xl">
            <Sidebar />
          </div>
        </div>
      )}

      <div className="min-w-0 md:pl-64">
        <Navbar onMenuClick={() => setMenuOpen(true)} />
        <main className="mt-14 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}