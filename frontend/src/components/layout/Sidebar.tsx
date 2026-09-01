"use client";

import Link from "next/link";
import Logo from "./Logo";
import { useAuth } from "@/hooks/useAuth";

export default function Sidebar() {
  const {user} = useAuth();
  const role = user?.role ?? "AGENT";
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
        <Link href="/settings">Settings</Link>
      </nav>
    </aside>
  );
}