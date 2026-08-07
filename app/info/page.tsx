import type { Metadata } from "next";
import {
  BookOpen,
  CalendarDays,
  Clock3,
  ExternalLink,
  Hospital,
  Megaphone,
  Phone,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { infoLinks, infoTimeline } from "@/data/info";
import { rumahSakitTerdekat } from "@/data/rs";
import { safeExternalUrl } from "@/lib/url";
import PageHeader from "../components/PageHeader";

export const metadata: Metadata = {
  title: "Info Penting",
  alternates: { canonical: "/info" },
  description:
    "Pengaduan, guidebook, dan kalender kegiatan Mabim FTUI 2026 dalam satu tempat.",
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
  id: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  link: { label: string; url: string };
}[] = [
  {
    id: "pengaduan",
    icon: Megaphone,
    title: "Pelaporan Pengaduan",
    desc: "Laporkan pelanggaran atau kendala selama Mabim melalui form resmi.",
    link: infoLinks.pengaduan,
  },
  {
    id: "guidebook",
    icon: BookOpen,
    title: "Guidebook Mabim",
    desc: "Baca guidebook resmi untuk panduan lengkap kegiatan Mabim.",
    link: infoLinks.guidebook,
  },
  {
    id: "kalender",
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

      <section className="mx-auto max-w-4xl px-4 pt-5 pb-16 sm:px-6 sm:pt-6 sm:pb-20 lg:px-8">
        <div className="grid gap-4">
          {BLOCKS.map((block) => (
            <Card
              key={block.title}
              id={block.id}
              className="scroll-mt-20 rounded-[2rem] p-5 ring-border/60 shadow-card"
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

          <Card
            id="rumah-sakit"
            className="mt-6 scroll-mt-20 rounded-[2rem] p-5 ring-border/60 shadow-card"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-secondary text-accent">
                <Hospital className="h-6 w-6" />
              </span>
              <h2 className="font-heading text-base font-semibold text-foreground">
                Rumah Sakit Terdekat
              </h2>
            </div>
            <div className="mt-4 space-y-3">
              {rumahSakitTerdekat.map((rs) => (
                <div
                  key={rs.nama}
                  className="rounded-2xl bg-secondary/60 p-4"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-card text-accent shadow-card">
                      <Hospital className="h-4 w-4" />
                    </span>
                    <p className="text-sm font-semibold text-foreground">
                      {rs.nama}
                    </p>
                  </div>
                  <p className="mt-2 pl-10 text-xs leading-relaxed text-muted-foreground">
                    {rs.alamat}
                  </p>
                  <a
                    href={`tel:${rs.telp}`}
                    className="ml-10 mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1 text-xs font-semibold text-accent ring-1 ring-accent/30 transition-colors hover:ring-accent/60"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    {rs.telp}
                  </a>
                </div>
              ))}
            </div>
          </Card>

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
