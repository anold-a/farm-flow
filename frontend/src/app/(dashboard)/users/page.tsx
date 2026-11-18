"use client";



import UserTable from "@/components/users/UserTable";
import { useUsers } from "@/hooks/useUsers";

import RoleGuard from "@/components/auth/RoleGuard";
import { useAuth } from "@/hooks/useAuth";


export default function UsersPage() {
  const { users, loading, error} = useUsers();
  

  const { user } = useAuth();
  const role = user?.role ?? "AGENT";

  

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-100 p-4 text-red-700">{error}</div>
    );
  }

  return (
    <RoleGuard allowedRoles={["ADMIN"]}>
    <div className="space-y-6 mt-10">
      

      <UserTable users={users} role={role} />

     
    </div>
    </RoleGuard>
  );
}