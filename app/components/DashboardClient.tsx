"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FileText,
  LogOut,
  Megaphone,
  ShieldCheck,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { tugasLembaga } from "@/data/tugas";
import { DEPARTEMEN_WARNA } from "@/data/statistik";
import type { TugasLembaga } from "@/data/types";
import { cn } from "@/lib/utils";
import { safeExternalUrl } from "@/lib/url";
import { useAuth } from "./auth-context";
import LineIcon from "./LineIcon";
import LoginForm from "./LoginForm";
import Reveal from "./Reveal";
import TemanSekelompok from "./TemanSekelompok";

type TabKey = "dept" | "bem" | "bok";

const TABS: { key: TabKey; label: string }[] = [
  { key: "dept", label: "Departemen" },
  { key: "bem", label: "BEM" },
  { key: "bok", label: "BOK" },
];

function initials(nama: string) {
  return nama
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

function deadlineInfo(deadline: string) {
  const d = new Date(deadline);
  if (Number.isNaN(d.getTime())) return null;
  const diff = d.getTime() - Date.now();
  const days = Math.ceil(diff / 86_400_000);
  const label = new Intl.DateTimeFormat("id-ID", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
  }).format(d);
  let badgeText: string;
  let badgeCls: string;
  if (days < 0) {
    badgeText = "Tenggat lewat";
    badgeCls = "bg-red-600 text-white";
  } else if (days === 0) {
    badgeText = "Hari ini!";
    badgeCls = "bg-amber-500 text-amber-950";
  } else if (days <= 2) {
    badgeText = `${days} hari lagi`;
    badgeCls = "bg-amber-500 text-amber-950";
  } else {
    badgeText = `${days} hari lagi`;
    badgeCls = "bg-secondary text-muted-foreground";
  }
  return { label, badgeText, badgeCls };
}


