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
    <header className="relative overflow-hidden bg-teal text-cream">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(9,65,82,0.82), rgba(6,47,59,0.93)), url('${bg}')`,
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(241,132,42,0.14),transparent_55%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-cream to-transparent"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-4xl px-4 py-12 sm:py-16">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
          {eyebrow}
        </p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-sm text-cream/85 sm:text-base">
          {desc}
        </p>
      </div>
    </header>
  );
}
