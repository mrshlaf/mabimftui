import type { Metadata } from "next";
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
import Reveal from "./components/Reveal";
import VideoTeaser from "./components/VideoTeaser";
import DepartemenCard from "./components/DepartemenCard";
import { statistik, DEPARTEMEN_WARNA } from "@/data/statistik";
import { siteName, siteUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Masa Bimbingan Fakultas Teknik UI",
  alternates: { canonical: "/" },
  description:
    "Mabim FTUI 2026: satu pintu info untuk kelompok, grup Line, jadwal kegiatan, dan kontak SC Masa Bimbingan Fakultas Teknik Universitas Indonesia.",
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
  gradient: string;
  glow: string;
}[] = [
  {
    href: "/dashboard",
    icon: LayoutDashboard,
    title: "Dashboard",
    desc: "Masuk untuk lihat kelompok, grup Line, dan teman se-departemen.",
    numeral: "01",
    card: "bg-white/75 hover:bg-white/90 ring-border/40",
    chip: "bg-teal-dark text-cream shadow-sm",
    watermark: "text-teal-900/5 group-hover:text-teal-900/10",
    gradient: "from-teal-500/5 to-teal-dark/5",
    glow: "group-hover:shadow-[0_12_32px_-8px_rgba(9,65,82,0.15)] group-hover:ring-teal-500/35",
  },
  {
    href: "/info",
    icon: Megaphone,
    title: "Info Penting",
    desc: "Pengaduan, guidebook, kalender, dan RS terdekat.",
    numeral: "02",
    card: "bg-white/75 hover:bg-white/90 ring-border/40",
    chip: "bg-accent text-white shadow-sm",
    watermark: "text-orange-900/5 group-hover:text-orange-900/10",
    gradient: "from-amber-500/5 to-accent/5",
    glow: "group-hover:shadow-[0_12_32px_-8px_rgba(217,101,26,0.15)] group-hover:ring-accent/35",
  },
  {
    href: "/kontak",
    icon: Phone,
    title: "Kontak SC",
    desc: "Hubungi contact person BEM, MPM, dan lembaga lainnya.",
    numeral: "03",
    card: "bg-white/75 hover:bg-white/90 ring-border/40",
    chip: "bg-emerald-700 text-white shadow-sm",
    watermark: "text-emerald-900/5 group-hover:text-emerald-900/10",
    gradient: "from-emerald-500/5 to-emerald-700/5",
    glow: "group-hover:shadow-[0_12_32px_-8px_rgba(4,120,87,0.15)] group-hover:ring-emerald-500/35",
  },
];

const AURORA: { color: string; className: string; delay: string }[] = [
  {
    color: "rgba(217, 101, 26, 0.30)",
    className: "-left-24 -top-24 h-96 w-96",
    delay: "0s",
  },
  {
    color: "rgba(241, 239, 215, 0.13)",
    className: "right-0 top-1/4 h-[26rem] w-[26rem]",
    delay: "-7s",
  },
  {
    color: "rgba(251, 191, 36, 0.16)",
    className: "bottom-0 left-1/4 h-80 w-80",
    delay: "-13s",
  },
  {
    color: "rgba(6, 47, 59, 0.6)",
    className: "-bottom-16 -right-16 h-96 w-96",
    delay: "-19s",
  },
];

