"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { IdCard, LogIn, ShieldCheck, User, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { Mahasiswa } from "@/data/types";
import { useAuth } from "./auth-context";

function normalize(s: string) {
  return s.toLowerCase().replace(/\s+/g, " ").trim();
}

export default function LoginForm() {
  const { login } = useAuth();
  const [nama, setNama] = useState("");
  const [npm, setNpm] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "notfound" | "error">(
    "idle"
  );
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
    try {
      const records = await getRecords();
      const match = records.find(
        (m) =>
          normalize(m.nama) === normalize(nama) && m.npm === npm.trim()
      );
      if (match) {
        login(match);
      } else {
        setStatus("notfound");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <Card className="rounded-[2rem] p-6 ring-border/60 shadow-card !overflow-visible sm:p-8">
      <div className="flex items-center gap-3">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-secondary text-accent">
          <LogIn className="h-6 w-6" />
        </span>
        <div>
          <h2 className="font-heading text-lg font-bold text-foreground">
            Masuk Dashboard
          </h2>
          <p className="text-sm text-muted-foreground">
            Masukkan nama lengkap dan NPM sesuai data resmi.
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
          <LogIn data-slot="icon-inline-start" />
          Masuk
        </Button>
      </form>

      {status === "loading" && (
        <p className="mt-5 flex items-center justify-center gap-2 text-sm font-semibold text-foreground">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          Memeriksa data kamu...
        </p>
      )}

      {status === "notfound" && (
        <div className="mt-5 rounded-2xl bg-red-100 p-4 text-center">
          <UserX className="mx-auto h-6 w-6 text-red-600" />
          <p className="mt-2 text-sm font-semibold text-red-800">
            Data tidak ditemukan
          </p>
          <p className="mt-1 text-xs text-red-700">
            Nama atau NPM tidak cocok dengan data Mabim FTUI 2026.{" "}
            <Link
              href="/kontak"
              className="font-semibold underline underline-offset-2"
            >
              Hubungi SC
            </Link>{" "}
            jika butuh bantuan.
          </p>
        </div>
      )}

      {status === "error" && (
        <div className="mt-5 rounded-2xl bg-red-100 p-4 text-center">
          <p className="text-sm font-semibold text-red-800">
            Gagal memuat data. Coba muat ulang halaman.
          </p>
        </div>
      )}

      <p className="mt-5 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
        <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
        Login hanya untuk Mahasiswa Baru FTUI 2026.
      </p>
    </Card>
  );
}
