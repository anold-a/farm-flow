"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { FiLogOut } from "react-icons/fi";

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
      className="flex items-center text-emerald-600 gap-1"
    >
      <FiLogOut size={16} aria-hidden="true" />
  <span>Log out</span>

    </button>
  );
}