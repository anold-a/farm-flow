"use client"


import AuthLayout from "@/components/auth/AuthLayout";

import { useEffect } from "react";
import { useRouter } from "next/navigation";


import AuthCard from "@/components/auth/AuthCard";
import LoginForm from "@/components/auth/LoginForm";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const { isAuthenticated,loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) return null; 
  if (isAuthenticated) return null; 


  return (
    <AuthLayout>
      <AuthCard  title ="Wecome Back!" subtitle="Login to continue your journey">
        <LoginForm />
     </AuthCard>
    </AuthLayout>
  );
}