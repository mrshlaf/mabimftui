"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  IdCard,
  RotateCcw,
  Search,
  ShieldCheck,
  User,
  UserX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { Mahasiswa } from "@/data/types";
import { DEPARTEMEN_WARNA } from "@/data/statistik";
import { cn } from "@/lib/utils";
import { safeExternalUrl } from "@/lib/url";
import LineIcon from "./LineIcon";

function normalize(s: string) {
  return s.toLowerCase().replace(/\s+/g, " ").trim();
}

type Status = "idle" | "loading" | "found" | "notfound" | "error";

function GroupLineButton({ link }: { link: string | null }) {
  const url = safeExternalUrl(link ?? "");
  if (!url) {
    return (
      <p className="text-center text-sm text-muted-foreground">
        Link grup Line akan dibagikan oleh SC segera.
      </p>
    );
  }
  return (
    <Button asChild size="lg" className="h-13 w-full rounded-full px-6">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <LineIcon className="h-5 w-5" />
        Gabung Grup Line
      </a>
    </Button>
  );
}

export default function SearchMahasiswa() {
  const [nama, setNama] = useState("");
  const [npm, setNpm] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [found, setFound] = useState<Mahasiswa | null>(null);
  const [namaFocus, setNamaFocus] = useState(false);
  const [suggestions, setSuggestions] = useState<Mahasiswa[]>([]);
  const recordsRef = useRef<Mahasiswa[] | null>(null);

  async function getRecords() {
    if (!recordsRef.current) {
      recordsRef.current = (await import("@/data/mahasiswa")).mahasiswaData;
    }
    return recordsRef.current;
  }

  useEffect(() => {
    let cancelled = false;
    const q = normalize(nama);
    if (!namaFocus || !q) return;
    getRecords().then((records) => {
      if (cancelled) return;
      setSuggestions(
        records.filter((m) => normalize(m.nama).includes(q)).slice(0, 6)
      );
    });
    return () => {
      cancelled = true;
    };
  }, [nama, namaFocus]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!nama.trim() || !npm.trim()) return;
    setStatus("loading");
    setFound(null);
    try {
      const records = await getRecords();
      const match = records.find(
        (m) =>
          normalize(m.nama) === normalize(nama) && m.npm === npm.trim()
      );
      if (match) {
        setFound(match);
        setStatus("found");
      } else {
        setStatus("notfound");
      }
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    setStatus("idle");
    setFound(null);
  }

  return (
    <div className="space-y-5">
      {status === "idle" && (
        <Card className="rounded-[2rem] p-6 ring-border/60 shadow-card !overflow-visible sm:p-8">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-secondary text-accent">
              <Search className="h-6 w-6" />
            </span>
            <div>
              <h2 className="font-heading text-lg font-bold text-foreground">
                Cari Kelompokmu
              </h2>
              <p className="text-sm text-muted-foreground">
                Masukkan nama lengkap dan NPM sesuai data yang kamu terima.
              </p>
            </div>
          </div>

          <form className="mt-6 space-y-3" onSubmit={handleSubmit}>
            <div className="relative">
              <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                autoComplete="off"
                value={nama}
                onChange={(e) => {
                  setNama(e.target.value);
                  if (!normalize(e.target.value)) setSuggestions([]);
                }}
                onFocus={() => setNamaFocus(true)}
                onBlur={() =>
                  setTimeout(() => {
                    setNamaFocus(false);
                    setSuggestions([]);
                  }, 150)
                }
                placeholder="Nama lengkap kamu"
                className="h-13 rounded-full border-border bg-card pl-12 pr-4 text-base shadow-card placeholder:text-muted-foreground/70"
              />
              {namaFocus && suggestions.length > 0 && (
                <ul className="absolute left-0 right-0 top-[calc(100%+6px)] z-20 max-h-[232px] overflow-y-auto rounded-2xl border border-border bg-card shadow-lift">
                  {suggestions.map((m) => (
                    <li key={m.npm}>
                      <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => {
                          setNama(m.nama);
                          setSuggestions([]);
                          setNamaFocus(false);
                        }}
                        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm text-foreground transition-colors hover:bg-secondary"
                      >
                        <span className="truncate font-medium">{m.nama}</span>
                        <span className="shrink-0 text-xs text-muted-foreground">
                          {m.prodi}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="relative">
              <IdCard className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                inputMode="numeric"
                autoComplete="off"
                value={npm}
                onChange={(e) => setNpm(e.target.value.replace(/\D/g, ""))}
                placeholder="NPM kamu (contoh: 2606736862)"
                className="h-13 rounded-full border-border bg-card pl-12 pr-4 text-base shadow-card placeholder:text-muted-foreground/70"
              />
            </div>
            <Button type="submit" size="lg" className="h-13 w-full rounded-full">
              <Search data-slot="icon-inline-start" />
              Cari Kelompok
            </Button>
          </form>

          <p className="mt-5 text-center text-xs text-muted-foreground">
            Tidak ingat NPM?{" "}
            <Link href="/kontak" className="font-semibold text-accent underline-offset-4 hover:underline">
              Hubungi Steering Committee
            </Link>
          </p>
        </Card>
      )}

      {status === "loading" && (
        <Card className="rounded-[2rem] p-8 text-center ring-border/60 shadow-card">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-secondary">
            <span className="h-6 w-6 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          </span>
          <p className="mt-3 font-semibold text-foreground">Mencari data kamu...</p>
        </Card>
      )}

      {status === "found" && found && (
        <Card className="rounded-[2rem] p-6 ring-border/60 shadow-card sm:p-8">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
            <ShieldCheck className="h-3.5 w-3.5" />
            Terverifikasi
          </span>

          <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground">
                {found.nama}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">{found.prodi}</p>
            </div>
            <div className="text-right">
              <span
                className={cn(
                  "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold",
                  DEPARTEMEN_WARNA[found.departemen].badge
                )}
              >
                {found.departemen}
              </span>
              <p className="mt-1 text-xs text-muted-foreground">
                NPM {found.npm}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-3xl bg-secondary/60 p-5 text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Nomor Kelompok
            </p>
            {found.kelompok ? (
              <p className="mt-1 font-heading text-5xl font-bold text-accent">
                {found.kelompok}
              </p>
            ) : (
              <p className="mt-1 text-sm text-muted-foreground">
                Nomor kelompok menyusul
              </p>
            )}
          </div>

          <div className="mt-5">
            <GroupLineButton link={found.linkGrupLine} />
          </div>

          <div className="mt-5 flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
            <p className="text-xs text-muted-foreground">
              Link tidak aktif?{" "}
              <Link href="/kontak" className="font-semibold text-accent underline-offset-4 hover:underline">
                Hubungi SC
              </Link>
            </p>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Cari data lain
            </button>
          </div>
        </Card>
      )}

      {status === "notfound" && (
        <Card className="rounded-[2rem] p-8 text-center ring-border/60 shadow-card">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-red-100 text-red-600">
            <UserX className="h-7 w-7" />
          </span>
          <h2 className="mt-4 font-heading text-xl font-bold text-foreground">
            Data tidak ditemukan
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            Nama atau NPM yang kamu masukkan tidak cocok dengan data Mabim FTUI
            2026. Periksa kembali, atau hubungi Steering Committee untuk
            dibantu.
          </p>
          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="h-13 rounded-full px-6">
              <Link href="/kontak">
                Hubungi Steering Committee
                <ArrowRight data-slot="icon-inline-end" />
              </Link>
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={reset}
              className="h-13 rounded-full border-border px-6"
            >
              Coba lagi
            </Button>
          </div>
        </Card>
      )}

      {status === "error" && (
        <Card className="rounded-[2rem] p-8 text-center ring-border/60 shadow-card">
          <h2 className="font-heading text-xl font-bold text-foreground">
            Gagal memuat data
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Terjadi kendala saat memuat data. Coba muat ulang halaman ini.
          </p>
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={reset}
            className="mt-6 h-13 rounded-full border-border px-6"
          >
            Coba lagi
          </Button>
        </Card>
      )}
    </div>
  );
}
