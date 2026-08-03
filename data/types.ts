export type DepartemenCode =
  | "DTSL"
  | "DTM"
  | "DTE"
  | "DTMM"
  | "DA"
  | "DTK"
  | "DTI"
  | "PI";

export interface Mahasiswa {
  npm: string;
  nama: string;
  departemen: DepartemenCode;
  prodi: string;
  kelompok: number | null;
  linkGrupLine: string | null;
}

export const DEPARTEMEN_NAMA: Record<DepartemenCode, string> = {
  DTSL: "Teknik Sipil",
  DTM: "Teknik Mesin",
  DTE: "Teknik Elektro",
  DTMM: "Teknik Metalurgi & Material",
  DA: "Teknik Arsitektur",
  DTK: "Teknik Kimia",
  DTI: "Teknik Industri",
  PI: "Program Internasional",
};

export interface TugasItem {
  label: string;
  url: string;
}

export interface TugasUnit {
  kode: string;
  nama: string;
  kategori: "departemen" | "lembaga";
  tugas: TugasItem[];
}

export interface InfoLinks {
  pengaduan: { label: string; url: string };
  guidebook: { label: string; url: string };
  kalender: { label: string; url: string };
}

export interface InfoTimeline {
  rentang: string;
  jamSeninJumat: string;
  jamSabtu: string;
}
