export default function PageHeader({
  eyebrow,
  title,
  desc,
  bg = "/hero-mabim.jpg",
}: {
  eyebrow: string;
  title: string;
  desc: string;
  bg?: string;
}) {
  return (
    <header className="mx-auto max-w-6xl px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-teal text-cream shadow-lift ring-1 ring-white/15">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35 grayscale"
          style={{ backgroundImage: `url('${bg}')` }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-4xl px-6 py-14 sm:px-12 sm:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent drop-shadow-[0_2px_8px_rgba(6,47,59,0.6)]">
            {eyebrow}
          </p>
          <h1 className="mt-3 max-w-2xl font-heading text-3xl font-bold tracking-tight text-white [text-shadow:0_2px_20px_rgba(6,47,59,0.8)] sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-cream/95 sm:text-base [text-shadow:0_1px_12px_rgba(6,47,59,0.9)]">
            {desc}
          </p>
        </div>
      </div>
    </header>
  );
}
