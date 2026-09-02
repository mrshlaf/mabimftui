"use client";

import { useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Building2,
  GraduationCap,
  LayoutGrid,
  List,
  Search,
  Users,
  X,
  ChevronDown,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mahasiswaData } from "@/data/mahasiswa";
import { DEPARTEMEN_WARNA, statistik } from "@/data/statistik";
import { DEPARTEMEN_NAMA, type DepartemenCode } from "@/data/types";
import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

const DEPARTEMEN_CODES: DepartemenCode[] = [
  "DTSL",
  "DTM",
  "DTE",
  "DTMM",
  "DA",
  "DTK",
  "DTI",
  "PI",
];

const PRODIS_PER_DEPT: Record<DepartemenCode, string[]> = {
  DTSL: ["Teknik Sipil", "Teknik Lingkungan"],
  DTM: ["Teknik Mesin", "Teknik Perkapalan"],
  DTE: ["Teknik Elektro", "Teknik Komputer", "Teknik Biomedik"],
  DTMM: ["Teknik Metalurgi dan Material"],
  DA: ["Arsitektur", "Arsitektur Interior"],
  DTK: ["Teknik Kimia", "Teknik Bioproses"],
  DTI: ["Teknik Industri"],
  PI: [
    "KKI Teknik Sipil",
    "KKI Teknik Mesin",
    "KKI Teknik Elektro",
    "KKI Teknik Metalurgi & Material",
    "KKI Arsitektur",
    "KKI Teknik Kimia",
    "KKI Teknik Industri",
    "KKI Teknik Perkapalan",
    "KKI Teknik Bioproses",
    "KKI Teknik Komputer",
    "KKI Teknik Lingkungan",
  ],
};

const ITEMS_PER_PAGE = 36;

