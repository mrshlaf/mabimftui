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
  DTE: "hover:border-sky-400/50 hover:shadow-card",
  DTM: "hover:border-neutral-400/50 hover:shadow-card",
  DTSL: "hover:border-slate-400/50 hover:shadow-card",
  DTMM: "hover:border-emerald-400/50 hover:shadow-card",
  DTK: "hover:border-red-400/50 hover:shadow-card",
  DA: "hover:border-violet-400/50 hover:shadow-card",
  DTI: "hover:border-zinc-400/50 hover:shadow-card",
  PI: "hover:border-amber-400/50 hover:shadow-card",
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
      className="group h-[190px] sm:h-[180px] w-full cursor-pointer [perspective:1000px]"
    >
      <div
        className={cn(
          "relative h-full w-full rounded-3xl transition-all duration-500 ease-out [transform-style:preserve-3d]",
          flipped ? "[transform:rotateY(180deg)]" : ""
        )}
      >
        {/* Front Side */}
        <Card
          className={cn(
            "absolute inset-0 h-full w-full rounded-3xl p-4 sm:p-5 border border-border/80 shadow-sm transition-all duration-300 hover:-translate-y-1 [backface-visibility:hidden] overflow-hidden flex flex-col justify-between",
            warna.card,
            glowClass
          )}
        >
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold", warna.badge)}>
                {d.kode}
              </span>
              <span className={cn("text-xs font-semibold", warna.sub)}>{pct}%</span>
            </div>
            <p className={cn("mt-2.5 font-heading text-2xl sm:text-3xl font-bold tracking-tight", warna.heading)}>
              {d.jumlah.toLocaleString("id-ID")}
            </p>
            <p className={cn("mt-0.5 text-xs sm:text-sm font-medium leading-snug line-clamp-2", warna.sub)}>
              {d.nama}
            </p>
          </div>
          <div className={cn("h-1.5 overflow-hidden rounded-full", warna.track)}>
            <div
              className={cn("h-full rounded-full transition-all duration-700 ease-out", warna.bar)}
              style={{ width: `${pct}%` }}
            />
          </div>
        </Card>

        {/* Back Side */}
        <Card
          className={cn(
            "absolute inset-0 h-full w-full rounded-3xl p-4 sm:p-5 border border-border/80 shadow-sm transition-all duration-300 hover:-translate-y-1 [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-between overflow-hidden",
            warna.card,
            glowClass
          )}
        >
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold", warna.badge)}>
                Program Studi
              </span>
              <RefreshCw className={cn("h-3 w-3", warna.sub)} />
            </div>
            <ul className={cn("mt-2 space-y-1 text-[11px] font-medium leading-relaxed max-h-[90px] overflow-y-auto pr-1 select-none", warna.heading)}>
              {prodis.map((p, idx) => (
                <li key={idx} className="flex items-center gap-1.5 truncate">
                  <span className={cn("h-1 w-1 shrink-0 rounded-full", warna.bar)} />
                  <span className="truncate">{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className={cn("text-[10px] font-semibold text-center mt-1", warna.sub)}>
            Klik untuk kembali
          </p>
        </Card>
      </div>
    </div>
  );
}
