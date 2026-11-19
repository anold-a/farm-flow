"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";
import { useFields } from "@/hooks/useFields";


type Result = {
  id: string;
  title: string;
  subtitle?: string;
  href: string;
  type: "Page" | "Field";
};


const PAGES: Result[] = [
  { id: "p-register-field", title: "Register Field", href: "/fields/create", type: "Page" },
  { id: "p-new-user", title: "Create a new user", href: "/register", type: "Page" },
  { id: "p-crops", title: "Add a new crop", href: "/crops", type: "Page" },
  { id: "p-notifications", title: "Notifications", href: "/notifications", type: "Page" },
];

export default function GlobalSearch() {
  const router = useRouter();
  const { fields } = useFields(); 
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const debounced = useDebounce(query, 250);
  const wrapperRef = useRef<HTMLDivElement>(null);

  
  const results = useMemo<Result[]>(() => {
    const k = debounced.trim().toLowerCase();
    if (!k) return [];

    const fieldResults: Result[] = (fields ?? [])
      .filter(
        (f) =>
          f.name.toLowerCase().includes(k) ||
          f.crop.toLowerCase().includes(k) ||
          f.location.toLowerCase().includes(k)
      )
      .map((f) => ({
        id: `f-${f.id}`,
        title: f.name,
        subtitle: `${f.crop} · ${f.location}`,
        href: `/fields/${f.id}`, 
        type: "Field",
      }));

    const pageResults = PAGES.filter((p) => p.title.toLowerCase().includes(k));

    return [...pageResults, ...fieldResults].slice(0, 8); 
  }, [debounced, fields]);

  
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  function go(href: string) {
    setOpen(false);
    setQuery("");
    router.push(href);
  }

  return (
    
    <div ref={wrapperRef} className="relative">
      <label className="flex h-9 w-36 items-center gap-2 rounded-md border border-black/10 bg-[#F8F7F4] px-3 text-neutral-500 focus-within:border-black/25 sm:w-56 lg:w-80">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }} 
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => { if (e.key === "Enter" && results[0]) go(results[0].href); }} 
          placeholder="Search anything…"
          className="w-full bg-transparent text-[13px] text-neutral-800 outline-none placeholder:text-neutral-500"
        />
      </label>

      
      {open && query.trim() && (
        <div className="fixed inset-x-3 top-14 z-50 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-2 sm:w-96">
          {results.length === 0 ? (
            <p className="p-4 text-sm text-neutral-500">No results for “{query}”</p>
          ) : (
            <ul role="listbox" className="max-h-96 overflow-y-auto py-1">
              {results.map((r) => (
                <li key={r.id}>
                  <Link
                    href={r.href}
                    onClick={() => go(r.href)}
                    className="flex items-center justify-between gap-3 px-4 py-2 hover:bg-slate-50"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-neutral-900">{r.title}</p>
                      {r.subtitle && (
                        <p className="truncate text-xs text-neutral-500">{r.subtitle}</p>
                      )}
                    </div>
                    <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] text-emerald-700">
                      {r.type}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}