import type { Metadata } from "next";
import DashboardClient from "../components/DashboardClient";
import { BreadcrumbJsonLd } from "../components/JsonLd";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Dashboard Kelompok Mabim",
  alternates: { canonical: "/dashboard" },
  description:
    "Dashboard pribadi Mabim FTUI 2026: lihat kelompok, grup Line, tugas, dan teman se-departemen.",
};

export default function DashboardPage() {
  return (
    <div className="min-h-full">
      <h1 className="sr-only">Dashboard Mabim FTUI 2026</h1>
      <BreadcrumbJsonLd items={[{ name: "Dashboard", url: `${siteUrl}/dashboard` }]} />
      <section className="mx-auto max-w-3xl px-4 pt-5 pb-16 sm:px-6 sm:pt-6 sm:pb-20 lg:px-8">
        <DashboardClient />
      </section>
    </div>
  );
}
