import { Activity } from "@/types/dashboard";

interface Props {
  activities: Activity[];
}

export default function RecentUpdates({
  activities,
}: Props) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6">
      <h2 className="mb-6 font-display text-xl text-gray-900">
        Recent Updates
      </h2>

      {activities.length === 0 ? (
        <p className="text-gray-500">
          No recent activity.
        </p>
      ) : (
        <div className="relative pl-6">
          <div className="absolute left-1.75 top-1 h-full w-px bg-gray-200" aria-hidden /> 
        <ul className="space-y-4">
          {activities.map((activity) => (
            <li
              key={activity.id}
              className="relative"
            >
              <span className="absolute -left-6 top-1 h-3 w-3 rounded-full border-2 border-emerald-600 bg-white" aria-hidden />

              <h3 className="font-medium text-gray-900">
                {activity.title}
              </h3>

              <p className="mt-1 text-sm text-gray-600">
                {activity.description}
              </p>

              <span className="mt-1 block text-xs text-gray-400">
                {new Date(
                  activity.createdAt
                ).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
        </div>
      )}
    </section>
  );
}