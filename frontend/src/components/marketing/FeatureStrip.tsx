
"use client"; 

import { useState } from "react"; 
const features = [
  {
    label: "Soil moisture",
    detail: "Track readings per field and catch drops before crops show stress.",
  },
  {
    label: "Crop stage",
    detail: "Know automatically where each crop sits from planting to harvest.",
  },
  {
    label: "Weather risk",
    detail: "See forecasted rain and heat against current field conditions.",
  },
  {
    label: "Alerts",
    detail: "Get notified the moment a field needs attention, not after.",
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
    <section id="features" className="mt-0 flex min-h-screen w-full items-center justify-center bg-field-paper px-6 text-field-dark">
      <div className="w-full max-w-5xl text-center">
        <p className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-field-dark/50">
          SmartSeason Features
        </p>

        <h2 className="font-display text-5xl font-bold md:text-7xl">
          {feature.label} 
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-field-dark/70 md:text-xl">
          {feature.detail} 
        </p>

        <div className="mt-12 flex items-center justify-center gap-6">

          <button
            onClick={previousFeature} 
            className="rounded-full border border-field-dark/20 px-5 py-3 transition hover:bg-field-dark hover:text-white"
          >
            ←
          </button>

          <div className="flex gap-2">
            {features.map((item, index) => (
              <button
                key={item.label}
                onClick={() => setCurrent(index)} 
                className={`h-2 rounded-full transition-all ${
                  index === current 
                    ? "w-8 bg-field-dark"
                    : "w-2 bg-field-dark/30"
                }`}
                aria-label={`Show ${item.label}`}
              />
            ))}
          </div>

          <button
            onClick={nextFeature} 
            className="rounded-full border border-field-dark/20 px-5 py-3 transition hover:bg-field-dark hover:text-white"
          >
            →
          </button>

        </div>
      </div>
    </section>
  );
}

