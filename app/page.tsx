import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Compass,
  LayoutDashboard,
  Megaphone,
  Phone,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Countdown from "./components/Countdown";
import VideoTeaser from "./components/VideoTeaser";
import { statistik, DEPARTEMEN_WARNA } from "@/data/statistik";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  description:
    "Satu pintu informasi Mabim FTUI 2026: dashboard pribadi untuk cari kelompok dan grup Line, info penting, dan kontak Steering Committee.",
};

const MENU: {
  href: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  numeral: string;
  card: string;
  chip: string;
  watermark: string;
}[] = [
  {
    href: "/dashboard",
    icon: LayoutDashboard,
    title: "Dashboard",
    desc: "Masuk untuk lihat kelompok, grup Line, dan teman se-departemen.",
    numeral: "01",
    card: "bg-teal-50 ring-teal-200/50",
    chip: "bg-teal-dark text-white",
    watermark: "text-teal-900/10",
  },
  {
    href: "/info",
    icon: Megaphone,
    title: "Info Penting",
    desc: "Pengaduan, guidebook, kalender, dan RS terdekat.",
    numeral: "02",
    card: "bg-orange-50 ring-orange-200/50",
    chip: "bg-accent text-white",
    watermark: "text-orange-900/10",
  },
  {
    href: "/kontak",
    icon: Phone,
    title: "Kontak SC",
    desc: "Hubungi contact person BEM, MPM, dan lembaga lainnya.",
    numeral: "03",
    card: "bg-emerald-50 ring-emerald-200/50",
    chip: "bg-emerald-700 text-white",
    watermark: "text-emerald-900/10",
  },
];

const lembagaCount = statistik.departemen.length;

const STATS: { value: string; label: string }[] = [
  { value: statistik.total.toLocaleString("id-ID"), label: "Maba" },
  { value: String(lembagaCount), label: "Departemen + PI" },
  { value: String(statistik.prodi), label: "Program Studi" },
];

const AURORA: { color: string; className: string; delay: string }[] = [
  {
    color: "rgba(56, 189, 248, 0.35)",
    className: "-left-24 -top-24 h-96 w-96",
    delay: "0s",
  },
  {
    color: "rgba(167, 139, 250, 0.32)",
    className: "right-0 top-1/4 h-[26rem] w-[26rem]",
    delay: "-7s",
  },
  {
    color: "rgba(251, 191, 36, 0.3)",
    className: "bottom-0 left-1/4 h-80 w-80",
    delay: "-13s",
  },
  {
    color: "rgba(52, 211, 153, 0.28)",
    className: "-bottom-16 -right-16 h-96 w-96",
    delay: "-19s",
  },
  {
    color: "rgba(248, 113, 113, 0.22)",
    className: "left-1/2 top-0 h-72 w-72",
    delay: "-10s",
  },
];

