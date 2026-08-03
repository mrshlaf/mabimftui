"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon, { type IconName } from "./Icon";

const NAV_ITEMS: { href: string; label: string; icon: IconName }[] = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/kelompok", label: "Kelompok", icon: "users" },
  { href: "/tugas", label: "Tugas", icon: "doc" },
  { href: "/info", label: "Info", icon: "info" },
  { href: "/kontak", label: "Kontak", icon: "phone" },
];

export default function Nav() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className="sticky top-0 z-40 hidden border-b border-teal/10 bg-cream/90 backdrop-blur md:block">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/logo-mabim.png"
              alt="Logo Mabim FTUI"
              width={36}
              height={36}
              className="rounded-full"
            />
            <span className="text-lg font-bold text-teal">Mabim FTUI 2026</span>
          </Link>
          <nav className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-teal text-cream"
                    : "text-teal/70 hover:bg-teal/10 hover:text-teal"
                }`}
              >
                <Icon name={item.icon} className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-teal/15 bg-cream/95 backdrop-blur md:hidden">
        <div className="mx-auto grid max-w-md grid-cols-5">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex min-h-16 flex-col items-center justify-center gap-1 py-1.5 text-[11px] font-medium transition-colors ${
                  active ? "text-accent" : "text-teal/60"
                }`}
              >
                <span
                  className={`rounded-full px-3 py-1 ${
                    active ? "bg-accent/15" : ""
                  }`}
                >
                  <Icon name={item.icon} className="h-6 w-6" />
                </span>
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
