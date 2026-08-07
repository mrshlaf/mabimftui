import type { Metadata } from "next";
import DashboardClient from "../components/DashboardClient";

export const metadata: Metadata = {
  title: "Dashboard",
  alternates: { canonical: "/dashboard" },
  description:
    "Dashboard pribadi Mahasiswa Baru FTUI 2026: kelompok, grup Line, dan teman se-departemenmu.",
};

export default function DashboardPage() {
  return (
    <div className="min-h-full">
      <section className="mx-auto max-w-3xl px-4 pt-5 pb-16 sm:px-6 sm:pt-6 sm:pb-20 lg:px-8">
        <DashboardClient />
      </section>
    </div>
  );
}
