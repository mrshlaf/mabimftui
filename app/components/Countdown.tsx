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
      <p className="text-sm text-cream/80">
        Menghitung hari menuju Mabim...
      </p>
    );
  }

  if (days <= 0) {
    return (
      <p className="text-sm font-semibold text-accent">
        Mabim FTUI 2026 telah dimulai! Semangat, Maba!
      </p>
    );
  }

  return (
    <p className="text-sm text-cream/80">
      Mabim dimulai dalam{" "}
      <span className="text-2xl font-bold text-accent">{days}</span> hari lagi
    </p>
  );
}
