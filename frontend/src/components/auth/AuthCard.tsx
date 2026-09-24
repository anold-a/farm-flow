import { ReactNode } from "react";
import Card from "@/components/ui/Card";

interface Props {
  title:string,
  children: ReactNode;
}

export default function AuthCard({
   title,
  children,
}: Props) {
  return (
    <Card>
      <div className="mx-auto w-full max-w-md space-y-6">

        <p className="font-display text-3xl font-bold tracking-tight text-emerald-500 sm:text-2xl">{title}</p>

        {children}

      </div>
    </Card>
  );
}