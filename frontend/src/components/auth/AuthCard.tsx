import { ReactNode } from "react";
import Card from "@/components/ui/Card";
import Link from "next/link";

interface Props {
  title:string,
  children: ReactNode;
  className?:string,
}

export default function AuthCard({
   title,
  children,
  className
}: Props) {
  return (
    <Card>
      <div className="mx-auto w-full  max-w-md space-y-6">
        <div className="absolute top-6 left-6 z-10">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded bg-emerald-500 px-3 py-2.5 text-xs font-medium text-white transition hover:bg-emerald-700 backdrop-blur-sm"
            >
              ← Back to Website
            </Link>
          </div>

        <p className="font-display text-3xl font-bold tracking-tight text-emerald-500 sm:text-2xl">{title}</p>

        {children}

      </div>
    </Card>
  );
}