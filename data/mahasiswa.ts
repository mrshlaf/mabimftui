import type { Mahasiswa } from "./types";
import { mahasiswaDTSL } from "./mahasiswa-dtsl";
import { mahasiswaDTM } from "./mahasiswa-dtm";
import { mahasiswaDTE } from "./mahasiswa-dte";
import { mahasiswaDTMM } from "./mahasiswa-dtmm";
import { mahasiswaDA } from "./mahasiswa-da";
import { mahasiswaDTK } from "./mahasiswa-dtk";
import { mahasiswaDTI } from "./mahasiswa-dti";
import { mahasiswaPI } from "./mahasiswa-pi";

export const mahasiswaData: Mahasiswa[] = [
  ...mahasiswaDTSL,
  ...mahasiswaDTM,
  ...mahasiswaDTE,
  ...mahasiswaDTMM,
  ...mahasiswaDA,
  ...mahasiswaDTK,
  ...mahasiswaDTI,
  ...mahasiswaPI,
];
