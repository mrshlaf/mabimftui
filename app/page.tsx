import type { Metadata } from "next";
import Link from "next/link";
import Countdown from "./components/Countdown";
import Icon, { type IconName } from "./components/Icon";

export const metadata: Metadata = {
  title: "Mabim FTUI 2026",
};

const CARDS: { href: string; icon: IconName; title: string; desc: string }[] = [
  {
    href: "/kelompok",
    icon: "users",
    title: "Cari Kelompok",
    desc: "Cari nama kamu untuk melihat nomor kelompok dan grup Line.",
  },
  {
    href: "/tugas",
    icon: "doc",
    title: "Link Tugas",
    desc: "Akses link pengumpulan tugas tiap departemen & lembaga.",
  },
  {
    href: "/info",
    icon: "megaphone",
    title: "Info Penting",
    desc: "Pelaporan pengaduan, guidebook, dan kalender kegiatan.",
  },
];

export default function Home() {
  return (
    <div className="min-h-full">
      <section className="bg-teal px-4 py-10 text-cream sm:py-12">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-teal-dark">
              <Icon name="line" className="h-8 w-8" />
            </span>
            <h1 className="text-2xl font-bold sm:text-3xl">Mabim FTUI 2026</h1>
          </div>
          <p className="mt-3 max-w-xl text-sm text-cream/85 sm:text-base">
            Satu pintu informasi untuk Mahasiswa Baru: cari kelompokmu, akses
            link tugas, dan temukan info penting Mabim.
          </p>
          <div className="mt-4">
            <Countdown />
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:py-10">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-lg font-semibold text-teal">
            Menu Utama
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {CARDS.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-cream text-accent">
                  <Icon name={card.icon} className="h-6 w-6" />
                </span>
                <span>
                  <span className="block font-semibold text-teal">
                    {card.title}
                  </span>
                  <span className="mt-1 block text-sm leading-snug text-teal-dark/70">
                    {card.desc}
                  </span>
                </span>
              </Link>
            ))}
          </div>

          <p className="mt-10 text-center text-xs text-teal-dark/60">
            © 2026 Panitia Mabim FTUI. Dibuat untuk Mahasiswa Baru FTUI.
          </p>
        </div>
      </section>
    </div>
  );
}
