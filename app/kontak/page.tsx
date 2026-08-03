import type { Metadata } from "next";
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
import PageHeader from "../components/PageHeader";

export const metadata: Metadata = {
  title: "Kontak SC",
  description:
    "Hubungi contact person resmi BEM, MPM, dan lembaga lain Mabim FTUI 2026.",
};

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

function LembagaSection({ lembaga }: { lembaga: (typeof kontakLembaga)[number] }) {
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
          {lembaga.kontak.map((person) => (
            <KontakCard key={person.npm} person={person} />
          ))}
        </div>
      ) : (
        <Card className="rounded-[2rem] border border-dashed p-6 text-center text-sm text-muted-foreground ring-0">
          Kontak lembaga ini menyusul.
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
        desc="Hubungi contact person resmi tiap lembaga saat butuh bantuan selama Mabim."
        bg="/bg-kontak.jpg"
        icon={Phone}
      />

      <section className="mx-auto max-w-6xl px-4 pt-5 pb-16 sm:px-6 sm:pt-6 sm:pb-20 lg:px-8">
        <div className="space-y-8">
          {kontakLembaga.map((lembaga) => (
            <LembagaSection key={lembaga.kode} lembaga={lembaga} />
          ))}
        </div>

        <p className="mt-12 text-center text-xs text-muted-foreground">
          Data contact person dikelola Steering Committee Mabim FTUI 2026 dan
          dapat diperbarui sewaktu-waktu.
        </p>
      </section>
    </div>
  );
}
