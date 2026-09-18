const systemFacts = [
  { value: "7",suffix: "", label: "Crop growth stages tracked, from planting to harvest" },
  { value: "3",suffix: "", label: "Alert severity levels — INFO, WARNING, CRITICAL" },
  { value: "2", suffix: "",  label: "Distinct roles, each with its own view of the farm" },
  { value: "24/7", suffix: "/7", label: "Field conditions logged and monitored continuously" },
];

export default function SystemFactsSection() {
  return (
    <section className=" py-20 bg-field-paper/70 w-full">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <p className="text-sm font-medium text-field-gold">Stats</p>
        <h2 className="mt-2 font-display text-3xl text-field-dark sm:text-4xl">
          What SmartSeason is built on
        </h2>
        <div className=" mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {systemFacts.map((fact) => (
            <div key={fact.label}
            className="rounded-xl bg-field-dark px-6 py-8 text-center"
            >
                <p className="font-display text-3xl text-field-gold">
                {fact.target}{fact.suffix}
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