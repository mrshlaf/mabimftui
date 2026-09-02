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
    badge: "bg-sky-600 text-white",
    card: "bg-gradient-to-br from-sky-100 to-sky-200 ring-sky-300/80",
    heading: "text-sky-950",
    sub: "text-sky-800/70",
    bar: "bg-sky-500",
    track: "bg-black/10",
  },
  DTM: {
    badge: "bg-neutral-900 text-white",
    card: "bg-gradient-to-br from-neutral-200 to-neutral-300 ring-neutral-400/80",
    heading: "text-neutral-950",
    sub: "text-neutral-700",
    bar: "bg-neutral-900",
    track: "bg-black/10",
  },
  DTSL: {
    badge: "bg-slate-600 text-white",
    card: "bg-gradient-to-br from-slate-100 to-slate-200 ring-slate-300/80",
    heading: "text-slate-900",
    sub: "text-slate-700/80",
    bar: "bg-slate-600",
    track: "bg-black/10",
  },
  DTMM: {
    badge: "bg-emerald-700 text-white",
    card: "bg-gradient-to-br from-emerald-100 to-emerald-200 ring-emerald-300/80",
    heading: "text-emerald-950",
    sub: "text-emerald-800/70",
    bar: "bg-emerald-600",
    track: "bg-black/10",
  },
  DTK: {
    badge: "bg-red-700 text-white",
    card: "bg-gradient-to-br from-red-100 to-red-200 ring-red-300/80",
    heading: "text-red-950",
    sub: "text-red-800/70",
    bar: "bg-red-600",
    track: "bg-black/10",
  },
  DA: {
    badge: "bg-purple-700 text-white",
    card: "bg-gradient-to-br from-purple-100 to-violet-200 ring-purple-300/80",
    heading: "text-purple-950",
    sub: "text-purple-800/70",
    bar: "bg-purple-600",
    track: "bg-black/10",
  },
  DTI: {
    badge: "bg-white text-zinc-900 border border-zinc-300 shadow-2xs",
    card: "bg-gradient-to-br from-white to-zinc-100 ring-zinc-300/90",
    heading: "text-zinc-900",
    sub: "text-zinc-600",
    bar: "bg-zinc-400",
    track: "bg-black/10",
  },
  PI: {
    badge: "bg-amber-900 text-white",
    card: "bg-gradient-to-br from-amber-100 to-amber-200 ring-amber-400/80",
    heading: "text-amber-950",
    sub: "text-amber-900/80",
    bar: "bg-amber-800",
    track: "bg-black/10",
  },
  BEM: {
    badge: "bg-blue-900 text-white",
    card: "bg-gradient-to-br from-blue-100 to-blue-200 ring-blue-300/80",
    heading: "text-blue-950",
    sub: "text-blue-800/70",
    bar: "bg-blue-800",
    track: "bg-black/10",
  },
  MPM: {
    badge: "bg-blue-900 text-white",
    card: "bg-gradient-to-br from-blue-100 to-blue-200 ring-blue-300/80",
    heading: "text-blue-950",
    sub: "text-blue-800/70",
    bar: "bg-blue-800",
    track: "bg-black/10",
  },
  FUSI: {
    badge: "bg-yellow-400 text-yellow-950",
    card: "bg-gradient-to-br from-yellow-100 to-yellow-200 ring-yellow-300/80",
    heading: "text-yellow-950",
    sub: "text-yellow-800/70",
    bar: "bg-yellow-500",
    track: "bg-black/10",
  },
  KMK: {
    badge: "bg-yellow-400 text-yellow-950",
    card: "bg-gradient-to-br from-yellow-100 to-yellow-200 ring-yellow-300/80",
    heading: "text-yellow-950",
    sub: "text-yellow-800/70",
    bar: "bg-yellow-500",
    track: "bg-black/10",
  },
  PO: {
    badge: "bg-yellow-400 text-yellow-950",
    card: "bg-gradient-to-br from-yellow-100 to-yellow-200 ring-yellow-300/80",
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