export default function Home() {
  const departemen = statistik.departemen;

  return (
    <div className="min-h-full">
      <section className="mx-auto max-w-6xl px-4 pb-2 pt-4 sm:px-6 sm:pb-3 sm:pt-6 lg:px-8 lg:pb-4 lg:pt-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-teal-dark text-cream shadow-lift ring-1 ring-white/15">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-15 grayscale"
            style={{ backgroundImage: "url('/bg-site.jpg')" }}
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
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-8 -top-12 select-none font-heading text-[10rem] font-bold leading-none tracking-tight text-white/5 lg:text-[14rem]"
          >
            2026
          </span>
          <Image
            src="/logo-mabim.png"
            alt=""
            aria-hidden="true"
            width={480}
            height={480}
            priority
            className="pointer-events-none absolute -bottom-10 -right-6 h-44 w-44 object-contain opacity-10 sm:-right-8 sm:h-64 sm:w-64 lg:h-72 lg:w-72"
          />

          <div className="relative mx-auto max-w-6xl px-6 py-12 sm:px-12 sm:py-16 lg:px-16">
            <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
              <div>
                <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-cream backdrop-blur">
                  Mahasiswa Baru FTUI 2026
                </span>

                <h1 className="mt-6 font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  Mabim FTUI <span className="text-accent">2026</span>
                </h1>
                <p className="mt-5 max-w-xl font-heading text-lg font-semibold tracking-tight text-cream sm:text-xl">
                  Find Your Path. Forge Your Legacy.
                </p>

                <div className="mt-8">
                  <Countdown />
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="h-12 rounded-full bg-cream px-7 text-teal-dark shadow-lift hover:bg-cream/90 hover:text-teal-dark"
                  >
                    <Link href="/dashboard">
                      <LayoutDashboard data-slot="icon-inline-start" />
                      Masuk Dashboard
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-12 rounded-full border-white/30 bg-transparent px-7 text-cream hover:bg-white/10 hover:text-cream"
                  >
                    <Link href="/info">
                      <Megaphone data-slot="icon-inline-start" />
                      Info Penting
                    </Link>
                  </Button>
                </div>
              </div>

              <div>
                <VideoTeaser />
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3 sm:mt-12">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="rounded-3xl bg-white/10 p-4 text-center ring-1 ring-white/15 backdrop-blur sm:p-5"
                >
                  <p className="font-heading text-2xl font-bold tracking-tight text-cream sm:text-3xl">
                    {s.value}
                  </p>
                  <p className="mt-1 text-[10px] font-semibold uppercase leading-snug tracking-wider text-cream/70 sm:text-xs">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-secondary text-accent">
              <Compass className="h-6 w-6" />
            </span>
            <div>
              <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                Menu Utama
              </h2>
              <p className="text-sm text-muted-foreground">
                Tiga pintu untuk kebutuhanmu selama masa Mabim.
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MENU.map((card) => (
              <Card
                key={card.href}
                className={`group relative overflow-hidden rounded-[2rem] p-0 ring-1 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift hover:ring-accent/40 ${card.card}`}
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute -right-3 -top-6 select-none font-heading text-8xl font-bold leading-none tracking-tight ${card.watermark}`}
                >
                  {card.numeral}
                </span>
                <Link
                  href={card.href}
                  className="relative flex items-start gap-4 p-5"
                >
                  <span
                    className={`grid h-12 w-12 shrink-0 place-items-center rounded-full text-white shadow-card transition-colors group-hover:bg-accent ${card.chip}`}
                  >
                    <card.icon className="h-6 w-6" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2">
                      <span className="font-heading text-base font-semibold text-foreground">
                        {card.title}
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-accent" />
                    </span>
                    <span className="mt-1 block text-sm leading-snug text-muted-foreground">
                      {card.desc}
                    </span>
                  </span>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-secondary text-accent">
              <Building2 className="h-6 w-6" />
            </span>
            <div>
              <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                Tujuh Departemen & Program Internasional
              </h2>
              <p className="text-sm text-muted-foreground">
                Delapan lembaga pengelola akademik membawahi {statistik.prodi}{" "}
                program studi sebagai kesatuan rencana belajar.
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
            {departemen.map((d) => {
              const c = DEPARTEMEN_WARNA[d.kode];
              const pct = Math.round((d.jumlah / statistik.total) * 100);
              return (
                <Card
                  key={d.kode}
                  className={`rounded-[2rem] p-5 ring-1 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift ${c.card}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${c.badge}`}
                    >
                      {d.kode}
                    </span>
                    <span className={`text-xs font-bold ${c.sub}`}>
                      {pct}%
                    </span>
                  </div>
                  <p
                    className={`mt-4 font-heading text-3xl font-bold tracking-tight ${c.heading}`}
                  >
                    {d.jumlah.toLocaleString("id-ID")}
                  </p>
                  <p className={`mt-1 text-sm font-medium leading-snug ${c.sub}`}>
                    {d.nama}
                  </p>
                  <div className={`mt-4 h-1.5 overflow-hidden rounded-full ${c.track}`}>
                    <div
                      className={`h-full rounded-full ${c.bar}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </Card>
              );
            })}

            <Card className="relative col-span-2 overflow-hidden rounded-[2rem] bg-teal-dark p-5 text-cream ring-1 ring-white/15 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift sm:col-span-4 sm:p-6">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.12] grayscale"
                style={{ backgroundImage: "url('/hero-mabim.jpg')" }}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-accent/30 blur-3xl"
              />
              <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-accent text-white shadow-card">
                    <Users className="h-7 w-7" />
                  </span>
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-xs font-bold text-cream ring-1 ring-white/15">
                      Total Maba
                    </span>
                    <p className="mt-3 font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
                      {statistik.total.toLocaleString("id-ID")}
                    </p>
                    <p className="mt-1 text-sm font-medium text-cream/70">
                      Maba Mabim FTUI 2026
                    </p>
                  </div>
                </div>
                <div className="w-full sm:w-64 sm:border-l sm:border-white/10 sm:pl-6">
                  <p className="text-xs font-bold text-cream/70">100%</p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/15">
                    <div className="h-full w-full rounded-full bg-gradient-to-r from-cream to-accent" />
                  </div>
                  <p className="mt-2 text-xs text-cream/60">
                    {statistik.departemen.length} lembaga, {statistik.prodi}{" "}
                    program studi
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
