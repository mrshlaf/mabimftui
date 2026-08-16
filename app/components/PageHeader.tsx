import type { LucideIcon } from "lucide-react";

const AURORA: { color: string; className: string; delay: string }[] = [
  {
    color: "rgba(217, 101, 26, 0.30)",
    className: "-left-24 -top-24 h-96 w-96",
    delay: "0s",
  },
  {
    color: "rgba(251, 191, 36, 0.14)",
    className: "bottom-0 right-1/4 h-80 w-80",
    delay: "-9s",
  },
  {
    color: "rgba(6, 47, 59, 0.55)",
    className: "-bottom-16 -right-16 h-96 w-96",
    delay: "-17s",
  },
];

export default function PageHeader({
  eyebrow,
  title,
  desc,
  bg = "/hero-mabim.jpg",
  icon: Icon,
  accentWord,
}: {
  eyebrow: string;
  title: string;
  desc: string;
  bg?: string;
  icon?: LucideIcon;
  accentWord?: string;
}) {
  const word = (eyebrow.split(/\s+/)[0] ?? eyebrow).toUpperCase();
  const parts =
    accentWord && title.includes(accentWord)
      ? title.split(accentWord)
      : null;

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
          className="pointer-events-none absolute inset-0"
        >
          {AURORA.map((b) => (
            <span
              key={b.color + b.delay}
              className={`aurora-blob ${b.className}`}
              style={{
                background: `radial-gradient(closest-side, ${b.color}, transparent 70%)`,
                animationDelay: b.delay,
              }}
            />
          ))}
        </div>
        <div aria-hidden="true" className="hero-beam" />
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
          <p
            className="hero-fade inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-accent backdrop-blur"
            style={{ animationDelay: "0.05s" }}
          >
            {eyebrow}
          </p>
          <h1
            className="hero-fade mt-5 max-w-2xl font-heading text-3xl font-bold tracking-tight text-cream sm:text-4xl lg:text-5xl"
            style={{ animationDelay: "0.12s" }}
          >
            {parts ? (
              <>
                {parts[0]}
                <span className="bg-gradient-to-r from-cream via-white to-accent bg-clip-text text-transparent">
                  {accentWord}
                </span>
                {parts[1]}
              </>
            ) : (
              title
            )}
          </h1>
          <p
            className="hero-fade mt-3 max-w-2xl text-sm text-cream/90 sm:text-base"
            style={{ animationDelay: "0.19s" }}
          >
            {desc}
          </p>
        </div>
      </div>
    </header>
  );
}
