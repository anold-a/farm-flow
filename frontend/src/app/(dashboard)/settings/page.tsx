"use client";

import { SecurityResponse } from "@/types/security";
import { useSecurity } from "@/hooks/useSecurity";

import Card from "@/components/ui/Card";


const permissionLabels: Record<keyof SecurityResponse["permissions"], string> = {
  manageUsers: "Manage users",
  manageFields: "Manage fields",
  viewReports: "View reports",
  viewAuditLogs: "View audit logs",
  manageAssignedFields: "Manage assigned fields",
};





export default function SecurityPage() {

  const { data, loading, error } = useSecurity();
  

   if (loading) return <p>Loading security overview...</p>;
  if (error) return <div className="rounded-lg bg-red-100 p-4 text-red-700">{error}</div>;
  if (!data) return <div>No security data available.</div>;

  return (
    <div >
    

      <Card title="Account Security" description="Your sign-in method and role." >
       
        <div className="grid gap-4 sm:grid-cols-2">
          <div >
            <p className="mb-1 text-xs text-gray-500">Authentication</p>
            <div className="rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-emerald-600">{data.account.authentication}</div>
          </div>
          <div >
            <p className="mb-1 text-xs text-gray-500">Role</p>
            <div className="rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-900">{data.account.role}</div>
          </div>
        </div>
      </Card>

      <Card title="Access Control" description="What your role allows you to do.">
        
        <ul className="space-y-2 text-sm">
          {Object.entries(data.permissions).map(([key, allowed]) => (
            <li key={key} className="flex items-center gap-4 text-gray-700">
              <span
    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
      allowed ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"
    }`}
  >
    {allowed ? "Allowed" : "Not allowed"}
  </span>
              {permissionLabels[key as keyof SecurityResponse["permissions"]]}
            </li>
          ))}
        </ul>
      </Card>

      <Card title="Recent Security Activity" description="See the actions taken on your account.">
        
        {data.recentActivity.length === 0 ? (
          <p className="text-sm text-gray-500">No recent activity.</p>
        ) : (
         
          <div className="overflow-hidden rounded-lg border border-gray-200 text-sm">
            
            <div className="grid grid-cols-3 bg-gray-50 px-4 py-3 text-xs font-medium text-gray-500">
              <span>Action</span>
              <span>Resource</span>
              <span className="text-right">Date</span>
            </div>
            {data.recentActivity.map((item, i) => (
              
              <div
                key={i}
                className="grid grid-cols-3 border-t border-gray-100 px-4 py-3 text-gray-700"
              >
                <span>{item.action}</span> 
                <span>{item.resource}</span>
                <span className="text-right text-gray-400">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}