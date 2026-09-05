"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Building2,
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
  { href: "/departemen", label: "Departemen", icon: Building2 },
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
        <div className="relative flex h-16 items-center justify-between gap-4 rounded-full border border-border/80 bg-background/90 px-4 shadow-[0_2px_12px_-2px_rgba(6,47,59,0.06),0_12px_28px_-8px_rgba(6,47,59,0.12),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-xl transition-all duration-300 sm:px-5">
          <Link href="/" className="group flex items-center gap-2.5">
            <Image
              src="/logo-mabim.png"
              alt="Logo Resmi Masa Bimbingan Fakultas Teknik Universitas Indonesia 2026"
              width={34}
              height={34}
              priority
              className="rounded-full ring-1 ring-border/80 transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-heading text-base font-bold tracking-tight text-foreground transition-colors group-hover:text-accent sm:text-lg">
              Mabim FTUI{" "}
              <span className="text-accent">2026</span>
            </span>
          </Link>

          <nav aria-label="Navigasi Utama" className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200 active:scale-[0.97]",
                    active
                      ? "bg-teal-dark text-cream shadow-sm"
                      : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-4 w-4 transition-colors",
                      active ? "text-accent" : "text-muted-foreground"
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
                      "group flex items-center gap-2 rounded-full border border-border bg-card py-1 pl-1 pr-3 text-sm font-medium transition-all duration-200 hover:border-accent/40 hover:bg-accent/5 active:scale-[0.98]",
                      isActive("/dashboard") && "border-accent/50 bg-accent/10"
                    )}
                  >
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-accent text-xs font-bold text-white">
                      {initials(user.nama)}
                    </span>
                    <span className="max-w-28 truncate text-foreground transition-colors group-hover:text-accent">{user.nama}</span>
                  </Link>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={logout}
                    className="h-9 w-9 rounded-full p-0 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive active:scale-[0.96]"
                    aria-label="Keluar"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button asChild size="sm" className="h-9 rounded-full bg-teal-dark px-4 text-xs font-semibold text-cream shadow-sm hover:bg-teal-dark/90 active:scale-[0.98]">
                  <Link href="/dashboard">
                    <LayoutDashboard data-slot="icon-inline-start" className="h-3.5 w-3.5 text-accent" />
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
                "h-10 w-10 rounded-full p-0 transition-colors md:hidden",
                open && "bg-secondary text-foreground"
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
              className="animate-in fade-in slide-in-from-top-2 motion-reduce:animate-none duration-200 absolute inset-x-0 top-full z-50 mt-2 rounded-3xl border border-border/80 bg-card p-3 shadow-lift md:hidden"
            >
              <nav aria-label="Navigasi Menu Mobile" className="flex flex-col gap-1">
                {mobileItems.map((item, i) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      style={{ animationDelay: `${i * 30}ms` }}
                      className={cn(
                        "flex min-h-11 items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-medium transition-all active:scale-[0.98]",
                        active
                          ? "bg-teal-dark font-semibold text-cream"
                          : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
                      )}
                    >
                      <span
                        className={cn(
                          "grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors",
                          active ? "bg-accent text-white" : "bg-secondary text-accent"
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                      </span>
                      {item.label}
                    </Link>
                  );
                })}

                <div className="mt-1 border-t border-border/60 pt-2">
                  {loading ? (
                    <span className="h-11 w-full animate-pulse rounded-2xl bg-secondary/70" />
                  ) : user ? (
                    <div className="flex items-center justify-between gap-3 rounded-2xl bg-secondary/50 p-2.5">
                      <div className="flex min-w-0 items-center gap-2.5">
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-xs font-bold text-white">
                          {initials(user.nama)}
                        </span>
                        <span className="truncate text-sm font-medium text-foreground">
                          {user.nama}
                        </span>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={logout}
                        size="sm"
                        className="h-9 shrink-0 rounded-full border-destructive/20 text-xs font-semibold text-destructive hover:bg-destructive/10"
                      >
                        <LogOut data-slot="icon-inline-start" className="h-3.5 w-3.5" />
                        Keluar
                      </Button>
                    </div>
                  ) : (
                    <Button asChild size="default" className="h-11 w-full rounded-full bg-teal-dark text-cream hover:bg-teal-dark/90">
                      <Link href="/dashboard">
                        <LayoutDashboard data-slot="icon-inline-start" className="h-4 w-4 text-accent" />
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
