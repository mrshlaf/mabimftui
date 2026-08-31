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
      <span className="inline-flex items-center gap-2 rounded-full bg-cream/95 px-4 py-2.5 text-sm font-medium text-teal-dark shadow-card">
        <CalendarDays className="h-4 w-4 text-accent" />
        Menghitung hari menuju Mabim...
      </span>
    );
  }

  if (days <= 0) {
    return null;
  }

  return (
    <span className="inline-flex items-center gap-2.5 rounded-full bg-cream/95 px-4 py-2.5 text-sm font-medium text-teal-dark shadow-card">
      <CalendarDays className="h-4 w-4 text-accent" />
      Mabim dimulai dalam
      <span className="font-heading text-2xl font-bold leading-none text-accent">
        {days}
      </span>
      hari lagi
    </span>
  );
}
