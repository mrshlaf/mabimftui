"use client";

import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";

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
      <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium text-cream/80 backdrop-blur-md">
        <CalendarDays className="h-3.5 w-3.5 text-accent" />
        <span>Menghitung hari menuju Mabim...</span>
      </div>
    );
  }

  if (days <= 0) {
    return null;
  }

  return (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-cream backdrop-blur-md shadow-sm">
      <span className="flex h-2 w-2 rounded-full bg-accent" />
      <span>Mabim dimulai dalam</span>
      <span className="font-heading text-base font-bold text-accent">
        {days}
      </span>
      <span>hari lagi</span>
    </div>
  );
}
