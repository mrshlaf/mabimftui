"use client";

import { useCallback, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Hospital, Phone } from "lucide-react";
import { rumahSakitTerdekat } from "@/data/rs";
import { cn } from "@/lib/utils";

export default function RSCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const count = rumahSakitTerdekat.length;

  const handleScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    if (!card) return;
    const step = card.offsetWidth + 12;
    const next = Math.min(count - 1, Math.max(0, Math.round(el.scrollLeft / step)));
    setIndex((prev) => (prev === next ? prev : next));
  }, [count]);

  function scrollBy(dir: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    if (!card) return;
    const step = card.offsetWidth + 12;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-secondary text-accent">
            <Hospital className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Rumah Sakit Terdekat
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Rujukan medis darurat di sekitar Depok dan Jakarta Timur.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Rumah sakit sebelumnya"
            onClick={() => scrollBy(-1)}
            disabled={index === 0}
            className="grid h-8 w-8 place-items-center rounded-full border border-border/80 bg-secondary/70 text-foreground transition-all active:scale-95 hover:bg-card hover:text-accent disabled:pointer-events-none disabled:opacity-30 cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Rumah sakit berikutnya"
            onClick={() => scrollBy(1)}
            disabled={index === count - 1}
            className="grid h-8 w-8 place-items-center rounded-full border border-border/80 bg-secondary/70 text-foreground transition-all active:scale-95 hover:bg-card hover:text-accent disabled:pointer-events-none disabled:opacity-30 cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="mt-4 flex scroll-smooth snap-x snap-mandatory gap-3 overflow-x-auto pb-2 scrollbar-none"
      >
        {rumahSakitTerdekat.map((rs) => (
          <article
            key={rs.nama}
            className="w-[16.5rem] shrink-0 snap-start flex flex-col justify-between rounded-2xl border border-border/70 bg-secondary/30 p-4 transition-all hover:bg-secondary/50 hover:border-accent/40"
          >
            <div>
              <div className="flex items-center gap-2.5">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-card text-accent shadow-xs">
                  <Hospital className="h-3.5 w-3.5" />
                </span>
                <p className="text-xs font-bold text-foreground truncate">{rs.nama}</p>
              </div>
              <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                {rs.alamat}
              </p>
            </div>
            <a
              href={`tel:${rs.telp}`}
              className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1 text-xs font-semibold text-accent border border-border/80 transition-all hover:border-accent/50 w-fit active:scale-95"
            >
              <Phone className="h-3 w-3" />
              {rs.telp}
            </a>
          </article>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between sm:justify-end">
        <p className="text-xs text-muted-foreground sm:hidden">
          Geser untuk lihat lebih banyak
        </p>
        <div className="flex items-center gap-1.5 sm:hidden">
          {rumahSakitTerdekat.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === index ? "w-4 bg-accent" : "w-1.5 bg-border"
              )}
            />
          ))}
        </div>
        <p className="hidden text-xs font-semibold text-muted-foreground sm:block">
          {index + 1} / {count}
        </p>
      </div>
    </>
  );
}
