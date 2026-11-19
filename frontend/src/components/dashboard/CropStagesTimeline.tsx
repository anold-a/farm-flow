"use client";

const STAGE_SEQUENCE = [ 
  { key: "PLANTED", label: "Planted", day: 0 },
  { key: "GERMINATION", label: "Germination", day: 7 },
  { key: "VEGETATIVE", label: "Vegetative", day: 21 },
  { key: "FLOWERING", label: "Flowering", day: 45 },
  { key: "FRUITING", label: "Fruiting", day: 70 },
  { key: "HARVEST_READY", label: "Harvest Ready", day: 100 },
];

interface Props {
  cropName: string;
  plantingDate: string;
  currentStage: string;
}

export default function CropStagesTimeline({ cropName, plantingDate, currentStage }: Props) {
  const currentIndex = STAGE_SEQUENCE.findIndex((s) => s.key === currentStage);

  return (
    <div className="mt-10 overflow-x-auto  bg-[#F8F7F4] shadow-sm p-6">
      <h2 className="text-sm font-medium text-neutral-800">Crop Stage Timeline</h2>
      <p className="mt-1 font-display text-lg text-neutral-950">{cropName}</p>

      <div className="relative mt-8 flex justify-between">
        <div className="absolute left-0 right-0 top-2 h-px bg-slate-800" aria-hidden /> 

        {STAGE_SEQUENCE.map((stage, index) => {
          const reached = index <= currentIndex;
          const stageDate = new Date(plantingDate);
          stageDate.setDate(stageDate.getDate() + stage.day);

          return (
            <div key={stage.key} className="relative z-10 flex flex-col items-center">
              <span
                className={`h-4 w-4 rounded-full border-2 ${
                  reached ? "border-emerald-400 bg-emerald-400" : "border-slate-700 bg-neutral-950"
                }`}
                aria-hidden
              />
              <p className={`mt-2 text-xs ${reached ? "text-neutral-950" : "text-neutral-600"}`}>{stage.label}</p>
              <p className="text-[10px] text-neutral-950">
                {stageDate.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}