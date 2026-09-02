import { Suspense } from "react";
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
    "Daftar mahasiswa baru Mabim FTUI 2026 berdasarkan 7 departemen dan program internasional.",
};

export default function DepartemenPage() {
  return (
    <div className="min-h-full pb-12">
      <BreadcrumbJsonLd
        items={[{ name: "Departemen", url: `${siteUrl}/departemen` }]}
      />

      <PageHeader
        eyebrow="Direktori Maba"
        title="Departemen FTUI"
        accentWord="FTUI"
        desc="Daftar lengkap 1.806 mahasiswa baru Mabim FTUI 2026 berdasarkan 7 departemen dan program internasional."
        icon={Building2}
      />

      <Suspense
        fallback={
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="h-28 animate-pulse rounded-3xl bg-secondary/50" />
            <div className="mt-6 h-64 animate-pulse rounded-3xl bg-secondary/30" />
          </div>
        }
      >
        <DepartemenClient />
      </Suspense>
    </div>
  );
}
