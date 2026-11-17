"use client";

import { useMemo, useState } from "react";

import FieldCard from "@/components/field/FieldCard";

import FieldEmptyState from "@/components/field/FieldEmptyState";

import { useMyFields } from "@/hooks/useMyFields";

export default function MyFieldsPage() {
  const { fields, loading, error } = useMyFields();
  const [search, setSearch] = useState("");

  const filteredFields = useMemo(() => {
    return fields.filter((field) => {
      const keyword = search.toLowerCase();
      return (
        field.name.toLowerCase().includes(keyword) ||
        field.crop.toLowerCase().includes(keyword) ||
        field.location.toLowerCase().includes(keyword)
      );
    });
  }, [fields, search]);

  return (
    <div className="">
      <div>
        <h1 className="text-3xl font-bold">My Fields</h1>
        <p className="text-gray-500">Fields assigned to you.</p>
      </div>

      

      {loading && <p>Loading fields...</p>}

      {error && (
        <div className="rounded-lg bg-red-100 p-4 text-red-700">{error}</div>
      )}

      {!loading && filteredFields.length === 0 && <FieldEmptyState />}

      <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full">
  {filteredFields.map((field) => (
    <FieldCard key={field.id} field={field} role="AGENT"  onDelete={() => {}}  />
  ))}
</div>
    </div>
  );
}