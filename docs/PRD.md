Product Requirements Document (PRD)
Web Pembelajaran Kimia: Laju Reaksi Interaktif untuk SMA
Nama Produk: ReaksiLab XI --- Jelajahi, Uji, dan Pahami Laju
Reaksi  
Versi Dokumen: 1.0  
Status: Draf untuk Pengembangan  
Target Pengguna: Siswa SMA Kelas XI dan guru kimia
---
1. Ringkasan Eksekutif dan Tujuan Produk
ReaksiLab XI adalah platform pembelajaran kimia berbasis web yang
membantu siswa memahami laju reaksi melalui fenomena sehari-hari,
simulasi partikel, eksperimen virtual, analisis data, dan proyek
investigasi sederhana. Materi dirancang agar siswa tidak hanya menghafal
faktor-faktor laju reaksi, tetapi dapat menjelaskan hubungan antara
pengamatan makroskopis, interaksi partikel pada tingkat submikroskopis,
dan representasi simbolik berupa persamaan atau grafik.
Tujuan utama
Membantu siswa menjelaskan makna laju reaksi dan cara mengukur
perubahan konsentrasi terhadap waktu.
Membimbing siswa menghubungkan konsentrasi, luas permukaan, suhu,
dan katalis dengan frekuensi tumbukan efektif serta energi aktivasi.
Melatih siswa membaca tabel dan grafik, merumuskan hipotesis,
mengidentifikasi variabel, serta menarik kesimpulan berdasarkan
bukti.
Menyediakan simulasi eksperimen yang aman dan dapat diakses melalui
laptop atau ponsel.
Memberikan pengalaman belajar berbasis inkuiri dan STEM, termasuk
opsi investigasi menggunakan sensor sederhana.
Indikator keberhasilan produk
Siswa dapat menyelesaikan kuis konsep dengan umpan balik dan
pembahasan.
Siswa mampu membedakan variabel bebas, terikat, dan kontrol dalam
skenario eksperimen.
Siswa dapat membaca grafik perubahan konsentrasi atau indikator
reaksi terhadap waktu.
Siswa dapat menjelaskan fenomena pada tingkat makro, submikro, dan
simbolik.
Guru dapat menggunakan modul dan hasil aktivitas sebagai bahan
diskusi kelas.
---
2. Sasaran Pengguna dan Kebutuhan
Persona utama
Siswa SMA kelas XI - Membutuhkan penjelasan visual yang tidak hanya
berupa teks dan rumus. - Sering kesulitan membayangkan tumbukan efektif,
energi aktivasi, dan pengaruh faktor reaksi pada tingkat partikel. -
Membutuhkan latihan membaca grafik dan data eksperimen dengan pembahasan
bertahap. - Mengakses materi melalui ponsel maupun laptop dengan koneksi
internet yang beragam.
Guru kimia - Membutuhkan media demonstrasi untuk memantik diskusi
sebelum atau sesudah praktikum. - Membutuhkan skenario eksperimen,
lembar kerja, dan pertanyaan diagnostik. - Membutuhkan contoh data yang
dapat digunakan untuk melatih penalaran ilmiah siswa.
Prinsip pembelajaran
Berangkat dari fenomena: mulai dari kejadian yang dapat diamati,
misalnya tablet effervescent dalam air atau reaksi natrium tiosulfat
dengan asam.
Inkuiri berbasis bukti: siswa membuat prediksi, mengubah satu
variabel, mencatat data, lalu menyusun kesimpulan.
Tiga level representasi kimia: makroskopis (perubahan yang
diamati), submikroskopis (partikel dan tumbukan), serta simbolik
(persamaan, grafik, dan perhitungan).
Scaffolding: petunjuk bertahap tersedia, tetapi jawaban tidak
langsung ditampilkan sebelum siswa mencoba.
---
3. Konsep Desain dan Identitas Visual
Tema visual
Clean Science Lab: antarmuka ringan, bersih, dan fokus pada
keterbacaan materi.
Latar: putih dan abu-abu kebiruan lembut.
Warna utama: biru untuk navigasi dan informasi ilmiah.
Warna pendukung: cyan untuk simulasi, jingga untuk variabel yang
sedang diuji, hijau untuk umpan balik benar, dan merah untuk
peringatan keselamatan.
Tipografi: sans-serif yang mudah dibaca; rumus kimia menggunakan
subskrip dan simbol dengan jelas.
Komponen: kartu modul, indikator progres, grafik sederhana,
panel simulasi, dan kotak refleksi.
Responsif: tampilan menyesuaikan ponsel, tablet, dan desktop.
Prinsip aksesibilitas
Tidak mengandalkan warna saja untuk membedakan status.
Tombol dan label menggunakan istilah yang jelas.
Grafik dilengkapi judul, label sumbu, satuan, serta deskripsi
singkat.
Simulasi menyediakan alternatif tabel data apabila animasi tidak
dapat dijalankan.
---
4. Struktur Arsitektur dan Alur Belajar
Siswa mengikuti jalur belajar berurutan. Setiap modul memuat fenomena
pemantik, materi inti, aktivitas interaktif, cek pemahaman, dan refleksi
singkat.
``` text
[Beranda: Peta Belajar ReaksiLab XI]
          |
          v
[Bab 1: Mengenal Laju Reaksi]
  ├── 1.1 Fenomena reaksi cepat dan lambat
  ├── 1.2 Definisi laju reaksi
  ├── 1.3 Membaca perubahan terhadap waktu
  └── Kuis Bab 1
          |
          v
[Bab 2: Teori Tumbukan dan Energi Aktivasi]
  ├── 2.1 Tumbukan antarpartikel
  ├── 2.2 Tumbukan efektif
  ├── 2.3 Energi aktivasi
  ├── 2.4 Diagram energi reaksi
  └── Simulasi Tumbukan Partikel
          |
          v
[Bab 3: Faktor-Faktor yang Memengaruhi Laju Reaksi]
  ├── 3.1 Konsentrasi
  ├── 3.2 Luas permukaan
  ├── 3.3 Suhu
  ├── 3.4 Katalis
  └── Lab Virtual Faktor Laju Reaksi
          |
          v
[Bab 4: Data, Grafik, dan Orde Reaksi]
  ├── 4.1 Menginterpretasi tabel dan grafik
  ├── 4.2 Menentukan laju rata-rata dari data
  ├── 4.3 Pengantar hukum laju dan orde reaksi
  └── Latihan Analisis Data
          |
          v
[Bab 5: Proyek Investigasi STEM]
  ├── 5.1 Merancang eksperimen sederhana
  ├── 5.2 Opsi proyek detektor kekeruhan berbasis Arduino
  ├── 5.3 Mengolah dan mengevaluasi data
  └── Presentasi hasil investigasi
          |
          v
[Bab 6: Evaluasi Akhir]
  ├── Kuis komprehensif
  ├── Umpan balik topik yang perlu dipelajari ulang
  └── Ringkasan capaian belajar
```
Catatan cakupan: kedalaman materi hukum laju dan orde reaksi dapat
disesuaikan dengan tujuan pembelajaran, kurikulum yang digunakan, serta
alokasi waktu sekolah.
---
5. Spesifikasi Fitur Utama
5.1 Modul Konsep Laju Reaksi
Tujuan: siswa memahami laju reaksi sebagai perubahan jumlah atau
konsentrasi pereaksi maupun produk per satuan waktu.
Fitur: - Fenomena pembuka berupa beberapa reaksi dengan durasi
berbeda. - Animasi perubahan jumlah partikel pereaksi dan produk. -
Grafik konsentrasi terhadap waktu dengan label sumbu dan satuan. -
Latihan membedakan laju rata-rata dan perubahan yang terjadi selama
interval waktu tertentu. - Umpan balik yang menjelaskan alasan jawaban.
Kriteria penerimaan: - Siswa dapat memilih interval waktu pada
grafik dan membaca perubahan yang sesuai. - Sistem menampilkan
pembahasan setelah siswa mengirimkan jawaban.
5.2 Simulator Teori Tumbukan
Tujuan: siswa menjelaskan mengapa tidak semua tumbukan menghasilkan
reaksi.
Fitur: - Animasi partikel yang bergerak dan bertumbukan. - Ilustrasi
tumbukan efektif dan tidak efektif. - Representasi energi aktivasi
melalui diagram energi sederhana. - Kontrol kecepatan animasi dan tombol
jeda/ulang. - Pertanyaan prediksi: "Apa yang harus berubah agar jumlah
tumbukan efektif meningkat?"
Kriteria penerimaan: - Siswa dapat mengidentifikasi bahwa tumbukan
efektif memerlukan kondisi yang sesuai, termasuk energi yang cukup dan
orientasi yang tepat. - Animasi diberi keterangan bahwa model partikel
merupakan penyederhanaan, bukan gambaran literal seluruh peristiwa
molekuler.
5.3 Lab Virtual Faktor-Faktor Laju Reaksi
Tujuan: siswa membandingkan pengaruh satu faktor terhadap laju
reaksi dengan faktor lain dikendalikan.
Variabel simulasi: - Konsentrasi pereaksi. - Luas permukaan zat
padat. - Suhu. - Keberadaan katalis.
Fitur: - Siswa memilih satu faktor untuk diubah. - Variabel lain
dijaga tetap pada simulasi terkontrol. - Sistem menghasilkan data waktu
reaksi atau indikator laju yang konsisten dengan model. - Tabel hasil
dapat diisi atau dilengkapi siswa. - Grafik perbandingan kondisi
ditampilkan setelah percobaan. - Tombol "Ulangi eksperimen" dan
"Bandingkan hasil".
Kriteria penerimaan: - Siswa harus menentukan variabel bebas,
terikat, dan kontrol sebelum menjalankan eksperimen. - Sistem tidak
menyatakan satu faktor sebagai penyebab jika lebih dari satu variabel
diubah bersamaan. - Data simulasi diberi label sebagai data
model/simulasi, bukan data eksperimen nyata.
5.4 Latihan Analisis Data dan Grafik
Tujuan: melatih interpretasi bukti kuantitatif.
Fitur: - Tabel data hasil eksperimen yang dapat diurutkan atau
dianalisis. - Grafik perubahan konsentrasi terhadap waktu. - Pertanyaan
tentang pola, perbandingan laju, dan kesimpulan yang didukung data. -
Untuk pengantar orde reaksi, tersedia data konsentrasi awal dan laju
awal yang dapat dibandingkan. - Pembahasan langkah demi langkah dengan
satuan yang konsisten.
Kriteria penerimaan: - Grafik memiliki sumbu, satuan, dan keterangan
yang jelas. - Sistem menerima jawaban numerik dalam batas pembulatan
yang ditentukan. - Kesimpulan siswa dibedakan antara temuan dari data
dan dugaan yang belum diuji.
5.5 Proyek STEM: Detektor Kekeruhan Berbasis Arduino (Opsional)
Tujuan: memberi pengalaman merancang pengukuran sederhana dan
mengevaluasi keterbatasan instrumen.
Gagasan aktivitas: - Siswa mengamati perubahan kejernihan larutan
atau suspensi selama suatu proses yang sesuai dan aman. - LED digunakan
sebagai sumber cahaya dan LDR sebagai sensor penerima cahaya. - Arduino
membaca perubahan sinyal sensor, lalu data direkam terhadap waktu. -
Siswa membandingkan pola sinyal pada beberapa kondisi dengan prosedur
dan posisi sensor yang sama.
Penting untuk validitas ilmiah: - Perubahan nilai LDR bukan
pengukuran langsung konsentrasi atau laju reaksi. - Kekeruhan hanya
relevan jika sistem reaksi benar-benar menghasilkan perubahan hamburan
cahaya yang dapat dideteksi. - Sebelum menghubungkan data dengan laju
reaksi, siswa perlu melakukan uji awal, mengendalikan jarak
LED--wadah--LDR, pencahayaan sekitar, volume, dan posisi alat. - Jika
reaksi yang dipilih tidak menghasilkan kekeruhan yang terukur, gunakan
sistem demonstrasi yang sesuai atau data simulasi; jangan memaksakan
interpretasi. - Percobaan kimia nyata harus mengikuti prosedur
keselamatan dan pengawasan guru. Reaksi natrium tiosulfat dengan asam,
jika dipilih, memerlukan pengendalian risiko gas sulfur dioksida dan
ventilasi yang sesuai; jangan dilakukan sebagai eksperimen mandiri di
ruang tertutup.
Kriteria penerimaan: - Siswa dapat menjelaskan apa yang sebenarnya
dibaca sensor. - Data mentah dan waktu pengambilan data dapat dicatat. -
Siswa mengidentifikasi sedikitnya dua sumber ketidakpastian
pengukuran. - Kesimpulan tidak mengklaim sensor mengukur konsentrasi
secara langsung tanpa kalibrasi yang memadai.
5.6 Kuis dan Umpan Balik
Jenis soal: - Pilihan ganda untuk cek konsep. - Pilihan ganda
beralasan atau jawaban singkat untuk mengungkap miskonsepsi. - Analisis
tabel/grafik. - Pertanyaan terbuka untuk merancang eksperimen dan
menjelaskan hasil.
Fitur: - Umpan balik setelah jawaban dikirim. - Petunjuk bertahap
sebelum pembahasan lengkap. - Ringkasan capaian per bab. - Rekomendasi
modul untuk dipelajari ulang berdasarkan jenis kesalahan. - Penghargaan
sederhana untuk menyelesaikan aktivitas, tanpa menjadikan poin sebagai
pengganti pemahaman.
---
6. Kebutuhan Fungsional dan Nonfungsional
Kebutuhan fungsional
Pengguna dapat membuka modul melalui peta belajar.
Pengguna dapat menjalankan, menjeda, dan mengulang simulasi.
Pengguna dapat memasukkan jawaban dan menerima umpan balik.
Sistem dapat menyajikan tabel serta grafik dari data simulasi.
Sistem dapat menyimpan progres belajar pada perangkat yang
digunakan.
Guru dapat menggunakan skenario dan data simulasi untuk diskusi
kelas.
Kebutuhan nonfungsional
Responsif: berjalan pada ponsel dan desktop.
Ringan: teks dan aktivitas dasar tetap dapat diakses pada
koneksi terbatas.
Mudah digunakan: navigasi konsisten dan instruksi singkat.
Akurat: rumus, satuan, grafik, dan pembahasan diperiksa sebelum
rilis.
Privasi: versi awal tidak meminta data pribadi yang tidak
diperlukan.
Aksesibilitas: kontras cukup, kontrol dapat digunakan dengan
keyboard, dan informasi penting tidak hanya ditandai dengan warna.
---
7. Batasan Produk dan Asumsi
Termasuk dalam versi awal (MVP)
Peta belajar dan enam modul inti.
Materi ringkas dan visualisasi dasar.
Simulator teori tumbukan.
Lab virtual untuk empat faktor laju reaksi.
Latihan tabel/grafik dan kuis dengan pembahasan.
Penyimpanan progres lokal pada peramban.
Belum termasuk dalam versi awal
Akun siswa dan guru berbasis server.
Dasbor kelas dan analitik lintas perangkat.
Integrasi Learning Management System.
Pengambilan data Arduino otomatis ke web.
Penilaian otomatis yang andal untuk semua jawaban esai.
Klaim bahwa simulasi menggantikan seluruh praktikum nyata.
Asumsi
Siswa memiliki akses ke ponsel atau komputer.
Guru menentukan kesesuaian materi dengan kurikulum dan alokasi
waktu.
Data simulasi dirancang untuk tujuan pembelajaran dan diberi label
secara transparan.
---
8. Spesifikasi Teknis yang Diusulkan
Frontend: React + Vite atau teknologi web setara.
Styling: CSS responsif dengan komponen yang konsisten.
Visualisasi: SVG atau Canvas untuk animasi partikel dan grafik
ringan.
Penyimpanan progres: `localStorage` untuk versi awal tanpa akun.
Grafik: komponen grafik sederhana dengan label sumbu dan satuan.
Arsitektur modul: setiap bab dibuat terpisah agar materi dapat
dikembangkan bertahap.
Performa: optimalkan ukuran aset dan sediakan alternatif
nonanimasi untuk perangkat yang terbatas.
Pilihan teknologi ini merupakan usulan awal dan dapat berubah mengikuti
kemampuan pengembang.
---
9. Roadmap Pelaksanaan
Milestone 1 --- Desain dan navigasi: identitas visual, beranda,
peta modul, dan komponen dasar.
Milestone 2 --- Materi inti: modul laju reaksi, teori tumbukan,
serta energi aktivasi.
Milestone 3 --- Simulasi faktor: konsentrasi, luas permukaan,
suhu, dan katalis.
Milestone 4 --- Analisis data: tabel, grafik, latihan hitungan,
dan pengantar orde reaksi.
Milestone 5 --- Evaluasi: kuis, umpan balik, dan penyimpanan
progres.
Milestone 6 --- Proyek STEM opsional: panduan investigasi sensor
kekeruhan dan format pencatatan data.
Milestone 7 --- Pengujian: pemeriksaan akurasi kimia,
keterbacaan, responsivitas, serta uji coba bersama guru/siswa.
---
10. Rencana Pengujian dan Kriteria Keberhasilan
---
Area pengujian          Cara menguji            Kriteria keberhasilan
---
Akurasi materi          Ditelaah guru/dosen     Tidak ada kesalahan
kimia                   konsep atau satuan yang
belum diperbaiki
Simulasi                Uji setiap variabel dan Perubahan sesuai aturan
skenario                model dan variabel
kontrol dijaga
Grafik                  Cocokkan dengan data    Nilai, label, dan
sumber                  satuan sesuai data
Kuis                    Uji jawaban benar/salah Umpan balik dan skor
dan batas pembulatan    sesuai kunci
Responsivitas           Uji ponsel dan desktop  Konten utama terbaca
dan kontrol dapat
digunakan
Kegunaan                Uji coba terbatas       Pengguna dapat
dengan pengguna         menemukan modul dan
menyelesaikan aktivitas
tanpa kebingungan utama
Proyek sensor           Bandingkan pembacaan    Data, kondisi
berulang                pengukuran, dan
keterbatasan alat
tercatat
---
11. Contoh Alur Pengguna
Siswa membuka ReaksiLab XI dan memilih "Mulai Belajar".
Siswa melihat fenomena dua reaksi dengan waktu berbeda, lalu
menuliskan prediksi.
Siswa mempelajari teori tumbukan dan menjalankan animasi partikel.
Siswa memilih faktor yang akan diuji, menentukan variabel, dan
menjalankan lab virtual.
Siswa mencatat data pada tabel, membuat atau membaca grafik, lalu
menuliskan kesimpulan berdasarkan bukti.
Siswa mengerjakan kuis dan membaca umpan balik.
Siswa dapat memilih proyek STEM opsional atau mengulang modul yang
belum dikuasai.
---
12. Risiko dan Mitigasi
Miskonsepsi bahwa semua tumbukan menghasilkan reaksi: tampilkan
perbedaan tumbukan efektif dan tidak efektif secara eksplisit.
Siswa menganggap animasi sebagai realitas literal: beri
keterangan bahwa animasi merupakan model konseptual.
Korelasi disalahartikan sebagai sebab-akibat: minta siswa
mengendalikan variabel dan mengulangi percobaan.
Data sensor tidak stabil: gunakan prosedur kalibrasi sederhana,
pengukuran berulang, dan pencatatan kondisi lingkungan.
Kekeruhan tidak cocok untuk reaksi yang dipilih: lakukan uji
kelayakan terlebih dahulu dan sediakan alternatif data simulasi.
Materi terlalu padat: prioritaskan fitur MVP dan pecah aktivitas
menjadi langkah singkat.
---
13. Ringkasan Nilai Produk
ReaksiLab XI dirancang untuk menjembatani fenomena yang dapat diamati
dengan penjelasan partikel dan data kuantitatif. Kekuatan utamanya
adalah kombinasi simulasi, investigasi terkontrol, pembacaan grafik, dan
refleksi berbasis bukti. Proyek Arduino menjadi pilihan pengayaan, bukan
syarat utama, sehingga pembelajaran tetap dapat dijalankan meskipun
sekolah tidak memiliki perangkat sensor.
Status akhir dokumen: Draf PRD yang siap ditinjau dan disesuaikan
dengan tujuan pembelajaran, kurikulum sekolah, serta kapasitas
pengembangan.