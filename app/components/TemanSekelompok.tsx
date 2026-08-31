"use client";

import { useEffect, useMemo, useState } from "react";
import { Link2, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { DEPARTEMEN_WARNA } from "@/data/statistik";
import { KELOMPOK_LINE, type KelompokMember } from "@/data/kelompok";
import { cn } from "@/lib/utils";

function normalize(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function initials(nama: string) {
  return nama
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

export default function TemanSekelompok({
  kelompok,
  nama,
}: {
  kelompok: number | null;
  nama: string;
}) {
  const [members, setMembers] = useState<KelompokMember[] | null>(null);

  useEffect(() => {
    if (!kelompok) return;
    let alive = true;
    import("@/data/kelompok").then((mod) => {
      if (alive) setMembers(mod.KELOMPOK_MEMBER[kelompok] ?? []);
    });
    return () => {
      alive = false;
    };
  }, [kelompok]);

  const userNormal = useMemo(() => normalize(nama), [nama]);

  return (
    <Card className="rounded-[2rem] p-6 ring-border/60 shadow-card sm:p-8">
      <div className="flex items-center gap-3">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-secondary to-accent/15 text-accent">
          <Users className="h-6 w-6" />
        </span>
        <div>
          <h3 className="font-heading text-lg font-bold text-foreground">
            Teman Sekelompok
          </h3>
          <p className="text-sm text-muted-foreground">
            {kelompok
              ? `Kelompok ${kelompok} · ${members?.length ?? "..."} orang`
              : "Nomor kelompok belum tersedia."}
          </p>
        </div>
      </div>

      {kelompok && KELOMPOK_LINE[kelompok] && (
        <a
          href={KELOMPOK_LINE[kelompok]}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary hover:text-accent"
        >
          <Link2 className="h-4 w-4" />
          Gabung Grup LINE
        </a>
      )}

      {!kelompok ? (
        <div className="mt-5 space-y-3">
          <p className="text-center text-sm text-muted-foreground">
            Nomor kelompok belum diumumkan.
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-14 animate-pulse rounded-2xl bg-secondary/60"
              />
            ))}
          </div>
        </div>
      ) : members === null ? (
        <p className="mt-5 text-center text-sm text-muted-foreground">
          Memuat daftar teman sekelompok...
        </p>
      ) : members.length === 0 ? (
        <p className="mt-5 text-center text-sm text-muted-foreground">
          Belum ada data anggota kelompok.
        </p>
      ) : (
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          {members.map((m) => {
            const isMe = normalize(m.n) === userNormal;
            const dept = m.d;
            const badge = dept ? DEPARTEMEN_WARNA[dept]?.badge : null;
            return (
              <div
                key={m.n}
                className={cn(
                  "flex items-center gap-2.5 rounded-2xl px-3 py-2.5 min-w-0",
                  isMe
                    ? "bg-accent/10 ring-1 ring-accent/30"
                    : "bg-secondary/60"
                )}
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-secondary font-heading text-xs font-bold text-accent">
                  {initials(m.n)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-foreground">
                    {m.n}
                    {isMe && (
                      <span className="ml-1.5 text-[10px] font-bold uppercase tracking-wide text-accent">
                        kamu
                      </span>
                    )}
                  </span>
                </span>
                <span
                  className={cn(
                    "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold",
                    badge ?? "bg-secondary text-muted-foreground"
                  )}
                >
                  {dept ?? "—"}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
