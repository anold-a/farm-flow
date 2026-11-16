import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";


type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  console.log("[DashboardLayout] rendering");
  return (
    <ProtectedRoute>
    <div className="flex min-h-screen bg-emerald-50 text-slate-200">
      <Sidebar/>

      <div>
        <Navbar />

        <main className="pt-6 flex-1 bg-emerald-50 p-6">
          {children}
        </main>
        </div>
        
      
    </div>
    </ProtectedRoute>
  );
}