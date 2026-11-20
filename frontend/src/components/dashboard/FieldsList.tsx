"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link"; 

import FieldCard from "@/components/field/FieldCard";
import FieldEmptyState from "@/components/field/FieldEmptyState";

import { useFields } from "@/hooks/useFields";
import { useAuth } from "@/hooks/useAuth";
import { fieldService } from "@/services/field.service";


export default function FieldsList({ limit }: { limit?: number }) {
  const { fields, loading, error } = useFields();
  const [localFields, setLocalFields] = useState(fields);
  const { user } = useAuth();
  const role = user?.role ?? "AGENT";
  const allFieldsHref = role === "ADMIN" ? "/fields" : "/my-fields";

  const [search, setSearch] = useState("");

  const filteredFields = useMemo(() => {
    const keyword = search.toLowerCase();
    return localFields.filter(
      (field) =>
        field.name.toLowerCase().includes(keyword) ||
        field.crop.toLowerCase().includes(keyword) ||
        field.location.toLowerCase().includes(keyword),
    );
  }, [localFields, search]);

  
  const visibleFields = limit ? filteredFields.slice(0, limit) : filteredFields;

  useEffect(() => {
    setLocalFields(fields);
  }, [fields]);

  async function handleDeleteField(id: string) {
    try {
      await fieldService.delete(id);
      setLocalFields((current) => current.filter((f) => f.id !== id));
    } catch (err) {
      console.error("Failed to delete field:", err);
      alert("Could not delete field. Please try again.");
    }
  }

  async function handleStatusChange(id: string, status: string) {
    await fieldService.update(id, { status });
    setLocalFields((current) =>
      current.map((f) => (f.id === id ? { ...f, status } : f)),
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="mt-10 mb-2 uppercase text-neutral-950">Fields</h2>
      <p className=" text-neutral-700">Manage registered farm fields.</p>

      {loading && <p className="text-gray-500">Loading fields...</p>}

      {error && (
        <div className="rounded-lg bg-red-100 p-4 text-red-700">{error}</div>
      )}

      {!loading && filteredFields.length === 0 && <FieldEmptyState />}

      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
       
        {visibleFields.map((field) => (
          <FieldCard
            key={field.id}
            field={field}
            role={role}
            onDelete={handleDeleteField}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>

      
      {limit && filteredFields.length > limit && (
        <div className="flex justify-center">
          <Link href={allFieldsHref} className="text-sm text-emerald-700 hover:underline">
            View all {filteredFields.length} fields →
          </Link>
        </div>
      )}
    </div>
  );
}