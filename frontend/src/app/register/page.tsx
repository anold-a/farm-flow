"use client"

import AuthLayout from "@/components/auth/AuthLayout";
import { useEffect } from "react";

import AuthCard from "@/components/auth/AuthCard";
import RegisterForm from "@/components/auth/RegisterForm";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";

export default function RegisterPage() {

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
      <AuthCard title="Create SmartSeason Account">
        <RegisterForm />
      </AuthCard>
    </AuthLayout>
  );
}