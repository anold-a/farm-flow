"use client";

import { useEffect, useState } from "react";

import Button from "@/components/ui/Button";
import { fieldService } from "@/services/field.service";
import { userService, AgentOption } from "@/services/user.service";
import { Field } from "@/types/field";

interface Props {
  field: Field;
  onClose: () => void;
  onAssigned: (updatedField: Field) => void;
}

export default function AssignAgentModal({
  field,
  onClose,
  onAssigned,
}: Props) {
  const [agents, setAgents] = useState<AgentOption[]>([]);
  const [selectedAgentId, setSelectedAgentId] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadAgents() {
      try {
        const data = await userService.getAgents();
        setAgents(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load agents."
        );
      } finally {
        setLoading(false);
      }
    }

    loadAgents();
  }, []);

  async function handleAssign() {
    if (!selectedAgentId) {
      setError("Please select an agent.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const updatedField = await fieldService.assignAgent(field.id, {
        agentId: selectedAgentId,
      });

      onAssigned(updatedField);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to assign agent.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-1 text-lg font-semibold">
          Assign Agent
        </h2>

        <p className="mb-4 text-sm text-gray-500">
          Field: {field.name}
        </p>

        {loading && <p className="text-sm text-gray-500">Loading agents...</p>}

        {!loading && (
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">
              Select an agent
            </label>

            <select
              value={selectedAgentId}
              onChange={(e) => setSelectedAgentId(e.target.value)}
              className="w-full rounded-md border p-2 text-sm"
            >
              <option value="">-- Choose an agent --</option>
              {agents.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.fullName} ({agent.email})
                </option>
              ))}
            </select>
          </div>
        )}

        {error && (
          <p className="mb-4 text-sm text-red-600">{error}</p>
        )}

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            onClick={onClose}
            disabled={submitting}
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={handleAssign}
            disabled={submitting || loading}
          >
            {submitting ? "Assigning..." : "Assign Agent"}
          </Button>
        </div>
      </div>
    </div>
  );
}