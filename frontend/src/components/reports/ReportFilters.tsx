"use client";

interface Props {
  selectedCrop: string;
  onCropChange: (value: string) => void;
  selectedPeriod: string;
  onPeriodChange: (value: string) => void;
}

export default function ReportFilters({
  selectedCrop,
  onCropChange,
  selectedPeriod,
  onPeriodChange,
}: Props) {
  return (
    
    <div className="flex flex-wrap items-center gap-6 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto">
        
       
        <div className="flex items-center gap-2 flex-1 sm:flex-initial">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 whitespace-nowrap">
            Crop:
          </label>
          <select
            value={selectedCrop}
            onChange={(e) => onCropChange(e.target.value)}
            className="w-full sm:w-40 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-700 focus:border-emerald-500 focus:bg-white focus:outline-none transition-colors"
          >
            <option value="">All Crops</option>
            <option value="Maize">Maize</option>
            <option value="Beans">Beans</option>
            <option value="Rice">Rice</option>
            <option value="Coffee">Coffee</option>
          </select>
        </div>

       
        <div className="flex items-center gap-2 flex-1 sm:flex-initial">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 whitespace-nowrap">
            Period:
          </label>
          <select
            value={selectedPeriod}
            onChange={(e) => onPeriodChange(e.target.value)}
            className="w-full sm:w-44 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-700 focus:border-emerald-500 focus:bg-white focus:outline-none transition-colors"
          >
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 90 Days</option>
            <option value="365">Last Year</option>
          </select>
        </div>

      </div>
    </div>
  );
}
