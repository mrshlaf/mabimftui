import type { Metadata } from "next";
import {
  Building2,
  IdCard,
  MessageCircle,
  Phone,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { kontakUnits } from "@/data/kontak";
import { DEPARTEMEN_WARNA } from "@/data/statistik";
import type { KontakKategoriKey, KontakPerson } from "@/data/types";
import { cn } from "@/lib/utils";
import { phoneToTel, phoneToWa, safeExternalUrl } from "@/lib/url";
import PageHeader from "../components/PageHeader";

export const metadata: Metadata = {
  title: "Kontak - Mabim FTUI 2026",
};

const KATEGORI: { key: KontakKategoriKey; title: string; desc: string }[] = [
  {
    key: "lembaga",
    title: "Lembaga & Organisasi",
    desc: "Contact person BEM FTUI, MPM FTUI, FUSI, KMK, dan PO.",
  },
  {
    key: "departemen",
    title: "Koordinator Departemen / PI",
    desc: "Contact person koordinator tiap departemen dan Program Internasional.",
  },
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
  const tel = safeExternalUrl(phoneToTel(person.noTelp));
  const wa = safeExternalUrl(phoneToWa(person.noTelp));
  return (
    <Card className="rounded-[2rem] p-6 ring-border/60 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lift">
      <div className="flex items-center gap-3">
        <Avatar size="lg" className="size-12 bg-secondary text-accent">
          <AvatarFallback className="font-heading text-base font-bold">
            {initials(person.nama)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <h3 className="truncate font-heading text-base font-semibold text-foreground">
            {person.nama}
          </h3>
          <p className="truncate text-sm text-muted-foreground">
            {person.peran}
          </p>
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
            className="h-12 rounded-full border-border px-4 text-foreground"
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

function UnitSection({ unit }: { unit: (typeof kontakUnits)[number] }) {
  const warna = DEPARTEMEN_WARNA[unit.kode];
  return (
    <div>
      <div className="mb-4 flex items-center gap-2.5">
        <Badge
          variant="secondary"
          className={cn("rounded-full px-3 py-1.5", warna?.badge)}
        >
          {unit.kode}
        </Badge>
        <h3 className="font-heading text-lg font-semibold text-foreground">
          {unit.nama}
        </h3>
      </div>
      {unit.kontak.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {unit.kontak.map((person) => (
            <KontakCard key={person.npm} person={person} />
          ))}
        </div>
      ) : (
        <Card className="rounded-[2rem] border border-dashed p-6 text-center text-sm text-muted-foreground ring-0">
          Kontak unit ini menyusul.
        </Card>
      )}
    </div>
  );
}

export default function KontakPage() {
  return (
    <div className="min-h-full">
      <PageHeader
        eyebrow="Kontak SC"
        title="Hubungi Kami"
        desc="Butuh bantuan selama Mabim? Hubungi contact person resmi sesuai unitmu."
        bg="/bg-kontak.jpg"
      />

      <section className="mx-auto max-w-6xl px-6 py-8 sm:px-8 sm:py-10">
        {KATEGORI.map((kat) => (
          <div key={kat.key} className="mt-10">
            <div className="mb-6 flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary text-accent">
                <Users className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-heading text-xl font-bold text-foreground">
                  {kat.title}
                </h2>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {kat.desc}
                </p>
              </div>
            </div>

            <div className="space-y-10">
              {kontakUnits
                .filter((u) => u.kategori === kat.key)
                .map((unit) => (
                  <UnitSection key={unit.kode} unit={unit} />
                ))}
            </div>
          </div>
        ))}

        <p className="mt-12 text-center text-xs text-muted-foreground">
          Data contact person dikelola Steering Committee Mabim FTUI 2026 dan
          dapat diperbarui sewaktu-waktu.
        </p>
      </section>
    </div>
  );
}
