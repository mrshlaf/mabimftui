import type { Metadata } from "next";
import DashboardClient from "../components/DashboardClient";
import { BreadcrumbJsonLd, WebPageJsonLd } from "../components/JsonLd";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Dashboard Mahasiswa & Kelompok Mabim FTUI 2026",
  alternates: { canonical: "/dashboard" },
  description:
    "Portal dashboard mahasiswa baru Mabim FTUI 2026: cek nomor kelompok, tautan undangan grup LINE resmi, daftar teman sekelompok, dan rincian penugasan departemen & BEM.",
  keywords: [
    "Dashboard Mabim FTUI 2026",
    "Cek Kelompok Mabim FTUI 2026",
    "Nomor Kelompok Maba FTUI",
    "Link Grup LINE Mabim FTUI",
    "Tugas Departemen Mabim FTUI",
    "Tugas BEM FTUI 2026",
    "Teman Sekelompok Mabim FTUI",
  ],
  openGraph: {
    type: "website",
    siteName: "Mabim FTUI 2026",
    locale: "id_ID",
    title: "Dashboard Mahasiswa & Kelompok Mabim FTUI 2026",
    description:
      "Portal pribadi maba Mabim FTUI 2026: cek nomor kelompok, grup LINE resmi, dan penugasan.",
    url: `${siteUrl}/dashboard`,
    images: [
      {
        url: "/hero-mabim.jpg",
        width: 1200,
        height: 630,
        alt: "Dashboard Mahasiswa Baru Mabim FTUI 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dashboard Mahasiswa & Kelompok Mabim FTUI 2026",
    description:
      "Portal pribadi maba Mabim FTUI 2026: cek nomor kelompok, grup LINE resmi, dan penugasan.",
    images: ["/hero-mabim.jpg"],
    creator: "@mabimftui",
  },
};
export default function DashboardPage() {
  return (
    <div className="min-h-full">
      <h1 className="sr-only">Dashboard Mabim FTUI 2026</h1>
      <WebPageJsonLd
        title="Dashboard Mahasiswa & Kelompok Mabim FTUI 2026"
        description="Portal pribadi mahasiswa baru Mabim FTUI 2026 untuk melihat kelompok, grup LINE, dan tugas."
        url={`${siteUrl}/dashboard`}
      />
      <BreadcrumbJsonLd items={[{ name: "Dashboard", url: `${siteUrl}/dashboard` }]} />
      <section className="mx-auto max-w-3xl px-4 pt-4 pb-8 sm:px-6 sm:pt-6 sm:pb-12 lg:px-8">
        <DashboardClient />
      </section>
    </div>
  );
}
