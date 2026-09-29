
import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

interface Props {
  children: ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4 sm:p-8">
      <div className="grid w-full max-w-6xl min-h-130 max-h-162.5 overflow-hidden rounded-2xl border-8 border-emerald-500 bg-emerald-500 shadow-xl lg:grid-cols-12">

        
        <div className="flex items-center justify-center bg-white px-8 py-8 lg:col-span-6 xl:col-span-5 m-2 rounded-xl shadow-sm">
          {children}
        </div>

       
        <div className="relative hidden items-center justify-center lg:flex lg:col-span-6 xl:col-span-7 text-white">

          <div className="absolute top-6 left-6 z-10">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded bg-white/10 border border-white/20 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-white/20 backdrop-blur-sm"
            >
              ← Back to Website
            </Link>
          </div>

          <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-emerald-50">
            <div className="absolute inset-0 bg-emerald-900/5" />

            <div className="relative z-10 flex items-center justify-center p-10">
              <Image
                src="/layout.svg"
                alt="Smart farming"
                className="w-full max-w-xl"
                width={250}
                height={250}
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}