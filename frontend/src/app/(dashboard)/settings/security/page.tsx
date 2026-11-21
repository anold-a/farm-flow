
"use client";
import { useState } from "react";
import { useAuth} from "@/hooks/useAuth";
import { userService } from "@/services/user.service";

export default function SettingsPage() {
  const { user,updateUser } = useAuth();
  const [name, setName] = useState(user?.fullName ?? "");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  async function save(e: React.FormEvent) {
    e.preventDefault();
    try {
      setSaving(true);
      const updated = await userService.updateMe(name);
      updateUser({ fullName: updated.fullName });
      setMsg("Saved.");
     
    } catch {
      setMsg("Could not save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={save} className="max-w-md space-y-4 rounded-2xl bg-[#F8F7F4] p-6 shadow-sm">
      <h1 className="text-lg font-semibold text-neutral-900">Profile</h1>
      <label className="block text-sm text-neutral-600">
        Full name
        <input value={name} onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded-md border border-black/10 bg-white p-2 text-sm text-neutral-900" />
      </label>
      <p className="text-xs text-neutral-500">Email: {user?.email} · Role: {user?.role}</p>
      <button type="submit" disabled={saving}
        className="rounded-md bg-emerald-600 px-4 py-2 text-sm text-white hover:bg-emerald-700 disabled:opacity-60">
        {saving ? "Saving..." : "Save"}
      </button>
      {msg && <p className="text-sm text-neutral-600">{msg}</p>}
    </form>
  );
}