import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { siteName, siteUrl } from "@/lib/site";
import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { AuthProvider } from "./components/auth-context";
import { WebSiteJsonLd, EducationalOrganizationJsonLd } from "./components/JsonLd";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mabim FTUI 2026 - Masa Bimbingan Fakultas Teknik Universitas Indonesia",
    template: "%s | Mabim FTUI 2026",
  },
  description:
    "Satu pintu informasi resmi Masa Bimbingan Mahasiswa Baru Fakultas Teknik Universitas Indonesia (Mabim FTUI 2026): pembagian nomor kelompok, grup LINE resmi, jadwal kegiatan, penugasan, dan direktori departemen.",
  applicationName: siteName,
  authors: [
    { name: "Panitia Mabim FTUI 2026", url: "https://www.instagram.com/mabimftui" },
    { name: "Fakultas Teknik Universitas Indonesia", url: "https://eng.ui.ac.id" },
  ],
  creator: "Panitia Mabim FTUI 2026",
  publisher: "Fakultas Teknik Universitas Indonesia",
  category: "Education",
  classification: "Pendidikan, Universitas, Mahasiswa Baru, Fakultas Teknik UI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "id-ID": siteUrl,
    },
  },
  keywords: [
    "Mabim FTUI 2026",
    "Masa Bimbingan FTUI 2026",
    "Mabim Fakultas Teknik UI",
    "Ospek FTUI 2026",
    "Mahasiswa Baru FTUI 2026",
    "Maba FTUI 2026",
    "Kelompok Mabim FTUI",
    "Grup LINE Mabim FTUI",
    "Daftar Tugas Mabim FTUI",
    "Jadwal Mabim FTUI 2026",
    "Fakultas Teknik Universitas Indonesia",
    "Departemen FTUI",
    "DTSL FTUI",
    "DTM FTUI",
    "DTE FTUI",
    "DTMM FTUI",
    "DA FTUI",
    "DTK FTUI",
    "DTI FTUI",
    "KKI FTUI",
  ],
  openGraph: {
    type: "website",
    siteName,
    locale: "id_ID",
    url: siteUrl,
    title: "Mabim FTUI 2026 - Masa Bimbingan Fakultas Teknik Universitas Indonesia",
    description:
      "Satu pintu informasi resmi Masa Bimbingan Mahasiswa Baru FTUI 2026: kelompok, grup Line, jadwal kegiatan, penugasan, dan kontak panitia.",
    images: [
      {
        url: "/hero-mabim.jpg",
        type: "image/jpeg",
        width: 1200,
        height: 630,
        alt: "Masa Bimbingan Fakultas Teknik Universitas Indonesia 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mabim FTUI 2026 - Masa Bimbingan Fakultas Teknik Universitas Indonesia",
    description:
      "Satu pintu informasi resmi Masa Bimbingan Mahasiswa Baru FTUI 2026: kelompok, grup Line, jadwal kegiatan, penugasan, dan kontak panitia.",
    images: ["/hero-mabim.jpg"],
    creator: "@mabimftui",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || undefined,
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION || "",
    },
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
  other: {
    manifest: "/site.webmanifest",
  },
};

export const viewport: Viewport = {
  themeColor: "#062f3b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://img.youtube.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://i.ytimg.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.youtube-nocookie.com" />
        <link rel="dns-prefetch" href="https://eng.ui.ac.id" />
      </head>
      <body className="min-h-full flex flex-col">
        <WebSiteJsonLd />
        <EducationalOrganizationJsonLd />
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[-1] bg-cover bg-center opacity-[0.07]"
          style={{ backgroundImage: "url('/bg-site.jpg')" }}
        />
        <AuthProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
