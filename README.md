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

## Kontak SC

Data contact person di-edit langsung di `data/kontak.ts` (nama, peran, NPM,
departemen, alamat, no. telepon). Tombol Telepon & WhatsApp dibuat otomatis dari
nomor.

## Ganti Foto

Semua background memakai foto dummy (stok gratis) yang siap diganti foto asli
kegiatan Mabim — cukup timpa isi file-nya, nama file tetap, tanpa ubah kode:

- `public/hero-mabim.jpg` → hero halaman Home
- `public/bg-kelompok.jpg` → header halaman Kelompok
- `public/bg-tugas.jpg` → header halaman Tugas
- `public/bg-info.jpg` → header halaman Info
- `public/bg-kontak.jpg` → header halaman Kontak
- `public/bg-site.jpg` → background situs (dummy sudah hitam-putih; ganti dengan
  foto hitam-putih Mabim asli saat tiba waktunya)
- `public/logo-mabim.png` → logo (usahan tetap transparan di sudut, ~persegi).
  Sumber asli ada di folder `images/`.

## Verifikasi

```bash
npm run lint
npm run build
```