function LembagaBlock({
  lembaga,
  badge,
}: {
  lembaga: TugasLembaga;
  badge?: string;
}) {
  return (
    <div className="rounded-2xl sm:rounded-3xl border border-border/70 bg-secondary/30 p-4 sm:p-6">
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
        <span
          className={cn(
            "shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold",
            badge ?? "bg-secondary text-secondary-foreground"
          )}
        >
          {lembaga.kode}
        </span>
        <h4 className="font-heading text-sm sm:text-base font-bold text-foreground leading-snug">
          {lembaga.nama}
        </h4>
      </div>
      <div className="mt-4 space-y-3">
        {lembaga.tugas.length > 0 ? (
          lembaga.tugas.map((t, i) => {
            const torUrl = safeExternalUrl(t.tor ?? "");
            const kumpulUrl = safeExternalUrl(t.kumpul ?? "");
            const dl = t.deadline ? deadlineInfo(t.deadline) : null;
            return (
              <div
                key={i}
                className="rounded-2xl border border-border/60 bg-secondary/30 p-4 transition-all hover:border-accent/30"
              >
                <div className="flex items-center gap-2.5">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent text-xs font-bold text-white shadow-sm">
                    {i + 1}
                  </span>
                  <p className="min-w-0 flex-1 font-heading text-sm font-bold text-foreground">
                    {t.judul}
                  </p>
                </div>
                {dl && (
                  <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="text-xs text-muted-foreground">
                      Tenggat: {dl.label} WIB
                    </span>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-bold",
                        dl.badgeCls
                      )}
                    >
                      {dl.badgeText}
                    </span>
                  </p>
                )}
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {torUrl ? (
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="rounded-full border-border/80 text-xs font-semibold hover:border-accent/40 hover:bg-accent/5"
                    >
                      <a href={torUrl} target="_blank" rel="noopener noreferrer">
                        <FileText data-slot="icon-inline-start" className="h-3.5 w-3.5" />
                        TOR Tugas
                      </a>
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      disabled
                      className="rounded-full text-xs"
                    >
                      TOR menyusul
                    </Button>
                  )}
                  {kumpulUrl ? (
                    <Button asChild size="sm" className="rounded-full bg-teal-dark text-cream text-xs font-semibold hover:bg-teal-dark/90">
                      <a
                        href={kumpulUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Upload data-slot="icon-inline-start" className="h-3.5 w-3.5" />
                        Kumpulkan
                      </a>
                    </Button>
                  ) : (
                    <Button size="sm" disabled className="rounded-full text-xs">
                      Link kumpul menyusul
                    </Button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="mt-4 rounded-xl border border-dashed border-border/80 bg-background/50 p-5 text-center">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Daftar penugasan {lembaga.nama} akan diumumkan oleh Steering Committee segera.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-5" aria-hidden="true">
      <div className="h-72 animate-pulse rounded-[2.5rem] bg-secondary/70 sm:h-80" />
      <div className="h-64 animate-pulse rounded-[2rem] bg-secondary/70" />
      <div className="h-64 animate-pulse rounded-[2rem] bg-secondary/70" />
    </div>
  );
}

export default function DashboardClient() {
  const { user, loading, logout } = useAuth();
  const [tab, setTab] = useState<TabKey>("dept");

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (!user) {
    return (
      <div className="space-y-5">
        <LoginForm />
        <p className="text-center text-xs text-muted-foreground">
          Tidak ingat NPM?{" "}
          <Link
            href="/kontak"
            className="font-semibold text-accent underline-offset-4 hover:underline"
          >
            Hubungi Steering Committee
          </Link>
        </p>
      </div>
    );
  }

  const warna = DEPARTEMEN_WARNA[user.departemen];
  const lineUrl = safeExternalUrl(user.linkGrupLine ?? "");

  const dept = tugasLembaga.find((t) => t.kode === user.departemen);
  const bem = tugasLembaga.find((t) => t.kode === "BEM");
  const bok = tugasLembaga.filter((t) => t.kategori === "bok");

  const tugasCount: Record<TabKey, number> = {
    dept: dept?.tugas.length ?? 0,
    bem: bem?.tugas.length ?? 0,
    bok: bok.reduce((n, l) => n + l.tugas.length, 0),
  };

  const firstName = user.nama.split(/\s+/)[0] ?? user.nama;

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-3xl bg-teal-dark text-cream shadow-lift ring-1 ring-white/15">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15 grayscale"
          style={{ backgroundImage: "url('/bg-site.jpg')" }}
          aria-hidden="true"
        />
        <div aria-hidden="true" className="hero-beam" />

        <div className="hero-fade relative px-6 py-8 sm:px-8 sm:py-9">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex min-w-0 items-center gap-4">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-accent text-lg font-bold text-white shadow-sm ring-2 ring-white/20">
                {initials(user.nama)}
              </span>
              <div className="min-w-0">
                <h2 className="truncate font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Halo,{" "}
                  <span className="bg-gradient-to-r from-cream via-amber-200 to-accent bg-clip-text text-transparent">
                    {firstName}
                  </span>
                </h2>
                <p className="mt-1 truncate text-xs text-cream/80">
                  {user.prodi} · NPM {user.npm}
                </p>
              </div>
            </div>
            <span
              className={cn(
                "shrink-0 rounded-full px-3 py-0.5 text-xs font-bold",
                warna?.badge
              )}
            >
              {user.departemen}
            </span>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-center backdrop-blur-md">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-cream/70">
                Nomor Kelompok
              </p>
              {user.kelompok ? (
                <p className="mt-1 font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  {user.kelompok}
                </p>
              ) : (
                <p className="mt-2 text-xs text-cream/80">
                  Nomor kelompok menyusul
                </p>
              )}
            </div>
            <div className="flex flex-col items-center justify-center rounded-2xl border border-white/15 bg-white/10 p-4 text-center backdrop-blur-md">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-cream/70">
                Grup Line
              </p>
              {lineUrl ? (
                <Button
                  asChild
                  size="default"
                  className="mt-2 h-10 w-full rounded-full bg-cream text-xs font-semibold text-teal-dark shadow-sm hover:bg-white hover:text-teal-950 active:scale-[0.98]"
                >
                  <a href={lineUrl} target="_blank" rel="noopener noreferrer">
                    <LineIcon className="h-4 w-4" />
                    Gabung Grup Line
                  </a>
                </Button>
              ) : (
                <p className="mt-2 text-xs text-cream/80">
                  Link grup Line dibagikan segera.
                </p>
              )}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2.5">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="h-9 rounded-full border-white/20 bg-white/5 px-4 text-xs font-medium text-cream hover:bg-white/15 hover:text-white"
            >
              <Link href="/info">
                <Megaphone data-slot="icon-inline-start" className="h-3.5 w-3.5 text-amber-300" />
                Info Mabim
              </Link>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={logout}
              className="h-9 rounded-full bg-destructive/80 px-4 text-xs font-semibold text-white hover:bg-destructive hover:text-white active:scale-[0.98] cursor-pointer"
            >
              <LogOut data-slot="icon-inline-start" className="h-3.5 w-3.5" />
              Keluar
            </Button>
          </div>
        </div>
      </div>

      <Reveal>
        <Card className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-secondary text-accent">
              <FileText className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-heading text-lg font-bold text-foreground">
                Daftar Penugasan
              </h3>
              <p className="text-xs text-muted-foreground">
                Tugas dari departemenmu, BEM, dan BOK dalam satu portal.
              </p>
            </div>
          </div>

          <div
            role="tablist"
            aria-label="Kategori tugas"
            className="mt-5 grid w-full grid-cols-3 gap-1 rounded-2xl border border-border/70 bg-secondary/50 p-1 sm:rounded-full"
          >
            {TABS.map((t) => {
              const count = tugasCount[t.key];
              return (
                <button
                  key={t.key}
                  type="button"
                  role="tab"
                  aria-selected={tab === t.key}
                  onClick={() => setTab(t.key)}
                  className={cn(
                    "flex h-9 sm:h-10 items-center justify-center gap-1.5 rounded-xl sm:rounded-full px-2 text-xs sm:text-sm font-semibold transition-all active:scale-[0.98] cursor-pointer",
                    tab === t.key
                      ? "bg-card text-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <span>{t.label}</span>
                  {count > 0 && (
                    <span
                      className={cn(
                        "inline-grid h-4.5 min-w-4.5 place-items-center rounded-full px-1 text-[10px] font-bold",
                        tab === t.key
                          ? "bg-accent text-white"
                          : "bg-secondary text-muted-foreground"
                      )}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div role="tabpanel" className="mt-4">
            {tab === "dept" &&
              (dept ? (
                <LembagaBlock lembaga={dept} badge={warna?.badge} />
              ) : null)}
            {tab === "bem" &&
              (bem ? (
                <LembagaBlock
                  lembaga={bem}
                  badge={DEPARTEMEN_WARNA.BEM?.badge}
                />
              ) : null)}
            {tab === "bok" && (
              <div className="space-y-3">
                {bok.map((l) => (
                  <LembagaBlock
                    key={l.kode}
                    lembaga={l}
                    badge={DEPARTEMEN_WARNA[l.kode]?.badge}
                  />
                ))}
              </div>
            )}
          </div>
        </Card>
      </Reveal>

      <Reveal>
        <TemanSekelompok kelompok={user.kelompok} nama={user.nama} />
      </Reveal>

      <Reveal delay={100}>
        <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
          Sesi kamu tersimpan aman di perangkat ini.
        </p>
      </Reveal>
    </div>
  );
}
