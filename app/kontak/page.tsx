import type { Metadata } from "next";
import { kontakUnits } from "@/data/kontak";
import type { KontakKategoriKey, KontakPerson } from "@/data/types";
import { phoneToTel, phoneToWa, safeExternalUrl } from "@/lib/url";
import Icon from "../components/Icon";
import PageHeader from "../components/PageHeader";

export const metadata: Metadata = {
  title: "Kontak - Mabim FTUI 2026",
};

const KATEGORI: { key: KontakKategoriKey; title: string; desc: string }[] = [
  {
    key: "lembaga",
    title: "Lembaga & Organisasi",
    desc: "Contact person BEM FTUI, MPM FTUI, FUSI, KMK, dan PO.",
  },
  {
    key: "departemen",
    title: "Koordinator Departemen / PI",
    desc: "Contact person koordinator tiap departemen dan Program Internasional.",
  },
];

function initials(nama: string) {
  return nama
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

function KontakCard({ person }: { person: KontakPerson }) {
  const tel = safeExternalUrl(phoneToTel(person.noTelp));
  const wa = safeExternalUrl(phoneToWa(person.noTelp));
  return (
    <div className="rounded-2xl border border-teal/10 bg-white p-5">
      <div className="flex items-start gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-cream text-sm font-bold text-teal">
          {initials(person.nama)}
        </span>
        <div className="min-w-0">
          <h3 className="font-semibold text-teal">{person.nama}</h3>
          <p className="mt-0.5 text-sm text-teal-dark/60">{person.peran}</p>
        </div>
      </div>
      <dl className="mt-3 space-y-1 text-xs text-teal-dark/55">
        {person.npm && (
          <div className="flex gap-2">
            <dt className="shrink-0 font-medium text-teal-dark/45">NPM</dt>
            <dd>{person.npm}</dd>
          </div>
        )}
        {person.departemen && (
          <div className="flex gap-2">
            <dt className="shrink-0 font-medium text-teal-dark/45">
              Departemen
            </dt>
            <dd>{person.departemen}</dd>
          </div>
        )}
        {person.alamat && (
          <div className="flex gap-2">
            <dt className="shrink-0 font-medium text-teal-dark/45">Alamat</dt>
            <dd>{person.alamat}</dd>
          </div>
        )}
      </dl>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {tel && (
          <a
            href={tel}
            className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-accent px-4 text-sm font-bold text-white transition-transform active:scale-[0.98]"
          >
            <Icon name="phone" className="h-4 w-4" />
            Telepon
          </a>
        )}
        {wa && (
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-teal/20 px-4 text-sm font-semibold text-teal transition-colors hover:border-accent/50 hover:text-accent"
          >
            <Icon name="message" className="h-4 w-4" />
            WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}

export default function KontakPage() {
  return (
    <div className="min-h-full">
      <PageHeader
        eyebrow="Kontak Panitia"
        title="Hubungi Kami"
        desc="Butuh bantuan? Hubungi contact person resmi berikut sesuai unitmu."
      />

      <section className="mx-auto max-w-4xl px-4 py-6">
        {KATEGORI.map((kat) => (
          <div key={kat.key} className="mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              {kat.title}
            </p>
            <p className="mt-1 text-sm text-teal-dark/60">{kat.desc}</p>
            <div className="mt-4 space-y-4">
              {kontakUnits
                .filter((u) => u.kategori === kat.key)
                .map((unit) => (
                  <div key={unit.kode}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className="rounded-lg bg-cream px-2.5 py-1 text-xs font-bold text-teal">
                        {unit.kode}
                      </span>
                      <h2 className="font-semibold text-teal">{unit.nama}</h2>
                    </div>
                    {unit.kontak.length > 0 ? (
                      <div className="space-y-3">
                        {unit.kontak.map((person) => (
                          <KontakCard key={person.npm} person={person} />
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-2xl border border-dashed border-teal/20 bg-white p-5 text-sm text-teal-dark/60">
                        Kontak unit ini menyusul.
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}

        <p className="mb-4 text-center text-xs text-teal-dark/60">
          Data contact person dikelola panitia Mabim FTUI 2026 dan dapat
          diperbarui sewaktu-waktu.
        </p>
      </section>
    </div>
  );
}
