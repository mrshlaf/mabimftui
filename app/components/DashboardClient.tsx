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
    <div className="rounded-3xl bg-card p-5 ring-1 ring-border/60 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift hover:ring-accent/40 sm:p-6">
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "shrink-0 rounded-full px-2.5 py-1 text-xs font-bold",
            badge ?? "bg-secondary text-secondary-foreground"
          )}
        >
          {lembaga.kode}
        </span>
        <h4 className="truncate font-heading text-base font-semibold text-foreground">
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
                className="rounded-2xl border border-border bg-secondary/40 p-4"
              >
                <p className="font-heading text-sm font-bold text-foreground">
                  {t.judul}
                </p>
                {dl && (
                  <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="text-xs text-muted-foreground">
                      Tenggat {dl.label} WIB
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
                      className="rounded-xl"
                    >
                      <a href={torUrl} target="_blank" rel="noopener noreferrer">
                        <FileText data-slot="icon-inline-start" />
                        TOR Tugas
                      </a>
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      disabled
                      className="rounded-xl"
                    >
                      TOR menyusul
                    </Button>
                  )}
                  {kumpulUrl ? (
                    <Button asChild size="sm" className="rounded-xl">
                      <a
                        href={kumpulUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Upload data-slot="icon-inline-start" />
                        Kumpulkan
                      </a>
                    </Button>
                  ) : (
                    <Button size="sm" disabled className="rounded-xl">
                      Link kumpul menyusul
                    </Button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-muted-foreground">
            Daftar tugas {lembaga.nama} akan diumumkan SC segera.
          </p>
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
      <div className="relative overflow-hidden rounded-[2.5rem] bg-teal-dark text-cream shadow-lift ring-1 ring-white/15">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15 grayscale"
          style={{ backgroundImage: "url('/bg-site.jpg')" }}
          aria-hidden="true"
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <span
            className="aurora-blob -left-24 -top-24 h-80 w-80"
            style={{
              background:
                "radial-gradient(closest-side, rgba(217, 101, 26, 0.30), transparent 70%)",
              animationDelay: "0s",
            }}
          />
          <span
            className="aurora-blob right-0 top-1/4 h-72 w-72"
            style={{
              background:
                "radial-gradient(closest-side, rgba(241, 239, 215, 0.12), transparent 70%)",
              animationDelay: "-7s",
            }}
          />
          <span
            className="aurora-blob -bottom-16 -right-16 h-80 w-80"
            style={{
              background:
                "radial-gradient(closest-side, rgba(6, 47, 59, 0.6), transparent 70%)",
              animationDelay: "-13s",
            }}
          />
        </div>
        <div aria-hidden="true" className="hero-beam" />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-6 -top-8 select-none font-heading text-[8rem] font-bold leading-none tracking-tight text-white/5 sm:text-[11rem]"
        >
          {user.departemen}
        </span>

        <div className="hero-fade relative px-6 py-8 sm:px-10 sm:py-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex min-w-0 items-center gap-4">
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-gradient-to-br from-accent to-amber-500 font-heading text-lg font-bold text-white shadow-lift ring-2 ring-white/25">
                {initials(user.nama)}
              </span>
              <div className="min-w-0">
                <h2 className="truncate font-heading text-3xl font-bold tracking-tight sm:text-4xl">
                  Halo,{" "}
                  <span className="bg-gradient-to-r from-cream via-white to-accent bg-clip-text text-transparent">
                    {firstName}
                  </span>
                </h2>
                <p className="mt-1 truncate text-sm text-cream/80">
                  {user.prodi} · NPM {user.npm}
                </p>
              </div>
            </div>
            <span
              className={cn(
                "shrink-0 rounded-full px-3 py-1 text-xs font-bold",
                warna?.badge
              )}
            >
              {user.departemen}
            </span>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl bg-white/10 p-5 text-center ring-1 ring-white/15 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-wide text-cream/70">
                Nomor Kelompok
              </p>
              {user.kelompok ? (
                <p className="mt-1 font-heading text-5xl font-bold tracking-tight text-cream sm:text-6xl">
                  {user.kelompok}
                </p>
              ) : (
                <p className="mt-3 text-sm text-cream/80">
                  Nomor kelompok menyusul
                </p>
              )}
            </div>
            <div className="flex flex-col items-center justify-center rounded-3xl bg-white/10 p-5 text-center ring-1 ring-white/15 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-wide text-cream/70">
                Grup Line
              </p>
              {lineUrl ? (
                <Button
                  asChild
                  size="lg"
                  className="mt-3 h-12 w-full rounded-full bg-cream text-teal-dark shadow-lift hover:bg-cream/90 hover:text-teal-dark"
                >
                  <a href={lineUrl} target="_blank" rel="noopener noreferrer">
                    <LineIcon className="h-5 w-5" />
                    Gabung Grup Line
                  </a>
                </Button>
              ) : (
                <p className="mt-3 text-sm text-cream/80">
                  Link grup Line dibagikan SC segera.
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2.5">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 rounded-full border-white/25 bg-transparent px-6 text-cream hover:bg-white/10 hover:text-cream"
            >
              <Link href="/info">
                <Megaphone data-slot="icon-inline-start" />
                Info Mabim
              </Link>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="lg"
              onClick={logout}
              className="h-12 rounded-full bg-destructive px-5 text-white shadow-lift hover:bg-destructive/85 hover:text-white focus-visible:ring-destructive/50 active:scale-[0.98]"
            >
              <LogOut data-slot="icon-inline-start" />
              Keluar
            </Button>
          </div>
        </div>
      </div>

      <Reveal>
        <Card className="rounded-[2rem] p-6 ring-border/60 shadow-card sm:p-8">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-secondary to-accent/15 text-accent">
              <FileText className="h-6 w-6" />
            </span>
            <div>
              <h3 className="font-heading text-lg font-bold text-foreground">
                Tugas
              </h3>
              <p className="text-sm text-muted-foreground">
                Tugas dari departemenmu, BEM, dan BOK dalam satu tempat.
              </p>
            </div>
          </div>

        <div
          role="tablist"
          aria-label="Kategori tugas"
          className="mt-5 flex gap-1 rounded-full bg-secondary/70 p-1.5"
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
                  "h-11 flex-1 rounded-full text-sm font-semibold transition-colors active:scale-[0.98]",
                  tab === t.key
                    ? "bg-card text-foreground shadow-card"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t.label}
                {count > 0 && (
                  <span
                    className={cn(
                      "ml-1.5 inline-grid h-5 min-w-5 place-items-center rounded-full px-1 text-[10px] font-bold",
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