function initials(nama: string) {
  return nama
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

function DepartemenContent() {
  const searchParams = useSearchParams();
  const initialDept = (searchParams.get("dept") as DepartemenCode) || "DTSL";

  const [selectedDept, setSelectedDept] = useState<DepartemenCode>(
    DEPARTEMEN_CODES.includes(initialDept) ? initialDept : "DTSL"
  );
  const [selectedProdi, setSelectedProdi] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const warna = DEPARTEMEN_WARNA[selectedDept];
  const prodiList = PRODIS_PER_DEPT[selectedDept] || [];

  // Filter students by selected department
  const deptStudents = useMemo(() => {
    return mahasiswaData.filter((m) => m.departemen === selectedDept);
  }, [selectedDept]);

  // Total counts per prodi in the current department
  const prodiCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const m of deptStudents) {
      counts[m.prodi] = (counts[m.prodi] || 0) + 1;
    }
    return counts;
  }, [deptStudents]);

  // Filter students by search and prodi
  const filteredStudents = useMemo(() => {
    const q = search.toLowerCase().trim();
    return deptStudents.filter((m) => {
      const matchProdi = selectedProdi === "all" || m.prodi === selectedProdi;
      if (!matchProdi) return false;
      if (!q) return true;
      return (
        m.nama.toLowerCase().includes(q) ||
        m.npm.includes(q) ||
        m.prodi.toLowerCase().includes(q)
      );
    });
  }, [deptStudents, selectedProdi, search]);

  const displayedStudents = useMemo(() => {
    return filteredStudents.slice(0, visibleCount);
  }, [filteredStudents, visibleCount]);

  function handleDeptChange(code: DepartemenCode) {
    setSelectedDept(code);
    setSelectedProdi("all");
    setSearch("");
    setVisibleCount(ITEMS_PER_PAGE);
  }

  function handleProdiChange(prodi: string) {
    setSelectedProdi(prodi);
    setVisibleCount(ITEMS_PER_PAGE);
  }

  return (
    <div className="space-y-5">
      {/* 8-Department Switcher Pill Tabs */}
      <Reveal>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Pilih Departemen / Lembaga
            </span>
            <span className="text-xs font-semibold text-accent">
              {deptStudents.length} Mahasiswa
            </span>
          </div>
          <div
            role="tablist"
            aria-label="Daftar Departemen FTUI"
            className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 rounded-2xl border border-border/80 bg-card p-1.5 shadow-xs"
          >
            {DEPARTEMEN_CODES.map((code) => {
              const active = selectedDept === code;
              const deptStat = statistik.departemen.find((d) => d.kode === code);
              const deptWarna = DEPARTEMEN_WARNA[code];
              return (
                <button
                  key={code}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleDeptChange(code)}
                  className={cn(
                    "flex flex-col sm:flex-row items-center justify-center gap-1 rounded-xl py-2 px-1 text-xs font-bold transition-all active:scale-[0.98] cursor-pointer",
                    active
                      ? cn("shadow-xs ring-2 ring-offset-1 ring-offset-background ring-accent/60", deptWarna?.badge)
                      : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
                  )}
                >
                  <span>{code}</span>
                  <span
                    className={cn(
                      "text-[10px] font-semibold px-1.5 py-0.2 rounded-full",
                      active
                        ? code === "DTI"
                          ? "bg-zinc-200 text-zinc-900"
                          : "bg-white/20 text-white"
                        : deptWarna?.badge ?? "bg-secondary text-muted-foreground"
                    )}
                  >
                    {deptStat?.jumlah ?? 0}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* Department Summary & Prodi Filter Bar */}
      <Reveal delay={60}>
        <div className={cn("relative overflow-hidden rounded-3xl border border-border/80 p-5 shadow-sm sm:p-6 transition-all duration-300", warna?.card ?? "bg-card")}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <span
                className={cn(
                  "grid h-12 w-12 shrink-0 place-items-center rounded-2xl font-heading text-sm font-bold shadow-md",
                  warna?.badge ?? "bg-accent text-white"
                )}
              >
                {selectedDept}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className={cn("rounded-full px-2.5 py-0.5 text-[11px] font-bold shadow-xs", warna?.badge)}>
                    {selectedDept}
                  </span>
                  <span className={cn("text-xs font-medium", warna?.sub ?? "text-muted-foreground")}>
                    {deptStudents.length} Mahasiswa Baru 2026
                  </span>
                </div>
                <h2 className={cn("mt-1 font-heading text-lg sm:text-xl font-bold tracking-tight", warna?.heading ?? "text-foreground")}>
                  {DEPARTEMEN_NAMA[selectedDept]}
                </h2>
              </div>
            </div>

            {/* Quick Stat Counter */}
            <div className="flex items-center gap-2.5 rounded-2xl border border-border/70 bg-card/80 backdrop-blur-xs px-3.5 py-2 shrink-0 self-start sm:self-auto shadow-xs">
              <Users className={cn("h-4 w-4 shrink-0", warna?.sub ? "text-accent" : "text-accent")} />
              <div>
                <span className="font-heading text-sm font-bold text-foreground">
                  {deptStudents.length.toLocaleString("id-ID")} Maba
                </span>
                <span className="text-[11px] text-muted-foreground block">
                  {prodiList.length} Program Studi
                </span>
              </div>
            </div>
          </div>

          {/* Program Studi Filter Chips */}
          <div className="mt-4 border-t border-black/10 pt-3.5">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className={cn("mr-1 text-xs font-semibold flex items-center gap-1", warna?.heading ?? "text-muted-foreground")}>
                <GraduationCap className="h-3.5 w-3.5" />
                Prodi:
              </span>
              <button
                type="button"
                onClick={() => handleProdiChange("all")}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-semibold transition-all active:scale-[0.98] cursor-pointer shadow-2xs",
                  selectedProdi === "all"
                    ? cn("text-white shadow-xs", warna?.badge ?? "bg-teal-dark text-cream")
                    : "border border-border/70 bg-card/90 text-foreground hover:bg-card"
                )}
              >
                Semua ({deptStudents.length})
              </button>
              {prodiList.map((p) => {
                const count = prodiCounts[p] || 0;
                const active = selectedProdi === p;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => handleProdiChange(p)}
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-semibold transition-all active:scale-[0.98] cursor-pointer shadow-2xs",
                      active
                        ? cn("text-white shadow-xs", warna?.badge ?? "bg-teal-dark text-cream")
                        : "border border-border/70 bg-card/90 text-foreground hover:bg-card"
                    )}
                  >
                    {p} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Toolbar: Search + View Mode Switcher */}
      <Reveal delay={90}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setVisibleCount(ITEMS_PER_PAGE);
              }}
              placeholder={`Cari nama mahasiswa di ${selectedDept}...`}
              className="h-10 w-full rounded-full border-border/80 bg-card pl-10 pr-9 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 focus-visible:border-accent/60 focus-visible:ring-accent/20"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between gap-3 shrink-0">
            <span className="text-xs text-muted-foreground font-medium">
              <strong className="text-foreground font-bold">{filteredStudents.length}</strong> mahasiswa
            </span>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-1 rounded-full border border-border/70 bg-secondary/40 p-0.5">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                aria-label="Tampilan Grid"
                className={cn(
                  "grid h-7 w-7 place-items-center rounded-full text-muted-foreground transition-colors cursor-pointer",
                  viewMode === "grid" && "bg-card text-foreground shadow-xs"
                )}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                aria-label="Tampilan List"
                className={cn(
                  "grid h-7 w-7 place-items-center rounded-full text-muted-foreground transition-colors cursor-pointer",
                  viewMode === "list" && "bg-card text-foreground shadow-xs"
                )}
              >
                <List className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Student Directory - Grid View */}
      {displayedStudents.length > 0 ? (
        viewMode === "grid" ? (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {displayedStudents.map((m, i) => (
              <Reveal key={m.npm} delay={(i % 6) * 20}>
                <div className="group relative flex items-center justify-between gap-3 rounded-2xl border border-border/70 bg-card p-3 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-sm">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-full font-heading text-[11px] font-bold", warna?.badge ?? "bg-secondary text-accent")}>
                      {initials(m.nama)}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-heading text-xs sm:text-sm font-semibold text-foreground transition-colors group-hover:text-accent">
                        {m.nama}
                      </p>
                      <p className="truncate text-[11px] text-muted-foreground font-medium">
                        {m.prodi}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center">
                    {m.kelompok ? (
                      <span className="rounded-full border border-border/60 bg-secondary/50 px-2.5 py-0.5 text-[10px] font-bold text-foreground">
                        Klp {m.kelompok}
                      </span>
                    ) : (
                      <span className="rounded-full bg-secondary/40 px-2 py-0.5 text-[9px] font-medium text-muted-foreground">
                        -
                      </span>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          /* Student Directory - Compact Table / List View */
          <div className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border/60 bg-secondary/40 text-[11px] font-semibold text-muted-foreground">
                    <th className="py-2.5 pl-4 pr-2 w-10">#</th>
                    <th className="py-2.5 px-3">Nama Mahasiswa</th>
                    <th className="py-2.5 px-3">Program Studi</th>
                    <th className="py-2.5 px-3 text-right pr-4">Kelompok</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {displayedStudents.map((m, idx) => (
                    <tr
                      key={m.npm}
                      className="transition-colors hover:bg-secondary/30"
                    >
                      <td className="py-2.5 pl-4 pr-2 text-muted-foreground font-mono text-[11px]">
                        {idx + 1}
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-foreground">
                        <div className="flex items-center gap-2">
                          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-secondary text-[10px] font-bold text-accent">
                            {initials(m.nama)}
                          </span>
                          <span>{m.nama}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-muted-foreground font-medium">
                        {m.prodi}
                      </td>
                      <td className="py-2.5 px-3 text-right pr-4">
                        {m.kelompok ? (
                          <span className="rounded-full border border-border/60 bg-secondary/50 px-2.5 py-0.5 text-[10px] font-bold text-foreground">
                            Klp {m.kelompok}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      ) : (
        <Card className="rounded-3xl border border-dashed border-border/80 bg-card p-8 text-center">
          <Building2 className="mx-auto h-7 w-7 text-muted-foreground/40 mb-2" />
          <p className="font-heading text-sm font-bold text-foreground">Tidak Ada Hasil</p>
          <p className="text-xs text-muted-foreground mt-1">
            Tidak ditemukan mahasiswa dengan kata kunci &quot;{search}&quot; di departemen {selectedDept}.
          </p>
        </Card>
      )}

      {/* Load More Button */}
      {visibleCount < filteredStudents.length && (
        <div className="flex justify-center pt-2">
          <Button
            type="button"
            variant="outline"
            size="default"
            onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
            className="rounded-full border-border/80 text-xs font-semibold px-6 hover:border-accent/40 hover:bg-accent/5 active:scale-[0.98] cursor-pointer"
          >
            Muat Lebih Banyak ({filteredStudents.length - visibleCount} tersisa)
            <ChevronDown className="ml-1 h-3.5 w-3.5" />
          </Button>
        </div>
      )}
    </div>
  );
}

export default function DepartemenClient() {
  return (
    <Suspense
      fallback={
        <div className="space-y-4 animate-pulse">
          <div className="h-14 rounded-2xl bg-secondary/60" />
          <div className="h-36 rounded-3xl bg-secondary/60" />
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="h-12 rounded-2xl bg-secondary/60" />
            ))}
          </div>
        </div>
      }
    >
      <DepartemenContent />
    </Suspense>
  );
}
