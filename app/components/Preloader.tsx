"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function Preloader() {
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setLeaving(true), 1700);
    const t2 = setTimeout(() => setGone(true), 2250);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-teal-dark px-6 text-center text-cream transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none",
        leaving ? "translate-y-2 opacity-0" : "opacity-100"
      )}
    >
      <span
        aria-hidden="true"
        className="aurora-blob -bottom-32 -right-24 h-96 w-96 bg-accent/20"
      />
      <span
        aria-hidden="true"
        className="aurora-blob -left-28 -top-32 h-96 w-96 bg-sky-400/10"
      />

      <div className="relative grid place-items-center">
        <span
          aria-hidden="true"
          className="absolute h-40 w-40 rounded-full bg-accent/25 blur-2xl sm:h-48 sm:w-48"
        />
        <Image
          src="/logo-mabim.png"
          alt=""
          width={112}
          height={112}
          priority
          className="relative h-24 w-24 animate-[preload-pop_0.7s_cubic-bezier(0.16,1,0.3,1)_both] rounded-full shadow-lift ring-2 ring-white/20 motion-reduce:animate-none sm:h-32 sm:w-32"
        />
      </div>

      <div className="mt-8 animate-[preload-fade-up_0.7s_ease-out_0.2s_both] motion-reduce:animate-none">
        <p className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          Mabim FTUI <span className="text-accent">2026</span>
        </p>
      </div>

      <p className="mt-3 max-w-[26ch] animate-[preload-fade-up_0.7s_ease-out_0.35s_both] text-base font-medium text-cream motion-reduce:animate-none sm:text-lg">
        Hai mahasiswa baru, selamat mencari arah.
      </p>
    </div>
  );
}
