
import { ReactNode } from "react";
import Link from "next/link";


interface Props {
  children: ReactNode;
}

export default function AuthLayout({ children }: Props) {
 
return (
    <div className="relative min-h-screen bg-[#FAF7F0]">
      
<Link
        href="/"
        className="absolute left-5 top-5 z-10 text-sm font-medium text-emerald-900/70 transition hover:text-emerald-900"
      >
        ← Back to Website
      </Link>
        
        <div className="min-h-screen flex items-center justify-center px-6 py-12 ">
          {children}
        </div>

      
    </div>
  );
}