import { User } from "@/types/user";

interface Props {
  users: User[];
}

export default function UserTable({ users }: Props) {
  if (users.length === 0) {
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
            <th className="p-3">Created</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
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
              <td className="p-3 text-gray-500">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}