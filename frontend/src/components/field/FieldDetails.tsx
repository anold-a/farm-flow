"use client"

import Link from "next/link";

import { useEffect, useState } from "react";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import StatusBadge from "./StatusBadge";

import AssignAgentModal from "@/components/field/AssignAgentModal";

import { Field } from "@/types/field";

import { FieldUpdate } from "@/types/field-update";
import { fieldUpdateService } from "@/services/field-update.service";

import { cropService } from "@/services/crop.service";
import { Crop } from "@/types/crop";

interface Props {
  field: Field;
  role: "ADMIN" | "AGENT";
}

export default function FieldDetails({
  field: initialField,
  role,
}: Props) {
  const [field, setField] = useState(initialField);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [updates, setUpdates] = useState<FieldUpdate[]>([]);
const [updatesLoading, setUpdatesLoading] = useState(true); 
const [updatesError, setUpdatesError] = useState("");

const [activeCrop, setActiveCrop] = useState<Crop | null>(null);
  const [cropLoading, setCropLoading] = useState(true);
  const [cropError, setCropError] = useState("");

useEffect(() => { 
  async function loadFieldData() {
    try {
      setUpdatesLoading(true);
      setUpdatesError("");

      const data = await fieldUpdateService.getByField(field.id);

      setUpdates(data);
    } catch (err) {
      if (err instanceof Error) {
        setUpdatesError(err.message);
      } else {
        setUpdatesError("Failed to load field updates.");
      }
    } finally {
      setUpdatesLoading(false);
    }

try {
        setCropLoading(true);
        setCropError("");
        const cropData = await cropService.getActiveByField(field.id);
        setActiveCrop(cropData);
      } catch (err) {
        setCropError(err instanceof Error ? err.message : "Failed to load crop information.");
      } finally {
        setCropLoading(false);
      }
   
  }

  loadFieldData();
}, [field.id]); 

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {field.name}
          </h1>
        </div>

        <StatusBadge status={field.status} />
      </div>

      <Card>
        <h2 className="mb-4 text-xl font-semibold">
          Field Information
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-gray-500">Crop Status</p>
            {cropLoading && <p className="font-medium text-gray-400">Loading crop...</p>}

            {cropLoading && <p className="font-medium text-gray-400">Loading crop...</p>}
  
 
  {!cropLoading && cropError && <p className="font-medium text-red-500">{cropError}</p>}
  
  
  {!cropLoading && !cropError && !activeCrop && (
    <p className="font-medium text-gray-400 mt-1 italic">No active crop planted</p>
  )}
  
  
  {!cropLoading && !cropError && activeCrop && (
    <div className="mt-1">
      <p className="font-semibold text-lg">
        {activeCrop.name} <span className="text-sm font-normal text-gray-500">({activeCrop.variety})</span>
      </p>
      <p className="text-xs text-green-600 bg-green-50 inline-block px-2 py-0.5 rounded font-medium mt-1">
        Stage: {activeCrop.growthStage}
      </p>
      <p className="text-xs text-gray-400 mt-1">
        Planted: {new Date(activeCrop.plantingDate).toLocaleDateString()}
      </p>
    </div>
  )}
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Location
            </p>

            <p className="font-medium">
              {field.location}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Acreage
            </p>

            <p className="font-medium">
              {field.acreage} Acres
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Assigned Agent
            </p>

            <p className="font-medium">
              {field.assignedAgent ? field.assignedAgent.fullName : "Unassigned"}
            </p>
          </div>
        </div>
        {role === "ADMIN" && (
          <div className="mt-4">
            <Button type="button" onClick={() => setShowAssignModal(true)}>
              {field.assignedAgent ? "Reassign Agent" : "Assign Agent"}
            </Button>
          </div>
        )}
      </Card>

      <Card>
        <h2 className="mb-4 text-xl font-semibold">
          Recent Updates
        </h2>

        {updatesLoading && ( 
  <p className="text-gray-500">Loading updates...</p>
)}

{!updatesLoading && updatesError && ( 
  <div className="rounded-lg bg-red-100 p-4 text-red-700">
    {updatesError}
  </div>
)}

{!updatesLoading && !updatesError && updates.length === 0 && ( 
  <p className="text-gray-500">
    No field updates have been recorded yet.
  </p>
)}

{!updatesLoading && !updatesError && updates.length > 0 && ( 
  <ul className="space-y-3">
    {updates.map((update) => (
      <li
        key={update.id}
        className="rounded-lg border p-4"
      >
        <p className="font-semibold">
          {update.cropStage}
        </p>

        <p className="mt-1 text-gray-700">
          {update.notes}
        </p>

        <div className="mt-2 text-sm text-gray-500">
          Moisture: {update.moisture ?? "N/A"}% ·{" "}
          Temperature: {update.temperature ?? "N/A"}°C ·{" "}
          Humidity: {update.humidity ?? "N/A"}%
        </div>

        {update.user && (
          <p className="mt-2 text-xs text-gray-400">
            Recorded by: {update.user.fullName}
          </p>
        )}
      </li>
    ))}
  </ul>
)}
      </Card>

      <div className="flex flex-wrap gap-3">
        {role === "ADMIN" && ( <>
            <Link href={`/fields/${field.id}/edit`}>
              <Button>Edit Field</Button>
            </Link>
            <Button>Delete Field</Button>
          </>
        )}

        {role === "AGENT" && ( 
  <Link href={`/fields/${field.id}/updates/create`}>
    <Button>
      Add Update
    </Button>
  </Link>
)}


      </div>
      {showAssignModal && (
        <AssignAgentModal
          field={field}
          onClose={() => setShowAssignModal(false)}
          onAssigned={(updatedField) => setField(updatedField)}
        />
      )}
    </div>
  );
}