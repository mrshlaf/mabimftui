import type { Metadata } from "next";
import { tugasUnits } from "@/data/tugas";
import type { TugasUnit } from "@/data/types";
import { safeExternalUrl } from "@/lib/url";
import Icon from "../components/Icon";
import PageHeader from "../components/PageHeader";

export const metadata: Metadata = {
  title: "Link Tugas - Mabim FTUI 2026",
};

const KATEGORI: { key: TugasUnit["kategori"]; title: string }[] = [
  { key: "departemen", title: "Departemen / PI" },
  { key: "lembaga", title: "Lembaga" },
];

function TaskList({ unit }: { unit: TugasUnit }) {
  if (unit.tugas.length === 0) {
    return (
      <p className="text-sm text-teal-dark/60">
        Link tugas akan dibagikan oleh SC segera.
      </p>
    );
  }
  return (
    <ul className="space-y-2">
      {unit.tugas.map((t, i) => {
        const url = safeExternalUrl(t.url);
        if (!url) {
          return (
            <li
              key={i}
              className="rounded-lg bg-cream px-4 py-3 text-sm text-teal-dark/60"
            >
              {t.label} (link menyusul)
            </li>
          );
        }
        return (
          <li key={i}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-12 items-center justify-between gap-3 rounded-lg bg-cream px-4 py-3 text-sm font-semibold text-teal transition-colors hover:bg-accent/15"
            >
              <span>{t.label}</span>
              <Icon name="external" className="h-4 w-4 shrink-0 text-accent" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default function TugasPage() {
  return (
    <div className="min-h-full">
      <PageHeader
        eyebrow="Link Tugas"
        title="Pengumpulan Tugas"
        desc="Pilih unit pengumpul tugas, lalu buka link pengumpulan sesuai ketentuan. Link dibuka di tab baru."
      />

      <section className="mx-auto max-w-4xl px-4 py-6">
        {KATEGORI.map((kat) => (
          <div key={kat.key} className="mb-8">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent">
              {kat.title}
            </h2>
            <div className="space-y-3">
              {tugasUnits
                .filter((u) => u.kategori === kat.key)
                .map((unit) => (
                  <details
                    key={unit.kode}
                    className="group rounded-2xl border border-teal/10 bg-white"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 [&::-webkit-details-marker]:hidden">
                      <span className="flex min-w-0 items-center gap-3">
                        <span className="shrink-0 rounded-lg bg-cream px-2.5 py-1 text-xs font-bold text-teal">
                          {unit.kode}
                        </span>
                        <span className="truncate font-semibold text-teal">
                          {unit.nama}
                        </span>
                      </span>
                      <Icon
                        name="chevron-down"
                        className="h-5 w-5 shrink-0 text-accent transition-transform group-open:rotate-180"
                      />
                    </summary>
                    <div className="border-t border-teal/10 px-5 py-4">
                      <TaskList unit={unit} />
                    </div>
                  </details>
                ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
