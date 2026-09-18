const items = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
        <path d="M12 2v20M12 8c-4 0-7 3-7 7M12 14c4 0 7-3 7-7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: "Mission",
    title: "Help farm teams catch problems before they cost a harvest",
    description:
      "SmartSeason turns scattered field updates into role-based, actionable intelligence — so admins and agents always know which fields need attention, and why.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.5 4 5.5 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.5-4-9s1.5-6.5 4-9z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: "Vision",
    title: "A world where every field is watched, not guessed at",
    description:
      "Farm management should move from guesswork to real-time awareness — moisture, growth stage, and weather working together to protect every harvest.",
  },
];

export default function MissionVisionSection() {
  return (
    <section className="bg-field-paper/60 py-20">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <p className="text-sm font-medium text-field-gold">Mission &amp; Vision</p>
        <h2 className="mt-2 font-display text-3xl text-field-dark sm:text-4xl">
          Why SmartSeason exists, and where it's headed
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {items.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-field-dark/10 bg-white p-8"
            >
              <div className="flex items-center gap-2 text-field-gold">
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </div>

              <h3 className="mt-4 font-display text-xl text-field-dark">
                {item.title}
              </h3>

              <p className="mt-3 text-sm text-field-dark/70">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}