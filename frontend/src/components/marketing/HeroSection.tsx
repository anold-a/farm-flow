import Link from "next/link";

const statusFacts = [
  { label: "Soil moisture", status: "healthy" },
  { label: "Crop stage", status: "healthy" },
  { label: "Weather risk", status: "attention" },
  { label: "Active alerts", status: "critical" },
];

const statusColor: Record<string, string> = {
  healthy: "bg-emerald-500",
  attention: "bg-field-gold",
  critical: "bg-red-500",
};



export default function HeroSection() {
  return (
    
    <section className="w-full bg-[url('/hero.jpg')] bg-cover bg-center px-6 py-19 text-gray-900 lg:px-8">
      <div className="mx-auto max-w-9xl rounded-3xl border border-white/20 bg-white/70 backdrop-blur-md px-8 py-16 text-center shadow-md sm:px-16">
        <h1 className="font-display text-4xl font-medium leading-[1.1] tracking-tight sm:text-6xl">
          Track field conditions before they become a problem.
        </h1>

        <p className=" mx-auto mt-6 max-w-xl text-lg text-gray-600">
          SmartSeason gives admins and field agents one shared view of soil
          moisture, crop stage and weather risk  so nothing gets caught
          too late.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          
          <Link  href="/register"
            className="rounded-md bg-emerald-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            Create your free account
          </Link>
          
        </div>

        <p className="mt-8 text-sm text-gray-500">
          Built for cooperatives and agronomy teams managing multiple fields at once.
        </p>
      </div>

      
          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
              {statusFacts.map((fact) => (
                <div key={fact.label} className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3">
                  <span 
                   className={`h-2 w-2 shrink-0 rounded-full ${statusColor[fact.status]}`}
              aria-hidden
                  />
                  <p className="text-xs text-gray-600">{fact.label}</p>
                </div>
              ))}
          
          </div>
        
    </section>
    
  );
}