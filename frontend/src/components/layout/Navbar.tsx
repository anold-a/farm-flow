"use client";

import UserMenu from "./UserMenu";
import { useAuth } from "@/hooks/useAuth";
import { useNotifications } from "@/hooks/useNotifications";
import useDebounce  from "@/hooks/useDebounce"; 
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Icon2 = ({ children }: { children: React.ReactNode }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);
const SearchIcon = () => <Icon2><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></Icon2>;

const HomeIcon = () => <Icon2><path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" /></Icon2>;
const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5" aria-hidden="true">
    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" />
  </svg>
);
const CloseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

const DEFAULT_TABS = [
  { href: "/fields/create", label: "Register Field" },
  { href: "/register", label: "Create a new user" },
  { href: "/crops", label: "Add a new crop" },
];

export default function Navbar() {
  const { user } = useAuth();
  const { unreadCount } = useNotifications();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [tabs, setTabs] = useState(DEFAULT_TABS);
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const debouncedQuery = useDebounce(query, 500);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  function closeTab(e: React.MouseEvent, href: string) {
    e.preventDefault();
    e.stopPropagation();
    const remaining = tabs.filter((t) => t.href !== href);
    setTabs(remaining);
    if (isActive(href)) router.push(remaining[0]?.href ?? "/dashboard");
  }

  useEffect(() => {
    const current = searchParams.get("q") ?? "";
    if (debouncedQuery === current) return;
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedQuery) params.set("q", debouncedQuery);
    else params.delete("q");
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    
  }, [debouncedQuery]);

  return (
    <header className="sticky top-0 z-50 flex h-13.5 w-full shrink-0 items-center gap-2  px-3">
      
      

      
      <Link href="/dashboard" aria-label="Home"
        className="ml-1 flex h-8 w-8 items-center justify-center rounded-full text-neutral-800 hover:bg-black/5">
        <HomeIcon />
      </Link>

      
      <div className="flex min-w-0 grow items-center gap-1 overflow-x-auto">
        {tabs.map((tab) => {
          const active = isActive(tab.href);
          return (
            <Link key={tab.href} href={tab.href} aria-current={active ? "page" : undefined}
              className={`flex h-8 shrink-0 items-center gap-2 rounded-sm px-3 text-[13px] font-medium transition-colors ${
                active
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-500 hover:bg-black/5 hover:text-neutral-800"
              }`}>
              <span>{tab.label}</span>
              {active && (
                <button onClick={(e) => closeTab(e, tab.href)} aria-label={`Close ${tab.label}`}
                  className="ml-1 text-neutral-400 hover:text-neutral-800">
                  <CloseIcon />
                </button>
              )}
            </Link>
          );
        })}
      </div>

      <div className="flex  items-center gap-2">
      <label className="flex h-9 w-80 items-center gap-2 rounded-md border border-black/10 bg-[#F8F7F4] px-3 text-neutral-500 focus-within:border-black/25">
        <SearchIcon />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter…"
          className="w-full bg-transparent text-[13px] text-neutral-800 outline-none placeholder:text-neutral-500"
        />
      </label>

      
      <Link href="/notifications" aria-label="Notifications"
        className="relative flex h-9 w-9 items-center justify-center  text-neutral-800">
        <BellIcon />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            {unreadCount}
          </span>
        )}
      </Link>

        <UserMenu />
    </div>
    </header>
  );
}