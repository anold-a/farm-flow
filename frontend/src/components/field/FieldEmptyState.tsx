import Link from "next/link";
import Button from "@/components/ui/Button";

export default function FieldEmptyState() {
  return (
    <div className="rounded-lg border border-dashed p-10 text-center">
      <h2 className="text-2xl font-display text-gray-900">
        No active fields found
      </h2>

      <p className="mt-3 text-gray-600">
       Your request access is underway.A farm field will be assigned to you.
      </p>

      <div className="mt-6">
        <Link href="#">
          <Button>
            Watch Demo
          </Button>
        </Link>
      </div>
    </div>
  );
}