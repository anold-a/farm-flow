

const features = [
  {
    label: "Soil moisture",
    detail: "Track readings per field and catch drops before crops show stress.Every field update records a moisture reading, so you're never relying on a guess or a memory of when it last rained.",
  },
  {
    label: "Crop stage",
    detail: "Know automatically where each crop sits from planting to harvest.SmartSeason calculates where a crop should be :planted, flowering, ready for harvest  from its planting date, then flags it if the recorded stage falls behind.",
  },
  {
    label: "Weather risk",
    detail: "See forecasted rain and heat against current field conditions.Live forecasts are checked against current field conditions, so a heavy rain warning means something different for a field that's already saturated.",
  },
  {
    label: "Alerts",
    detail: "Get notified the moment a field needs attention, not after.Low moisture, extreme heat, a declining trend across recent updates or a field gone quiet for too long , each one raises a real, specific alert, not a generic warning.",
  },
  {
    label: "Role based access",
    detail:
      "Admins manage users, fields and the whole farm. Agents see and update only the fields assigned to them.Enforced on the backend, not just hidden in the interface.",
  },
  {
    label: "Recommendations",
    detail:
      "When conditions call for it, SmartSeason turns the data into a plain instruction irrigate now, delay watering, inspect in person  instead of leaving you to interpret numbers.",
  },
  {
    label: "Field history",
    detail:
      "Every update an agent submits stays on record, so a field's condition over the past weeks is something you can actually look back at, not just recall.",
  },
  {
    label: "Reports & exports",
    detail:
      "Fields, crops, alerts and analytics can all be pulled into a CSV, scoped to whatever you're authorized to see andd be ready to open in Excel or Sheets.",
  },
  {
    label: "Audit trail",
    detail:
      "Every meaningful change a user created, a field reassigned, a crop added is logged with who did it and when, so the system stays accountable, not just functional.",
  },
];

export default function FeatureStrip() {
  

  

  return (
    <section id="features" className="w-full bg-white px-6 py-24 text-gray-900 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-medium text-emerald-600">
          SmartSeason Features
        </p>

        <h2 className="mt-2 font-display text-3xl text-gray-900 sm:text-4xl">
          What SmartSeason actually does
        </h2>
          
          <div className="mt-2 grid gap-6 text-left sm:grid-cols-2 lg:grid-cols-3"> 
      {features.map((item) => (
        <div
          key={item.label}
          className="rounded-xl border border-gray-200 bg-emerald-50/40 p-6"
        >
          <h3 className="font-display text-lg text-gray-900">
            {item.label}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">
            {item.detail}
          </p>
        </div>
      ))}
    </div>
        

          
        </div>
      
    </section>
  );
}

