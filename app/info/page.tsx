import type { ComponentType } from "react";
import type { Metadata } from "next";
import {
  BookOpen,
  CalendarDays,
  Clock3,
  ExternalLink,
  Megaphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { infoLinks, infoTimeline } from "@/data/info";
import { safeExternalUrl } from "@/lib/url";
import { cn } from "@/lib/utils";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import InstagramIcon from "../components/InstagramIcon";
import RSCarousel from "../components/RSCarousel";
import { FaqJsonLd, BreadcrumbJsonLd } from "../components/JsonLd";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Info & Panduan Lengkap",
  alternates: { canonical: "/info" },
  description:
    "Info penting Mabim FTUI 2026: pengaduan, guidebook, jadwal kegiatan, jam operasional, dan rumah sakit terdekat.",
};

const MABIM_FAQS = [
  {
    question: "Kapan Mabim FTUI 2026 dilaksanakan?",
    answer:
      "Mabim FTUI 2026 dimulai pada 29 Agustus 2026 (Day 1) dan berlangsung hingga Oktober 2026. Kegiatan utama mencakup 7 hari Mabim Day, penugasan departemen, dan kegiatan IKM.",
  },
  {
    question: "Apa itu Mabim FTUI?",
    answer:
      "Mabim (Masa Bimbingan) adalah kegiatan wajib bagi mahasiswa baru Fakultas Teknik Universitas Indonesia (FTUI). Mabim bertujuan membimbing mahasiswa baru beradaptasi dengan lingkungan kampus, mengenal departemen, dan membangun kebersamaan antar angkatan.",
  },
  {
    question: "Dimana lokasi Mabim FTUI 2026?",
    answer:
      "Kegiatan Mabim FTUI 2026 dilaksanakan di Fakultas Teknik Universitas Indonesia, Depok, Jawa Barat.",
  },
  {
    question: "Bagaimana cara mengakses dashboard Mabim FTUI 2026?",
    answer:
      "Mahasiswa baru dapat mengakses dashboard pribadi di mabimftui.page/dashboard untuk melihat kelompok, grup Line, dan tugas departemen masing-masing.",
  },
  {
    question: "Jam berapa kegiatan Mabim FTUI 2026?",
    answer:
      "Jam kegiatan Mabim Senin-Jumat pukul 08.00-20.00 WIB, dan Sabtu pukul 06.00-17.00 WIB. Jadwal harian dibagikan di grup masing-masing kelompok.",
  },
  {
    question: "Bagaimana cara melaporkan pelanggaran selama Mabim?",
    answer:
      "Pelanggaran atau kendala selama Mabim dapat dilaporkan melalui form resmi pengaduan yang tersedia di halaman Info Penting situs mabimftui.page.",
  },
];

const INSTAGRAM_URL = "https://www.instagram.com/mabimftui";

type InfoCell = {
  id: string;
  icon: ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  link: { label: string; url: string };
  tone?: "default" | "accent";
};

const INFO_CELLS: InfoCell[] = [
  {
    id: "pengaduan",
    icon: Megaphone,
    title: "Pelaporan Pengaduan",
    desc: "Laporkan pelanggaran atau kendala selama Mabim lewat form resmi.",
    link: infoLinks.pengaduan,
    tone: "accent",
  },
  {
    id: "guidebook",
    icon: BookOpen,
    title: "Guidebook Mabim",
    desc: "Panduan lengkap kegiatan Mabim dalam satu dokumen.",
    link: infoLinks.guidebook,
  },
  {
    id: "kalender",
    icon: CalendarDays,
    title: "Kalender Kegiatan",
    desc: "Gabung Google Calendar agar agenda penting tidak terlewat.",
    link: infoLinks.kalender,
  },
];

function ExternalButton({
  label,
  url,
  accent,
}: {
  label: string;
  url: string;
  accent?: boolean;
}) {
  const safe = safeExternalUrl(url);
  if (!safe) {
    return (
      <Button variant="secondary" size="default" disabled className="w-full rounded-full text-xs font-semibold">
        Link menyusul
      </Button>
    );
  }
  return (
    <Button
      asChild
      size="default"
      className={cn(
        "w-full rounded-full text-xs font-semibold shadow-sm transition-all duration-200 active:scale-[0.98]",
        accent
          ? "bg-accent text-white hover:bg-accent/90"
          : "bg-teal-dark text-cream hover:bg-teal-dark/90"
      )}
    >
      <a href={safe} target="_blank" rel="noopener noreferrer">
        {label}
        <ExternalLink data-slot="icon-inline-end" className="h-3.5 w-3.5" />
      </a>
    </Button>
  );
}

