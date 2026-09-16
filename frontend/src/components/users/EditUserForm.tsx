"use client";

import { useState } from "react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { User, UserRole, CreateUserDto } from "@/types/user";

interface Props {
  user: User;
  onUpdate: (id: string, data: Partial<CreateUserDto>) => Promise<void>;
  onClose: () => void;
}

export default function EditUserForm({ user, onUpdate, onClose }: Props) {
  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState<UserRole>(user.role);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!fullName.trim() || !email.trim()) {
      setError("Full name and email are required.");
      return;
    }

    try {
      setSubmitting(true);
      await onUpdate(user.id, { fullName, email, role });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to update user.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-semibold">Edit User</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-red-100 p-4 text-red-700">{error}</div>
          )}

          <Input
            label="Full Name"
            name="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div>
            <label className="mb-1 block text-sm font-medium">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="w-full rounded-md border p-2 text-sm"
            >
              <option value="AGENT">AGENT</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" onClick={onClose} disabled={submitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}