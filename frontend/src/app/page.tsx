
import HomeNav from "@/components/home/Nav";

import { Fraunces, IBM_Plex_Sans } from "next/font/google";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-display" });
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

export default function Home() {
  return (
    <div className={`${fraunces.variable} ${plexSans.variable} h-full antialiased`}>
    <HomeNav />
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans bg-#f5f5f6">
      
    </div>
    </div>
    
  );
}
