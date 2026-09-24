import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

interface Props {
  children: ReactNode;
}

const fieldTiles = [
  { name: "North Farm", status: "healthy" },
  { name: "Green Valley", status: "attention" },
  { name: "South Ridge", status: "healthy" },
  { name: "East Basin", status: "critical" },
  { name: "Lower Creek", status: "healthy" },
  { name: "Highland", status: "healthy" },
];

const statusColor: Record<string, string> = {
  healthy: "bg-emerald-500",
  attention: "bg-amber-500",
  critical: "bg-red-500",
};

export default function AuthLayout({ children }: Props) {
  return (
    
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4 sm:p-8 lg:p-12">
      
     
      <div className="grid w-full max-w-6xl min-h-[600px] overflow-hidden rounded-2xl border-8 border-emerald-500 bg-emerald-500 lg:grid-cols-12 shadow-xl">
        
        
        <div className="flex flex-col justify-center bg-white px-8 py-12 lg:col-span-6 xl:col-span-5 rounded-xl m-2 sm:m-4 shadow-sm">
          {children}
        </div>

        
        <div className="relative hidden flex-col items-center justify-center p-8 lg:flex lg:col-span-6 xl:col-span-7 text-white">
          
          
          <div className="absolute top-6 left-6 z-10">
            <Link 
              href="/" 
              className="inline-flex items-center gap-1.5 rounded bg-white/10 border border-white/20 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-white/20 backdrop-blur-sm"
            >
              ← Back to Website
            </Link>
          </div>

          
          <div className="w-full max-w-md space-y-6 text-center z-10 mt-4">
            <div>
              <p className="font-display text-2xl font-bold tracking-tight text-white drop-shadow-sm">
                Know your fields at a glance
              </p>
              <p className="mt-2 text-sm text-emerald-100">
                Every field's status, in one place — the moment you sign in.
              </p>
            </div>

            
            <div className="rounded-xl border border-white/20 bg-white/10 backdrop-blur-md p-6 text-left shadow-inner">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-200 mb-4">Live Field Dashboard</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {fieldTiles.map((tile) => (
                  <div key={tile.name} className="rounded-lg bg-white/90 p-3 shadow-sm border border-emerald-100 transition hover:scale-[1.02] duration-200">
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 shrink-0 rounded-full ${statusColor[tile.status]}`} aria-hidden />
                      <span className="text-[10px] font-bold uppercase text-gray-400">{tile.status}</span>
                    </div>
                    <p className="mt-2 truncate text-xs font-semibold text-gray-800">{tile.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          
          <div className="absolute bottom-4 right-4 opacity-15 pointer-events-none">
            <svg width="120" height="120" viewBox="0 0 100 100" fill="currentColor" className="text-white">
              <path d="M50 15C30 15 15 30 15 50s15 35 35 35 35-15 35-35S70 15 50 15zm0 60C36.2 75 25 63.8 25 50S36.2 25 50 25s25 11.2 25 25-11.2 25-25 25z"/>
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
}
