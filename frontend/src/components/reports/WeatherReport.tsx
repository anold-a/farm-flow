// components/reports/WeatherReport.tsx
import Card from "@/components/ui/Card";
import { WeatherReportItem } from "@/types/reports";

interface Props {
  reports: WeatherReportItem[];
}

export default function WeatherReport({ reports }: Props) {
  return (
    <div className="overflow-hidden border border-gray-100 shadow-sm rounded-xl bg-white">
      <div className="px-4 py-4 border-b border-gray-100">
        <h2 className="text-base font-bold text-gray-900">Weather Trends</h2>
      </div>

      <div className="w-full overflow-x-auto">
        
        <table className="w-full table-auto text-left text-xs text-gray-500">
          <thead className="bg-gray-50 font-semibold uppercase tracking-wider text-gray-600">
            <tr>
              <th scope="col" className="px-3 py-3 whitespace-nowrap">Date</th>
              <th scope="col" className="px-2 py-3 text-center whitespace-nowrap">Temp</th>
              <th scope="col" className="px-3 py-3 text-right whitespace-nowrap">Humidity</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {reports.map((report) => (
              <tr key={report.recordedAt} className="hover:bg-gray-50/70 transition-colors">
                <td className="px-3 py-3 font-medium text-gray-900 whitespace-nowrap">
                  {new Date(report.recordedAt).toLocaleDateString(undefined, {
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </td>

                <td className="px-2 py-3 text-center font-mono font-medium text-amber-600">
                  {report.temperature}°C
                </td>

                <td className="px-3 py-3 text-right font-mono font-medium text-blue-600">
                  {report.humidity}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
