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
    <Card className="h-full rounded-[2rem] p-6 ring-border/60 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift hover:ring-accent/40">
      <div className="flex items-center gap-3">
        <Avatar
          size="lg"
          className="size-12 bg-gradient-to-br from-secondary to-accent/15 text-accent"
        >
          <AvatarFallback className="font-heading text-base font-bold">
            {initials(person.nama)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <h3 className="truncate font-heading text-base font-semibold text-foreground">
            {person.nama}
          </h3>
          <p className="truncate text-sm text-muted-foreground">{person.peran}</p>
        </div>
      </div>

      <div className="mt-4 space-y-1.5 text-sm text-muted-foreground">
        {person.npm && (
          <div className="flex items-center gap-2">
            <IdCard className="h-4 w-4 shrink-0 text-accent/70" />
            <span>NPM {person.npm}</span>
          </div>
        )}
        {person.departemen && (
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 shrink-0 text-accent/70" />
            <span>{person.departemen}</span>
          </div>
        )}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2.5">
        {tel && (
          <Button asChild size="lg" className="h-12 rounded-full px-4">
            <a href={tel}>
              <Phone data-slot="icon-inline-start" />
              Telepon
            </a>
          </Button>
        )}
        {wa && (
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 rounded-full border-border px-4 text-foreground hover:border-accent/40 hover:bg-accent/5"
          >
            <a href={wa} target="_blank" rel="noopener noreferrer">
              <MessageCircle data-slot="icon-inline-start" />
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
          className={cn("rounded-full px-3 py-1.5 text-sm", warna?.badge)}
        >
          {lembaga.kode}
        </Badge>
        <h3 className="font-heading text-xl font-semibold text-foreground">
          {lembaga.nama}
        </h3>
      </div>
      {lembaga.kontak.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {lembaga.kontak.map((person, i) => (
            <Reveal key={person.npm} className="h-full" delay={i * 70}>
              <KontakCard person={person} />
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal>
          <Card className="rounded-[2rem] border border-dashed p-6 text-center text-sm text-muted-foreground ring-0">
            <Building2 className="mx-auto h-6 w-6 text-accent/60" />
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
          className="flex gap-1 rounded-full bg-secondary/70 p-1.5"
        >
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              role="tab"
              aria-selected={filter === f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                "h-11 flex-1 rounded-full text-sm font-semibold transition-colors active:scale-[0.98]",
                filter === f.key
                  ? "bg-card text-foreground shadow-card"
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
        <p className="mt-12 text-center text-xs text-muted-foreground">
          Data contact person dikelola Steering Committee Mabim FTUI 2026 dan
          dapat diperbarui sewaktu-waktu.
        </p>
      </Reveal>
    </div>
  );
}
