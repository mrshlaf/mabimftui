import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { siteName, siteDescription, siteUrl } from "@/lib/site";
import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { AuthProvider } from "./components/auth-context";

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
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    "Mabim",
    "FTUI",
    "Mabim FTUI 2026",
    "Mahasiswa Baru",
    "Universitas Indonesia",
    "kelompok mabim",
    "link tugas mabim",
  ],
  openGraph: {
    type: "website",
    siteName,
    locale: "id_ID",
    url: siteUrl,
    title: siteName,
    description: siteDescription,
  },
  twitter: {
    card: "summary",
    title: siteName,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
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
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: siteName,
              url: siteUrl,
              inLanguage: "id",
              description: siteDescription,
            }),
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[-1] bg-cover bg-center opacity-[0.15]"
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
