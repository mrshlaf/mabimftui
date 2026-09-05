import { siteName, siteUrl } from "@/lib/site";

export function WebSiteJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": `${siteUrl}/#website`,
          url: siteUrl,
          name: siteName,
          alternateName: [
            "Masa Bimbingan FTUI 2026",
            "Mabim FTUI",
            "Ospek FTUI 2026",
            "Masa Bimbingan Fakultas Teknik Universitas Indonesia",
          ],
          description:
            "Portal resmi Masa Bimbingan Mahasiswa Baru Fakultas Teknik Universitas Indonesia 2026.",
          inLanguage: "id-ID",
          publisher: {
            "@id": `${siteUrl}/#organization`,
          },
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${siteUrl}/departemen?search={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
        }),
      }}
    />
  );
}

export function EducationalOrganizationJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          "@id": `${siteUrl}/#organization`,
          name: "Fakultas Teknik Universitas Indonesia",
          alternateName: ["FTUI", "Faculty of Engineering Universitas Indonesia", "FT UI"],
          url: "https://eng.ui.ac.id",
          logo: `${siteUrl}/logo-mabim.png`,
          image: `${siteUrl}/hero-mabim.jpg`,
          description:
            "Fakultas Teknik Universitas Indonesia adalah salah satu fakultas teknik terkemuka di Indonesia yang menyelenggarakan 7 departemen dan program internasional.",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Kampus Baru UI Depok",
            addressLocality: "Depok",
            addressRegion: "Jawa Barat",
            postalCode: "16424",
            addressCountry: "ID",
          },
          parentOrganization: {
            "@type": "CollegeOrUniversity",
            name: "Universitas Indonesia",
            alternateName: "UI",
            url: "https://ui.ac.id",
          },
          sameAs: [
            "https://www.instagram.com/mabimftui",
            "https://www.instagram.com/bemftui",
            "https://eng.ui.ac.id",
            "https://ui.ac.id",
            "https://id.wikipedia.org/wiki/Fakultas_Teknik_Universitas_Indonesia",
            "https://id.wikipedia.org/wiki/Universitas_Indonesia",
          ],
          department: [
            { "@type": "Organization", name: "Departemen Teknik Sipil dan Lingkungan", alternateName: "DTSL FTUI" },
            { "@type": "Organization", name: "Departemen Teknik Mesin", alternateName: "DTM FTUI" },
            { "@type": "Organization", name: "Departemen Teknik Elektro", alternateName: "DTE FTUI" },
            { "@type": "Organization", name: "Departemen Teknik Metalurgi dan Material", alternateName: "DTMM FTUI" },
            { "@type": "Organization", name: "Departemen Arsitektur", alternateName: "DA FTUI" },
            { "@type": "Organization", name: "Departemen Teknik Kimia", alternateName: "DTK FTUI" },
            { "@type": "Organization", name: "Departemen Teknik Industri", alternateName: "DTI FTUI" },
            { "@type": "Organization", name: "Program Internasional FTUI", alternateName: "KKI FTUI" },
          ],
        }),
      }}
    />
  );
}

export function WebPageJsonLd({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${url}/#webpage`,
          url,
          name: title,
          description,
          inLanguage: "id-ID",
          isPartOf: {
            "@id": `${siteUrl}/#website`,
          },
          speakable: {
            "@type": "SpeakableSpecification",
            cssSelector: ["h1", "h2", "p"],
          },
        }),
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url?: string }[];
}) {
  const fullItems = [
    { name: "Home", url: siteUrl },
    ...items,
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: fullItems.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.name,
            item: item.url ? item.url : undefined,
          })),
        }),
      }}
    />
  );
}

export function FaqJsonLd({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq, index) => ({
            "@type": "Question",
            "@id": `${siteUrl}/info#faq-${index + 1}`,
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }),
      }}
    />
  );
}
