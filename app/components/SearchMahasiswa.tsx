"use client";

import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { DEPARTEMEN_NAMA, type Mahasiswa } from "@/data/types";
import { safeExternalUrl } from "@/lib/url";
import Icon from "./Icon";

const MAX_RESULTS = 50;

function normalize(s: string) {
  return s.toLowerCase().replace(/\s+/g, " ").trim();
}

function GroupLineButton({ link }: { link: string | null }) {
  const url = safeExternalUrl(link ?? "");
  if (!url) {
    return (
      <p className="text-center text-sm text-teal-dark/60">
        Link grup Line akan dibagikan oleh SC segera.
      </p>
    );
  }
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 text-base font-bold text-white shadow-sm transition-transform active:scale-[0.98]"
    >
      <Icon name="line" className="h-6 w-6" />
      Gabung Grup Line
    </a>
  );
}

export default function SearchMahasiswa() {
  const [query, setQuery] = useState("");
  const [selectedNpm, setSelectedNpm] = useState<string | null>(null);
  const [records, setRecords] = useState<Mahasiswa[] | null>(null);
  const [loadError, setLoadError] = useState(false);
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = normalize(deferredQuery);

  useEffect(() => {
    if (records !== null || normalizedQuery === "") return;
    let active = true;
    import("@/data/mahasiswa")
      .then((mod) => {
        if (active) setRecords(mod.mahasiswaData);
      })
      .catch(() => {
        if (active) setLoadError(true);
      });
    return () => {
      active = false;
    };
  }, [normalizedQuery, records]);

  const matches = useMemo(() => {
    if (!normalizedQuery || !records) return [];
    return records.filter((m) => normalize(m.nama).includes(normalizedQuery));
  }, [records, normalizedQuery]);

  const results = matches.slice(0, MAX_RESULTS);
  const selected =
    (selectedNpm && records?.find((m) => m.npm === selectedNpm)) || null;

  return (
    <div>
      <div className="sticky top-0 z-10 -mx-4 bg-cream px-4 py-3">
        <label
          htmlFor="search-nama"
          className="mb-1 block text-xs font-semibold text-teal/70"
        >
          Ketik nama kamu
        </label>
        <div className="relative">
          <Icon
            name="search"
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-teal/50"
          />
          <input
            id="search-nama"
            type="search"
            inputMode="search"
            autoComplete="off"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedNpm(null);
            }}
            placeholder="Contoh: Ahmad Fadil"
            className="w-full rounded-xl border border-teal/20 bg-white py-3.5 pl-12 pr-4 text-base text-teal-dark shadow-sm outline-none placeholder:text-teal-dark/40 focus:border-accent focus:ring-2 focus:ring-accent/30"
          />
        </div>
      </div>

      {selected && (
        <div className="mt-4 rounded-2xl border border-teal/15 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-2">
            <span className="rounded-full bg-cream px-3 py-1 text-xs font-semibold text-teal">
              {DEPARTEMEN_NAMA[selected.departemen]}
            </span>
            <span className="text-xs text-teal-dark/50">{selected.npm}</span>
          </div>
          <h3 className="mt-3 text-xl font-bold text-teal">{selected.nama}</h3>
          <p className="mt-1 text-sm text-teal-dark/70">{selected.prodi}</p>
          <div className="mt-4 rounded-xl bg-cream p-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-teal/60">
              Nomor Kelompok
            </p>
            {selected.kelompok ? (
              <p className="mt-1 text-4xl font-bold text-accent">
                {selected.kelompok}
              </p>
            ) : (
              <p className="mt-1 text-sm text-teal-dark/60">
                Nomor kelompok menyusul
              </p>
            )}
          </div>
          <div className="mt-4">
            <GroupLineButton link={selected.linkGrupLine} />
          </div>
        </div>
      )}

      <div className="mt-4 space-y-2">
        {normalizedQuery === "" && (
          <p className="py-8 text-center text-sm text-teal-dark/60">
            Mulai ketik nama kamu di atas untuk mencari kelompok.
          </p>
        )}
        {normalizedQuery !== "" && records === null && !loadError && (
          <p className="py-8 text-center text-sm text-teal-dark/60">
            Memuat data mahasiswa...
          </p>
        )}
        {loadError && (
          <div className="rounded-2xl bg-white p-5 text-center shadow-sm">
            <p className="font-semibold text-teal">Gagal memuat data</p>
            <p className="mt-1 text-sm text-teal-dark/70">
              Coba muat ulang halaman ini.
            </p>
          </div>
        )}
        {normalizedQuery !== "" && records && matches.length === 0 && (
          <div className="rounded-2xl bg-white p-5 text-center shadow-sm">
            <Icon name="search" className="mx-auto h-8 w-8 text-teal/40" />
            <p className="mt-2 font-semibold text-teal">
              Nama tidak ditemukan
            </p>
            <p className="mt-1 text-sm text-teal-dark/70">
              Periksa kembali ejaan nama, atau hubungi SC/IC kelompokmu untuk
              bantuan.
            </p>
          </div>
        )}
        {normalizedQuery !== "" && matches.length > 0 && (
          <p className="text-xs text-teal-dark/60">
            {matches.length > MAX_RESULTS
              ? `Menampilkan ${MAX_RESULTS} dari ${matches.length} hasil`
              : `${matches.length} hasil ditemukan`}
          </p>
        )}
        {results.map((m) => (
          <button
            key={m.npm}
            type="button"
            onClick={() => setSelectedNpm(m.npm)}
            className="flex w-full items-center justify-between gap-3 rounded-xl bg-white p-4 text-left shadow-sm transition-colors hover:bg-cream"
          >
            <span className="min-w-0">
              <span className="block truncate font-semibold text-teal">
                {m.nama}
              </span>
              <span className="mt-0.5 block truncate text-sm text-teal-dark/70">
                {DEPARTEMEN_NAMA[m.departemen]} · {m.prodi}
              </span>
            </span>
            {m.kelompok && (
              <span className="shrink-0 rounded-full bg-accent/10 px-3 py-1 text-sm font-bold text-accent">
                Kel. {m.kelompok}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
