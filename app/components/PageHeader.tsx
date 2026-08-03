import type { LucideIcon } from "lucide-react";
import Image from "next/image";

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
  return (
    <header className="mx-auto max-w-6xl px-4 pb-4 pt-4 sm:px-6 sm:pb-6 sm:pt-6 lg:px-8 lg:pb-8 lg:pt-8">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-teal shadow-lift ring-1 ring-white/15">
        <div
          className="absolute inset-0 bg-cover bg-center grayscale"
          style={{ backgroundImage: `url('${bg}')` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-teal-dark/60" aria-hidden="true" />
        <Image
          src="/logo-mabim.png"
          alt=""
          aria-hidden="true"
          width={480}
          height={480}
          priority
          className="pointer-events-none absolute -bottom-10 -right-6 h-44 w-44 object-contain opacity-10 sm:-right-8 sm:h-64 sm:w-64 lg:h-72 lg:w-72"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-1 bg-accent"
          aria-hidden="true"
        />

        {Icon && (
          <span className="absolute right-6 top-6 grid h-12 w-12 place-items-center rounded-2xl bg-accent text-white shadow-lift sm:right-10 sm:top-10">
            <Icon className="h-6 w-6" />
          </span>
        )}

        <div className="relative mx-auto min-h-[264px] max-w-4xl px-6 py-16 sm:min-h-[320px] sm:px-12 sm:py-24 lg:px-16">
          <p className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.25em] text-accent backdrop-blur">
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-2xl font-heading text-3xl font-bold tracking-tight text-white [text-shadow:0_2px_20px_rgba(6,47,59,0.8)] sm:text-4xl lg:text-5xl">
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
