"use client";

import { useMemo, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import {
  Building2,
  GraduationCap,
  Layers,
  Search,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { mahasiswaData } from "@/data/mahasiswa";
import { DEPARTEMEN_WARNA, statistik } from "@/data/statistik";
import { DEPARTEMEN_NAMA, type DepartemenCode, type Mahasiswa } from "@/data/types";
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

const ITEMS_PER_PAGE = 32;

function initials(nama: string) {
  return nama
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function StudentCard({
  m,
  deptCode,
}: {
  m: Mahasiswa;
  deptCode: DepartemenCode;
}) {
  const warna = DEPARTEMEN_WARNA[deptCode];

  return (
    <Card className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card p-4 sm:p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card">
      <div>
        <div className="flex items-start justify-between gap-3">
          <Avatar
            size="lg"
            className="size-11 shrink-0 rounded-2xl bg-secondary text-accent font-heading font-bold"
          >
            <AvatarFallback className="font-heading text-xs sm:text-sm font-bold bg-secondary text-accent">
              {initials(m.nama)}
            </AvatarFallback>
          </Avatar>

          {m.kelompok !== null ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-accent/25 bg-accent/10 px-2.5 py-0.5 text-[11px] font-semibold text-accent">
              <Users className="h-3 w-3" />
              Kelompok {m.kelompok}
            </span>
          ) : (
            <span className="inline-flex items-center rounded-full border border-border/80 bg-secondary/60 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              Belum Ada Kelompok
            </span>
          )}
        </div>

        <div className="mt-3.5">
          <h3
            className="font-heading text-sm sm:text-base font-bold text-foreground transition-colors group-hover:text-accent line-clamp-2 leading-snug"
            title={m.nama}
          >
            {m.nama}
          </h3>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <GraduationCap className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          <span
            className="truncate text-xs font-medium text-muted-foreground"
            title={m.prodi}
          >
            {m.prodi}
          </span>
        </div>
        <span
          className={cn(
            "shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase",
            warna?.badge ?? "bg-secondary text-foreground"
          )}
        >
          {m.departemen}
        </span>
      </div>
    </Card>
  );
}

export default function DepartemenClient() {
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const initialDeptParam = searchParams.get("dept")?.toUpperCase() as DepartemenCode;
  const initialDept: DepartemenCode = DEPARTEMEN_CODES.includes(initialDeptParam)
    ? initialDeptParam
    : "DTSL";

  const [selectedDept, setSelectedDept] = useState<DepartemenCode>(initialDept);
  const [selectedProdi, setSelectedProdi] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const deptCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const d of DEPARTEMEN_CODES) {
      counts[d] = 0;
    }
    for (const m of mahasiswaData) {
      if (counts[m.departemen] !== undefined) {
        counts[m.departemen]++;
      }
    }
    return counts;
  }, []);

  const currentDeptStudents = useMemo(() => {
    return mahasiswaData.filter((m) => m.departemen === selectedDept);
  }, [selectedDept]);

  const availableProdis = useMemo(() => {
    const prodiMap = new Map<string, number>();
    for (const m of currentDeptStudents) {
      prodiMap.set(m.prodi, (prodiMap.get(m.prodi) ?? 0) + 1);
    }
    return Array.from(prodiMap.entries()).map(([prodi, count]) => ({
      prodi,
      count,
    }));
  }, [currentDeptStudents]);

  const filteredStudents = useMemo(() => {
    let list = currentDeptStudents;

    if (selectedProdi !== "all") {
      list = list.filter((m) => m.prodi === selectedProdi);
    }

    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter((m) => {
        const matchNama = m.nama.toLowerCase().includes(q);
        const matchProdi = m.prodi.toLowerCase().includes(q);
        const matchKelompok =
          m.kelompok !== null && `kelompok ${m.kelompok}`.includes(q);
        return matchNama || matchProdi || matchKelompok;
      });
    }

    return list;
  }, [currentDeptStudents, selectedProdi, searchQuery]);

  const visibleStudents = useMemo(() => {
    return filteredStudents.slice(0, page * ITEMS_PER_PAGE);
  }, [filteredStudents, page]);

  const handleSelectDept = (dept: DepartemenCode) => {
    startTransition(() => {
      setSelectedDept(dept);
      setSelectedProdi("all");
      setSearchQuery("");
      setPage(1);

      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        url.searchParams.set("dept", dept);
        window.history.replaceState({}, "", url.toString());
      }
    });
  };

  const handleSelectProdi = (prodi: string) => {
    setSelectedProdi(prodi);
    setPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const handleShowAll = () => {
    setPage(Math.ceil(filteredStudents.length / ITEMS_PER_PAGE));
  };

  const currentWarna = DEPARTEMEN_WARNA[selectedDept];
  const deptFullName = DEPARTEMEN_NAMA[selectedDept];
  const deptTotal = deptCounts[selectedDept] ?? currentDeptStudents.length;
  const hasMore = visibleStudents.length < filteredStudents.length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
      {/* Department Selector Tabs */}
      <Reveal>
        <div className="relative">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-accent" />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Pilih Departemen
              </span>
            </div>
            <span className="text-xs font-medium text-muted-foreground">
              Total {statistik.total.toLocaleString("id-ID")} Mahasiswa
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
            {DEPARTEMEN_CODES.map((code) => {
              const active = selectedDept === code;
              const count = deptCounts[code] ?? 0;
              const warna = DEPARTEMEN_WARNA[code];

              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => handleSelectDept(code)}
                  className={cn(
                    "group relative flex flex-col items-center justify-center rounded-2xl p-3 text-center transition-all duration-200 active:scale-[0.98] border",
                    active
                      ? "bg-teal-dark text-cream border-teal-dark shadow-lift ring-2 ring-accent/50"
                      : "bg-card text-foreground border-border/80 hover:border-accent/40 hover:bg-secondary/40 shadow-sm"
                  )}
                >
                  <span
                    className={cn(
                      "font-heading text-base font-bold tracking-tight",
                      active ? "text-white" : "text-foreground group-hover:text-accent"
                    )}
                  >
                    {code}
                  </span>
                  <span
                    className={cn(
                      "mt-1 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold",
                      active
                        ? "bg-white/15 text-cream"
                        : warna?.badge ?? "bg-secondary text-muted-foreground"
                    )}
                  >
                    {count} maba
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* Selected Department Overview Banner */}
      <Reveal delay={80}>
        <Card className="relative overflow-hidden rounded-3xl border border-border/80 bg-card p-6 shadow-sm sm:p-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-accent/10 blur-3xl"
          />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider",
                    currentWarna?.badge ?? "bg-teal-dark text-cream"
                  )}
                >
                  <Building2 className="h-3.5 w-3.5" />
                  {selectedDept}
                </span>
                <span className="text-xs font-semibold text-muted-foreground">
                  {availableProdis.length} Program Studi
                </span>
              </div>
              <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-foreground">
                {deptFullName}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Menampilkan daftar seluruh mahasiswa baru {selectedDept} Mabim FTUI 2026.
                Gunakan pencarian untuk mencari nama atau kelompok.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-4 rounded-2xl border border-border/70 bg-secondary/40 p-4 sm:p-5">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent text-white shadow-sm">
                <Users className="h-6 w-6" />
              </span>
              <div>
                <span className="text-xs font-semibold text-muted-foreground">
                  Jumlah Mahasiswa
                </span>
                <p className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
                  {deptTotal.toLocaleString("id-ID")}
                </p>
                <span className="text-[11px] font-medium text-accent">
                  Maba FTUI 2026
                </span>
              </div>
            </div>
          </div>

          {/* Program Studi Filter Chips */}
          <div className="mt-6 pt-6 border-t border-border/60">
            <div className="flex items-center gap-2 mb-3">
              <Layers className="h-3.5 w-3.5 text-accent" />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Filter Program Studi
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleSelectProdi("all")}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200 active:scale-[0.97]",
                  selectedProdi === "all"
                    ? "bg-teal-dark text-cream shadow-sm"
                    : "bg-secondary/70 text-foreground hover:bg-secondary hover:text-accent border border-border/60"
                )}
              >
                Semua Program Studi
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.2 text-[10px]",
                    selectedProdi === "all" ? "bg-white/20 text-white" : "bg-card text-muted-foreground"
                  )}
                >
                  {currentDeptStudents.length}
                </span>
              </button>

              {availableProdis.map(({ prodi, count }) => {
                const active = selectedProdi === prodi;
                return (
                  <button
                    key={prodi}
                    type="button"
                    onClick={() => handleSelectProdi(prodi)}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200 active:scale-[0.97]",
                      active
                        ? "bg-teal-dark text-cream shadow-sm"
                        : "bg-secondary/70 text-foreground hover:bg-secondary hover:text-accent border border-border/60"
                    )}
                  >
                    {prodi}
                    <span
                      className={cn(
                        "rounded-full px-1.5 py-0.2 text-[10px]",
                        active ? "bg-white/20 text-white" : "bg-card text-muted-foreground"
                      )}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </Card>
      </Reveal>

      {/* Search Bar & Result Metrics */}
      <Reveal delay={120}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder={`Cari nama mahasiswa atau kelompok di ${selectedDept}...`}
              className="h-11 rounded-full pl-10 pr-10 text-sm bg-card border-border/80 focus-visible:ring-accent shadow-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                aria-label="Hapus pencarian"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 grid h-5 w-5 place-items-center rounded-full bg-secondary text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            <span>
              Menampilkan{" "}
              <strong className="text-foreground">
                {visibleStudents.length}
              </strong>{" "}
              dari{" "}
              <strong className="text-foreground">
                {filteredStudents.length}
              </strong>{" "}
              mahasiswa
            </span>
          </div>
        </div>
      </Reveal>

      {/* Student Cards Grid */}
      {filteredStudents.length === 0 ? (
        <Reveal delay={140}>
          <Card className="rounded-3xl border border-dashed border-border/80 bg-card p-10 text-center sm:p-14">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-secondary text-muted-foreground">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="mt-4 font-heading text-lg font-bold text-foreground">
              Mahasiswa Tidak Ditemukan
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
              Tidak ada data mahasiswa di {selectedDept} yang sesuai dengan kata kunci &quot;
              {searchQuery}&quot;.
            </p>
            <div className="mt-5">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleClearSearch}
                className="rounded-full border-border/80 text-xs font-semibold"
              >
                Reset Pencarian
              </Button>
            </div>
          </Card>
        </Reveal>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-4">
            {visibleStudents.map((m, idx) => (
              <Reveal key={`${m.nama}-${idx}`} delay={(idx % 8) * 30}>
                <StudentCard m={m} deptCode={selectedDept} />
              </Reveal>
            ))}
          </div>

          {/* Load More & Pagination Controls */}
          {hasMore && (
            <Reveal>
              <div className="flex flex-col items-center justify-center gap-3 pt-4 sm:pt-6">
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    onClick={handleLoadMore}
                    className="h-11 rounded-full bg-teal-dark px-6 text-xs font-semibold text-cream shadow-sm hover:bg-teal-dark/90 active:scale-[0.98]"
                  >
                    Muat Lebih Banyak ({filteredStudents.length - visibleStudents.length} Tersisa)
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleShowAll}
                    className="h-11 rounded-full border-border/80 px-5 text-xs font-semibold text-foreground hover:border-accent/40 active:scale-[0.98]"
                  >
                    Tampilkan Semua
                  </Button>
                </div>
                <p className="text-[11px] font-medium text-muted-foreground">
                  Halaman {page} dari {Math.ceil(filteredStudents.length / ITEMS_PER_PAGE)}
                </p>
              </div>
            </Reveal>
          )}
        </div>
      )}
    </div>
  );
}
