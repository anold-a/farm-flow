"use client";

import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { useFields } from "@/hooks/useFields";
import FieldSummaryCard from "./FieldSummaryCard";


export default function FieldsSection() {
  const { fields, loading } = useFields();

  return (
    <section>
      <div className="mb-3 flex items-center justify-between px-1">
        <h2 className="text-[13px] text-neutral-700">Fields</h2>
        <Link href="/fields" className="flex items-center gap-1 text-[13px] text-neutral-500 hover:text-neutral-900">
          View more <FiArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-neutral-500">Loading fields...</p>
      ) : fields.length === 0 ? (
        <p className="text-sm text-neutral-500">No fields registered yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {fields.slice(0, 3).map((field) => (
            <FieldSummaryCard key={field.id} field={field} />
          ))}
        </div>
      )}
    </section>
  );
}