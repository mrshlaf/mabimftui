import type { Metadata } from "next";
import { Phone } from "lucide-react";
import PageHeader from "../components/PageHeader";
import KontakClient from "../components/KontakClient";

export const metadata: Metadata = {
  title: "Kontak SC",
  alternates: { canonical: "/kontak" },
  description:
    "Hubungi contact person resmi BEM, MPM, dan lembaga lain Mabim FTUI 2026.",
};

export default function KontakPage() {
  return (
    <div className="min-h-full">
      <PageHeader
        eyebrow="Kontak SC"
        title="Hubungi Kami"
        desc="Hubungi contact person resmi tiap lembaga saat butuh bantuan selama Mabim."
        bg="/bg-kontak.jpg"
        icon={Phone}
        accentWord="Kami"
      />

      <section className="mx-auto max-w-6xl px-4 pt-5 pb-16 sm:px-6 sm:pt-6 sm:pb-20 lg:px-8">
        <KontakClient />
      </section>
    </div>
  );
}
