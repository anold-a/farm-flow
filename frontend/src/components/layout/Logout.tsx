"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function LogoutButton() {
  const router = useRouter();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
    >
      Logout
    </button>
  );
}