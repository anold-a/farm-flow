"use client"

import UserMenu from "./UserMenu";
import { useAuth } from "@/hooks/useAuth";
import { useNotifications } from "@/hooks/useNotifications";
import Link from "next/link";

export default function Navbar() {
  const {user} = useAuth();
   const { unreadCount } = useNotifications();
  return (
    <header className="flex items-center justify-between p-4">
     <div className="flex items-center gap-3">
        <h1 className="font-display text-xl text-slate-100">SM</h1>
        <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
          System active
        </span>
      </div>

      <div className="flex items-center mr-8">
        <Link href="/notifications" className="relative text-slate-400 hover:text-slate-200">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0"/></svg>
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">{unreadCount}</span>
          )}
        </Link>

        <div className="flex items-center gap-2 mr-8">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-sm font-medium text-emerald-400">
            {user?.fullName?.[0] ?? "?"}
          </div>
          <div className="text-sm">
            <p className="text-slate-200">{user?.fullName}</p>
            <p className="text-xs text-slate-500">{user?.role}</p>
          </div>
        </div>
        <UserMenu />
      </div>


      
    </header>
  );
}