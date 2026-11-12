import { ReactNode } from "react";
import Image from "next/image";


interface Props {
  title:string,
  subtitle?: string;
  children: ReactNode;
  className?:string,
}

export default function AuthCard({
   title,
  children,
  className ="",
  subtitle
}: Props) {
  return (
    
      <div className={`mx-auto w-full border rounded-sm bg-emerald-50 px-4 py-6 max-w-lg ${className}`}>
        <div className="flex justify-between">
       <div className="flex flex-col items-center text-center">
        <Image src="/farmflow-logo.svg" alt="FarmFlow logo" width={64} height={64} priority />
        <p className="mt-3 font-serif text-3xl font-semibold tracking-tight text-emerald-900">
          Farm<span className="text-emerald-600">Flow</span>
        </p>
        
        <p className="mt-1 text-xs tracking-wide text-gray-500">Plan. Monitor. Harvest.</p>
        <div className="mt-4 h-0.5 w-10 rounded bg-emerald-800" />
      </div>

      
      <div className="mt-20 text-center">
        <h1 className="font-serif text-2xl font-bold text-emerald-950">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-gray-600">{subtitle}</p>}
      </div>
      </div>

        

        <div className="mt-6">{children}</div>

      </div>
    
  );
}