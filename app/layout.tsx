import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mabim FTUI 2026",
  description:
    "Satu pintu informasi Mabim FTUI 2026: cari kelompok, link tugas, dan info penting.",
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
      className={`${inter.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[-1] bg-cover bg-center opacity-[0.15]"
          style={{ backgroundImage: "url('/bg-site.jpg')" }}
        />
        <Nav />
        <main className="flex-1 pb-24 md:pb-0">{children}</main>
      </body>
    </html>
  );
}
