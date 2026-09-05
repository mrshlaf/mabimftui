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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Countdown from "./components/Countdown";
import Reveal from "./components/Reveal";
import VideoTeaser from "./components/VideoTeaser";
import DepartemenCard from "./components/DepartemenCard";
import { statistik, DEPARTEMEN_WARNA } from "@/data/statistik";
import { siteName, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mabim FTUI 2026 - Masa Bimbingan Fakultas Teknik Universitas Indonesia",
  alternates: { canonical: "/" },
  description:
    "Satu pintu informasi resmi Mabim FTUI 2026: pembagian nomor kelompok, link grup LINE resmi, jadwal kegiatan, penugasan departemen & BEM, serta kontak SC panitia.",
  keywords: [
    "Mabim FTUI 2026",
    "Masa Bimbingan FTUI 2026",
    "Ospek Teknik UI 2026",
    "Mahasiswa Baru FTUI",
    "Cek Kelompok Mabim FTUI",
    "Link Grup LINE Mabim FTUI",
    "Tugas Mabim FTUI 2026",
    "Jadwal Kegiatan Mabim FTUI",
    "Fakultas Teknik Universitas Indonesia",
  ],
  openGraph: {
    type: "website",
    siteName: "Mabim FTUI 2026",
    locale: "id_ID",
    title: "Mabim FTUI 2026 - Masa Bimbingan Fakultas Teknik Universitas Indonesia",
    description:
      "Satu pintu informasi resmi Mabim FTUI 2026: pembagian nomor kelompok, link grup LINE resmi, jadwal kegiatan, dan penugasan.",
    url: siteUrl,
    images: [
      {
        url: "/hero-mabim.jpg",
        width: 1200,
        height: 630,
        alt: "Masa Bimbingan Fakultas Teknik Universitas Indonesia 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mabim FTUI 2026 - Masa Bimbingan Fakultas Teknik Universitas Indonesia",
    description:
      "Satu pintu informasi resmi Mabim FTUI 2026: pembagian nomor kelompok, link grup LINE resmi, jadwal kegiatan, dan penugasan.",
    images: ["/hero-mabim.jpg"],
    creator: "@mabimftui",
  },
};

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
            "@id": `${siteUrl}/#event-mabim-2026`,
            name: `${siteName} - Masa Bimbingan Mahasiswa Baru`,
            alternateName: "Masa Bimbingan Fakultas Teknik Universitas Indonesia 2026",
            startDate: "2026-08-29T07:00:00+07:00",
            endDate: "2026-10-31T17:00:00+07:00",
            eventStatus: "https://schema.org/EventScheduled",
            eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
            location: {
              "@type": "Place",
              name: "Fakultas Teknik Universitas Indonesia",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Kampus Baru UI Depok",
                addressLocality: "Depok",
                addressRegion: "Jawa Barat",
                postalCode: "16424",
                addressCountry: "ID",
              },
            },
            organizer: {
              "@type": "EducationalOrganization",
              name: "Fakultas Teknik Universitas Indonesia",
              url: "https://eng.ui.ac.id",
              logo: `${siteUrl}/logo-mabim.png`,
            },
            performer: {
              "@type": "Organization",
              name: "Panitia Mabim FTUI 2026 & BEM FTUI",
              url: "https://www.instagram.com/mabimftui",
            },
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "IDR",
              availability: "https://schema.org/InStock",
              url: siteUrl,
              validFrom: "2026-08-01",
            },
            description:
              "Masa Bimbingan Mahasiswa Baru Fakultas Teknik Universitas Indonesia 2026 untuk 7 departemen dan program internasional.",
            image: `${siteUrl}/hero-mabim.jpg`,
            url: siteUrl,
            inLanguage: "id-ID",
            isAccessibleForFree: true,
            typicalAgeRange: "17-22",
            audience: {
              "@type": "EducationalAudience",
              educationalRole: "student",
              audienceType: "Mahasiswa Baru Fakultas Teknik UI 2026",
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: "Teaser Video Mabim FTUI 2026",
            description:
              "Video teaser resmi Masa Bimbingan Mahasiswa Baru Fakultas Teknik Universitas Indonesia 2026.",
            thumbnailUrl: [
              "https://i.ytimg.com/vi/b4e9hyJ0DIg/hqdefault.jpg",
              `${siteUrl}/hero-mabim.jpg`,
            ],
            uploadDate: "2026-08-01T00:00:00+07:00",
            embedUrl: "https://www.youtube-nocookie.com/embed/b4e9hyJ0DIg",
            publisher: {
              "@type": "EducationalOrganization",
              name: "Fakultas Teknik Universitas Indonesia",
              url: "https://eng.ui.ac.id",
              logo: `${siteUrl}/logo-mabim.png`,
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageObject",
            contentUrl: `${siteUrl}/hero-mabim.jpg`,
            name: "Poster Resmi Mabim FTUI 2026",
            description:
              "Poster visual resmi Masa Bimbingan Mahasiswa Baru Fakultas Teknik Universitas Indonesia 2026.",
            caption: "Masa Bimbingan FTUI 2026 - Find Your Path, Forge Your Legacy",
            inLanguage: "id-ID",
            author: {
              "@type": "EducationalOrganization",
              name: "Fakultas Teknik Universitas Indonesia",
              url: "https://eng.ui.ac.id",
            },
            width: "1200",
            height: "630",
          }),
        }}
      />
      <section aria-label="Hero Utama Mabim FTUI 2026" className="mx-auto max-w-6xl px-4 pb-2 pt-4 sm:px-6 sm:pb-3 sm:pt-6 lg:px-8 lg:pb-4 lg:pt-8">
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

          <div className="relative mx-auto max-w-6xl px-6 py-12 sm:px-10 sm:py-16 lg:px-14">
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
              <div>
                <div
                  className="hero-fade inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1 text-xs font-semibold tracking-wide text-cream/90 backdrop-blur-md"
                  style={{ animationDelay: "0.05s" }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Mahasiswa Baru FTUI 2026
                </div>

                <div className="hero-fade mt-5 space-y-2" style={{ animationDelay: "0.12s" }}>
                  <p className="font-heading text-xs sm:text-sm font-semibold uppercase tracking-[0.12em] text-cream/75">
                    Masa Bimbingan Fakultas Teknik Universitas Indonesia 2026
                  </p>
                  <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.05]">
                    Mabim FTUI{" "}
                    <span className="bg-gradient-to-r from-cream via-amber-200 to-accent bg-clip-text text-transparent">
                      2026
                    </span>
                  </h1>
                </div>

                <p
                  className="hero-fade mt-4 max-w-lg text-sm leading-relaxed text-cream/80 sm:text-base"
                  style={{ animationDelay: "0.20s" }}
                >
                  Satu pintu informasi resmi untuk kelompok, grup Line, jadwal kegiatan, dan kontak panitia.
                </p>
                <div className="hero-fade mt-6" style={{ animationDelay: "0.26s" }}>
                  <Countdown />
                </div>

                <div
                  className="hero-fade mt-7 flex flex-wrap items-center gap-3"
                  style={{ animationDelay: "0.33s" }}
                >
                  <Button
                    asChild
                    size="lg"
                    className="group h-11 rounded-full bg-cream px-6 font-semibold text-teal-dark shadow-lift hover:bg-white hover:text-teal-950 active:scale-[0.98]"
                  >
                    <Link href="/dashboard">
                      <LayoutDashboard
                        data-slot="icon-inline-start"
                        className="h-4 w-4 text-accent transition-transform duration-300 group-hover:scale-110"
                      />
                      Masuk Dashboard
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="group h-11 rounded-full border-white/20 bg-white/5 px-6 font-medium text-cream hover:bg-white/15 hover:text-white active:scale-[0.98]"
                  >
                    <Link href="/info">
                      <Megaphone data-slot="icon-inline-start" className="h-4 w-4 text-amber-300" />
                      Info Penting
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="hero-fade relative" style={{ animationDelay: "0.22s" }}>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-4 rounded-3xl bg-accent/10 blur-2xl"
                />
                <VideoTeaser />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="menu-utama-heading" className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-secondary text-accent">
                <Compass className="h-5 w-5" />
              </span>
              <div>
                <h2 id="menu-utama-heading" className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                  Menu Utama
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  Tiga pintu layanan utama selama masa bimbingan.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3">
            {/* Card 1: Dashboard Mahasiswa */}
            <Reveal delay={0}>
              <Card className="group relative flex flex-col justify-between overflow-hidden h-full rounded-2xl bg-teal-dark p-5 text-cream shadow-lift ring-1 ring-white/15 transition-all duration-300 hover:-translate-y-1">
                <div aria-hidden="true" className="hero-beam" />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-accent/20 blur-2xl"
                />
                <div className="relative z-10 flex flex-col justify-between h-full gap-4">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-accent ring-1 ring-white/15">
                        <LayoutDashboard className="h-4 w-4" />
                      </span>
                      <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold text-cream/90">
                        Portal Pribadi
                      </span>
                    </div>
                    <h3 className="mt-3 font-heading text-base font-bold tracking-tight text-white transition-colors group-hover:text-accent">
                      Dashboard Mahasiswa
                    </h3>
                    <p className="mt-1 text-xs text-cream/75">
                      Cek nomor kelompok, grup LINE resmi, dan penugasan.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      <span className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-medium text-cream/90">
                        Nomor Kelompok
                      </span>
                      <span className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-medium text-cream/90">
                        Grup LINE
                      </span>
                      <span className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-medium text-cream/90">
                        Penugasan
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                      asChild
                      size="sm"
                      className="h-9 w-full rounded-full bg-cream px-4 text-xs font-semibold text-teal-dark shadow-sm hover:bg-white hover:text-teal-950 active:scale-[0.98]"
                    >
                      <Link href="/dashboard">
                        <LayoutDashboard data-slot="icon-inline-start" className="h-3.5 w-3.5 text-accent" />
                        Buka Dashboard
                        <ArrowRight className="ml-1 h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </Reveal>

            {/* Card 2: Info & Panduan */}
            <Reveal delay={60}>
              <Card className="group relative flex flex-col justify-between overflow-hidden h-full rounded-2xl border border-border/80 bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card">
                <div className="flex flex-col justify-between h-full gap-4">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="grid h-9 w-9 place-items-center rounded-xl bg-amber-500/10 text-accent">
                        <Megaphone className="h-4 w-4" />
                      </span>
                      <span className="inline-flex items-center rounded-full bg-accent/10 px-2.5 py-0.5 text-[10px] font-semibold text-accent">
                        Pusat Informasi
                      </span>
                    </div>
                    <h3 className="mt-3 font-heading text-base font-bold tracking-tight text-foreground transition-colors group-hover:text-accent">
                      Info & Panduan
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Guidebook, pengaduan resmi, dan RS rujukan terdekat.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      <span className="rounded-md border border-border/60 bg-secondary/50 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                        Guidebook
                      </span>
                      <span className="rounded-md border border-border/60 bg-secondary/50 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                        Pengaduan
                      </span>
                      <span className="rounded-md border border-border/60 bg-secondary/50 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                        RS Rujukan
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="h-9 w-full rounded-full border-border/80 text-xs font-semibold text-foreground hover:border-accent/40 hover:bg-accent/5 active:scale-[0.98]"
                    >
                      <Link href="/info">
                        <Megaphone data-slot="icon-inline-start" className="h-3.5 w-3.5 text-accent" />
                        Lihat Info & Bantuan
                        <ArrowRight className="ml-1 h-3.5 w-3.5 text-accent" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </Reveal>

            {/* Card 3: Kontak SC & Lembaga */}
            <Reveal delay={120}>
              <Card className="group relative flex flex-col justify-between overflow-hidden h-full rounded-2xl border border-border/80 bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-600/40 hover:shadow-card">
                <div className="flex flex-col justify-between h-full gap-4">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-700/10 text-emerald-700">
                        <Phone className="h-4 w-4" />
                      </span>
                      <span className="inline-flex items-center rounded-full bg-emerald-700/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                        Narahubung
                      </span>
                    </div>
                    <h3 className="mt-3 font-heading text-base font-bold tracking-tight text-foreground transition-colors group-hover:text-emerald-700">
                      Kontak SC & Lembaga
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Narahubung resmi BEM, MPM, dan SC departemen.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      <span className="rounded-md border border-border/60 bg-secondary/50 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                        BEM & MPM
                      </span>
                      <span className="rounded-md border border-border/60 bg-secondary/50 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                        SC Departemen
                      </span>
                      <span className="rounded-md border border-border/60 bg-secondary/50 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                        WhatsApp
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                      asChild
                      size="sm"
                      className="h-9 w-full rounded-full bg-teal-dark px-4 text-xs font-semibold text-cream hover:bg-teal-dark/90 active:scale-[0.98]"
                    >
                      <Link href="/kontak">
                        <Phone data-slot="icon-inline-start" className="h-3.5 w-3.5 text-accent" />
                        Direktori Kontak
                        <ArrowRight className="ml-1 h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>
      <section aria-labelledby="departemen-heading" className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-secondary text-accent">
                  <Building2 className="h-5 w-5" />
                </span>
                <div>
                  <h2 id="departemen-heading" className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                    Tujuh Departemen & Program Internasional
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                    Delapan lembaga, {statistik.prodi} program studi.
                  </p>
                </div>
              </div>
              <Button
                asChild
                size="default"
                variant="outline"
                className="h-10 rounded-full border-border/80 text-xs font-semibold text-foreground hover:border-accent/40 hover:bg-accent/5 active:scale-[0.98] shrink-0"
              >
                <Link href="/departemen">
                  <Building2 data-slot="icon-inline-start" className="h-3.5 w-3.5 text-accent" />
                  Direktori Mahasiswa
                  <ArrowRight className="ml-1 h-3.5 w-3.5 text-accent" />
                </Link>
              </Button>
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
              <Card className="relative overflow-hidden rounded-3xl bg-teal-dark p-6 text-cream shadow-lift ring-1 ring-white/15 transition-all hover:-translate-y-0.5 sm:p-7">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.1] grayscale"
                  style={{ backgroundImage: "url('/hero-mabim.jpg')" }}
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-accent/20 blur-3xl"
                />
                <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent text-white shadow-sm">
                      <Users className="h-6 w-6" />
                    </span>
                    <div>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-cream/90">
                        Total Mahasiswa Baru
                      </span>
                      <p className="mt-2 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        {statistik.total.toLocaleString("id-ID")}
                      </p>
                      <p className="text-xs font-medium text-cream/70">
                        Maba Mabim FTUI 2026
                      </p>
                    </div>
                  </div>
                  <div className="w-full sm:w-60 sm:border-l sm:border-white/15 sm:pl-6">
                    <div className="flex items-center justify-between text-xs font-semibold text-cream/80">
                      <span>Distribusi 100%</span>
                      <span>{statistik.departemen.length} Lembaga</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/20">
                      <div className="h-full w-full rounded-full bg-gradient-to-r from-cream to-accent" />
                    </div>
                    <p className="mt-2 text-xs text-cream/70">
                      {statistik.prodi} program studi sarjana & KKI
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
