import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import DashboardShell from "@/components/layout/DashboardShell";


type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  console.log("[DashboardLayout] rendering");
  return (
    <ProtectedRoute>
    
      <DashboardShell>{children}</DashboardShell>
 
  
    </ProtectedRoute>
  );
}