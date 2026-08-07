"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, UserRound, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { DepartemenCode, Mahasiswa } from "@/data/types";
import { DEPARTEMEN_WARNA } from "@/data/statistik";
import { cn } from "@/lib/utils";

function initials(nama: string) {
  return nama
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

export default function KenalanDepartemen({
  departemen,
  npm,
}: {
  departemen: DepartemenCode;
  npm: string;
}) {
  const [records, setRecords] = useState<Mahasiswa[] | null>(null);

  useEffect(() => {
    let alive = true;
    import("@/data/mahasiswa").then((mod) => {
      if (alive) setRecords(mod.mahasiswaData);
    });
    return () => {
      alive = false;
    };
  }, []);

  const groups = useMemo(() => {
    if (!records) return [];
    const map = new Map<string, Mahasiswa[]>();
    for (const m of records) {
      if (m.departemen !== departemen) continue;
      const arr = map.get(m.prodi) ?? [];
      arr.push(m);
      map.set(m.prodi, arr);
    }
    return [...map.entries()].sort((a, b) =>
      a[0].localeCompare(b[0], "id")
    );
  }, [records, departemen]);

  return (
    <Card className="rounded-[2rem] p-6 ring-border/60 shadow-card sm:p-8">
      <div className="flex items-center gap-3">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-secondary text-accent">
          <Users className="h-6 w-6" />
        </span>
        <div>
          <h3 className="font-heading text-lg font-bold text-foreground">
            Kenalan Departemen
          </h3>
          <p className="text-sm text-muted-foreground">
            Temui teman satu departemenmu dan cari kelompok yang sama.
          </p>
        </div>
      </div>

      {!records ? (
        <p className="mt-5 text-center text-sm text-muted-foreground">
          Memuat daftar teman se-departemen...
        </p>
      ) : (
        <div className="mt-5 space-y-3">
          {groups.map(([namaProdi, list]) => (
            <details
              key={namaProdi}
              className="group overflow-hidden rounded-3xl ring-1 ring-border/60 shadow-card"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 bg-card px-5 py-4 [&::-webkit-details-marker]:hidden">
                <span className="flex min-w-0 items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-secondary text-accent">
                    <UserRound className="h-4.5 w-4.5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-semibold text-foreground">
                      {namaProdi}
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      {list.length} mahasiswa
                    </span>
                  </span>
                </span>
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-secondary text-accent transition-transform group-open:rotate-180">
                  <ChevronDown className="h-4 w-4" />
                </span>
              </summary>
              <div
                className={cn(
                  "grid gap-2 border-t border-border/60 px-5 py-4 sm:grid-cols-2",
                  list.length > 12 && "max-h-[420px] overflow-y-auto"
                )}
              >
                {list.map((m) => (
                  <div
                    key={m.npm}
                    className={cn(
                      "flex items-center gap-2.5 rounded-2xl px-3 py-2.5",
                      m.npm === npm
                        ? "bg-accent/10 ring-1 ring-accent/30"
                        : "bg-secondary/60"
                    )}
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-secondary font-heading text-xs font-bold text-accent">
                      {initials(m.nama)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-foreground">
                        {m.nama}
                        {m.npm === npm && (
                          <span className="ml-1.5 text-[10px] font-bold uppercase tracking-wide text-accent">
                            kamu
                          </span>
                        )}
                      </span>
                    </span>
                    {m.kelompok ? (
                      <span
                        className={cn(
                          "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold",
                          DEPARTEMEN_WARNA[departemen]?.badge
                        )}
                      >
                        Kel {m.kelompok}
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>
      )}
    </Card>
  );
}
