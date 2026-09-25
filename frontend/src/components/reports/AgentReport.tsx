import Card from "@/components/ui/Card";
import { AgentReportItem } from "@/types/reports";

interface Props {
  reports: AgentReportItem[];
}

export default function AgentReport({ reports }: Props) {
  return (
    <Card className="overflow-hidden border border-gray-100 shadow-sm rounded-xl bg-white">
      
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-900">Agent Performance</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm text-gray-500">
         
          <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-600">
            <tr>
              <th scope="col" className="px-6 py-3">Agent</th>
              <th scope="col" className="px-6 py-3 text-center">Assigned Fields</th>
              <th scope="col" className="px-6 py-3 text-center">Total Updates</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {reports.map((agent) => (
              <tr key={agent.id} className="hover:bg-gray-50/70 transition-colors">
                
                <td className="px-6 py-4 font-semibold text-gray-900">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    {agent.fullName}
                  </div>
                </td>
                <td className="px-6 py-4 text-center font-medium text-gray-700">{agent.fieldCount}</td>
                <td className="px-6 py-4 text-center">
                  
                  <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    {agent.updateCount} updates
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
