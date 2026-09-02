"use client";

import { useMemo, useState } from "react";
import { Building2, IdCard, MessageCircle, Phone } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { kontakLembaga } from "@/data/kontak";
import { DEPARTEMEN_WARNA } from "@/data/statistik";
import type { KontakPerson } from "@/data/types";
import { cn } from "@/lib/utils";
import { phoneToTel, phoneToWa, safeExternalUrl } from "@/lib/url";
import Reveal from "./Reveal";

type FilterKey = "all" | "lembaga" | "departemen";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "Semua" },
  { key: "lembaga", label: "Lembaga" },
  { key: "departemen", label: "Departemen" },
];

function initials(nama: string) {
  return nama
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

function KontakCard({ person }: { person: KontakPerson }) {
  const hasTelp = person.noTelp.trim().length > 0;
  const tel = hasTelp ? safeExternalUrl(phoneToTel(person.noTelp)) : null;
  const wa = hasTelp ? safeExternalUrl(phoneToWa(person.noTelp)) : null;
  return (
    <Card className="group relative flex flex-col justify-between overflow-hidden h-full rounded-3xl border border-border/80 bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card sm:p-6">
      <div>
        <div className="flex items-center gap-3">
          <Avatar
            size="lg"
            className="size-11 rounded-2xl bg-secondary text-accent font-heading font-bold"
          >
            <AvatarFallback className="font-heading text-sm font-bold">
              {initials(person.nama)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <h3 className="truncate font-heading text-base font-bold text-foreground transition-colors group-hover:text-accent">
              {person.nama}
            </h3>
            <p className="truncate text-xs text-muted-foreground">{person.peran}</p>
          </div>
        </div>

        <div className="mt-4 space-y-1 text-xs text-muted-foreground">
          {person.npm && (
            <div className="flex items-center gap-2">
              <IdCard className="h-3.5 w-3.5 shrink-0 text-accent" />
              <span>NPM {person.npm}</span>
            </div>
          )}
          {person.departemen && (
            <div className="flex items-center gap-2">
              <Building2 className="h-3.5 w-3.5 shrink-0 text-accent" />
              <span>{person.departemen}</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        {tel && (
          <Button asChild size="default" className="h-10 rounded-full bg-teal-dark text-xs font-semibold text-cream hover:bg-teal-dark/90">
            <a href={tel}>
              <Phone data-slot="icon-inline-start" className="h-3.5 w-3.5" />
              Telepon
            </a>
          </Button>
        )}
        {wa && (
          <Button
            asChild
            size="default"
            variant="outline"
            className="h-10 rounded-full border-border/80 text-xs font-semibold text-foreground hover:border-accent/40 hover:bg-accent/5"
          >
            <a href={wa} target="_blank" rel="noopener noreferrer">
              <MessageCircle data-slot="icon-inline-start" className="h-3.5 w-3.5 text-emerald-600" />
              WhatsApp
            </a>
          </Button>
        )}
      </div>
    </Card>
  );
}

function LembagaSection({
  lembaga,
}: {
  lembaga: (typeof kontakLembaga)[number];
}) {
  const warna = DEPARTEMEN_WARNA[lembaga.kode];
  return (
    <div>
      <div className="mb-4 flex items-center gap-2.5">
        <Badge
          variant="secondary"
          className={cn("rounded-full px-3 py-0.5 text-xs font-bold", warna?.badge)}
        >
          {lembaga.kode}
        </Badge>
        <h2 className="font-heading text-lg font-bold text-foreground">
          {lembaga.nama}
        </h2>
      </div>
      {lembaga.kontak.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {lembaga.kontak.map((person, i) => (
            <Reveal key={person.npm} className="h-full" delay={i * 60}>
              <KontakCard person={person} />
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal>
          <Card className="rounded-3xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground">
            <Building2 className="mx-auto h-5 w-5 text-accent/60" />
            <p className="mt-2">Kontak lembaga ini menyusul.</p>
          </Card>
        </Reveal>
      )}
    </div>
  );
}

export default function KontakClient() {
  const [filter, setFilter] = useState<FilterKey>("all");

  const list = useMemo(
    () =>
      filter === "all"
        ? kontakLembaga
        : kontakLembaga.filter((l) => l.kategori === filter),
    [filter]
  );

  return (
    <div>
      <Reveal>
        <div
          role="tablist"
          aria-label="Filter kategori kontak"
          className="grid w-full grid-cols-3 gap-1 rounded-2xl border border-border/70 bg-secondary/50 p-1 max-w-md mx-auto sm:rounded-full"
        >
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              role="tab"
              aria-selected={filter === f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                "flex h-9 items-center justify-center rounded-xl sm:rounded-full text-xs font-semibold transition-all active:scale-[0.98] cursor-pointer",
                filter === f.key
                  ? "bg-card text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="mt-8 space-y-8">
        {list.map((lembaga, i) => (
          <Reveal key={lembaga.kode} delay={(i % 2) * 80}>
            <LembagaSection lembaga={lembaga} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Data contact person dikelola Steering Committee Mabim FTUI 2026 dan
          dapat diperbarui sewaktu-waktu.
        </p>
      </Reveal>
    </div>
  );
}
