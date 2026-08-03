export default function PageHeader({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc: string;
}) {
  return (
    <header className="relative overflow-hidden bg-teal px-4 py-10 text-cream sm:py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(241,132,42,0.16),transparent_55%)]" />
      <div className="relative mx-auto max-w-4xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </p>
        <h1 className="mt-2 text-2xl font-bold sm:text-3xl">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm text-cream/80 sm:text-base">
          {desc}
        </p>
      </div>
    </header>
  );
}
