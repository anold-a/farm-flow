"use client";

import { useState } from "react";

import UserTable from "@/components/users/UserTable";
import { useUsers } from "@/hooks/useUsers";
import CreateUserForm from "@/components/users/CreateUserForm";
import RoleGuard from "@/components/auth/RoleGuard";
import { useAuth } from "@/hooks/useAuth";


export default function UsersPage() {
  const { users, loading, error,createUser } = useUsers();
  const [showCreateForm, setShowCreateForm] = useState(false); 

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-gray-500">Manage admin and agent accounts.</p>
        </div>

        <button
          type="button"
          onClick={() => setShowCreateForm(true)}
          className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
        >
          + Add User
        </button>
      </div>

      <UserTable users={users} role={role} />

      {showCreateForm && ( // NEW
        <CreateUserForm
          onCreate={createUser}
          onClose={() => setShowCreateForm(false)}
        />
      )}
    </div>
    </RoleGuard>
  );
}