"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  Home,
  Info,
  Phone,
  Search,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_ITEMS: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/kelompok", label: "Kelompok", icon: Users },
  { href: "/tugas", label: "Tugas", icon: FileText },
  { href: "/info", label: "Info", icon: Info },
  { href: "/kontak", label: "Kontak", icon: Phone },
];

export default function Nav() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className="sticky top-0 z-40 hidden border-b border-border/60 bg-background/90 backdrop-blur md:block">
        <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="flex w-fit items-center gap-2.5">
            <Image
              src="/logo-mabim.png"
              alt="Logo Mabim FTUI"
              width={36}
              height={36}
              className="rounded-full"
            />
            <span className="font-heading text-lg font-bold tracking-tight text-foreground">
              Mabim FTUI
            </span>
          </Link>

          <nav className="flex items-center gap-0.5 lg:gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-full px-2.5 py-2 text-sm font-medium transition-colors lg:px-3.5",
                  isActive(item.href)
                    ? "bg-secondary font-semibold text-foreground"
                    : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex justify-end">
            <Button
              asChild
              size="lg"
              className="hidden h-10 rounded-full px-6 lg:inline-flex"
            >
              <Link href="/kelompok">
                <Search data-slot="icon-inline-start" />
                Cari Kelompok
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border/70 bg-background/95 backdrop-blur md:hidden">
        <div className="mx-auto grid max-w-md grid-cols-5">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex min-h-16 flex-col items-center justify-center gap-1 py-1.5 text-xs font-medium transition-colors",
                  active ? "text-accent" : "text-muted-foreground"
                )}
              >
                <span
                  className={cn(
                    "rounded-full px-3 py-1 transition-colors",
                    active ? "bg-accent/15" : ""
                  )}
                >
                  <item.icon className="h-6 w-6" />
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
