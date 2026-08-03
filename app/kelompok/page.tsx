import type { Metadata } from "next";
import { Users } from "lucide-react";
import PageHeader from "../components/PageHeader";
import SearchMahasiswa from "../components/SearchMahasiswa";

export const metadata: Metadata = {
  title: "Cari Kelompok - Mabim FTUI 2026",
};

export default function KelompokPage() {
  return (
    <div className="min-h-full">
      <PageHeader
        eyebrow="Cari Kelompok"
        title="Kelompok Mabim"
        desc="Cari nomor kelompok dan grup Line kamu dengan nama dan NPM."
        bg="/bg-kelompok.jpg"
        icon={Users}
      />
      <section className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <SearchMahasiswa />
      </section>
    </div>
  );
}
