"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  CalendarDays,
  Home,
  Info,
  LayoutDashboard,
  LogOut,
  Menu,
  Phone,
  X,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "./auth-context";

const NAV_ITEMS: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/info", label: "Info", icon: Info },
  { href: "/kalendar", label: "Kalender", icon: CalendarDays },
  { href: "/kontak", label: "Kontak", icon: Phone },
];

function initials(nama: string) {
  return nama
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

export default function Nav() {
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const mobileItems: { href: string; label: string; icon: LucideIcon }[] = [
    ...NAV_ITEMS,
    ...(user
      ? [{ href: "/dashboard", label: "Dashboard", icon: LayoutDashboard }]
      : []),
  ];

  return (
    <header className="sticky top-0 z-40">
      <div className="mx-auto w-full max-w-6xl px-3 pt-3 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between gap-4 rounded-[2rem] border border-border/60 bg-background/85 px-4 shadow-[0_4px_20px_-4px_rgba(6,47,59,0.08),0_20px_48px_-20px_rgba(6,47,59,0.22),inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-xl transition-all duration-300 sm:px-5">
          <Link href="/" className="group flex items-center gap-2.5">
            <Image
              src="/logo-mabim.png"
              alt="Logo Mabim FTUI"
              width={36}
              height={36}
              className="rounded-full ring-1 ring-border/60 transition-all duration-500 group-hover:ring-accent/50 group-hover:scale-105 group-hover:rotate-6 group-hover:shadow-[0_0_15px_rgba(217,101,26,0.25)]"
            />
            <span className="font-heading text-lg font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent">
              Mabim FTUI{" "}
              <span className="bg-gradient-to-r from-accent to-amber-500 bg-clip-text text-transparent transition-all duration-500 group-hover:from-amber-500 group-hover:to-accent">
                2026
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 active:scale-[0.96]",
                    active
                      ? "bg-teal-dark text-cream shadow-[0_4px_12px_rgba(6,47,59,0.25)] ring-1 ring-white/10"
                      : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground hover:shadow-inner"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-4 w-4 transition-transform duration-300",
                      active ? "text-accent scale-110" : "group-hover:scale-110"
                    )}
                  />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center justify-end gap-2">
            <div className="hidden md:block">
              {loading ? (
                <span className="h-9 w-24 animate-pulse rounded-full bg-secondary" />
              ) : user ? (
                <div className="flex items-center gap-1.5">
                  <Link
                    href="/dashboard"
                    className={cn(
                      "group flex items-center gap-2 rounded-full border border-border bg-card py-1 pl-1 pr-3.5 text-sm font-semibold transition-all duration-300 hover:border-accent/40 hover:bg-accent/5 hover:shadow-sm active:scale-[0.98]",
                      isActive("/dashboard") && "border-accent/45 bg-accent/8"
                    )}
                  >
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-accent to-amber-500 text-xs font-bold text-white shadow-sm ring-2 ring-accent/25 transition-transform duration-300 group-hover:scale-105">
                      {initials(user.nama)}
                    </span>
                    <span className="max-w-28 truncate transition-colors duration-300 group-hover:text-accent">{user.nama}</span>
                  </Link>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={logout}
                    className="h-9 rounded-full px-3 text-destructive transition-all duration-300 hover:bg-destructive/10 hover:text-destructive active:scale-[0.96]"
                    aria-label="Keluar"
                  >
                    <LogOut className="h-4 w-4 transition-transform duration-300 hover:scale-110" />
                  </Button>
                </div>
              ) : (
                <Button asChild size="lg" className="group h-9 rounded-full bg-teal-dark px-5 text-cream transition-all duration-300 hover:bg-teal-dark/95 hover:shadow-[0_4px_12px_rgba(6,47,59,0.2)] active:scale-[0.98]">
                  <Link href="/dashboard">
                    <LayoutDashboard data-slot="icon-inline-start" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105" />
                    Masuk
                  </Link>
                </Button>
              )}
            </div>

            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen((o) => !o)}
              className={cn(
                "h-11 w-11 rounded-full p-0 transition-all duration-300 md:hidden",
                open && "bg-secondary text-foreground rotate-90"
              )}
              aria-label={open ? "Tutup menu" : "Buka menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {open && (
            <div
              id="mobile-menu"
              className="animate-in fade-in slide-in-from-top-2 motion-reduce:animate-none duration-200 absolute inset-x-0 top-full z-50 mt-2 rounded-[2rem] border border-border/60 bg-card p-3 shadow-lift md:hidden"
            >
            <nav className="flex flex-col gap-1">
              {mobileItems.map((item, i) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={{ animationDelay: `${i * 40}ms` }}
                    className={cn(
                      "animate-in fade-in slide-in-from-top-2 fill-mode-both motion-reduce:animate-none flex min-h-12 items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors active:scale-[0.99]",
                      active
                        ? "bg-teal-dark font-semibold text-cream"
                        : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
                    )}
                  >
                    <span
                      className={cn(
                        "grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors",
                        active ? "bg-accent text-white" : "bg-secondary text-accent"
                      )}
                    >
                      <item.icon className="h-4.5 w-4.5" />
                    </span>
                    {item.label}
                  </Link>
                );
              })}

              <div className="mt-1 border-t border-border/60 pt-2">
                {loading ? (
                  <span className="h-12 w-full animate-pulse rounded-2xl bg-secondary/70" />
                ) : user ? (
                  <div className="flex items-center justify-between gap-3 rounded-2xl bg-secondary/60 p-3">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-xs font-bold text-white">
                        {initials(user.nama)}
                      </span>
                      <span className="truncate text-sm font-semibold text-foreground">
                        {user.nama}
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={logout}
                      className="h-11 shrink-0 rounded-full border-destructive/30 px-4 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                      <LogOut data-slot="icon-inline-start" />
                      Keluar
                    </Button>
                  </div>
                ) : (
                  <Button asChild size="lg" className="h-12 w-full rounded-full">
                    <Link href="/dashboard">
                      <LayoutDashboard data-slot="icon-inline-start" />
                      Masuk Dashboard
                    </Link>
                  </Button>
                )}
              </div>
            </nav>
          </div>
          )}
        </div>
      </div>
    </header>
  );
}
