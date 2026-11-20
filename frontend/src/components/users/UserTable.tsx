"use client"

import { useMemo, useState,useEffect } from "react";
import { FiArrowDown, FiEdit2, FiMail, FiShield, FiUser } from "react-icons/fi"; 
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { CreateUserDto, User } from "@/types/user"; 
import DeleteUserButton from "./DeleteUserButton";
import { userService } from "@/services/user.service";
import EditUserForm from "./EditUserForm";
import Modal from "@/components/layout/Modal";   
import AssignFieldsModal from "./AssignFieldsModal";

interface Props {
  users: User[];
  role: "ADMIN" | "AGENT";
}

export default function UserTable({ users, role }: Props) {
  const [localUsers, setLocalUsers] = useState<User[]>(users);
  const [editingUser, setEditingUser] = useState<User | null>(null);


    useEffect(() => {
    setLocalUsers(users);
  }, [users]);

  
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const assignId = searchParams.get("assign");
  const assigningUser = localUsers.find((u) => u.id === assignId) ?? null;

  function setAssign(id: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (id) params.set("assign", id);
    else params.delete("assign");
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  
  const sortedUsers = useMemo(
    () => [...localUsers].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)),
    [localUsers],
  );

  const handleDeleteUser = async (id: string | number) => {
    try {
      await userService.delete(id);
      setLocalUsers(localUsers.filter((user) => user.id !== id));
      alert("User deleted successfully.");
    } catch (error) {
      console.error("Failed to delete user:", error);
      alert("Could not delete user. Please try again.");
    }
  };

  const handleUpdateUser = async (id: string, data: Partial<CreateUserDto>) => { 
    const updatedUser = await userService.update(id, data);
    setLocalUsers((current) => current.map((u) => (u.id === id ? updatedUser : u)));
  };

  if (localUsers.length === 0) {
    return (
     
      <div className="rounded-2xl bg-[#F8F7F4] p-8 text-center text-sm text-neutral-500 shadow-sm">
        No users found.
      </div>
    );
  }

  return (
    
    <div className="overflow-x-auto rounded-2xl bg-[#F8F7F4] shadow-sm">
      <table className="w-full min-w-160 table-fixed text-left">
        <thead>
          
          <tr className="border-b border-black/5 text-xs text-neutral-400">
            <th className="w-[30%] px-4 py-3 font-normal">Name</th>
            <th className="w-[28%] px-4 py-3 font-normal">Email</th>
            <th className="w-[12%] px-4 py-3 font-normal">Role</th>
            
            <th className="w-[12%] px-4 py-3 font-medium text-neutral-800">
              <span className="inline-flex items-center gap-1">
                Created <FiArrowDown size={12} aria-hidden="true" />
              </span>
            </th>
            
            {role === "ADMIN" && <th className="w-[8%] px-4 py-3"><span className="sr-only">Actions</span></th>}
          </tr>
        </thead>

        <tbody>
          {sortedUsers.map((user) => (
            
            <tr
              key={user.id}
              className="group border-b border-black/5 text-[13px] text-neutral-500 transition-colors last:border-0 hover:bg-black/3"
            >
              
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-black/5 bg-white text-xs font-medium text-neutral-700">
                    {user.fullName?.[0]?.toUpperCase() ?? "?"}
                  </span>
                  <span className="truncate text-[14px] text-neutral-900">{user.fullName}</span>
                </div>
              </td>

             
              <td className="px-4 py-3">
                <span className="flex items-center gap-1.5">
                  <FiMail size={12} className="shrink-0" aria-hidden="true" />
                  <span className="truncate">{user.email}</span>
                </span>
              </td>

              
              <td className="px-4 py-3">
                <span className="flex items-center gap-1.5">
                  {user.role === "ADMIN" ? (
                    <FiShield size={12} className="text-purple-600" aria-hidden="true" />
                  ) : (
                    <FiUser size={12} className="text-emerald-600" aria-hidden="true" />
                  )}
                  {user.role}
                </span>
              </td>


              <td className="px-4 py-3">
                {new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </td>

              {role === "ADMIN" && ( 
                <td className="px-4 py-3">
                  
                  <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100">
                    {user.role === "AGENT" && (
                      <button
                        type="button"
                        onClick={() => setAssign(user.id)}
                        aria-label={`Assign fields to ${user.fullName}`}
                        className="rounded-md px-2 py-1 text-xs text-emerald-700 hover:bg-emerald-50"
                      >
                        Assign
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setEditingUser(user)}
                      aria-label={`Edit ${user.fullName}`}
                      className="rounded-md p-1.5 text-neutral-400 hover:bg-black/5 hover:text-neutral-800"
                    >
                      <FiEdit2 size={14} aria-hidden="true" />
                    </button>
                  

                    <DeleteUserButton userId={user.id} onDelete={handleDeleteUser} />
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <EditUserForm
          user={editingUser}
          onUpdate={handleUpdateUser}
          onClose={() => setEditingUser(null)}
        />
      )}

      {assigningUser && (
        <Modal label="Assign fields" onClose={() => setAssign(null)}>
          <AssignFieldsModal
            user={assigningUser}
            onCancel={() => setAssign(null)}
            onSuccess={() => setAssign(null)}
          />
        </Modal>
      )}
    </div>
  );
}