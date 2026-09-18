
import HomeNav from "@/components/home/Nav";
import HeroSection from "@/components/marketing/HeroSection";
import FeatureStrip from "@/components/marketing/FeatureStrip";
import SystemFactsSection from "@/components/marketing/SystemFactsSection";
import MissionVisionSection from "@/components/marketing/MissionVisionSection"; 

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
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans ">
      <HeroSection />
      <FeatureStrip />
      <SystemFactsSection />
      <MissionVisionSection />
    </div>
    </div>
    
  );
}
