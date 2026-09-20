
"use client"; 

import { useState } from "react"; 
const features = [
  {
    label: "Soil moisture",
    detail: "Track readings per field and catch drops before crops show stress.Every field update records a moisture reading, so you're never relying on a guess or a memory of when it last rained.",
  },
  {
    label: "Crop stage",
    detail: "Know automatically where each crop sits from planting to harvest.SmartSeason calculates where a crop should be — planted, flowering, ready for harvest — from its planting date, then flags it if the recorded stage falls behind.",
  },
  {
    label: "Weather risk",
    detail: "See forecasted rain and heat against current field conditions.Live forecasts are checked against current field conditions, so a heavy-rain warning means something different for a field that's already saturated.",
  },
  {
    label: "Alerts",
    detail: "Get notified the moment a field needs attention, not after.Low moisture, extreme heat, a declining trend across recent updates, or a field gone quiet for too long — each one raises a real, specific alert, not a generic warning.",
  },
  {
    label: "Role-based access",
    detail:
      "Admins manage users, fields, and the whole farm. Agents see and update only the fields assigned to them — enforced on the backend, not just hidden in the interface.",
  },
  {
    label: "Recommendations",
    detail:
      "When conditions call for it, SmartSeason turns the data into a plain instruction — irrigate now, delay watering, inspect in person — instead of leaving you to interpret numbers.",
  },
  {
    label: "Field history",
    detail:
      "Every update an agent submits stays on record, so a field's condition over the past weeks is something you can actually look back at, not just recall.",
  },
  {
    label: "Reports & exports",
    detail:
      "Fields, crops, alerts, and analytics can all be pulled into a CSV, scoped to whatever you're authorized to see — ready to open in Excel or Sheets.",
  },
  {
    label: "Audit trail",
    detail:
      "Every meaningful change — a user created, a field reassigned, a crop added — is logged with who did it and when, so the system stays accountable, not just functional.",
  },
];

export default function FeatureStrip() {
  const [current, setCurrent] = useState(0); 

  const nextFeature = () => { 
    setCurrent((current + 1) % features.length);
  };

  const previousFeature = () => {
    setCurrent((current - 1 + features.length) % features.length);
  };

  const feature = features[current]; 

  return (
    <section id="features" className="w-full bg-field-paper px-6 py-24 text-field-dark">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-medium text-field-gold">
          SmartSeason Features
        </p>

        <h2 className="mt-2 font-display text-3xl text-field-dark sm:text-4xl">
          What SmartSeason actually does
        </h2>
          
          <div className="mt-2 grid gap-6 text-left sm:grid-cols-2 lg:grid-cols-3"> 
      {features.map((item) => (
        <div
          key={item.label}
          className="rounded-xl border border-field-dark/10 bg-linear-to-br from-[#673de6] via-[#471ea7] to-[#331c74] p-6"
        >
          <h3 className="font-bold text-lg text-field-gold">
            {item.label}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white">
            {item.detail}
          </p>
        </div>
      ))}
    </div>
        

          
        </div>
      
    </section>
  );
}

