import Card from "@/components/ui/Card";
import { CropReportItem, ReportStatistics } from "@/types/reports";

interface Props {
  reports: CropReportItem[];
  statistics: ReportStatistics;
}

export default function CropReport({ reports, statistics }: Props) {
  return (
    <Card className="overflow-hidden border border-gray-100 shadow-sm rounded-xl bg-white">
     
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-900">Crop Performance</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm text-gray-500">
          
          <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-600">
            <tr>
              <th scope="col" className="px-6 py-3">Crop Name</th>
              <th scope="col" className="px-6 py-3">Location / Field</th>
              <th scope="col" className="px-6 py-3 text-right">Avg. Acreage (ha)</th>
            </tr>
          </thead>

         
          <tbody className="divide-y divide-gray-100 bg-white">
            {reports.map((report) => (
              <tr key={report.fieldId} className="hover:bg-gray-50/70 transition-colors">
                <td className="px-6 py-4 font-semibold text-gray-900">{report.crop}</td>
                <td className="px-6 py-4 text-gray-600">{report.fieldName}</td>
                
                <td className="px-6 py-4 text-right font-mono text-gray-900 font-medium">
                  {statistics.averageAcreage}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
