"use client"

import { useAuth } from "@/hooks/useAuth";

export default function WelcomeBanner() {
  const { user } = useAuth();
  return (
    <section>
      <h1 className=" font-display text-3xl text-gray-900">
        Welcome back{user?.fullName ? `, ${user.fullName.split(" ")[0]}` : ""}
      </h1>

      <p className="mt-1 text-gray-600">
        Manage your fields, crops and farm activities from one place.
      </p>
    </section>
  );
}