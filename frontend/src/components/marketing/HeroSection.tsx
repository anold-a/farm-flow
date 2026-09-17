const fieldTiles = [
  { name: "North Farm", status: "healthy" },
  { name: "Green Valley", status: "attention" },
  { name: "South Ridge", status: "healthy" },
  { name: "East Basin", status: "critical" },
  { name: "Lower Creek", status: "healthy" },
  { name: "Highland", status: "healthy" },
];

const statusColor: Record<string, string> = {
  healthy: "bg-emerald-500",
  attention: "bg-field-gold",
  critical: "bg-red-500",
};



export default function HeroSection() {
  return (
    <>
    <section className="bg-field-dark text-field-paper font-body">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <h1 className="font-display text-5xl font-medium leading-[1.1] tracking-tight sm:text-6xl">
          See every field's condition before it becomes a problem.
        </h1>

        <p className="mt-6 max-w-md text-lg text-field-paper/75">
          SmartSeason gives admins and field agents one shared view of soil
          moisture, crop stage, and weather risk — so nothing gets caught
          too late.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          
          <a  href="/register"
            className="rounded-md bg-field-gold px-6 py-3 font-body text-sm font-medium text-field-dark transition hover:brightness-95"
          >
            Create your account
          </a>
          
          <a  href="/login"
            className="text-sm font-medium text-field-paper/80 underline-offset-4 hover:underline"
          >
            Sign in
          </a>
        </div>

        <p className="mt-8 text-sm text-field-paper/50">
          Built for cooperatives and agronomy teams managing multiple fields at once.
        </p>
      </div>

      <div className="relative"> 
          <div className="rounded-2xl border border-field-paper/10 bg-white/3 p-6 backdrop-blur-sm">
            <p className="mb-4 text-sm text-field-paper/60">Field status, today</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {fieldTiles.map((tile) => (
                <div key={tile.name} className="rounded-lg bg-field-paper/6 p-3">
                  <span className={`inline-block h-2 w-2 rounded-full ${statusColor[tile.status]}`} />
                  <p className="mt-2 truncate text-xs text-field-paper/80">{tile.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
    </section>
    </>
  );
}