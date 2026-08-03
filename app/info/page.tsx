import type { Metadata } from "next";
import { infoLinks, infoTimeline } from "@/data/info";
import { safeExternalUrl } from "@/lib/url";
import Icon, { type IconName } from "../components/Icon";

export const metadata: Metadata = {
  title: "Info Penting - Mabim FTUI 2026",
};

function ExternalButton({ label, url }: { label: string; url: string }) {
  const safe = safeExternalUrl(url);
  if (!safe) {
    return (
      <span className="flex min-h-14 w-full items-center justify-center rounded-xl bg-teal/10 px-5 text-sm font-semibold text-teal-dark/50">
        Link menyusul
      </span>
    );
  }
  return (
    <a
      href={safe}
      target="_blank"
      rel="noopener noreferrer"
      className="flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 text-base font-bold text-white shadow-sm transition-transform active:scale-[0.98]"
    >
      {label}
      <Icon name="external" className="h-5 w-5" />
    </a>
  );
}

const BLOCKS: {
  icon: IconName;
  title: string;
  desc: string;
  link: { label: string; url: string };
}[] = [
  {
    icon: "megaphone",
    title: "Pelaporan Pengaduan",
    desc: "Laporkan pelanggaran atau kendala selama Mabim melalui form resmi.",
    link: infoLinks.pengaduan,
  },
  {
    icon: "book",
    title: "Guidebook Mabim",
    desc: "Baca guidebook resmi untuk panduan lengkap kegiatan Mabim.",
    link: infoLinks.guidebook,
  },
  {
    icon: "calendar",
    title: "Kalender Kegiatan",
    desc: "Gabung Google Calendar Mabim agar agenda penting tidak terlewat.",
    link: infoLinks.kalender,
  },
];

export default function InfoPage() {
  return (
    <div className="min-h-full">
      <header className="bg-teal px-4 py-8 text-cream">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-2xl font-bold">Info Penting</h1>
          <p className="mt-2 text-sm text-cream/85">
            Pelaporan pengaduan, guidebook, dan kalender kegiatan Mabim dalam
            satu tempat.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-4 py-6">
        <div className="grid gap-4">
          {BLOCKS.map((block) => (
            <div
              key={block.title}
              className="rounded-2xl bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cream text-accent">
                  <Icon name={block.icon} className="h-6 w-6" />
                </span>
                <h2 className="font-semibold text-teal">{block.title}</h2>
              </div>
              <p className="mt-3 text-sm text-teal-dark/70">{block.desc}</p>
              <div className="mt-4">
                <ExternalButton
                  label={block.link.label}
                  url={block.link.url}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cream text-accent">
              <Icon name="info" className="h-6 w-6" />
            </span>
            <h2 className="font-semibold text-teal">Rentang Pelaksanaan Mabim</h2>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-teal-dark/80">
            <li className="flex justify-between gap-4 border-b border-teal/10 pb-2">
              <span className="text-teal-dark/60">Periode</span>
              <span className="text-right font-semibold">
                {infoTimeline.rentang}
              </span>
            </li>
            <li className="flex justify-between gap-4 border-b border-teal/10 pb-2">
              <span className="text-teal-dark/60">Senin - Jumat</span>
              <span className="font-semibold">{infoTimeline.jamSeninJumat}</span>
            </li>
            <li className="flex justify-between gap-4">
              <span className="text-teal-dark/60">Sabtu</span>
              <span className="font-semibold">{infoTimeline.jamSabtu}</span>
            </li>
          </ul>
          <p className="mt-4 text-xs text-teal-dark/50">
            Jadwal rinci harian dibagikan melalui kanal resmi masing-masing
            kelompok.
          </p>
        </div>
      </section>
    </div>
  );
}
