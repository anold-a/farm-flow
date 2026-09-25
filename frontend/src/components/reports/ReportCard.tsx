import Card from "@/components/ui/Card";

interface Props {
  title: string;
  value: number | string;
  
}

export default function ReportCard({ title, value }: Props) {
  return (
    
    <Card className="p-6 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          {title}
        </p>
        
        <div className="h-2 w-2 rounded-full bg-emerald-500/20 ring-4 ring-emerald-50" />
      </div>

      <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl font-mono">
        {value}
      </h2>
    </Card>
  );
}
