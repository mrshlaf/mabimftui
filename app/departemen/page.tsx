import type { Metadata } from "next";
import { Building2 } from "lucide-react";
import PageHeader from "../components/PageHeader";
import DepartemenClient from "../components/DepartemenClient";
import { BreadcrumbJsonLd, WebPageJsonLd } from "../components/JsonLd";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Direktori Mahasiswa & Departemen FTUI 2026",
  alternates: { canonical: "/departemen" },
  description:
    "Direktori resmi 1.806 mahasiswa baru Mabim FTUI 2026: daftar lengkap mahasiswa per departemen (DTSL, DTM, DTE, DTMM, DA, DTK, DTI, PI KKI) dan 13 program studi.",
  keywords: [
    "Direktori Mahasiswa FTUI 2026",
    "Daftar Maba FTUI 2026",
    "Mahasiswa Teknik Sipil FTUI",
    "Mahasiswa Teknik Mesin FTUI",
    "Mahasiswa Teknik Elektro FTUI",
    "Mahasiswa Teknik Metalurgi dan Material FTUI",
    "Mahasiswa Arsitektur FTUI",
    "Mahasiswa Teknik Kimia FTUI",
    "Mahasiswa Teknik Industri FTUI",
    "Mahasiswa KKI FTUI 2026",
    "Departemen Fakultas Teknik Universitas Indonesia",
  ],
  openGraph: {
    type: "website",
    siteName: "Mabim FTUI 2026",
    locale: "id_ID",
    title: "Direktori Mahasiswa & Departemen FTUI 2026",
    description:
      "Daftar lengkap 1.806 mahasiswa baru Mabim FTUI 2026 berdasarkan 7 departemen dan program internasional.",
    url: `${siteUrl}/departemen`,
    images: [
      {
        url: "/hero-mabim.jpg",
        width: 1200,
        height: 630,
        alt: "Direktori Departemen dan Mahasiswa Baru FTUI 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Direktori Mahasiswa & Departemen FTUI 2026",
    description:
      "Daftar lengkap 1.806 mahasiswa baru Mabim FTUI 2026 berdasarkan 7 departemen dan program internasional.",
    images: ["/hero-mabim.jpg"],
    creator: "@mabimftui",
  },
};
export default function DepartemenPage() {
  return (
    <div className="min-h-full">
      <WebPageJsonLd
        title="Direktori Mahasiswa & Departemen FTUI 2026"
        description="Direktori resmi 1.806 mahasiswa baru Mabim FTUI 2026 berdasarkan 7 departemen dan program internasional."
        url={`${siteUrl}/departemen`}
      />
      <BreadcrumbJsonLd
        items={[{ name: "Departemen & Mahasiswa", url: `${siteUrl}/departemen` }]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Direktori Mahasiswa Departemen FTUI 2026",
            description:
              "Daftar lengkap 1.806 mahasiswa baru Mabim FTUI 2026 berdasarkan 7 departemen dan program internasional.",
            url: `${siteUrl}/departemen`,
            inLanguage: "id-ID",
            about: {
              "@type": "EducationalOrganization",
              name: "Fakultas Teknik Universitas Indonesia",
              url: "https://eng.ui.ac.id",
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Program Studi Sarjana FTUI",
                itemListElement: [
                  { "@type": "Course", name: "Teknik Sipil", educationalLevel: "BachelorDegree", inLanguage: "id-ID", description: "Program Studi Sarjana Teknik Sipil FTUI" },
                  { "@type": "Course", name: "Teknik Lingkungan", educationalLevel: "BachelorDegree", inLanguage: "id-ID", description: "Program Studi Sarjana Teknik Lingkungan FTUI" },
                  { "@type": "Course", name: "Teknik Mesin", educationalLevel: "BachelorDegree", inLanguage: "id-ID", description: "Program Studi Sarjana Teknik Mesin FTUI" },
                  { "@type": "Course", name: "Teknik Perkapalan", educationalLevel: "BachelorDegree", inLanguage: "id-ID", description: "Program Studi Sarjana Teknik Perkapalan FTUI" },
                  { "@type": "Course", name: "Teknik Elektro", educationalLevel: "BachelorDegree", inLanguage: "id-ID", description: "Program Studi Sarjana Teknik Elektro FTUI" },
                  { "@type": "Course", name: "Teknik Komputer", educationalLevel: "BachelorDegree", inLanguage: "id-ID", description: "Program Studi Sarjana Teknik Komputer FTUI" },
                  { "@type": "Course", name: "Teknik Biomedik", educationalLevel: "BachelorDegree", inLanguage: "id-ID", description: "Program Studi Sarjana Teknik Biomedik FTUI" },
                  { "@type": "Course", name: "Teknik Metalurgi & Material", educationalLevel: "BachelorDegree", inLanguage: "id-ID", description: "Program Studi Sarjana Teknik Metalurgi dan Material FTUI" },
                  { "@type": "Course", name: "Arsitektur", educationalLevel: "BachelorDegree", inLanguage: "id-ID", description: "Program Studi Sarjana Arsitektur FTUI" },
                  { "@type": "Course", name: "Arsitektur Interior", educationalLevel: "BachelorDegree", inLanguage: "id-ID", description: "Program Studi Sarjana Arsitektur Interior FTUI" },
                  { "@type": "Course", name: "Teknik Kimia", educationalLevel: "BachelorDegree", inLanguage: "id-ID", description: "Program Studi Sarjana Teknik Kimia FTUI" },
                  { "@type": "Course", name: "Teknik Bioproses", educationalLevel: "BachelorDegree", inLanguage: "id-ID", description: "Program Studi Sarjana Teknik Bioproses FTUI" },
                  { "@type": "Course", name: "Teknik Industri", educationalLevel: "BachelorDegree", inLanguage: "id-ID", description: "Program Studi Sarjana Teknik Industri FTUI" },
                ],
              },
            },
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: 8,
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Departemen Teknik Sipil dan Lingkungan (DTSL)",
                  alternateName: "DTSL",
                  url: `${siteUrl}/departemen?dept=DTSL`,
                  description: "241 Mahasiswa Baru - Program Studi Teknik Sipil & Teknik Lingkungan",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Departemen Teknik Mesin (DTM)",
                  alternateName: "DTM",
                  url: `${siteUrl}/departemen?dept=DTM`,
                  description: "258 Mahasiswa Baru - Program Studi Teknik Mesin & Teknik Perkapalan",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Departemen Teknik Elektro (DTE)",
                  alternateName: "DTE",
                  url: `${siteUrl}/departemen?dept=DTE`,
                  description: "264 Mahasiswa Baru - Program Studi Teknik Elektro, Teknik Komputer, & Teknik Biomedik",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Departemen Teknik Metalurgi dan Material (DTMM)",
                  alternateName: "DTMM",
                  url: `${siteUrl}/departemen?dept=DTMM`,
                  description: "124 Mahasiswa Baru - Program Studi Teknik Metalurgi & Material",
                },
                {
                  "@type": "ListItem",
                  position: 5,
                  name: "Departemen Arsitektur (DA)",
                  alternateName: "DA",
                  url: `${siteUrl}/departemen?dept=DA`,
                  description: "108 Mahasiswa Baru - Program Studi Arsitektur & Arsitektur Interior",
                },
                {
                  "@type": "ListItem",
                  position: 6,
                  name: "Departemen Teknik Kimia (DTK)",
                  alternateName: "DTK",
                  url: `${siteUrl}/departemen?dept=DTK`,
                  description: "175 Mahasiswa Baru - Program Studi Teknik Kimia & Teknik Bioproses",
                },
                {
                  "@type": "ListItem",
                  position: 7,
                  name: "Departemen Teknik Industri (DTI)",
                  alternateName: "DTI",
                  url: `${siteUrl}/departemen?dept=DTI`,
                  description: "203 Mahasiswa Baru - Program Studi Teknik Industri",
                },
                {
                  "@type": "ListItem",
                  position: 8,
                  name: "Program Internasional (KKI FTUI)",
                  alternateName: "PI FTUI",
                  url: `${siteUrl}/departemen?dept=PI`,
                  description: "433 Mahasiswa Baru - Program Sarjana Internasional Kelas Internasional (KKI)",
                },
              ],
            },
          }),
        }}
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
