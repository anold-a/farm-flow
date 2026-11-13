import { ReactNode } from "react";

type CardProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export default function Card({
  title,
  description,
  children

}: CardProps) {
  return (
     <section className="grid gap-4 border-b border-gray-200 py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
      <div>
        <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
      <div>{children}</div>
    </section>
  );
  
}