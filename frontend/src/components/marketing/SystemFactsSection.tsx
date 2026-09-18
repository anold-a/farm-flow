const systemFacts = [
  { value: "7", label: "Crop growth stages tracked, from planting to harvest" },
  { value: "3", label: "Alert severity levels — INFO, WARNING, CRITICAL" },
  { value: "2", label: "Distinct roles, each with its own view of the farm" },
  { value: "24/7", label: "Field conditions logged and monitored continuously" },
];

export default function SystemFactsSection() {
  return (
    <section className="bg-field-dark py-20 text-field-paper">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {systemFacts.map((fact) => (
            <div key={fact.label}>
              <p className="font-display text-4xl text-field-gold">
                {fact.value}
              </p>
              <p className="mt-2 text-sm text-field-paper/70">
                {fact.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}