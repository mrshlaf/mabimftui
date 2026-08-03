import type { Metadata } from "next";
import { ChevronDown, ExternalLink, FileText } from "lucide-react";
import { tugasLembaga } from "@/data/tugas";
import { DEPARTEMEN_WARNA } from "@/data/statistik";
import type { TugasLembaga } from "@/data/types";
import { cn } from "@/lib/utils";
import { safeExternalUrl } from "@/lib/url";
import PageHeader from "../components/PageHeader";

export const metadata: Metadata = {
  title: "Link Tugas - Mabim FTUI 2026",
};

function TaskList({ lembaga }: { lembaga: TugasLembaga }) {
  if (lembaga.tugas.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Link tugas akan dibagikan oleh SC segera.
      </p>
    );
  }
  return (
    <ul className="space-y-2">
      {lembaga.tugas.map((t, i) => {
        const url = safeExternalUrl(t.url);
        if (!url) {
          return (
            <li
              key={i}
              className="flex items-center justify-between gap-3 rounded-2xl bg-secondary/60 px-4 py-3 text-sm text-muted-foreground"
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
              className="flex min-h-12 items-center justify-between gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent/40 hover:bg-accent/5"
            >
              <span>{t.label}</span>
              <ExternalLink className="h-4 w-4 shrink-0 text-accent" />
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
        desc="Buka link pengumpulan tugas tiap lembaga sesuai ketentuan yang berlaku."
        bg="/bg-tugas.jpg"
        icon={FileText}
      />

      <section className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="space-y-3">
          {tugasLembaga.map((lembaga) => (
            <details
              key={lembaga.kode}
              className="group overflow-hidden rounded-[2rem] ring-1 ring-border/60 shadow-card"
              open
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 bg-card px-5 py-4 [&::-webkit-details-marker]:hidden">
                <span className="flex min-w-0 items-center gap-3">
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-2.5 py-1 text-xs font-bold",
                      DEPARTEMEN_WARNA[lembaga.kode]?.badge ?? "bg-secondary text-secondary-foreground"
                    )}
                  >
                    {lembaga.kode}
                  </span>
                  <span className="truncate font-semibold text-foreground">
                    {lembaga.nama}
                  </span>
                </span>
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-secondary text-accent transition-transform group-open:rotate-180">
                  <ChevronDown className="h-4 w-4" />
                </span>
              </summary>
              <div className="border-t border-border/60 px-5 py-4">
                <TaskList lembaga={lembaga} />
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
