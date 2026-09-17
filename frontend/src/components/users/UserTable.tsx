import { useState } from "react";


import { User } from "@/types/user";
import DeleteUserButton from "./DeleteUserButton";
import { userService } from "@/services/user.service";
import EditUserForm from "./EditUserForm";


interface Props {
  users: User[];
  role: "ADMIN" | "AGENT";
}

export default function UserTable({users, role }: Props) {

  const [localUsers, setLocalUsers] = useState<User[]>(users);
   const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleDeleteUser = async (id: string | number) => {
    try {
     
      await userService.delete(id);
      
     
    setLocalUsers(localUsers.filter(user => user.id !== id));
      
      alert("User deleted successfully.");
    } catch (error) {
      console.error("Failed to delete user:", error);
      alert("Could not delete user. Please try again.");
    }
  };

  const handleUpdateUser = async (id: string, data: Partial<import("@/types/user").CreateUserDto>) => { // NEW
    const updatedUser = await userService.update(id, data);
    setLocalUsers((current) =>
      current.map((u) => (u.id === id ? updatedUser : u)),
    );
  };

  if (localUsers.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center">
        No users found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-gray-50 text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-6">Actions</th>
            <th className="p-3">Created</th>
          </tr>
        </thead>

        <tbody>
          {localUsers.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="p-3 font-medium">{user.fullName}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">
                <span
                  className={`rounded-full px-2 py-1 text-xs font-semibold ${
                    user.role === "ADMIN"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {user.role}
                </span>
              </td>
              <td className="p-3">
                <div className="flex justify-center gap-3">
    {role === "ADMIN" && ( 
      <button
                      type="button"
                      onClick={() => setEditingUser(user)}
                      className="px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Edit
                    </button>
      
                  )}

    {role === "ADMIN" && (
      <DeleteUserButton
      userId={user.id}
       onDelete={handleDeleteUser} 
      
      />
    )}
  </div>
                
                </td>
              <td className="p-3 text-gray-500">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
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
    </div>
  );
}