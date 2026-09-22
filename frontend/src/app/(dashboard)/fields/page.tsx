"use client";

import {useEffect, useMemo, useState } from "react";
import Link from "next/link";

import Button from "@/components/ui/Button";

import FieldCard from "@/components/field/FieldCard";
import FieldSearch from "@/components/field/FieldSearch";
import FieldEmptyState from "@/components/field/FieldEmptyState";

import { useFields } from "@/hooks/useFields";
import { useAuth } from "@/hooks/useAuth";
import { fieldService } from "@/services/field.service";

export default function FieldsPage() {
  const {
    fields,
    loading,
    error,
  } = useFields();
   const [localFields, setLocalFields] = useState(fields);


  const { user } = useAuth();
  const role = user?.role ?? "AGENT";

  const [search, setSearch] =
    useState("");

  const filteredFields = useMemo(() => {
    return localFields.filter((field) => {
      const keyword =
        search.toLowerCase();

      return (
        field.name
          .toLowerCase()
          .includes(keyword) ||
        field.crop
          .toLowerCase()
          .includes(keyword) ||
        field.location
          .toLowerCase()
          .includes(keyword)
      );
    });
  }, [localFields, search]);


  

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

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-display text-gray-900">
            Fields
          </h1>

          <p className="text-gray-600">
            Manage registered farm fields.
          </p>

        </div>

        {role === "ADMIN" && (
        <Link href="/fields/create">
          <Button>
            Register Field
          </Button>
        </Link>
        )}

      </div>

      <FieldSearch
        value={search}
        onChange={setSearch}
      />

      {loading && (
        <p className="text-gray-500">Loading fields...</p>
      )}

      {error && (
        <div className="rounded-lg bg-red-100 p-4 text-red-700">
          {error}
        </div>
      )}

      {!loading &&
        filteredFields.length === 0 && (
          <FieldEmptyState />
      )}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {filteredFields.map((field) => (
          <FieldCard key={field.id} field={field} role={role} onDelete={handleDeleteField} />
        ))}

      </div>

    </div>
  );
}