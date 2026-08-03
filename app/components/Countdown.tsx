"use client";

import { useEffect, useState } from "react";

const MABIM_START = new Date("2026-08-29T00:00:00+07:00");

export default function Countdown() {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    const id = setTimeout(() => {
      const diff = MABIM_START.getTime() - Date.now();
      setDays(Math.ceil(diff / 86_400_000));
    }, 0);
    return () => clearTimeout(id);
  }, []);

  if (days === null) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-cream/80 backdrop-blur">
        Menghitung hari menuju Mabim...
      </span>
    );
  }

  if (days <= 0) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-4 py-2 text-sm font-semibold text-accent backdrop-blur">
        Mabim FTUI 2026 telah dimulai! Semangat, Maba!
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-cream/80 backdrop-blur">
      Mabim dimulai dalam
      <span className="text-2xl font-bold text-accent">{days}</span>
      hari lagi
    </span>
  );
}
