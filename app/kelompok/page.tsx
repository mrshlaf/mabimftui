import type { Metadata } from "next";
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
        desc="Masukkan nama lengkap dan NPM kamu untuk menemukan nomor kelompok dan grup Line."
        bg="/bg-kelompok.jpg"
      />
      <section className="mx-auto max-w-3xl px-6 py-10 sm:px-8">
        <SearchMahasiswa />
      </section>
    </div>
  );
}
