"use client";

import CalendarGrid from "@/app/components/CalendarGrid";

export default function KalendarPage() {
  return (
    <div className="min-h-full">
      <div className="mx-auto max-w-5xl px-4 pt-6 pb-16 sm:px-6 sm:pt-8 sm:pb-20 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
            Kalender <span className="text-accent">Mabim</span>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Klik tanggal untuk melihat kegiatan.
          </p>
        </div>

        <CalendarGrid locked />
      </div>
    </div>
  );
}
