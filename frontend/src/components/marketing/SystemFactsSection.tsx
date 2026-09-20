"use client";

import { useEffect, useRef, useState } from "react";
import { useCountUp } from "@/hooks/useCountUp";


const systemFacts = [
  { value: 7,suffix: "", label: "Crop growth stages tracked, from planting to harvest" },
  { value: 3,suffix: "", label: "Alert severity levels — INFO, WARNING, CRITICAL" },
  { value: 2, suffix: "",  label: "Distinct roles, each with its own view of the farm" },
  { value: 24, suffix: "/7", label: "Field conditions logged and monitored continuously" },
];

function FactCard({ target, suffix, label, active }: { target: number; suffix: string; label: string; active: boolean }) {
  const count = useCountUp(target, active);

  return (
    <div className="rounded-xl bg-field-dark px-6 py-8 text-center">
      <p className="font-display text-3xl text-field-gold">
        {count}{suffix}
      </p>
      <p className="mt-2 text-xs text-field-paper/70">{label}</p>
    </div>
  );
}


export default function SystemFactsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); 
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <section id="facts" ref={sectionRef} className=" py-20   bg-field-paper/70 w-full">
      <div className="mx-auto max-w-5xl px-1 lg:px-1">
        <p className="text-sm font-medium text-field-gold">Stats</p>
        <h2 className="mt-2 font-display text-3xl text-field-dark sm:text-4xl">
          What SmartSeason is built on
        </h2>
        <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {systemFacts.map((fact) => (
            <FactCard  key={fact.label} target={fact.value} {...fact} active={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}