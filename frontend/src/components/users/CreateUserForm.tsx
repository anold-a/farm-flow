"use client";

import { useState } from "react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { CreateUserDto, UserRole,User } from "@/types/user";

interface Props {
  onCreate: (data: CreateUserDto) => Promise<User>; // CHANGED — was Promise<void>
  onClose: () => void;
}

export default function CreateUserForm({ onCreate, onClose }: Props) {
  const [formData, setFormData] = useState<CreateUserDto>({
    fullName: "",
    email: "",
    password: "",
    role: "AGENT",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function validateForm() {
    if (!formData.fullName.trim()) {
      return "Full name is required.";
    }

    if (!formData.email.trim()) {
      return "Email is required.";
    }

    if (formData.password.length < 8) {
      return "Password must be at least 8 characters.";
    }

    return "";
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSubmitting(true);
      await onCreate(formData);
      onClose();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unable to create user.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-semibold">Create User</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-red-100 p-4 text-red-700">
              {error}
            </div>
          )}

          <Input
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Snow Ema"
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="snow@example.com"
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />

          <div>
            <label className="mb-1 block text-sm font-medium">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  role: e.target.value as UserRole,
                }))
              }
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
              {submitting ? "Creating..." : "Create User"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}