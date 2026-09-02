import type { Metadata } from "next";
import { Building2 } from "lucide-react";
import PageHeader from "../components/PageHeader";
import DepartemenClient from "../components/DepartemenClient";
import { BreadcrumbJsonLd } from "../components/JsonLd";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Direktori Mahasiswa Departemen FTUI 2026",
  alternates: { canonical: "/departemen" },
  description:
    "Direktori resmi mahasiswa baru Mabim FTUI 2026 berdasarkan 7 departemen dan program internasional.",
};

export default function DepartemenPage() {
  return (
    <div className="min-h-full">
      <BreadcrumbJsonLd
        items={[{ name: "Departemen & Mahasiswa", url: `${siteUrl}/departemen` }]}
      />
      <PageHeader
        eyebrow="Direktori Maba"
        title="Departemen FTUI"
        desc="Jelajahi daftar 1.806 mahasiswa baru angkatan 2026 berdasarkan 7 departemen dan program internasional."
        bg="/hero-mabim.jpg"
        icon={Building2}
        accentWord="FTUI"
      />

      <section className="mx-auto max-w-6xl px-4 pt-4 pb-8 sm:px-6 sm:pt-6 sm:pb-12 lg:px-8">
        <DepartemenClient />
      </section>
    </div>
  );
}
