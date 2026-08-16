import Image from "next/image";
import Link from "next/link";
import { Compass, LifeBuoy } from "lucide-react";
import InstagramIcon from "./InstagramIcon";
import Reveal from "./Reveal";
import { Button } from "@/components/ui/button";

const FOOTER_NAV = [
  { href: "/", label: "Home" },
  { href: "/info", label: "Info" },
  { href: "/kontak", label: "Kontak SC" },
  { href: "/dashboard", label: "Dashboard" },
];

const FOOTER_TUGAS = [
  { href: "/dashboard", label: "Tugas Departemen" },
  { href: "/dashboard", label: "Tugas BEM" },
  { href: "/dashboard", label: "Tugas BOK" },
  { href: "/dashboard", label: "Grup Line" },
];

const FOOTER_BANTUAN = [
  { href: "/info#pengaduan", label: "Pengaduan" },
  { href: "/info#guidebook", label: "Guidebook" },
  { href: "/info#kalender", label: "Kalender" },
  { href: "/info#rumah-sakit", label: "RS Terdekat" },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <nav aria-label={title}>
      <p className="text-xs font-bold uppercase tracking-wider text-cream/50">
        {title}
      </p>
      <ul className="mt-3 space-y-0.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="block py-2 text-sm text-cream/75 transition-colors hover:text-accent"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Footer() {
  return (
    <footer className="mt-auto px-4 pb-6 pt-3 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-teal-dark text-cream shadow-lift ring-1 ring-white/15">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center opacity-15 grayscale"
          style={{ backgroundImage: "url('/bg-site.jpg')" }}
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <span
            className="aurora-blob -left-24 -top-24 h-72 w-72"
            style={{
              background:
                "radial-gradient(closest-side, rgba(217, 101, 26, 0.28), transparent 70%)",
              animationDelay: "0s",
            }}
          />
          <span
            className="aurora-blob -bottom-20 -right-16 h-72 w-72"
            style={{
              background:
                "radial-gradient(closest-side, rgba(251, 191, 36, 0.14), transparent 70%)",
              animationDelay: "-11s",
            }}
          />
        </div>
        <div aria-hidden="true" className="hero-beam" />

        <Reveal>
        <div className="relative flex flex-col gap-5 px-6 pt-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-center gap-3">
            <Image
              src="/logo-mabim.png"
              alt="Logo Mabim FTUI"
              width={44}
              height={44}
              className="rounded-full ring-2 ring-white/15"
            />
            <div>
              <p className="font-heading text-lg font-bold tracking-tight">
                Mabim FTUI{" "}
                <span className="bg-gradient-to-r from-cream via-white to-accent bg-clip-text text-transparent">
                  2026
                </span>
              </p>
              <p className="text-xs text-cream/70">
                Satu pintu informasi Mahasiswa Baru FTUI.
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href="https://www.instagram.com/mabimftui"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Mabim FTUI"
              className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-cream ring-1 ring-white/15 transition-colors hover:bg-accent hover:text-cream"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <Button
              asChild
              size="lg"
              className="h-11 w-full rounded-full bg-cream px-6 text-teal-dark shadow-lift hover:bg-cream/90 hover:text-teal-dark sm:w-auto"
            >
              <Link href="/kontak">
                <LifeBuoy data-slot="icon-inline-start" />
                Hubungi SC
              </Link>
            </Button>
          </div>
        </div>

        <div className="relative mt-10 grid grid-cols-2 gap-x-6 gap-y-8 px-6 pb-10 sm:gap-x-10 sm:px-8 lg:grid-cols-3">
          <FooterColumn title="Navigasi" links={FOOTER_NAV} />
          <FooterColumn title="Tugas" links={FOOTER_TUGAS} />
          <div className="col-span-2 lg:col-span-1">
            <p className="text-xs font-bold uppercase tracking-wider text-cream/50">
              Bantuan
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-0.5 lg:grid-cols-1">
              {FOOTER_BANTUAN.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="block py-2 text-sm text-cream/75 transition-colors hover:text-accent"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative border-t border-white/10">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-cream/50 sm:flex-row sm:px-8">
            <p>© 2026 Mabim FTUI. Dibuat untuk Mahasiswa Baru FTUI.</p>
          <p className="flex items-center gap-1.5">
            <Compass className="h-3.5 w-3.5 text-accent/70" />
            Find Your Path, Forge Your Legacy
          </p>
          </div>
        </div>
        </Reveal>
      </div>
    </footer>
  );
}
