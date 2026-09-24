"use client"

import { DashboardStats } from "@/types/dashboard";
import { useAuth } from "@/hooks/useAuth";

interface Props { 
  stats: DashboardStats;
  role: "ADMIN" | "AGENT";
}

export default function WelcomeBanner({ stats, role }: Props) {
const { user } = useAuth();
  const firstName = user?.fullName?.split(" ")[0];
  return (
    <section className="rounded-2xl border border-gray-200 bg-emerald-50/40 px-8 py-10">
      <h1 className="font-display text-3xl text-gray-900">
        Welcome back{firstName ? `, ${firstName}` : ""}
      </h1>
      <p className="mt-3 max-w-2xl text-gray-700">
         {role === "ADMIN" ? (
          <>
            You're tracking <strong className="text-emerald-700">{stats.totalFields} fields</strong> across the farm —{" "}
            {stats.activeFields} active and {stats.completedFields} completed.{" "}
            {stats.totalFieldUpdates} field updates logged so far.
          </>
        ) : (
          <>
            You have <strong className="text-emerald-700">{stats.activeFields} active fields</strong> assigned to you,
            with {stats.totalFieldUpdates} updates logged. Keep them current so nothing gets missed.
          </>
        )}
      </p>
    </section>
  );
}