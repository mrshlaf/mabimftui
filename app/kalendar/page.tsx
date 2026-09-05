import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import PageHeader from "../components/PageHeader";
import CalendarGrid from "../components/CalendarGrid";
import { BreadcrumbJsonLd, WebPageJsonLd } from "../components/JsonLd";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Jadwal & Kalender Kegiatan Mabim FTUI 2026",
  alternates: { canonical: "/kalendar" },
  description:
    "Jadwal resmi dan kalender kegiatan Masa Bimbingan FTUI 2026: timeline Mabim Day 1 sampai Day 7, jadwal pengumpulan tugas, dan agenda penting mahasiswa baru FTUI.",
  keywords: [
    "Jadwal Mabim FTUI 2026",
    "Kalender Kegiatan Mabim FTUI",
    "Timeline Mabim Day FTUI 2026",
    "Deadline Tugas Mabim FTUI",
    "Jadwal Ospek Teknik UI 2026",
    "Kegiatan Mahasiswa Baru FTUI",
  ],
  openGraph: {
    type: "website",
    siteName: "Mabim FTUI 2026",
    locale: "id_ID",
    title: "Jadwal & Kalender Kegiatan Mabim FTUI 2026",
    description:
      "Jadwal resmi dan kalender kegiatan Mabim FTUI 2026: timeline Mabim Day, deadline tugas, dan agenda mahasiswa baru FTUI.",
    url: `${siteUrl}/kalendar`,
    images: [
      {
        url: "/hero-mabim.jpg",
        width: 1200,
        height: 630,
        alt: "Kalender Kegiatan Mabim FTUI 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jadwal & Kalender Kegiatan Mabim FTUI 2026",
    description:
      "Jadwal resmi dan kalender kegiatan Mabim FTUI 2026: timeline Mabim Day, deadline tugas, dan agenda penting maba.",
    images: ["/hero-mabim.jpg"],
    creator: "@mabimftui",
  },
};
export default function KalendarPage() {
  return (
    <div className="min-h-full">
      <WebPageJsonLd
        title="Jadwal & Kalender Kegiatan Mabim FTUI 2026"
        description="Jadwal resmi dan kalender kegiatan Masa Bimbingan FTUI 2026: timeline Mabim Day 1 sampai Day 7 dan agenda maba."
        url={`${siteUrl}/kalendar`}
      />
      <BreadcrumbJsonLd items={[{ name: "Jadwal Kegiatan", url: `${siteUrl}/kalendar` }]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EventSeries",
            name: "Rangkaian Kegiatan Mabim FTUI 2026",
            description:
              "Jadwal lengkap kegiatan Mabim FTUI 2026 yang meliputi rangkaian Mabim Day, mentoring, dan penugasan departemen.",
            url: `${siteUrl}/kalendar`,
            startDate: "2026-08-29",
            endDate: "2026-10-31",
            location: {
              "@type": "Place",
              name: "Fakultas Teknik Universitas Indonesia",
              address: "Depok, Jawa Barat",
            },
            organizer: {
              "@type": "EducationalOrganization",
              name: "Fakultas Teknik Universitas Indonesia",
              url: "https://eng.ui.ac.id",
            },
            subEvent: [
              {
                "@type": "Event",
                name: "Mabim FTUI 2026 Day 1",
                startDate: "2026-08-29T07:00:00+07:00",
                eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
                eventStatus: "https://schema.org/EventScheduled",
                isAccessibleForFree: true,
                location: { "@type": "Place", name: "Fakultas Teknik UI Depok" },
              },
              {
                "@type": "Event",
                name: "Mabim FTUI 2026 Day 2",
                startDate: "2026-09-05T07:00:00+07:00",
                eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
                eventStatus: "https://schema.org/EventScheduled",
                isAccessibleForFree: true,
                location: { "@type": "Place", name: "Fakultas Teknik UI Depok" },
              },
              {
                "@type": "Event",
                name: "Mabim FTUI 2026 Day 3",
                startDate: "2026-09-12T07:00:00+07:00",
                eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
                eventStatus: "https://schema.org/EventScheduled",
                isAccessibleForFree: true,
                location: { "@type": "Place", name: "Fakultas Teknik UI Depok" },
              },
              {
                "@type": "Event",
                name: "Mabim FTUI 2026 Day 4",
                startDate: "2026-09-19T07:00:00+07:00",
                eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
                eventStatus: "https://schema.org/EventScheduled",
                isAccessibleForFree: true,
                location: { "@type": "Place", name: "Fakultas Teknik UI Depok" },
              },
              {
                "@type": "Event",
                name: "Mabim FTUI 2026 Day 5",
                startDate: "2026-09-26T07:00:00+07:00",
                eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
                eventStatus: "https://schema.org/EventScheduled",
                isAccessibleForFree: true,
                location: { "@type": "Place", name: "Fakultas Teknik UI Depok" },
              },
              {
                "@type": "Event",
                name: "Mabim FTUI 2026 Day 6",
                startDate: "2026-10-03T07:00:00+07:00",
                eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
                eventStatus: "https://schema.org/EventScheduled",
                isAccessibleForFree: true,
                location: { "@type": "Place", name: "Fakultas Teknik UI Depok" },
              },
              {
                "@type": "Event",
                name: "Mabim FTUI 2026 Day 7 (Penutupan)",
                startDate: "2026-10-10T07:00:00+07:00",
                eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
                eventStatus: "https://schema.org/EventScheduled",
                isAccessibleForFree: true,
                location: { "@type": "Place", name: "Fakultas Teknik UI Depok" },
              },
            ],
          }),
        }}
      />
      <PageHeader
        eyebrow="Jadwal Mabim"
        title="Kalender Kegiatan"
        desc="Lihat seluruh jadwal kegiatan, penugasan, dan deadline Mabim."
        bg="/hero-mabim.jpg"
        icon={CalendarDays}
        accentWord="Kegiatan"
      />

      <section className="mx-auto max-w-5xl px-4 pt-4 pb-8 sm:px-6 sm:pt-6 sm:pb-12 lg:px-8">
        <CalendarGrid locked />
      </section>
    </div>
  );
}
