
"use client"; import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { cropService } from "@/services/crop.service";
import { CreateCropDto } from "@/types/crop";

interface CropFormProps { fieldId: string; }

export default function CropForm({fieldId}:CropFormProps){
  const router = useRouter();

  const [formData,setFormData] = useState<CreateCropDto>({
    name:"",
    variety: "", 
    plantingDate: new Date(),
    expectedHarvestDate: new Date(),

  });

  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");
  const [success,setSuccess] = useState("");

  function handleChange(
    event:React.ChangeEvent<HTMLInputElement>
  ){

    const {name,value} = event.target;
    setFormData((previous) =>({
      ...previous,
      [name]:name === "plantingDate" || name === "expectedHarvestDate" ? new Date(value) : value,
    }))

  }

  function validateForm() {
    if (!formData.name.trim()) {
      return "Field name is required.";
    }

    if (!formData.variety.trim()) {
      return "Crop variety is required.";
    }

    if (!formData.plantingDate) {
      return "Planting date is required.";
    }

    if (!formData.expectedHarvestDate) {
      return "Expected harvest date is required.";
    }

    if (formData.expectedHarvestDate <= formData.plantingDate) {
      return "Expected harvest date must be after the planting date.";
    }

    return "";
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const validationError =
      validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      await cropService.create(
        fieldId,
         formData
      );

      setSuccess(
        "Crop created successfully."
      );

      setTimeout(() => {
        router.push(`/fields/${fieldId}`);
      }, 1000);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          "Unable to register crop."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
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

      <Input
        label="Crop Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Coffee"
        className=""
      />

      <Input
        label="Variety"
        name="variety"
        value={formData.variety}
        onChange={handleChange}
        placeholder="Arabica (SL28)"
        className=""
      />
      
      <Input
        label="Planting Date"
        name="plantingDate"
        type="date"
        value={formData.plantingDate .toISOString() .split("T")[0]}
        onChange={handleChange}
        className=""
      />

      <Input
        label="Expected Harvest Date"
        name="expectedHarvestDate"
        value={formData.expectedHarvestDate .toISOString() .split("T")[0]}
        onChange={handleChange}
        className=""
      />

      <Button
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Registering..."
          : "Register Crop"}
      </Button>
    </form>
  );

}