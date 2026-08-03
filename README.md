# Mabim FTUI 2026

Website dashboard Mahasiswa Baru (Maba) FTUI 2026 — satu pintu informasi:
cari kelompok & grup Line, link tugas per unit, info penting, dan kontak panitia.
Next.js (App Router), Tailwind CSS v4, statis, deploy Vercel.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
```

## Update Data Mahasiswa

Data sumber ada di folder `maba/` (CSV SIAK-NG) dan diproses ke `data/`:

```bash
npm run data:maba
```

Untuk mengisi nomor kelompok & link grup Line per mahasiswa, tambahkan kolom
opsional pada CSV (parser sudah mendukung), lalu jalankan ulang perintah di atas.
Generator punya pengecekan otomatis: total entri harus 1.806, tanpa duplikat NPM.

## Kontak Panitia

Data contact person di-edit langsung di `data/kontak.ts` (nama, peran, NPM,
departemen, alamat, no. telepon). Tombol Telepon & WhatsApp dibuat otomatis dari
nomor.

## Ganti Foto

- **Hero background**: timpa isi `public/hero-mabim.jpg` dengan foto asli
  kegiatan Mabim. Cukup ganti file-nya, nama tetap, tanpa ubah kode.
- **Logo**: timpa isi `public/logo-mabim.png` (lebih baik tetap transparan di
  sudut, ~persegi). Sumber asli ada di folder `images/`.

## Verifikasi

```bash
npm run lint
npm run build
```
