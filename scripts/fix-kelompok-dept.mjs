import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const ROOT = join(import.meta.dirname, "..");

// 1. Parse all mahasiswa-*.ts → Map<nama_normalised, departemen>
const deptMap = new Map();
const deptFiles = [
  "mahasiswa-dtsl.ts",
  "mahasiswa-dtm.ts",
  "mahasiswa-dte.ts",
  "mahasiswa-dtmm.ts",
  "mahasiswa-da.ts",
  "mahasiswa-dtk.ts",
  "mahasiswa-dti.ts",
  "mahasiswa-pi.ts",
];

for (const file of deptFiles) {
  const content = readFileSync(join(ROOT, "data", file), "utf-8");
  const regex =
    /\{\s*npm:\s*"([^"]*)",\s*nama:\s*"([^"]*)",\s*departemen:\s*"([^"]*)"/g;
  let m;
  while ((m = regex.exec(content)) !== null) {
    const nama = m[2].toLowerCase().replace(/[^a-z0-9]/g, "");
    const dept = m[3];
    if (!deptMap.has(nama)) deptMap.set(nama, dept);
  }
}

console.log(`Loaded ${deptMap.size} mahasiswa records`);

// 2. Read kelompok.ts
const kelompokPath = join(ROOT, "data", "kelompok.ts");
const raw = readFileSync(kelompokPath, "utf-8");

// 3. Find entries without d: { n: "..." } and add d if found
let fixed = 0;
let notFound = 0;
const notFoundNames = [];

const corrected = raw.replace(
  /\{\s*n:\s*"([^"]*?)"\s*\}/g,
  (match, name) => {
    const norm = name.toLowerCase().replace(/[^a-z0-9]/g, "");
    const dept = deptMap.get(norm);
    if (dept) {
      fixed++;
      return `{ n: "${name}", d: "${dept}" }`;
    }
    notFound++;
    notFoundNames.push(name);
    return match;
  }
);

console.log(`Fixed ${fixed} entries, ${notFound} not found`);
if (notFoundNames.length > 0) {
  console.log("Not found:", notFoundNames.join(", "));
}

writeFileSync(kelompokPath, corrected, "utf-8");
console.log("kelompok.ts updated");
