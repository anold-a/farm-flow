import { Suspense } from "react";
import DashboardHeaderContainer from "@/components/dashboard/DashboardHeaderContainer";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      
      <Suspense fallback={null}>
        <DashboardHeaderContainer />
      </Suspense>

      
      <div className="mt-2">
        <Suspense fallback={null}>{children}</Suspense>
      </div>
    </div>
  );
}