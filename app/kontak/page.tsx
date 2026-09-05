import type { Metadata } from "next";
import { Phone } from "lucide-react";
import PageHeader from "../components/PageHeader";
import KontakClient from "../components/KontakClient";
import { BreadcrumbJsonLd, WebPageJsonLd } from "../components/JsonLd";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontak Panitia, BEM, MPM & SC Departemen Mabim FTUI 2026",
  alternates: { canonical: "/kontak" },
  description:
    "Direktori narahubung resmi Mabim FTUI 2026: hubungi Steering Committee (SC), BEM FTUI, MPM FTUI, dan contact person per departemen melalui WhatsApp atau telepon.",
  keywords: [
    "Kontak SC Mabim FTUI 2026",
    "Narahubung BEM FTUI 2026",
    "Kontak Panitia Mabim FTUI",
    "Contact Person Departemen FTUI",
    "Helpdesk Mabim FTUI",
    "Nomor WhatsApp Panitia Mabim FTUI",
  ],
  openGraph: {
    type: "website",
    siteName: "Mabim FTUI 2026",
    locale: "id_ID",
    title: "Kontak Panitia, BEM, MPM & SC Departemen Mabim FTUI 2026",
    description:
      "Direktori narahubung resmi Mabim FTUI 2026: hubungi SC, BEM, MPM, dan perwakilan departemen via WhatsApp/telepon.",
    url: `${siteUrl}/kontak`,
    images: [
      {
        url: "/bg-kontak.jpg",
        width: 1200,
        height: 630,
        alt: "Direktori Kontak Panitia Mabim FTUI 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kontak Panitia, BEM, MPM & SC Departemen Mabim FTUI 2026",
    description:
      "Direktori narahubung resmi Mabim FTUI 2026: hubungi SC, BEM, MPM, dan perwakilan departemen via WhatsApp.",
    images: ["/bg-kontak.jpg"],
    creator: "@mabimftui",
  },
};
export default function KontakPage() {
  return (
    <div className="min-h-full">
      <WebPageJsonLd
        title="Kontak Panitia, BEM, MPM & SC Departemen Mabim FTUI 2026"
        description="Direktori narahubung resmi Mabim FTUI 2026: hubungi SC, BEM, MPM, dan perwakilan departemen via WhatsApp."
        url={`${siteUrl}/kontak`}
      />
      <BreadcrumbJsonLd items={[{ name: "Kontak Panitia", url: `${siteUrl}/kontak` }]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Direktori Kontak Panitia Mabim FTUI 2026",
            description:
              "Layanan narahubung resmi Steering Committee, BEM, MPM, dan SC tiap departemen Fakultas Teknik UI.",
            url: `${siteUrl}/kontak`,
            inLanguage: "id-ID",
            about: {
              "@type": "EducationalOrganization",
              name: "Fakultas Teknik Universitas Indonesia",
              url: "https://eng.ui.ac.id",
              subOrganization: [
                { "@type": "Organization", name: "BEM FTUI 2026", alternateName: "Badan Eksekutif Mahasiswa FTUI" },
                { "@type": "Organization", name: "MPM FTUI 2026", alternateName: "Majelis Perwakilan Mahasiswa FTUI" },
              ],
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  contactType: "Steering Committee Support",
                  telephone: "+62-812-3456-7890",
                  areaServed: "Indonesia",
                  serviceType: "Bimbingan dan Advokasi Mahasiswa Baru",
                  availableLanguage: ["Indonesian", "English"],
                },
                {
                  "@type": "ContactPoint",
                  contactType: "BEM FTUI Helpdesk",
                  areaServed: "Indonesia",
                  serviceType: "Layanan Informasi dan Bantuan Mahasiswa",
                  availableLanguage: ["Indonesian", "English"],
                },
              ],
            },
          }),
        }}
      />
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
