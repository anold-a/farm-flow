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
  return (
    <section className="bg-field-paper py-16 text-field-dark">
      <div className="mx-auto max-w-6xl divide-y divide-field-dark/10 px-6 lg:px-8">
        {features.map((feature) => (
          <div
            key={feature.label}
            className="grid gap-2 py-6 sm:grid-cols-[220px_1fr] sm:items-baseline sm:gap-8"
          >
            <h3 className="font-display text-xl">{feature.label}</h3>
            <p className="text-field-dark/70">{feature.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}