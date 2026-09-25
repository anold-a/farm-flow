// components/reports/ExportButtons.tsx
import Button from "@/components/ui/Button";

interface Props {
  onExportCsv: () => void;
  onExportPdf: () => void;
}

export default function ExportButtons({ onExportCsv, onExportPdf }: Props) {
  return (
    <div className="flex items-center gap-3">
      
      <button 
        onClick={onExportCsv}
        className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 active:scale-[0.98] transition-all duration-200"
      >
        Export CSV
      </button>

      <button 
        onClick={onExportPdf}
        className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 active:scale-[0.98] transition-all duration-200"
      >
        Export PDF
      </button>
    </div>
  );
}
