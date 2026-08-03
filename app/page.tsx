import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  FileText,
  Megaphone,
  Phone,
  Search,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Countdown from "./components/Countdown";
import VideoTeaser from "./components/VideoTeaser";
import { statistik, DEPARTEMEN_WARNA } from "@/data/statistik";

export const metadata: Metadata = {
  title: "Mabim FTUI 2026",
};

const MENU: { href: string; icon: LucideIcon; title: string; desc: string }[] = [
  {
    href: "/kelompok",
    icon: Users,
    title: "Cari Kelompok",
    desc: "Temukan nomor kelompok dan grup Line kamu.",
  },
  {
    href: "/tugas",
    icon: FileText,
    title: "Link Tugas",
    desc: "Akses link pengumpulan tugas tiap unit.",
  },
  {
    href: "/info",
    icon: Megaphone,
    title: "Info Penting",
    desc: "Pengaduan, guidebook, dan kalender kegiatan.",
  },
  {
    href: "/kontak",
    icon: Phone,
    title: "Kontak SC",
    desc: "Hubungi contact person BEM, MPM, dan unit.",
  },
];

const regulerCount = statistik.departemen.filter((d) => d.kode !== "PI").length;

export default function Home() {
  return (
    <div className="min-h-full">
      <section className="relative overflow-hidden bg-teal text-cream">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 grayscale"
          style={{ backgroundImage: "url('/bg-site.jpg')" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl px-6 py-14 sm:px-8 sm:py-20">
          <div className="grid items-center gap-10 lg:gap-16 md:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-cream backdrop-blur">
                Mahasiswa Baru FTUI 2026
              </span>
              <h1 className="mt-5 font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Mabim FTUI{" "}
                <span className="text-accent">2026</span>
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-cream/85 sm:text-base">
                Satu pintu informasi: cari kelompokmu, akses link tugas, dan
                temukan info penting selama masa Mabim.
              </p>

              <div className="mt-8">
                <Countdown />
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" className="h-12 rounded-full px-7">
                  <Link href="/kelompok">
                    <Search data-slot="icon-inline-start" />
                    Cari Kelompokmu
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-12 rounded-full border-white/30 bg-transparent px-7 text-cream hover:bg-white/10 hover:text-cream"
                >
                  <Link href="/kontak">
                    <Phone data-slot="icon-inline-start" />
                    Kontak SC
                  </Link>
                </Button>
              </div>
            </div>

            <div>
              <VideoTeaser />
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-semibold text-cream backdrop-blur">
                  {statistik.total.toLocaleString("id-ID")} Maba
                </span>
                <span className="rounded-full bg-accent px-3.5 py-2 text-xs font-semibold text-white">
                  {regulerCount} Departemen + PI
                </span>
                <span className="rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-semibold text-cream backdrop-blur">
                  {statistik.prodi} Program Studi
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pt-12 sm:px-8 sm:pt-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Menu Utama
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {MENU.map((card) => (
              <Card
                key={card.href}
                className="rounded-[2rem] p-0 ring-border/60 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lift hover:ring-accent/40"
              >
                <Link href={card.href} className="group flex items-start gap-4 p-5">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-secondary text-accent transition-colors group-hover:bg-accent group-hover:text-white">
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

      <section className="px-6 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                Departemen & PI
              </p>
              <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                Tujuh Departemen & Program Internasional
              </h2>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                Delapan pengelola akademik membawahi {statistik.prodi} program
                studi sebagai kesatuan rencana belajar.
              </p>
            </div>
            <Badge variant="secondary" className="hidden rounded-full px-3 py-1.5 text-sm sm:inline-flex">
              Total {statistik.total.toLocaleString("id-ID")} Maba
            </Badge>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 lg:gap-4 sm:grid-cols-4">
            {statistik.departemen.map((d) => {
              const c = DEPARTEMEN_WARNA[d.kode];
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
                    <span className={`h-2.5 w-2.5 rounded-full ${c.dot}`} />
                  </div>
                  <p
                    className={`mt-4 font-heading text-3xl font-bold tracking-tight ${c.heading}`}
                  >
                    {d.jumlah.toLocaleString("id-ID")}
                  </p>
                  <p className={`mt-1 text-sm font-medium leading-snug ${c.sub}`}>
                    {d.nama}
                  </p>
                </Card>
              );
            })}
          </div>

          <p className="mt-10 text-center text-xs text-muted-foreground">
            © 2026 Steering Committee Mabim FTUI. Dibuat untuk Mahasiswa Baru FTUI.
          </p>
        </div>
      </section>
    </div>
  );
}
