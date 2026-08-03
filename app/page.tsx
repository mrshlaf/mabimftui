import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Countdown from "./components/Countdown";
import Icon, { type IconName } from "./components/Icon";

export const metadata: Metadata = {
  title: "Mabim FTUI 2026",
};

const HERO_STYLE = {
  backgroundImage:
    "linear-gradient(rgba(9,65,82,0.78), rgba(6,47,59,0.9)), url('/hero-mabim.jpg')",
};

const CARDS: { href: string; icon: IconName; title: string; desc: string }[] = [
  {
    href: "/kelompok",
    icon: "users",
    title: "Cari Kelompok",
    desc: "Temukan nomor kelompok dan grup Line kamu.",
  },
  {
    href: "/tugas",
    icon: "doc",
    title: "Link Tugas",
    desc: "Akses link pengumpulan tugas tiap unit.",
  },
  {
    href: "/info",
    icon: "megaphone",
    title: "Info Penting",
    desc: "Pengaduan, guidebook, dan kalender kegiatan.",
  },
  {
    href: "/kontak",
    icon: "phone",
    title: "Kontak Panitia",
    desc: "Hubungi contact person BEM, MPM, dan unit.",
  },
];

export default function Home() {
  return (
    <div className="min-h-full">
      <section className="relative overflow-hidden bg-teal text-cream">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={HERO_STYLE}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(241,132,42,0.18),transparent_55%)]"
          aria-hidden="true"
        />
        <svg
          className="absolute bottom-0 left-0 h-16 w-full text-cream sm:h-20"
          viewBox="0 0 1440 80"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 80 C 360 20 1080 20 1440 80 L 1440 80 L 0 80 Z" fill="currentColor" />
        </svg>
        <div className="relative mx-auto max-w-4xl px-4 pb-24 pt-14 sm:pb-32 sm:pt-20">
          <div className="flex flex-col items-center text-center">
            <Image
              src="/logo-mabim.png"
              alt="Logo Mabim FTUI"
              width={144}
              height={144}
              priority
              className="rounded-full drop-shadow-lg"
            />
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-accent">
              Mahasiswa Baru 2026
            </p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
              Mabim FTUI 2026
            </h1>
            <p className="mt-3 max-w-xl text-sm text-cream/85 sm:text-base">
              Satu pintu informasi: cari kelompokmu, akses link tugas, dan
              temukan info penting Mabim.
            </p>
            <div className="mt-6">
              <Countdown />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:py-10">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Menu Utama
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {CARDS.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group flex items-start gap-4 rounded-2xl border border-teal/10 bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-accent/40"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cream text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  <Icon name={card.icon} className="h-6 w-6" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className="block font-semibold text-teal">
                      {card.title}
                    </span>
                    <Icon
                      name="chevron-down"
                      className="h-4 w-4 shrink-0 -rotate-90 text-teal/30 transition-all group-hover:text-accent"
                    />
                  </span>
                  <span className="mt-1 block text-sm leading-snug text-teal-dark/70">
                    {card.desc}
                  </span>
                </span>
              </Link>
            ))}
          </div>

          <p className="mt-12 text-center text-xs text-teal-dark/60">
            © 2026 Panitia Mabim FTUI. Dibuat untuk Mahasiswa Baru FTUI.
          </p>
        </div>
      </section>
    </div>
  );
}
