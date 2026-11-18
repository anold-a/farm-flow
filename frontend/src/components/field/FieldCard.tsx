"use client"; 

import { useState } from "react";
import Link from "next/link";
import { FiEdit2, FiLink, FiMapPin, FiMaximize, FiTag } from "react-icons/fi";
import DeleteFieldButton from "./DeleteFieldButton";

export interface FieldCardData {
  id: string;
  name: string;
  crop: string;
  location: string;
  acreage: number;
  status: string;
}


const STATUSES = ["Healthy", "Needs Attention", "Critical", "Harvested"];

interface Props {
  field: FieldCardData;
  role: "ADMIN" | "AGENT";
  onDelete: (id: string) => void;
  onStatusChange?: (id: string, status: string) => Promise<void>; 
}

export default function FieldCard({ field, role, onDelete, onStatusChange }: Props) {
  
  const [status, setStatus] = useState(field.status);
  const [saving, setSaving] = useState(false);

  async function handleStatus(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value;
    const previous = status;
    setStatus(next);
    if (!onStatusChange) return;

    try {
      setSaving(true);
      await onStatusChange(field.id, next);
    } catch {
      setStatus(previous); 
      alert("Could not update status. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col rounded-sm bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
      
      <div className="flex items-center justify-between gap-3">
        <span className="flex min-w-0 items-center gap-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
          <FiTag size={14} className="shrink-0 text-emerald-600" aria-hidden="true" />
          <span className="truncate">{field.crop || "No crop"}</span>
        </span>

       
        <select
          value={status}
          onChange={handleStatus}
          disabled={saving}
          aria-label={`Status for ${field.name}`}
          className="shrink-0 rounded-md border border-black/15 bg-white px-3 py-2 text-sm text-neutral-900 outline-none focus:border-black/30 disabled:opacity-60"
        >
         
          {!STATUSES.includes(status) && <option value={status}>{status}</option>}
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <h2 className="mt-5 text-xl font-bold text-neutral-900">
        <Link href={`/fields/${field.id}`} className="hover:underline">{field.name}</Link>
      </h2>

      <hr className="my-5 border-black/5" />

      <ul className="space-y-4 text-[14px] text-neutral-700">
        <li className="flex items-center gap-3">
          <FiMapPin size={16} className="shrink-0 text-neutral-400" aria-hidden="true" />
          {field.location}
        </li>
        <li className="flex items-center gap-3">
          <FiMaximize size={16} className="shrink-0 text-neutral-400" aria-hidden="true" />
          {field.acreage} acres
        </li>
        <li className="flex items-center gap-3">
          <FiLink size={16} className="shrink-0 text-neutral-400" aria-hidden="true" />
          <Link href={`/fields/${field.id}`} className="truncate text-emerald-700 hover:underline">
            View field metrics
          </Link>
        </li>
      </ul>

      <div className="mt-5 flex items-center justify-between border-t border-black/5 pt-4">
        <Link href={`/fields/${field.id}/edit`} className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900">
          <FiEdit2 size={14} aria-hidden="true" />
          Edit
        </Link>

        {role === "ADMIN" && <DeleteFieldButton fieldId={field.id} onDelete={onDelete} />}
      </div>
    </div>
  );
}