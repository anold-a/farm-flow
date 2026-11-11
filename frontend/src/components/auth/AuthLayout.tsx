
import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

interface Props {
  children: ReactNode;
}

export default function AuthLayout({ children }: Props) {
 
return (
    <div className=" bg-zinc-200 ">
      

        
        <div className="min-h-screen flex items-center justify-center px-8 py-8 lg:col-span-6 xl:col-span-5 m-2 rounded-xl shadow-sm">
          {children}
        </div>

      
    </div>
  );
}