function InfoCell({ cell }: { cell: InfoCell }) {
  const accent = cell.tone === "accent";
  return (
    <Card
      id={cell.id}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden h-full scroll-mt-20 rounded-3xl p-5 border shadow-sm transition-all duration-300 hover:-translate-y-1 sm:p-6",
        accent
          ? "border-amber-400/40 bg-card hover:border-accent/60 hover:shadow-card"
          : "border-border/80 bg-card hover:border-accent/40 hover:shadow-card"
      )}
    >
      <div>
        <div className="flex items-center justify-between">
          <span
            className={cn(
              "grid h-11 w-11 shrink-0 place-items-center rounded-2xl transition-transform duration-300 group-hover:scale-105",
              accent ? "bg-amber-500/10 text-accent" : "bg-teal-dark/10 text-teal-dark"
            )}
          >
            <cell.icon className="h-5 w-5" />
          </span>
          {accent && (
            <span className="inline-flex items-center rounded-full bg-accent/10 px-2.5 py-0.5 text-[11px] font-semibold text-accent">
              Penting
            </span>
          )}
        </div>
        <h2 className="mt-4 font-heading text-base font-bold text-foreground transition-colors group-hover:text-accent sm:text-lg">
          {cell.title}
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
          {cell.desc}
        </p>
      </div>
      <div className="mt-5">
        <ExternalButton label={cell.link.label} url={cell.link.url} accent={accent} />
      </div>
    </Card>
  );
}

export default function InfoPage() {
  return (
    <div className="min-h-full">
      <FaqJsonLd faqs={MABIM_FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Info & Panduan", url: `${siteUrl}/info` }]} />
      <PageHeader
        eyebrow="Info Penting"
        title="Info & Bantuan"
        desc="Pengaduan, guidebook, dan kalender kegiatan dalam satu tempat."
        bg="/bg-info.jpg"
        icon={Megaphone}
        accentWord="Bantuan"
      />

      <section className="mx-auto max-w-5xl px-4 pt-4 pb-8 sm:px-6 sm:pt-6 sm:pb-12 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal className="col-span-1 sm:col-span-2 h-full lg:row-span-2">
            <Card
              id="instagram"
              className="group relative flex h-full scroll-mt-20 flex-col justify-between overflow-hidden rounded-3xl bg-teal-dark p-6 text-cream shadow-lift ring-1 ring-white/15 transition-all duration-300 hover:-translate-y-1 sm:p-8"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-24 -right-12 h-64 w-64 rounded-full bg-accent/20 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-10 top-1/3 h-56 w-56 rounded-full bg-amber-400/10 blur-3xl"
              />
              <div aria-hidden="true" className="hero-beam" />
              <InstagramIcon
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-8 -right-4 h-36 w-36 text-white/5"
              />
              
              <div className="relative z-10 flex h-full flex-col justify-between gap-8">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 text-accent ring-1 ring-white/15">
                      <InstagramIcon className="h-5 w-5" />
                    </span>
                    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-cream/90">
                      IG Resmi
                    </span>
                  </div>
                  <h2 className="mt-5 font-heading text-xl font-bold tracking-tight text-white sm:text-2xl">
                    Informasi Terkini di{" "}
                    <span className="bg-gradient-to-r from-cream via-amber-200 to-accent bg-clip-text text-transparent">
                      Instagram
                    </span>
                  </h2>
                  <p className="mt-2.5 max-w-[34ch] text-sm leading-relaxed text-cream/75">
                    Pengumuman resmi, jadwal mendadak, dokumentasi, dan kabar penting selama masa bimbingan.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    asChild
                    size="default"
                    className="h-10 rounded-full bg-cream px-5 font-semibold text-teal-dark shadow-lift hover:bg-white hover:text-teal-950 active:scale-[0.98]"
                  >
                    <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                      <InstagramIcon className="h-4 w-4 text-accent" />
                      @mabimftui
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          </Reveal>

          {INFO_CELLS.map((cell, i) => (
            <Reveal key={cell.id} className="h-full" delay={(i + 1) * 80}>
              <InfoCell cell={cell} />
            </Reveal>
          ))}

          <Reveal className="h-full col-span-1 sm:col-span-2 lg:col-span-1" delay={320}>
            <Card
              id="jam-kegiatan"
              className="group relative flex flex-col justify-between overflow-hidden h-full scroll-mt-20 rounded-3xl border border-border/80 bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card sm:p-6"
            >
              <div>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-secondary text-accent">
                  <Clock3 className="h-5 w-5" />
                </span>
                <h2 className="mt-4 font-heading text-base font-bold text-foreground transition-colors group-hover:text-accent sm:text-lg">
                  Jam Kegiatan
                </h2>
                <div className="mt-3 space-y-2">
                  <div className="rounded-2xl border border-border/60 bg-secondary/50 p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Senin - Jumat
                    </p>
                    <p className="mt-0.5 font-heading text-base font-bold leading-none text-foreground">
                      {infoTimeline.jamSeninJumat}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border/60 bg-secondary/50 p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Sabtu
                    </p>
                    <p className="mt-0.5 font-heading text-base font-bold leading-none text-foreground">
                      {infoTimeline.jamSabtu}
                    </p>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Jadwal harian dibagikan di grup masing-masing.
              </p>
            </Card>
          </Reveal>

          <Reveal className="col-span-1 sm:col-span-2 lg:col-span-4" delay={400}>
            <Card
              id="rumah-sakit"
              className="h-full scroll-mt-20 rounded-3xl border border-border/80 bg-card p-6 shadow-sm"
            >
              <RSCarousel />
            </Card>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
