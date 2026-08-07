import type { Statistik } from "./types";

export const DEPARTEMEN_WARNA: Record<
  string,
  {
    badge: string;
    card: string;
    heading: string;
    sub: string;
    bar: string;
    track: string;
  }
> = {
  DTE: {
    badge: "bg-sky-700 text-white",
    card: "bg-sky-100/80 ring-sky-300/60",
    heading: "text-sky-950",
    sub: "text-sky-800/70",
    bar: "bg-sky-600",
    track: "bg-black/10",
  },
  DTM: {
    badge: "bg-neutral-900 text-white",
    card: "bg-neutral-900 ring-neutral-700/60",
    heading: "text-white",
    sub: "text-neutral-400",
    bar: "bg-neutral-400",
    track: "bg-white/15",
  },
  DTSL: {
    badge: "bg-slate-600 text-white",
    card: "bg-slate-100/80 ring-slate-300/60",
    heading: "text-slate-900",
    sub: "text-slate-600/80",
    bar: "bg-slate-600",
    track: "bg-black/10",
  },
  DTMM: {
    badge: "bg-emerald-700 text-white",
    card: "bg-emerald-100/80 ring-emerald-300/60",
    heading: "text-emerald-950",
    sub: "text-emerald-800/70",
    bar: "bg-emerald-600",
    track: "bg-black/10",
  },
  DTK: {
    badge: "bg-red-700 text-white",
    card: "bg-red-100/80 ring-red-300/60",
    heading: "text-red-950",
    sub: "text-red-800/70",
    bar: "bg-red-600",
    track: "bg-black/10",
  },
  DA: {
    badge: "bg-violet-700 text-white",
    card: "bg-violet-100/80 ring-violet-300/60",
    heading: "text-violet-950",
    sub: "text-violet-800/70",
    bar: "bg-violet-600",
    track: "bg-black/10",
  },
  DTI: {
    badge: "bg-zinc-300 text-zinc-900",
    card: "bg-white ring-zinc-300/70",
    heading: "text-zinc-900",
    sub: "text-zinc-500",
    bar: "bg-zinc-400",
    track: "bg-black/10",
  },
  PI: {
    badge: "bg-amber-700 text-white",
    card: "bg-amber-100/80 ring-amber-300/60",
    heading: "text-amber-950",
    sub: "text-amber-800/70",
    bar: "bg-amber-600",
    track: "bg-black/10",
  },
  BEM: {
    badge: "bg-blue-900 text-white",
    card: "bg-blue-100/80 ring-blue-300/60",
    heading: "text-blue-950",
    sub: "text-blue-800/70",
    bar: "bg-blue-800",
    track: "bg-black/10",
  },
  MPM: {
    badge: "bg-blue-900 text-white",
    card: "bg-blue-100/80 ring-blue-300/60",
    heading: "text-blue-950",
    sub: "text-blue-800/70",
    bar: "bg-blue-800",
    track: "bg-black/10",
  },
  FUSI: {
    badge: "bg-yellow-400 text-yellow-950",
    card: "bg-yellow-50 ring-yellow-300/60",
    heading: "text-yellow-950",
    sub: "text-yellow-800/70",
    bar: "bg-yellow-500",
    track: "bg-black/10",
  },
  KMK: {
    badge: "bg-yellow-400 text-yellow-950",
    card: "bg-yellow-50 ring-yellow-300/60",
    heading: "text-yellow-950",
    sub: "text-yellow-800/70",
    bar: "bg-yellow-500",
    track: "bg-black/10",
  },
  PO: {
    badge: "bg-yellow-400 text-yellow-950",
    card: "bg-yellow-50 ring-yellow-300/60",
    heading: "text-yellow-950",
    sub: "text-yellow-800/70",
    bar: "bg-yellow-500",
    track: "bg-black/10",
  },
};

export const statistik: Statistik = {
  total: 1806,
  prodi: 13,
  departemen: [
    { kode: "DTSL", nama: "Departemen Teknik Sipil dan Lingkungan", jumlah: 241 },
    { kode: "DTM", nama: "Departemen Teknik Mesin", jumlah: 258 },
    { kode: "DTE", nama: "Departemen Teknik Elektro", jumlah: 264 },
    { kode: "DTMM", nama: "Departemen Teknik Metalurgi dan Material", jumlah: 124 },
    { kode: "DA", nama: "Departemen Arsitektur", jumlah: 108 },
    { kode: "DTK", nama: "Departemen Teknik Kimia", jumlah: 175 },
    { kode: "DTI", nama: "Departemen Teknik Industri", jumlah: 203 },
    { kode: "PI", nama: "Program Internasional", jumlah: 433 },
  ],
};
