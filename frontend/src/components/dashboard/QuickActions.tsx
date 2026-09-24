import Link from "next/link";
import Button from "../ui/Button";

interface Props {
  role: "ADMIN" | "AGENT";
}

export default function QuickActions({
  role,
}: Props) {
  return (
    <section className="flex flex-wrap items-center gap-3 rounded-2xl border border-gray-200 bg-white px-6 py-4">
      <span className="mr-2 text-sm font-medium text-gray-500">Quick actions</span> 

        {role === "ADMIN" && (
          <>
            <Link href="/users"><Button>Add User</Button></Link>
            <Link href="/fields/create"><Button>Add Field</Button></Link>
            <Link href="/reports"><Button>View Reports</Button></Link>
          </>
        )}

        {role === "AGENT" && (
          <Link href="/my-fields"><Button>My Fields</Button></Link>
        )}

        <Link href="/weather"><Button>Weather</Button></Link>
        <Link href="/notifications"><Button>View Notifications</Button></Link>
    </section>
  );
}