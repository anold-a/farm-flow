import Link from "next/link";
import Button from "../ui/Button";

interface Props {
  role: "ADMIN" | "AGENT";
}

export default function QuickActions({
  role,
}: Props) {
  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">
        Quick Actions
      </h2>

      <div className="flex flex-wrap gap-3">
        {role === "ADMIN" && (
          <>
            <Link href="/users">
              <Button>+ Add User</Button>
            </Link>

            <Link href="/fields/create">
              <Button>+ Add Field</Button>
            </Link>

            <Link href="/reports">
              <Button>View Reports</Button>
            </Link>
          </>
        )}

        {role === "AGENT" && (
          <Link href="/my-fields">
            <Button>My Fields</Button>
          </Link>
        )}

        <Link href="/weather">
          <Button>Weather</Button>
        </Link>

        <Link href="/notifications">
          <Button>View Notifications</Button>
        </Link>
      </div>
    </section>
  );
}