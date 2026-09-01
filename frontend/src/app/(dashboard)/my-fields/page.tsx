"use client";

import { useMemo, useState } from "react";

import FieldCard from "@/components/field/FieldCard";
import FieldSearch from "@/components/field/FieldSearch";
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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">My Fields</h1>
        <p className="text-gray-500">Fields assigned to you.</p>
      </div>

      <FieldSearch value={search} onChange={setSearch} />

      {loading && <p>Loading fields...</p>}

      {error && (
        <div className="rounded-lg bg-red-100 p-4 text-red-700">{error}</div>
      )}

      {!loading && filteredFields.length === 0 && <FieldEmptyState />}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredFields.map((field) => (
          <FieldCard key={field.id} field={field} role="AGENT" />
        ))}
      </div>
    </div>
  );
}