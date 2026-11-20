"use client";

import { useState } from "react";
import { useFields } from "@/hooks/useFields";
import { fieldService } from "@/services/field.service";
import { User } from "@/types/user";

type Props = { user: User; onSuccess: () => void; onCancel: () => void };

export default function AssignFieldsModal({ user, onSuccess, onCancel }: Props) {
  const { fields, loading } = useFields();
  const realFields = fields.filter((f) => !f.isDemo);

  
  const current = realFields.filter((f) => f.assignedAgentId === user.id).map((f) => f.id);
  const [selected, setSelected] = useState<string[] | null>(null);
  const chosen = selected ?? current;
  const [saving, setSaving] = useState(false);

  const toggle = (id: string) =>
    setSelected(chosen.includes(id) ? chosen.filter((x) => x !== id) : [...chosen, id]);

  async function save() {
    const toAssign = chosen.filter((id) => !current.includes(id));
    const toRemove = current.filter((id) => !chosen.includes(id));
    try {
      setSaving(true);
      await Promise.all([
        ...toAssign.map((id) => fieldService.assignAgent(id, { agentId: user.id })),
        ...toRemove.map((id) => fieldService.unassignAgent(id)),
      ]);
      onSuccess();
    } catch {
      alert("Could not update assignments. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-neutral-900">Assign fields to {user.fullName}</h2>

      {loading && <p className="mt-4 text-sm text-neutral-500">Loading fields...</p>}

      <ul className="mt-4 max-h-72 space-y-2 overflow-y-auto">
        {realFields.map((f) => {
          
          const takenBy = f.assignedAgentId && f.assignedAgentId !== user.id ? f.assignedAgent?.fullName ?? "another agent" : null;
          return (
            <li key={f.id}>
              <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-black/10 px-4 py-3 hover:bg-emerald-50">
                <input type="checkbox" checked={chosen.includes(f.id)} onChange={() => toggle(f.id)} />
                <span className="text-sm text-neutral-900">{f.name}</span>
                <span className="ml-auto text-xs text-neutral-500">
                  {takenBy ? `Assigned to ${takenBy}` : f.location}
                </span>
              </label>
            </li>
          );
        })}
      </ul>

      <div className="mt-4 flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="rounded-md px-4 py-2 text-sm text-neutral-600 hover:bg-black/5">
          Cancel
        </button>
        <button type="button" onClick={save} disabled={saving}
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm text-white hover:bg-emerald-700 disabled:opacity-60">
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}