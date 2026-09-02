import Image from "next/image";
import Link from "next/link";
import { Compass, LifeBuoy } from "lucide-react";
import InstagramIcon from "./InstagramIcon";
import Reveal from "./Reveal";
import { Button } from "@/components/ui/button";

const FOOTER_NAV = [
  { href: "/", label: "Home" },
  { href: "/info", label: "Info" },
  { href: "/kalendar", label: "Kalender" },
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
  { href: "/kalendar", label: "Kalender" },
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
      <p className="text-[11px] font-semibold uppercase tracking-wider text-cream/50">
        {title}
      </p>
      <ul className="mt-3 space-y-1">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="inline-block py-1 text-xs text-cream/75 transition-colors hover:text-accent"
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
            <Link href="/" className="group flex items-center gap-3">
              <Image
                src="/logo-mabim.png"
                alt="Logo Mabim FTUI"
                width={40}
                height={40}
                className="rounded-full ring-1 ring-white/20 transition-transform duration-300 group-hover:scale-105"
              />
              <div>
                <p className="font-heading text-base font-bold tracking-tight text-white transition-colors group-hover:text-accent sm:text-lg">
                  Mabim FTUI <span className="text-accent">2026</span>
                </p>
                <p className="text-xs text-cream/70">
                  Satu pintu informasi resmi Mahasiswa Baru FTUI.
                </p>
              </div>
            </Link>
            <div className="flex w-full items-center gap-3 sm:w-auto">
              <a
                href="https://www.instagram.com/mabimftui"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Mabim FTUI"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 bg-white/10 text-cream transition-all hover:border-accent/50 hover:bg-accent hover:text-white"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <Button
                asChild
                size="default"
                className="h-10 flex-1 rounded-full bg-cream px-5 text-xs font-semibold text-teal-dark shadow-sm hover:bg-white hover:text-teal-950 active:scale-[0.98] sm:w-auto sm:flex-initial"
              >
                <Link href="/kontak">
                  <LifeBuoy data-slot="icon-inline-start" className="h-3.5 w-3.5 text-accent" />
                  Hubungi SC
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative mt-8 grid grid-cols-2 gap-x-6 gap-y-8 px-6 pb-8 sm:gap-x-10 sm:px-8 lg:grid-cols-3">
            <FooterColumn title="Navigasi" links={FOOTER_NAV} />
            <FooterColumn title="Penugasan" links={FOOTER_TUGAS} />
            <div className="col-span-2 lg:col-span-1">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-cream/50">
                Bantuan & Rujukan
              </p>
              <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1 lg:grid-cols-1">
                {FOOTER_BANTUAN.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="inline-block py-1 text-xs text-cream/75 transition-colors hover:text-accent"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative border-t border-white/10">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-4 text-xs text-cream/50 sm:flex-row sm:px-8">
              <p>© 2026 Mabim FTUI. Dibuat untuk Mahasiswa Baru FTUI.</p>
              <div className="flex items-center gap-1.5 select-none text-cream/60">
                <Compass className="h-3.5 w-3.5 text-accent" />
                <span>Find Your Path, Forge Your Legacy</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
