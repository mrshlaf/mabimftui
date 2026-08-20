"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Lock, LogOut, Search, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DEPARTEMEN_WARNA, statistik } from "@/data/statistik";
import { cn } from "@/lib/utils";

const ADMIN_USER = "SCMabim";
const ADMIN_PASS = "SCAdminMantep";
const SESSION_KEY = "mabim-admin-session";

type KelompokMember = { n: string; d?: string };

function initials(nama: string) {
  return nama
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}



export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [kelompokData, setKelompokData] = useState<
    Record<number, KelompokMember[]> | null
  >(null);
  const [allMahasiswa, setAllMahasiswa] = useState<
    { nama: string; departemen: string; kelompok: number | null; npm: string }[] | null
  >(null);
  const [loading, setLoading] = useState(false);
  const loadRef = useRef(false);

  useEffect(() => {
    const id = window.setTimeout(() => {
      if (sessionStorage.getItem(SESSION_KEY) === "1") setAuthed(true);
      setReady(true);
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!authed || kelompokData || loadRef.current) return;
    loadRef.current = true;
    setLoading(true);
    Promise.all([import("@/data/kelompok"), import("@/data/mahasiswa")]).then(
      ([kMod, mMod]) => {
        setKelompokData(kMod.KELOMPOK_MEMBER);
        setAllMahasiswa(mMod.mahasiswaData);
        setLoading(false);
      }
    );
  }, [authed, kelompokData]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      setAuthed(true);
      sessionStorage.setItem(SESSION_KEY, "1");
      setError("");
    } else {
      setError("Username atau password salah.");
    }
  }

  function handleLogout() {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
    setKelompokData(null);
    setAllMahasiswa(null);
    loadRef.current = false;
    setUsername("");
    setPassword("");
  }

  const notInKelompok = useMemo(() => {
    if (!allMahasiswa) return [];
    return allMahasiswa.filter((m) => m.kelompok === null);
  }, [allMahasiswa]);

  const totalInKelompok = useMemo(() => {
    if (!allMahasiswa) return 0;
    return allMahasiswa.filter((m) => m.kelompok !== null).length;
  }, [allMahasiswa]);

  const deptCounts = useMemo(() => {
    if (!kelompokData) return null;
    const counts: Record<string, number> = {};
    for (const members of Object.values(kelompokData)) {
      for (const m of members) {
        if (m.d) counts[m.d] = (counts[m.d] || 0) + 1;
      }
    }
    return counts;
  }, [kelompokData]);

  const filtered = useMemo(() => {
    if (!kelompokData) return [];
    const q = search.toLowerCase().trim();
    const entries = Object.entries(kelompokData)
      .map(([k, v]) => [Number(k), v] as const)
      .sort((a, b) => a[0] - b[0]);
    if (!q) return entries;
    return entries.filter(([num, members]) => {
      if (String(num).includes(q)) return true;
      return members.some(
        (m) =>
          m.n.toLowerCase().includes(q) ||
          (m.d && m.d.toLowerCase().includes(q))
      );
    });
  }, [kelompokData, search]);

  if (!ready) {
    return (
      <div className="flex min-h-full items-center justify-center px-4 py-16">
        <div className="h-10 w-40 animate-pulse rounded-full bg-secondary/60" />
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="flex min-h-full items-center justify-center px-4 py-16">
        <Card className="w-full max-w-sm rounded-[2rem] p-8 ring-border/60 shadow-card">
          <div className="flex flex-col items-center text-center">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-secondary text-accent">
              <Lock className="h-7 w-7" />
            </span>
            <h1 className="mt-4 font-heading text-xl font-bold text-foreground">
              Admin Access
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Masukkan kredensial untuk mengakses panel admin.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="username"
                className="mb-1.5 block text-sm font-semibold text-foreground"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-12 w-full rounded-2xl border border-border bg-card px-4 text-sm text-foreground outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-accent/50"
                placeholder="Masukkan username"
                autoComplete="username"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-semibold text-foreground"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 w-full rounded-2xl border border-border bg-card px-4 text-sm text-foreground outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-accent/50"
                placeholder="Masukkan password"
                autoComplete="current-password"
              />
            </div>
            {error && (
              <p className="text-center text-sm font-medium text-destructive">
                {error}
              </p>
            )}
            <Button
              type="submit"
              className="h-12 w-full rounded-full"
              size="lg"
            >
              Masuk
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
            Admin — Tracking Kelompok
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {statistik.total.toLocaleString("id-ID")} maba —{" "}
            {kelompokData ? Object.keys(kelompokData).length : 0} kelompok —{" "}
            {totalInKelompok} terdaftar — {notInKelompok.length} belum ada
            kelompok
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          onClick={handleLogout}
          className="rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut data-slot="icon-inline-start" />
          Keluar
        </Button>
      </div>

      {deptCounts && (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-9">
          {statistik.departemen
            .map((d) => d.kode)
            .concat(["BEM", "MPM"])
            .map((kode) => (
              <div
                key={kode}
                className="rounded-2xl bg-secondary/50 px-3 py-2 text-center"
              >
                <p
                  className={cn(
                    "text-[10px] font-bold",
                    DEPARTEMEN_WARNA[kode]?.heading ?? "text-foreground"
                  )}
                >
                  {kode}
                </p>
                <p className="font-heading text-lg font-bold text-foreground">
                  {deptCounts[kode] ?? 0}
                </p>
              </div>
            ))}
        </div>
      )}

      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-12 w-full rounded-full border border-border bg-card pl-11 pr-4 text-sm text-foreground outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-accent/50"
          placeholder="Cari nama atau departemen..."
        />
      </div>

      {notInKelompok.length > 0 && (
        <Card className="rounded-[2rem] p-5 ring-border/60 shadow-card sm:p-6">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-rose-500/10 text-rose-600">
              <UserX className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-heading text-base font-bold text-foreground">
                Belum Ada Kelompok
              </h3>
              <p className="text-xs text-muted-foreground">
                {notInKelompok.length} mahasiswa belum terdaftar di kelompok
                manapun
              </p>
            </div>
          </div>
          <div className="mt-3 grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
            {notInKelompok.map((m) => (
              <div
                key={m.npm}
                className="flex items-center gap-2 rounded-xl bg-secondary/50 px-2.5 py-1.5"
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-secondary font-heading text-[10px] font-bold text-accent">
                  {initials(m.nama)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-xs font-semibold text-foreground">
                    {m.nama}
                  </span>
                </span>
                <span
                  className={cn(
                    "shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-bold",
                    DEPARTEMEN_WARNA[m.departemen]?.badge ??
                      "bg-secondary text-muted-foreground"
                  )}
                >
                  {m.departemen}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {loading ? (
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="h-16 animate-pulse rounded-2xl bg-secondary/60"
            />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(([num, members]) => {
            const deptDist: Record<string, number> = {};
            for (const m of members) {
              if (m.d) deptDist[m.d] = (deptDist[m.d] || 0) + 1;
            }
            return (
              <Card
                key={num}
                className="rounded-[1.5rem] p-4 ring-border/60 shadow-card sm:p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent font-heading text-sm font-bold text-white">
                    {num}
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="block font-heading text-sm font-semibold text-foreground">
                      Kelompok {num}
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      {members.length} orang
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(deptDist).map(([d, c]) => (
                      <span
                        key={d}
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-bold",
                          DEPARTEMEN_WARNA[d]?.badge ??
                            "bg-secondary text-secondary-foreground"
                        )}
                      >
                        {d} {c}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-3 grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
                  {members.map((m, idx) => (
                    <div
                      key={`${m.n}-${idx}`}
                      className="flex items-center gap-2 rounded-xl bg-secondary/50 px-2.5 py-1.5"
                    >
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-secondary font-heading text-[10px] font-bold text-accent">
                        {initials(m.n)}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-xs font-semibold text-foreground">
                          {m.n}
                        </span>
                      </span>
                      {m.d && (
                        <span
                          className={cn(
                            "shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-bold",
                            DEPARTEMEN_WARNA[m.d]?.badge ??
                              "bg-secondary text-muted-foreground"
                          )}
                        >
                          {m.d}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
          {filtered.length === 0 && kelompokData && (
            <p className="py-10 text-center text-sm text-muted-foreground">
              Tidak ditemukan kelompok yang cocok.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
