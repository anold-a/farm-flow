import Link from "next/link";

import { SetStateAction, useState } from "react";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import StatusBadge from "./StatusBadge";

import AssignAgentModal from "@/components/field/AssignAgentModal";

import { Field } from "@/types/field";

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
  const updates = [
    "Irrigation completed",
    "Fertilizer applied",
    "Pest inspection scheduled",
  ];

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
            <p className="text-sm text-gray-500">
              Crop
            </p>

            <p className="font-medium">
              {field.crop}
            </p>
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

        <ul className="space-y-3">
          {updates.map((update) => (
            <li
              key={update}
              className="rounded-lg border p-3"
            >
              {update}
            </li>
          ))}
        </ul>
      </Card>

      <div className="flex flex-wrap gap-3">
        {role === "ADMIN" && ( <>
            <Link href={`/fields/${field.id}/edit`}>
              <Button>Edit Field</Button>
            </Link>
            <Button>Delete Field</Button>
          </>
        )}

        <Link href={`/fields/${field.id}/updates/create`}>
          <Button>
            Add Update
          </Button>
        </Link>


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