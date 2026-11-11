"use client";

import { useState,useEffect } from "react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { fieldUpdateService } from "@/services/field-update.service";
import { cropService } from "@/services/crop.service";
import { Crop } from "@/types/crop";

interface Props {
  fieldId: string;
}

export default function FieldUpdateForm({
  fieldId,
}: Props) {
  const [cropStage, setCropStage] =
    useState("");
    const [activeCrop, setActiveCrop] = useState<Crop | null>(null);

  const [moisture, setMoisture] =
    useState("");

  const [temperature, setTemperature] =
    useState("");

  const [humidity, setHumidity] =
    useState("");

  const [notes, setNotes] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  function validate() {
    if (!cropStage.trim()) {
      return "Crop stage is required.";
    }

    if (!notes.trim()) {
      return "Notes are required.";
    }

    return "";
  }

  useEffect(() => {
    async function getActiveCrop() {
      try {
        const crop = await cropService.getActiveByField(fieldId);
        setActiveCrop(crop);
        if (crop) {
          
          setCropStage(crop.actualGrowthStage); 
        }
      } catch (err) {
        console.error("Failed to load active crop", err);
      } finally {
        setLoading(false);
      }
    }
    getActiveCrop();
  }, [fieldId]);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const validation = validate();

    if (validation) {
      setError(validation);
      return;
    }

    try {
      setLoading(true);

      await fieldUpdateService.create({
        fieldId,
        cropStage,
        notes,
        moisture: moisture
          ? Number(moisture)
          : undefined,
        temperature: temperature
          ? Number(temperature)
          : undefined,
        humidity: humidity
          ? Number(humidity)
          : undefined,
      });

      setSuccess(
        "Update submitted successfully."
      );

      setCropStage("");
      setMoisture("");
      setTemperature("");
      setHumidity("");
      setNotes("");

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          "Unable to submit update."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 md:p-8 shadow-xl backdrop-blur-sm max-w-3xl mx-auto w-full">
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {error && (
        <div className="rounded-lg bg-red-100 p-4 text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-lg bg-green-100 p-4 text-green-700">
          {success}
        </div>
      )}

     <label className="block text-sm font-medium text-gray-700">Current Crop Stage</label>
      <select
    value={cropStage}
    onChange={(e) => setCropStage(e.target.value)}
    className="w-full rounded border p-2 bg-white"
    required
  >
    <option value="">-- Select Current Stage --</option>
    <option value="PLANTED">Planted</option>
    <option value="GERMINATION">Germination</option>
    <option value="VEGETATIVE">Vegetative</option>
    <option value="FLOWERING">Flowering</option>
    <option value="FRUITING">Fruiting</option>
    <option value="HARVEST_READY">Harvest Ready</option>
    <option value="HARVESTED">Harvested</option>
  </select>
  {activeCrop && (
    <p className="text-xs text-gray-400 italic">
      Current baseline database stage: {activeCrop.actualGrowthStage}
    </p>
  )}

      <Input
        label="Moisture (%)"
        type="number"
        value={moisture}
        onChange={(e) =>
          setMoisture(e.target.value)
        }
        className="bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20"
      />

      <Input
        label="Temperature (°C)"
        type="number"
        value={temperature}
        onChange={(e) =>
          setTemperature(e.target.value)
        }
        className="bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20"
      />

      <Input
        label="Humidity (%)"
        type="number"
        value={humidity}
        onChange={(e) =>
          setHumidity(e.target.value)
        }
        className="bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20"
      />

      <div className="space-y-2">
        <label className="font-medium">
          Notes
        </label>

        <textarea
          value={notes}
          onChange={(e) =>
            setNotes(e.target.value)
          }
          rows={5}
          className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-green-600"
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Submitting..."
          : "Submit Update"}
      </Button>
    </form>
    </div>
  );
}