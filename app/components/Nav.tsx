"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
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
      <div className="h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
      <div className="border-b border-border/60 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="group flex items-center gap-2.5">
            <Image
              src="/logo-mabim.png"
              alt="Logo Mabim FTUI"
              width={36}
              height={36}
              className="rounded-full ring-2 ring-accent/30 transition-colors group-hover:ring-accent/60"
            />
            <span className="flex items-center gap-1.5">
              <span className="font-heading text-lg font-bold tracking-tight text-foreground">
                Mabim <span className="text-accent">FTUI</span>
              </span>
              <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
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
                    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors active:scale-[0.98]",
                    active
                      ? "bg-teal-dark text-cream"
                      : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
                  )}
                >
                  <item.icon
                    className={cn("h-4 w-4", active && "text-accent")}
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
                      "flex items-center gap-2 rounded-full border border-border bg-card py-1 pl-1 pr-3.5 text-sm font-semibold transition-colors hover:border-accent/40 hover:bg-accent/5",
                      isActive("/dashboard") && "border-accent/40 bg-accent/5"
                    )}
                  >
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-accent text-xs font-bold text-white ring-2 ring-accent/30">
                      {initials(user.nama)}
                    </span>
                    <span className="max-w-28 truncate">{user.nama}</span>
                  </Link>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={logout}
                    className="h-9 rounded-full px-3 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    aria-label="Keluar"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button asChild size="lg" className="h-9 rounded-full px-5">
                  <Link href="/dashboard">
                    <LayoutDashboard data-slot="icon-inline-start" />
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
                "h-11 w-11 rounded-full p-0 transition-colors md:hidden",
                open && "bg-secondary text-foreground"
              )}
              aria-label={open ? "Tutup menu" : "Buka menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="animate-in fade-in slide-in-from-top-2 motion-reduce:animate-none duration-200 absolute inset-x-3 top-full z-50 mt-2 rounded-[2rem] border border-border/60 bg-card p-3 shadow-lift md:hidden"
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
    </header>
  );
}
