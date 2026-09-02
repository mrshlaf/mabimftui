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
    <Card className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm sm:p-8">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-secondary text-accent">
            <Users className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Teman Sekelompok
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              {kelompok
                ? `Kelompok ${kelompok} · ${members?.length ?? "..."} orang`
                : "Nomor kelompok belum diumumkan."}
            </p>
          </div>
        </div>

        {kelompok && KELOMPOK_LINE[kelompok] && (
          <a
            href={KELOMPOK_LINE[kelompok]}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-secondary/60 px-3.5 py-1.5 text-xs font-semibold text-foreground transition-all hover:bg-secondary hover:border-accent/40"
          >
            <Link2 className="h-3.5 w-3.5 text-accent" />
            Grup LINE
          </a>
        )}
      </div>

      {!kelompok ? (
        <div className="mt-5 space-y-3">
          <p className="text-center text-xs text-muted-foreground">
            Nomor kelompok akan diumumkan oleh Steering Committee.
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-12 animate-pulse rounded-2xl bg-secondary/40"
              />
            ))}
          </div>
        </div>
      ) : members === null ? (
        <p className="mt-5 text-center text-xs text-muted-foreground">
          Memuat daftar anggota kelompok...
        </p>
      ) : members.length === 0 ? (
        <p className="mt-5 text-center text-xs text-muted-foreground">
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
                  "flex items-center justify-between gap-2.5 rounded-2xl px-3 py-2 border transition-all",
                  isMe
                    ? "border-accent/40 bg-accent/5"
                    : "border-border/60 bg-secondary/30"
                )}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-secondary text-xs font-bold text-accent">
                    {initials(m.n)}
                  </span>
                  <span className="truncate text-xs font-semibold text-foreground">
                    {m.n}
                    {isMe && (
                      <span className="ml-1 text-[10px] font-bold text-accent uppercase tracking-wider">
                        (kamu)
                      </span>
                    )}
                  </span>
                </div>
                <span
                  className={cn(
                    "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold",
                    badge ?? "bg-secondary text-muted-foreground"
                  )}
                >
                  {dept ?? "-"}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
