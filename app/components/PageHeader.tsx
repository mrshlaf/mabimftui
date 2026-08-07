import type { LucideIcon } from "lucide-react";

export default function PageHeader({
  eyebrow,
  title,
  desc,
  bg = "/hero-mabim.jpg",
  icon: Icon,
}: {
  eyebrow: string;
  title: string;
  desc: string;
  bg?: string;
  icon?: LucideIcon;
}) {
  const word = (eyebrow.split(/\s+/)[0] ?? eyebrow).toUpperCase();

  return (
    <header className="mx-auto max-w-6xl px-4 pb-4 pt-4 sm:px-6 sm:pb-5 sm:pt-6 lg:px-8 lg:pb-6 lg:pt-8">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-teal-dark text-cream shadow-lift ring-1 ring-white/15">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15 grayscale"
          style={{ backgroundImage: `url('${bg}')` }}
          aria-hidden="true"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-accent/25 blur-3xl"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-6 -top-8 select-none font-heading text-[7rem] font-bold leading-none tracking-tight text-white/5 sm:text-[9rem]"
        >
          {word}
        </span>

        {Icon && (
          <span className="absolute right-6 top-6 grid h-12 w-12 place-items-center rounded-full bg-accent text-white shadow-lift sm:right-10 sm:top-10">
            <Icon className="h-6 w-6" />
          </span>
        )}

        <div className="relative mx-auto max-w-4xl px-6 py-14 sm:px-12 sm:py-16 lg:px-16">
          <p className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-accent backdrop-blur">
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-2xl font-heading text-3xl font-bold tracking-tight text-cream sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-cream/90 sm:text-base">
            {desc}
          </p>
        </div>
      </div>
    </header>
  );
}
