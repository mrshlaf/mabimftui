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

export const metadata: Metadata = {
  title: "Info Penting",
  alternates: { canonical: "/info" },
  description:
    "Pengaduan, guidebook, dan kalender kegiatan Mabim FTUI 2026 dalam satu tempat.",
};

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
      <Button variant="secondary" size="lg" disabled className="w-full rounded-full">
        Link menyusul
      </Button>
    );
  }
  return (
    <Button
      asChild
      size="lg"
      className={cn(
        "w-full rounded-full",
        accent && "bg-amber-700 text-white hover:bg-amber-800"
      )}
    >
      <a href={safe} target="_blank" rel="noopener noreferrer">
        {label}
        <ExternalLink data-slot="icon-inline-end" />
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
        "h-full scroll-mt-20 rounded-[2rem] p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift",
        accent ? "bg-amber-100/80 ring-amber-300/60" : "ring-border/60"
      )}
    >
      <span
        className={cn(
          "grid h-12 w-12 shrink-0 place-items-center rounded-full",
          accent ? "bg-card text-amber-700 shadow-card" : "bg-secondary text-accent"
        )}
      >
        <cell.icon className="h-6 w-6" />
      </span>
      <h2
        className={cn(
          "mt-3 font-heading text-base font-semibold",
          accent ? "text-amber-950" : "text-foreground"
        )}
      >
        {cell.title}
      </h2>
      <p
        className={cn(
          "mt-1.5 text-sm leading-relaxed",
          accent ? "text-amber-800/80" : "text-muted-foreground"
        )}
      >
        {cell.desc}
      </p>
      <div className="mt-4">
        <ExternalButton label={cell.link.label} url={cell.link.url} accent={accent} />
      </div>
    </Card>
  );
}

export default function InfoPage() {
  return (
    <div className="min-h-full">
      <PageHeader
        eyebrow="Info Penting"
        title="Info & Bantuan"
        desc="Pengaduan, guidebook, dan kalender kegiatan dalam satu tempat."
        bg="/bg-info.jpg"
        icon={Megaphone}
        accentWord="Bantuan"
      />

      <section className="mx-auto max-w-5xl px-4 pt-5 pb-16 sm:px-6 sm:pt-6 sm:pb-20 lg:px-8">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Reveal className="col-span-2 h-full lg:row-span-2">
            <Card
              id="instagram"
              className="relative flex h-full scroll-mt-20 flex-col justify-between overflow-hidden rounded-[2rem] bg-teal-dark p-6 text-cream shadow-lift ring-1 ring-white/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-8"
            >
              <div className="relative flex h-full flex-col justify-between gap-8">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-24 -right-12 h-64 w-64 rounded-full bg-accent/25 blur-3xl"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-10 top-1/3 h-56 w-56 rounded-full bg-amber-400/15 blur-3xl"
                />
                <div aria-hidden="true" className="hero-beam" />
                <InstagramIcon
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-10 -right-6 h-40 w-40 text-white/5"
                />
                <div>
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-accent ring-1 ring-white/15">
                    <InstagramIcon className="h-6 w-6" />
                  </span>
                  <h2 className="mt-4 font-heading text-xl font-bold tracking-tight sm:text-2xl">
                    Info terbaru ada di{" "}
                    <span className="bg-gradient-to-r from-accent via-cream to-white bg-clip-text text-transparent">
                      Instagram
                    </span>
                  </h2>
                  <p className="mt-2 max-w-[34ch] text-sm leading-relaxed text-cream/70">
                    Pengumuman, jadwal mendadak, dan kabar sepanjang Mabim dibagikan di sini.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    asChild
                    size="lg"
                    className="group h-11 rounded-full bg-cream px-5 text-teal-dark shadow-lift hover:bg-cream/90 hover:text-teal-dark"
                  >
                    <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                      <InstagramIcon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                      @mabimftui
                    </a>
                  </Button>
                  <span className="inline-flex items-center rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-cream/80 ring-1 ring-white/10">
                    IG resmi Mabim
                  </span>
                </div>
              </div>
            </Card>
          </Reveal>

          {INFO_CELLS.map((cell, i) => (
            <Reveal key={cell.id} className="h-full" delay={(i + 1) * 80}>
              <InfoCell cell={cell} />
            </Reveal>
          ))}

          <Reveal className="h-full" delay={320}>
            <Card
              id="jam-kegiatan"
              className="h-full scroll-mt-20 rounded-[2rem] p-5 shadow-card transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-lift ring-border/60"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-secondary text-accent">
                <Clock3 className="h-6 w-6" />
              </span>
              <h2 className="mt-3 font-heading text-base font-semibold text-foreground">
                Jam Kegiatan Mabim
              </h2>
              <div className="mt-4 space-y-2.5">
                <div className="rounded-2xl bg-secondary/70 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Senin - Jumat
                  </p>
                  <p className="mt-0.5 font-heading text-lg font-bold leading-none text-foreground">
                    {infoTimeline.jamSeninJumat}
                  </p>
                </div>
                <div className="rounded-2xl bg-secondary/70 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Sabtu
                  </p>
                  <p className="mt-0.5 font-heading text-lg font-bold leading-none text-foreground">
                    {infoTimeline.jamSabtu}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Jadwal harian dibagikan di grup masing-masing kelompok.
              </p>
            </Card>
          </Reveal>

          <Reveal className="col-span-2 lg:col-span-4" delay={400}>
            <Card
              id="rumah-sakit"
              className="h-full scroll-mt-20 rounded-[2rem] p-5 shadow-card ring-border/60"
            >
              <RSCarousel />
            </Card>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
