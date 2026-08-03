import type { Metadata } from "next";
import SearchMahasiswa from "../components/SearchMahasiswa";

export const metadata: Metadata = {
  title: "Cari Kelompok - Mabim FTUI 2026",
};

export default function KelompokPage() {
  return (
    <div className="min-h-full">
      <header className="bg-teal px-4 py-8 text-cream">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-2xl font-bold">Cari Kelompok Mabim</h1>
          <p className="mt-2 text-sm text-cream/85">
            Ketik nama lengkap atau sebagian untuk menemukan nomor kelompok dan
            grup Line kamu.
          </p>
        </div>
      </header>
      <section className="mx-auto max-w-4xl px-4 py-6">
        <SearchMahasiswa />
      </section>
    </div>
  );
}
