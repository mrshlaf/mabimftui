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
        desc="Ketik nama lengkap atau sebagian untuk menemukan nomor kelompok dan grup Line kamu."
        bg="/bg-kelompok.jpg"
      />
      <section className="mx-auto max-w-4xl px-4 py-6">
        <SearchMahasiswa />
      </section>
    </div>
  );
}
