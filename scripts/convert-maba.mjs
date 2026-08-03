import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const MABA_DIR = path.join(ROOT, "maba");
const DATA_DIR = path.join(ROOT, "data");

const FILES = [
  "DA_Data Mahasiswa Baru 2026 - SIAK-NG.csv",
  "DTE_Data Mahasiswa Baru 2026 - SIAK-NG.csv",
  "DTI_Data Mahasiswa Baru 2026 - SIAK-NG.csv",
  "DTK_Data Mahasiswa Baru 2026 - SIAK-NG.csv",
  "DTMM_Data Mahasiswa Baru 2026 - SIAK-NG.csv",
  "DTM_Data Mahasiswa Baru 2026 - SIAK-NG.csv",
  "DTSL_Data Mahasiswa Baru 2026 - SIAK-NG.csv",
];

const DEPARTEMEN_NAMA = {
  DTSL: "Teknik Sipil",
  DTM: "Teknik Mesin",
  DTE: "Teknik Elektro",
  DTMM: "Teknik Metalurgi & Material",
  DA: "Teknik Arsitektur",
  DTK: "Teknik Kimia",
  DTI: "Teknik Industri",
  PI: "Program Internasional",
};

const ORDER = ["DTSL", "DTM", "DTE", "DTMM", "DA", "DTK", "DTI", "PI"];
const NPM_RE = /^\d{10}$/;
const VARNAME = {
  DTSL: "mahasiswaDTSL",
  DTM: "mahasiswaDTM",
  DTE: "mahasiswaDTE",
  DTMM: "mahasiswaDTMM",
  DA: "mahasiswaDA",
  DTK: "mahasiswaDTK",
  DTI: "mahasiswaDTI",
  PI: "mahasiswaPI",
};

function cleanName(raw) {
  let name = (raw ?? "").replace(/\s+/g, " ").trim();
  if (name.length > 2 && name === name.toUpperCase()) {
    name = name
      .toLowerCase()
      .replace(/(^|[\s.\-])([a-z])/g, (_m, sep, ch) => sep + ch.toUpperCase());
  }
  return name;
}

function cleanProdi(raw) {
  let p = (raw ?? "").replace(/\s+/g, " ").trim();
  const isIntl = /Internasional/i.test(p);
  p = p.replace(/^S1\s+/i, "").trim();
  if (/^Kls\s+Internasional\s+/i.test(p)) {
    p = p.replace(/^Kls\s+Internasional\s+/i, "");
  } else if (/^Reguler\s*-\s*/i.test(p)) {
    p = p.replace(/^Reguler\s*-\s*/i, "");
  }
  return isIntl ? `${p} (Internasional)` : p;
}

function parseFile(filePath) {
  const raw = fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
  const lines = raw.split(/\r?\n/);
  const records = [];
  const problems = [];
  let tokenCount = 0;

  lines.forEach((line, idx) => {
    const tokens = line.split(",");
    const npmIdx = [];
    for (let i = 0; i < tokens.length; i++) {
      if (NPM_RE.test(tokens[i].trim())) npmIdx.push(i);
    }
    if (npmIdx.length === 0) return;
    for (const i of npmIdx) {
      tokenCount++;
      const npm = tokens[i].trim();
      const nama = cleanName(tokens[i + 1]);
      const prodiRaw = (tokens[i + 4] ?? "").trim();
      if (!nama) {
        problems.push(`line ${idx + 1}: NPM ${npm} tanpa nama`);
        continue;
      }
      if (!/^S1 /i.test(prodiRaw)) {
        problems.push(`line ${idx + 1}: NPM ${npm} prodi tidak dikenali '${prodiRaw}'`);
        continue;
      }
      records.push({ npm, nama, prodi: cleanProdi(prodiRaw) });
    }
  });

  return { records, tokenCount, problems };
}

function serializeArray(varName, records) {
  const lines = records.map((r) => {
    const npm = JSON.stringify(r.npm);
    const nama = JSON.stringify(r.nama);
    const prodi = JSON.stringify(r.prodi);
    const dept = JSON.stringify(r.dept);
    return `  { npm: ${npm}, nama: ${nama}, departemen: ${dept}, prodi: ${prodi}, kelompok: null, linkGrupLine: null },`;
  });
  return `import type { Mahasiswa } from "./types";

export const ${varName}: Mahasiswa[] = [
${lines.join("\n")}
];
`;
}

function writeDataFile(relPath, content) {
  const p = path.join(DATA_DIR, relPath);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, "utf8");
  console.log(`  ok   ${relPath} (${content.split("\n").filter((l) => l.trim()).length} baris)`);
}

function main() {
  console.log("Konversi data mahasiswa dari maba/*.csv");
  console.log("=".repeat(60));

  const byDept = {};
  for (const code of ORDER) byDept[code] = [];
  const allRecords = [];
  const allProblems = [];
  let totalTokens = 0;

  for (const file of FILES) {
    const filePath = path.join(MABA_DIR, file);
    if (!fs.existsSync(filePath)) {
      throw new Error(`FILE HILANG: ${filePath}`);
    }
    const { records, tokenCount, problems } = parseFile(filePath);
    if (records.length !== tokenCount) {
      throw new Error(
        `TIDAK KONSISTEN di ${file}: parsed=${records.length} vs NPM tokens=${tokenCount}`
      );
    }
    if (problems.length > 0) {
      allProblems.push(...problems.map((p) => `${file}: ${p}`));
    }
    totalTokens += tokenCount;
    const code = file.split("_")[0];
    for (const r of records) {
      const isIntl = /Internasional/i.test(r.prodi);
      r.dept = isIntl ? "PI" : code;
      byDept[r.dept].push(r);
      allRecords.push(r);
    }
  }

  const nps = allRecords.map((r) => r.npm);
  const dupes = nps.filter((npm, i) => nps.indexOf(npm) !== i);
  if (dupes.length > 0) {
    throw new Error(`NPM DUPLIKAT DITEMUKAN: ${[...new Set(dupes)].join(", ")}`);
  }

  if (allProblems.length > 0) {
    throw new Error(`BARIS BERMASALAH:\n${allProblems.join("\n")}`);
  }

  for (const code of ORDER) {
    const count = byDept[code].length;
    if (count === 0) throw new Error(`TIDAK ADA DATA untuk departemen ${code}`);
    writeDataFile(
      `mahasiswa-${code.toLowerCase()}.ts`,
      serializeArray(VARNAME[code], byDept[code])
    );
  }

  const imports = ORDER.map(
    (c) => `import { ${VARNAME[c]} } from "./mahasiswa-${c.toLowerCase()}";`
  ).join("\n");
  const spread = ORDER.map((c) => `  ...${VARNAME[c]},`).join("\n");
  writeDataFile(
    "mahasiswa.ts",
    `import type { Mahasiswa } from "./types";
${imports}

export const mahasiswaData: Mahasiswa[] = [
${spread}
];
`
  );

  console.log("=".repeat(60));
  console.log(`LAPORAN QA (wajib cocok dengan audit file asli)`);
  for (const code of ORDER) {
    console.log(`  ${code.padEnd(5)} ${DEPARTEMEN_NAMA[code].padEnd(30)} ${String(byDept[code].length).padStart(5)}`);
  }
  console.log(`  TOTAL                                 ${allRecords.length}`);
  console.log(`  Duplikat NPM: ${dupes.length}`);
  if (allRecords.length !== totalTokens) {
    throw new Error(`TOTAL tidak konsisten: ${allRecords.length} vs ${totalTokens}`);
  }
  console.log("Semua assertion lolos: tidak ada Maba yang terlewat/duplikat.");
}

main();