export default function Home() {
  const departemen = statistik.departemen;

  return (
    <div className="min-h-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            name: siteName,
            startDate: "2026-08-29",
            endDate: "2026-09-12",
            location: {
              "@type": "Place",
              name: "Fakultas Teknik Universitas Indonesia",
              address: "Depok, Jawa Barat, Indonesia",
            },
            organizer: {
              "@type": "Organization",
              name: "Fakultas Teknik Universitas Indonesia",
            },
            description:
              "Masa Bimbingan Mahasiswa Baru Fakultas Teknik Universitas Indonesia 2026",
            image: `${siteUrl}/hero-mabim.jpg`,
            url: siteUrl,
            eventStatus: "https://schema.org/EventScheduled",
            eventAttendanceMode:
              "https://schema.org/OfflineEventAttendanceMode",
          }),
        }}
      />
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
          <div aria-hidden="true" className="hero-beam" />

          <div className="relative mx-auto max-w-6xl px-6 py-12 sm:px-12 sm:py-16 lg:px-16">
            <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
              <div>
                <span
                  className="hero-fade inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-cream backdrop-blur"
                  style={{ animationDelay: "0.05s" }}
                >
                  Mahasiswa Baru FTUI 2026
                </span>

                <h1
                  className="hero-fade mt-6 font-heading text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl"
                  style={{ animationDelay: "0.12s" }}
                >
                  Mabim FTUI{" "}
                  <span className="bg-gradient-to-r from-cream via-white to-accent bg-clip-text text-transparent">
                    2026
                  </span>
                </h1>
                <p
                  className="hero-fade mt-5 max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg"
                  style={{ animationDelay: "0.19s" }}
                >
                  Satu pintu info untuk kelompok, grup Line, jadwal, dan kontak
                  SC.
                </p>

                <div className="hero-fade mt-7" style={{ animationDelay: "0.26s" }}>
                  <Countdown />
                </div>

                <div
                  className="hero-fade mt-7 flex flex-wrap items-center gap-3"
                  style={{ animationDelay: "0.33s" }}
                >
                  <Button
                    asChild
                    size="lg"
                    className="group h-12 rounded-full bg-cream px-7 text-teal-dark shadow-lift hover:bg-cream/90 hover:text-teal-dark active:scale-[0.98]"
                  >
                    <Link href="/dashboard">
                      <LayoutDashboard
                        data-slot="icon-inline-start"
                        className="transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
                      />
                      Masuk Dashboard
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="group h-12 rounded-full border-white/30 bg-transparent px-7 text-cream hover:bg-white/10 hover:text-cream active:scale-[0.98]"
                  >
                    <Link href="/info">
                      <Megaphone data-slot="icon-inline-start" />
                      Info Penting
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="hero-fade relative" style={{ animationDelay: "0.22s" }}>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-6 rounded-[2.75rem] bg-accent/15 blur-3xl"
                />
                <VideoTeaser />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal>
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
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MENU.map((card, i) => (
              <Reveal key={card.href} delay={i * 90}>
                <Card
                  className={cn(
                    "group relative overflow-hidden rounded-[2rem] p-0 ring-1 shadow-card transition-all duration-500 hover:-translate-y-1.5 has-[:focus-visible]:outline-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent/70 backdrop-blur-sm",
                    card.card,
                    card.glow
                  )}
                >
                  {/* Subtle Colored Background Gradient */}
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                      card.gradient
                    )}
                  />
                  {/* Glass Glare Highlight */}
                  <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  
                  <span
                    aria-hidden="true"
                    className={cn(
                      "pointer-events-none absolute -right-3 -top-6 select-none font-heading text-8xl font-black leading-none tracking-tight transition-all duration-500 group-hover:scale-105 group-hover:translate-x-1 group-hover:-translate-y-1",
                      card.watermark
                    )}
                  >
                    {card.numeral}
                  </span>
                  <Link
                    href={card.href}
                    className="relative flex items-start gap-4 p-5"
                  >
                    <span
                      className={cn(
                        "grid h-12 w-12 shrink-0 place-items-center rounded-2xl transition-all duration-350 group-hover:scale-110 group-hover:shadow-md",
                        card.chip
                      )}
                    >
                      <card.icon className="h-6 w-6" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="font-heading text-base font-bold text-foreground transition-colors duration-300 group-hover:text-accent">
                          {card.title}
                        </span>
                        <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent" />
                      </span>
                      <span className="mt-1 block text-sm leading-snug text-muted-foreground">
                        {card.desc}
                      </span>
                    </span>
                  </Link>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-secondary text-accent">
                <Building2 className="h-6 w-6" />
              </span>
              <div>
                <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                  Tujuh Departemen & Program Internasional
                </h2>
                <p className="text-sm text-muted-foreground">
                  Delapan lembaga, {statistik.prodi} program studi.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
            {departemen.map((d, i) => {
              const c = DEPARTEMEN_WARNA[d.kode];
              const pct = Math.round((d.jumlah / statistik.total) * 100);
              return (
                <Reveal key={d.kode} delay={(i % 4) * 60}>
                  <DepartemenCard d={d} warna={c} pct={pct} />
                </Reveal>
              );
            })}

            <Reveal className="col-span-2 sm:col-span-4">
              <Card className="relative overflow-hidden rounded-[2rem] bg-teal-dark p-5 text-cream ring-1 ring-white/15 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift sm:p-6">
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
                    <p className="mt-1 text-sm font-medium text-cream/80">
                      Maba Mabim FTUI 2026
                    </p>
                  </div>
                </div>
                <div className="w-full sm:w-64 sm:border-l sm:border-white/10 sm:pl-6">
                  <p className="text-xs font-bold text-cream/80">100%</p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/15">
                    <div className="h-full w-full rounded-full bg-gradient-to-r from-cream to-accent" />
                  </div>
                  <p className="mt-2 text-xs text-cream/70">
                    {statistik.departemen.length} lembaga, {statistik.prodi}{" "}
                    program studi
                  </p>
                </div>
              </div>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
