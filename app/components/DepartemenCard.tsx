"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type DepartemenWarna = {
  badge: string;
  card: string;
  heading: string;
  sub: string;
  bar: string;
  track: string;
};

const PRODIS: Record<string, string[]> = {
  DTSL: ["Teknik Sipil", "Teknik Lingkungan"],
  DTM: ["Teknik Mesin", "Teknik Perkapalan"],
  DTE: [
    "Teknik Elektro",
    "Teknik Komputer",
    "Teknik Biomedik",
  ],
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

const GLOWS: Record<string, string> = {
  DTE: "hover:shadow-[0_12px_32px_-8px_rgba(3,105,161,0.35)] hover:ring-sky-400/30",
  DTM: "hover:shadow-[0_12px_32px_-8px_rgba(23,23,23,0.3)] hover:ring-neutral-400/30",
  DTSL: "hover:shadow-[0_12px_32px_-8px_rgba(71,85,105,0.35)] hover:ring-slate-400/30",
  DTMM: "hover:shadow-[0_12px_32px_-8px_rgba(4,120,87,0.35)] hover:ring-emerald-400/30",
  DTK: "hover:shadow-[0_12px_32px_-8px_rgba(185,28,28,0.35)] hover:ring-red-400/30",
  DA: "hover:shadow-[0_12px_32px_-8px_rgba(109,40,217,0.35)] hover:ring-violet-400/30",
  DTI: "hover:shadow-[0_12px_32px_-8px_rgba(82,82,91,0.35)] hover:ring-zinc-400/30",
  PI: "hover:shadow-[0_12px_32px_-8px_rgba(180,83,9,0.35)] hover:ring-amber-400/30",
};

export default function DepartemenCard({
  d,
  warna,
  pct,
}: {
  d: { kode: string; nama: string; jumlah: number };
  warna: DepartemenWarna;
  pct: number;
}) {
  const [flipped, setFlipped] = useState(false);

  const prodis = PRODIS[d.kode] || [];
  const glowClass = GLOWS[d.kode] || "";

  return (
    <div
      onClick={() => setFlipped(!flipped)}
      className="group h-[200px] sm:h-[190px] w-full cursor-pointer [perspective:1000px]"
    >
      <div
        className={cn(
          "relative h-full w-full rounded-[2rem] transition-all duration-700 ease-out [transform-style:preserve-3d]",
          flipped ? "[transform:rotateY(180deg)]" : ""
        )}
      >
        {/* Front Side */}
        <Card
          className={cn(
            "absolute inset-0 h-full w-full rounded-[2rem] p-4 sm:p-5 ring-1 shadow-card transition-all duration-500 hover:-translate-y-1 hover:ring-2 [backface-visibility:hidden] overflow-hidden",
            warna.card,
            glowClass
          )}
        >
          {/* Glass Glare Highlight */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          
          <div className="relative z-10 flex items-center justify-between gap-2">
            <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold transition-transform duration-300 group-hover:scale-105", warna.badge)}>
              {d.kode}
            </span>
            <span className={cn("text-xs font-bold", warna.sub)}>{pct}%</span>
          </div>
          <p className={cn("relative z-10 mt-2.5 sm:mt-4 font-heading text-2xl sm:text-3xl font-extrabold tracking-tight transition-transform duration-300 group-hover:translate-x-0.5", warna.heading)}>
            {d.jumlah.toLocaleString("id-ID")}
          </p>
          <p className={cn("relative z-10 mt-1 text-xs sm:text-sm font-medium leading-snug", warna.sub)}>
            {d.nama}
          </p>
          <div className={cn("relative z-10 mt-2.5 sm:mt-4 h-1.5 overflow-hidden rounded-full transition-colors duration-300", warna.track)}>
            <div
              className={cn("h-full rounded-full transition-all duration-1000 ease-out", warna.bar)}
              style={{ width: `${pct}%` }}
            />
          </div>
        </Card>

        {/* Back Side */}
        <Card
          className={cn(
            "absolute inset-0 h-full w-full rounded-[2rem] p-4 sm:p-5 ring-1 shadow-card transition-all duration-500 hover:-translate-y-1 hover:ring-2 [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-between overflow-hidden",
            warna.card,
            glowClass
          )}
        >
          {/* Glass Glare Highlight */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between gap-2">
              <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold", warna.badge)}>
                Program Studi
              </span>
              <RefreshCw className={cn("h-3.5 w-3.5 animate-pulse", warna.sub)} />
            </div>
            <ul className={cn("mt-2 space-y-1 text-[10.5px] sm:text-[11px] font-semibold leading-relaxed max-h-[100px] overflow-y-auto pr-1 select-none scrollbar-thin scrollbar-thumb-black/10 scrollbar-track-transparent", warna.heading)}>
              {prodis.map((p, idx) => (
                <li key={idx} className="flex items-center gap-1.5 truncate">
                  <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", warna.bar)} />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <p className={cn("relative z-10 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-center mt-2 flex items-center justify-center gap-1", warna.sub)}>
            Klik untuk membalik
          </p>
        </Card>
      </div>
    </div>
  );
}
