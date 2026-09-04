import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?:string;
};

export default function Card({
  children,
  className =""

}: CardProps) {
  return (
    <div  className={`rounded-xl border border-gray-200 text-black bg-white shadow-sm p-6`}>
      {children}
    </div>
  );
}