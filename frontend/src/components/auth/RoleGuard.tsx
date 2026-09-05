"use client";

import { ReactNode,useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";

interface Props {
  allowedRoles: ("ADMIN" | "AGENT")[];
  children: ReactNode;
}

export default function RoleGuard({
  allowedRoles,
  children,
}: Props) {
  const router = useRouter();

  const {
    user,
    loading,
  } = useAuth();

  useEffect(() => { 
    if (loading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (!allowedRoles.includes(user.role)) {
      router.replace("/dashboard");
    }
  }, [loading, user, allowedRoles, router]);

  if (loading) {
    return null;
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return null; 
  }

  

  return children;
}