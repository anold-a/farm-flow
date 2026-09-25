"use client";

import { useEffect, useState } from "react";
import { userService } from "@/services/user.service";
import { User } from "@/types/user";

export default function UserManagementSummary() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    userService.getAll().then(setUsers).catch(() => setUsers([]));
  }, []);

  const today = new Date().toDateString();
  const newToday = users.filter((u) => new Date(u.createdAt).toDateString() === today).length; 
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-sm font-medium text-slate-400">User Management</h2>
      <div className="mt-4 flex justify-between">
        <div>
          <p className="text-xs text-slate-500">Total Users</p>
          <p className="font-display text-2xl text-slate-100">{users.length}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">New Today</p>
          <p className="font-display text-2xl text-slate-100">{newToday}</p>
        </div>
      </div>
    </div>
  );
}