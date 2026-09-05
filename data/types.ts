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
  DTSL: "Departemen Teknik Sipil dan Lingkungan",
  DTM: "Departemen Teknik Mesin",
  DTE: "Departemen Teknik Elektro",
  DTMM: "Departemen Teknik Metalurgi dan Material",
  DA: "Departemen Arsitektur",
  DTK: "Departemen Teknik Kimia",
  DTI: "Departemen Teknik Industri",
  PI: "Program Internasional",
};

export interface TugasItem {
  judul: string;
  tor?: string;
  kumpul?: string;
  deadline?: string;
}

export type KategoriTugas = "departemen" | "bem" | "bok";

export interface TugasLembaga {
  kode: string;
  nama: string;
  kategori: KategoriTugas;
  tugas: TugasItem[];
}

export interface InfoLinks {
  pengaduan: { label: string; url: string };
  ketidaknyamanan?: { label: string; url: string };
  guidebook: { label: string; url: string };
  kalender: { label: string; url: string };
}

export interface InfoTimeline {
  jamSeninJumat: string;
  jamSabtu: string;
}

export interface KontakPerson {
  nama: string;
  peran: string;
  npm: string;
  departemen: string;
  noTelp: string;
}

export type KontakKategoriKey = "lembaga" | "departemen";

export interface KontakLembaga {
  kode: string;
  nama: string;
  kategori: KontakKategoriKey;
  kontak: KontakPerson[];
}

export interface StatistikDepartemen {
  kode: string;
  nama: string;
  jumlah: number;
}

export interface Statistik {
  total: number;
  prodi: number;
  departemen: StatistikDepartemen[];
}
