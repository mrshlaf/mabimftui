import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import PageHeader from "../components/PageHeader";
import CalendarGrid from "../components/CalendarGrid";
import { BreadcrumbJsonLd } from "../components/JsonLd";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Jadwal Kegiatan Mabim",
  alternates: { canonical: "/kalendar" },
  description:
    "Jadwal lengkap kegiatan Mabim FTUI 2026: Mabim Day, penugasan, deadline, dan jadwal penting lainnya.",
};

export default function KalendarPage() {
  return (
    <div className="min-h-full">
      <BreadcrumbJsonLd items={[{ name: "Jadwal Kegiatan", url: `${siteUrl}/kalendar` }]} />
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
