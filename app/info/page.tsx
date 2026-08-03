import type { Metadata } from "next";
import {
  BookOpen,
  CalendarDays,
  Clock3,
  ExternalLink,
  Megaphone,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { infoLinks, infoTimeline } from "@/data/info";
import { safeExternalUrl } from "@/lib/url";
import PageHeader from "../components/PageHeader";

export const metadata: Metadata = {
  title: "Info Penting - Mabim FTUI 2026",
};

function ExternalButton({ label, url }: { label: string; url: string }) {
  const safe = safeExternalUrl(url);
  if (!safe) {
    return (
      <Button variant="secondary" size="lg" disabled className="w-full rounded-full">
        Link menyusul
      </Button>
    );
  }
  return (
    <Button asChild size="lg" className="w-full rounded-full">
      <a href={safe} target="_blank" rel="noopener noreferrer">
        {label}
        <ExternalLink data-slot="icon-inline-end" />
      </a>
    </Button>
  );
}

const BLOCKS: {
  icon: LucideIcon;
  title: string;
  desc: string;
  link: { label: string; url: string };
}[] = [
  {
    icon: Megaphone,
    title: "Pelaporan Pengaduan",
    desc: "Laporkan pelanggaran atau kendala selama Mabim melalui form resmi.",
    link: infoLinks.pengaduan,
  },
  {
    icon: BookOpen,
    title: "Guidebook Mabim",
    desc: "Baca guidebook resmi untuk panduan lengkap kegiatan Mabim.",
    link: infoLinks.guidebook,
  },
  {
    icon: CalendarDays,
    title: "Kalender Kegiatan",
    desc: "Gabung Google Calendar Mabim agar agenda penting tidak terlewat.",
    link: infoLinks.kalender,
  },
];

export default function InfoPage() {
  return (
    <div className="min-h-full">
      <PageHeader
        eyebrow="Info Penting"
        title="Info & Bantuan"
        desc="Pengaduan, guidebook, dan kalender kegiatan dalam satu tempat."
        bg="/bg-info.jpg"
        icon={Megaphone}
      />

      <section className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid gap-4">
          {BLOCKS.map((block) => (
            <Card
              key={block.title}
              className="rounded-[2rem] p-5 ring-border/60 shadow-card"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-secondary text-accent">
                  <block.icon className="h-6 w-6" />
                </span>
                <h2 className="font-heading text-base font-semibold text-foreground">
                  {block.title}
                </h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {block.desc}
              </p>
              <div className="mt-4">
                <ExternalButton label={block.link.label} url={block.link.url} />
              </div>
            </Card>
          ))}
        </div>

        <Card className="mt-6 rounded-[2rem] p-5 ring-border/60 shadow-card">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-secondary text-accent">
              <Clock3 className="h-6 w-6" />
            </span>
            <h2 className="font-heading text-base font-semibold text-foreground">
              Jam Kegiatan Mabim
            </h2>
          </div>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between gap-4 border-b border-border/60 pb-2">
              <dt className="text-muted-foreground">Senin - Jumat</dt>
              <dd className="font-semibold text-foreground">
                {infoTimeline.jamSeninJumat}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Sabtu</dt>
              <dd className="font-semibold text-foreground">
                {infoTimeline.jamSabtu}
              </dd>
            </div>
          </dl>
          <p className="mt-4 text-xs text-muted-foreground">
            Jadwal rinci harian dibagikan melalui kanal resmi masing-masing
            kelompok.
          </p>
        </Card>
      </section>
    </div>
  );
}
