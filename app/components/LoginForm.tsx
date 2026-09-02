"use client";

import { useEffect, useRef, useState } from "react";
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
    <Card className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm !overflow-visible sm:p-8">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-secondary text-accent">
          <LogIn className="h-5 w-5" />
        </span>
        <div>
          <h2 className="font-heading text-lg font-bold text-foreground">
            Masuk Dashboard
          </h2>
          <p className="text-xs text-muted-foreground">
            Masukkan nama lengkap dan NPM sesuai data resmi SIAK-NG.
          </p>
        </div>
      </div>

      <form className="mt-6 space-y-3.5" onSubmit={handleSubmit}>
        <div className="relative">
          <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
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
            className="h-12 rounded-full border-border/80 bg-background pl-11 pr-4 text-sm shadow-none focus-visible:border-accent/60 focus-visible:ring-accent/20 placeholder:text-muted-foreground/60"
          />
          {namaFocus && suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 top-[calc(100%+6px)] z-20 max-h-[240px] overflow-y-auto rounded-2xl border border-border/80 bg-card shadow-lift p-1.5 space-y-0.5">
              <li className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Saran Nama Mahasiswa
              </li>
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
                    className="flex w-full items-center justify-between gap-3 px-3 py-2 rounded-xl text-left text-xs text-foreground transition-all hover:bg-secondary active:scale-[0.99] cursor-pointer"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-secondary text-[10px] font-bold text-accent">
                        {m.nama.slice(0, 1)}
                      </span>
                      <span className="truncate font-medium">{m.nama}</span>
                    </div>
                    <span className="shrink-0 rounded-md bg-secondary/80 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                      {m.prodi}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="relative">
          <IdCard className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            inputMode="numeric"
            value={npm}
            onChange={(e) => setNpm(e.target.value)}
            placeholder="NPM (10 digit)"
            className="h-12 rounded-full border-border/80 bg-background pl-11 pr-4 text-sm shadow-none focus-visible:border-accent/60 focus-visible:ring-accent/20 placeholder:text-muted-foreground/60"
          />
        </div>

        {status === "notfound" && (
          <div className="flex items-center gap-2 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-2.5 text-xs text-destructive">
            <UserX className="h-4 w-4 shrink-0" />
            <span>Data tidak ditemukan. Pastikan nama dan NPM sudah tepat.</span>
          </div>
        )}

        {status === "error" && (
          <p className="text-center text-xs text-destructive">
            Terjadi kesalahan saat memuat data. Coba lagi.
          </p>
        )}

        <Button
          type="submit"
          disabled={status === "loading" || !nama.trim() || !npm.trim()}
          size="default"
          className="h-11 w-full rounded-full bg-teal-dark font-semibold text-cream shadow-sm hover:bg-teal-dark/90 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
        >
          {status === "loading" ? "Memeriksa data..." : "Masuk"}
        </Button>
      </form>

      <div className="mt-6 flex items-center justify-center gap-1.5 border-t border-border/60 pt-4 text-xs text-muted-foreground">
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
        <span>SIAK-NG FTUI 2026 · Akses Mahasiswa Baru</span>
      </div>
    </Card>
  );
}
