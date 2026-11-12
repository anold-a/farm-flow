import Link from "next/link";

const statusFacts = [
  { label: "Soil moisture", status: "healthy" },
  { label: "Crop stage", status: "healthy" },
  { label: "Weather risk", status: "attention" },
  { label: "Active alerts", status: "critical" },
];





export default function HeroSection() {
  return (
    
    <section className=" flex min-h-150 flex-col w-full  py-10 text-gray-900 px-6 lg:px-8 justify-between bg-emerald-50  lg:py-14">
      
      <div className="mt-18 mx-auto w-full max-w-7xl">
        <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-widest text-emerald-800">
          
          Farm flow - Field monitoring
        </p>

        <h1 className=" font-serif text-4xl font-normal leading-[1.1] tracking-tight sm:text-6xl mt-4 max-w-2xl ">
          Track field conditions <span className="">before</span> they become a problem.
        </h1>

       <div className="mx-auto mt-16 flex w-full max-w-7xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        
        <div className="grid max-w-xl grid-cols-2 gap-2 sm:grid-cols-4">
          {statusFacts.map((fact) => (
            <div
              key={fact.label}
              className="flex items-center gap-2 rounded-sm border border-emerald-100 bg-white px-3 py-3 shadow-sm"
            >
             
              <p className="text-xs text-gray-600">{fact.label}</p>
            </div>
          ))}
        </div>

        <div className="max-w-sm">
          
          <p className="text-sm leading-relaxed text-gray-600">
            SmartSeason gives admins and field agents one shared view of soil
            moisture, crop stage and weather risk so nothing gets caught too late.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            
            <Link
              href="/register"
              className="rounded-sm bg-emerald-600 px-4 py-2 text-xs font-medium uppercase tracking-wide text-white transition hover:bg-emerald-700 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              Create your free account
            </Link>

            
            <Link
              href="/login"
              className="rounded-sm border border-emerald-200 bg-white px-4 py-2 text-xs font-medium uppercase tracking-wide text-emerald-900 transition hover:bg-emerald-100"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>

      
      </div>

      
          
        
    </section>
    
  );
}