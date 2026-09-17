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
    </section>
    </>
  );
}