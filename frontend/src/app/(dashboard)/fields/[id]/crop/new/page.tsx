

"use client";

import { use } from "react";

import CropForm from "@/components/crop/CropForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CreateCropPage({
  params,
}: PageProps) {
  const { id: fieldId } = use(params);

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-3xl font-bold">
        Register Crop
      </h1>

      <CropForm fieldId={fieldId} />
    </div>
  );
}
