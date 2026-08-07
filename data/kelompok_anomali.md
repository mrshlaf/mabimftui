# Anomali Import Data Kelompok

Catatan saat pemetaan nama anggota kelompok (dari data kelompok) ke data mahasiswa (file `mahasiswa-*.ts`).

## Ringkasan

- Total anggota di data kelompok: 1822
- Mahasiswa unik di data: 1802
- Berhasil dipetakan (kelompok terisi): **1794**
- Gagal dipetakan / sengaja dikosongkan: **12**
- Total anomali tercatat: 28

## 1. Nama tidak ditemukan di data mahasiswa (12)

Nama berikut ada di daftar kelompok tetapi tidak ada di file `mahasiswa-*.ts` manapun, sehingga tidak bisa diisi `kelompok` karena tidak ada record NPM.

| Kelompok | Nama | Kode Dept. |
| ------- | -------------------------------- | ---------- |
| 3 | MUHAMMAD DWI AKBAR | DTMM |
| 9 | CLAYTON KILAWANG | DTMM |
| 10 | NADHIF INDRATMA GHANI | DTMM |
| 11 | BIMO AFKAR HANINDITO | DTMM |
| 20 | YOSHUA ROOSEVELT MANGIWA PALANGAN | - |
| 22 | ODIE GARCIA | DTMM |
| 30 | MUHAMMAD MALIK FAQIH | DTMM |
| 41 | AUBREY CHRISTO LARRY SUMARANDAK | DTMM |
| 44 | DAFFA RAIHAN PUTRA KUSUMA | DTMM |
| 49 | EVANNOV PRATAMA RIADI | DTMM |
| 66 | THORIQ AL'AKIL | - |
| 71 | RIZA FATIH SAPUTRO | DTMM |

Kemungkinan: salah ketik di daftar kelompok, atau data mahasiswa belum lengkap. Perlu verifikasi / NPM untuk dimasukkan.

## 2. Nama dobel di data mahasiswa (4 nama, 8 record)

Nama berikut muncul 2 kali di data (2 NPM, departemen berbeda). Kedua record dikosongkan karena tidak bisa dipastikan mana yang benar.

| Nama | Record 1 | Record 2 | Di daftar kelompok |
| ----------------------------- | -------- | -------- | ------------------ |
| Steven Adrian Auw | DTM (2606789446) | PI (2606780056) | g58 (DTM), g60 (-) |
| Fachry Reifandri Hairiman | DTK (2606790896) | PI (2606728614) | g74 (-), g75 (DTK) |
| Muhammad Daffa Athallah | DTM (2606875172) | DTSL (2606788651) | g76 (-), g93 (DTM) |
| Fariel Adam Sjahboeddin | DTMM (2606790183) | PI (2606778612) | g23 (DTMM), g86 (-) |

Kemungkinan: memang 2 mahasiswa berbeda dengan nama sama, atau salah satu record adalah duplikat. Perlu keputusan pengurus.

## 3. Satu nama muncul di 2 kelompok (4 orang)

Nama berikut hanya 1 record di data, tetapi tercantum di 2 kelompok di daftar. Keduanya dikosongkan karena tidak tahu kelompok yang benar.

| Nama | NPM | Kelompok 1 | Kelompok 2 |
| ------------------------------ | ---------- | ---------- | ---------- |
| Sharen Jessica Saragi | 2606780030 | 9 | 10 |
| Annisa Kamila Syazwina | 2606778171 | 33 | 35 |
| Rakhsanda Maiara | 2606728910 | 84 | 85 |
| Adiayra Ayudivyaswari Pratomo | 2606777824 | 99 | 100 |

## 4. Koreksi otomatis (1)

| Nama | NPM | Departemen | Keterangan |
| -------------------- | ---------- | ---------- | ---------- |
| Azka Barrel Maulana | 2606872630 | DTSL | Kode dept di daftar kelompok tertulis DTM, dikoreksi jadi DTSL, kelompok diisi 106 |
