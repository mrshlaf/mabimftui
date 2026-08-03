"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon, { type IconName } from "./Icon";

const NAV_ITEMS: { href: string; label: string; icon: IconName }[] = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/kelompok", label: "Kelompok", icon: "users" },
  { href: "/tugas", label: "Tugas", icon: "doc" },
  { href: "/info", label: "Info", icon: "info" },
];

export default function Nav() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className="hidden bg-teal text-cream md:block">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent text-teal-dark">
              <Icon name="line" className="h-6 w-6" />
            </span>
            Mabim FTUI 2026
          </Link>
          <nav className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-accent text-teal-dark"
                    : "hover:bg-teal-dark"
                }`}
              >
                <Icon name={item.icon} className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-teal/20 bg-cream md:hidden">
        <div className="mx-auto grid max-w-md grid-cols-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-h-14 flex-col items-center justify-center gap-1 py-1.5 text-[11px] font-medium transition-colors ${
                isActive(item.href) ? "text-accent" : "text-teal/70"
              }`}
            >
              <Icon name={item.icon} className="h-6 w-6" />
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
