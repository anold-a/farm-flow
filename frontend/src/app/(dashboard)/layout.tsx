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
    <div className="flex min-h-screen bg-slate-950 text-slate-200">
      <Sidebar/>

      <div className="flex flex-1 bg-slate-900  flex-col">
        <Navbar />

        <main className="flex-1 bg-slate-950  p-6">
          {children}
        </main>
      </div>
    </div>
    </ProtectedRoute>
  );
}