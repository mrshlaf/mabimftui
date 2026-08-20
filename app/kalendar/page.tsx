import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import PageHeader from "../components/PageHeader";
import CalendarGrid from "../components/CalendarGrid";

export const metadata: Metadata = {
  title: "Kalender",
  alternates: { canonical: "/kalendar" },
  description:
    "Jadwal kegiatan Mabim FTUI 2026 — klik tanggal untuk melihat detail.",
};

export default function KalendarPage() {
  return (
    <div className="min-h-full">
      <PageHeader
        eyebrow="Jadwal Mabim"
        title="Kalender Kegiatan"
        desc="Lihat seluruh jadwal kegiatan, penugasan, dan deadline Mabim."
        bg="/hero-mabim.jpg"
        icon={CalendarDays}
        accentWord="Kegiatan"
      />

      <section className="mx-auto max-w-5xl px-4 pt-5 pb-16 sm:px-6 sm:pt-6 sm:pb-20 lg:px-8">
        <CalendarGrid locked />
      </section>
    </div>
  );
}
