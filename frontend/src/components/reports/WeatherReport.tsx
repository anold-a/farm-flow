import Card from "@/components/ui/Card";
import { WeatherReportItem } from "@/types/reports";

interface Props {
  reports: WeatherReportItem[];
}

export default function WeatherReport({
  reports,
}: Props) {
  return (
    <Card>
      <h2 className="mb-4 text-xl font-semibold">
        Weather Trends
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">

          <thead>
            <tr className="border-b text-left">
              <th className="pb-3">
                Date
              </th>

              <th className="pb-3">
                Temperature
              </th>

              <th className="pb-3">
                Humidity
              </th>
            </tr>
          </thead>

          <tbody>
            {reports.map((report) => (
              <tr
                key={report.recordedAt}
                className="border-b"
              >
                <td className="py-3">
                  {new Date(report.recordedAt).toLocaleDateString()}
                </td>

                <td>
                  {report.temperature}°C
                </td>

                <td>
                  {report.humidity}%
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </Card>
  );
}