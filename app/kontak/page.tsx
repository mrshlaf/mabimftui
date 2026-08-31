import type { Metadata } from "next";
import { Phone } from "lucide-react";
import PageHeader from "../components/PageHeader";
import KontakClient from "../components/KontakClient";
import { BreadcrumbJsonLd } from "../components/JsonLd";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontak Panitia & SC",
  alternates: { canonical: "/kontak" },
  description:
    "Kontak panitia Mabim FTUI 2026: hubungi BEM, MPM, dan lembaga lainnya via WhatsApp atau telepon.",
};

export default function KontakPage() {
  return (
    <div className="min-h-full">
      <BreadcrumbJsonLd items={[{ name: "Kontak Panitia", url: `${siteUrl}/kontak` }]} />
      <PageHeader
        eyebrow="Kontak SC"
        title="Hubungi Kami"
        desc="Hubungi contact person resmi tiap lembaga saat butuh bantuan selama Mabim."
        bg="/bg-kontak.jpg"
        icon={Phone}
        accentWord="Kami"
      />

      <section className="mx-auto max-w-6xl px-4 pt-4 pb-8 sm:px-6 sm:pt-6 sm:pb-12 lg:px-8">
        <KontakClient />
      </section>
    </div>
  );
}
