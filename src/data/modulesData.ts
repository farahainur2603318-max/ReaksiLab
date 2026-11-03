import type { ModuleItem } from '../types/learning';

export const MODULES_DATA: ModuleItem[] = [
  {
    id: 1,
    code: 'Bab 1',
    title: 'Mengenal Laju Reaksi & Konsep Mol',
    description:
      'Pahami definisi mendasar laju reaksi melalui perubahan jumlah mol dan konsentrasi zat terhadap waktu, diamati dari tiga level representasi kimia.',
    isAvailable: true,
    statusBadge: 'Tersedia untuk Dipelajari',
    sections: [
      {
        id: '1.1',
        number: '1.1',
        title: 'Fenomena Reaksi Cepat & Lambat',
        level: 'Makroskopis',
        description:
          'Mengamati fenomena sehari-hari seperti kembang api vs. perkaratan besi untuk memahami konsep selang waktu dalam perubahan kimia.',
        keyTakeaway: 'Reaksi kimia membutuhkan rentang waktu yang beragam untuk mencapai perubahan teramati.',
      },
      {
        id: '1.2',
        number: '1.2',
        title: 'Konsep Mol & Molaritas dalam Laju Reaksi',
        level: 'Submikroskopis',
        description:
          'Menghubungkan jumlah partikel (mol) per satuan volume larutan (Molaritas = mol/L) dengan berkurangnya partikel reaktan seiring waktu.',
        keyTakeaway: 'Laju reaksi dinyatakan sebagai perubahan konsentrasi molar (mol/L) per satuan detik.',
      },
      {
        id: '1.3',
        number: '1.3',
        title: 'Ruang Rumus & Laju Rata-Rata',
        level: 'Simbolik',
        description:
          'Menerapkan perumusan matematika laju reaksi: tanda negatif untuk berkurangnya pereaksi dan positif untuk bertambahnya produk.',
        keyTakeaway: 'Laju rata-rata dihitung dari r = -Δ[Reaktan]/Δt atau +Δ[Produk]/Δt.',
      },
    ],
  },
  {
    id: 2,
    code: 'Bab 2',
    title: 'Teori Tumbukan dan Energi Aktivasi',
    description:
      'Menyelidiki orientasi tumbukan partikel, tumbukan efektif, dan ambang energi aktivasi (Ea) yang menentukan terjadinya reaksi.',
    isAvailable: false,
    statusBadge: 'Belum Tersedia',
    upcomingNote: 'Akan hadir di tahap pengembangan modul berikutnya: simulator tumbukan partikel dan diagram energi reaksi.',
  },
  {
    id: 3,
    code: 'Bab 3',
    title: 'Faktor-Faktor yang Memengaruhi Laju Reaksi',
    description:
      'Investigasi pengaruh konsentrasi, luas permukaan bidang sentuh, temperatur suhu, dan katalis melalui Lab Virtual terkontrol.',
    isAvailable: false,
    statusBadge: 'Belum Tersedia (Bab 3)',
    upcomingNote: 'Disiapkan untuk Bab 3 bersama kuis konsep dan fitur penyimpanan progres lokal (local-first).',
  },
  {
    id: 4,
    code: 'Bab 4',
    title: 'Data, Grafik, dan Pengantar Orde Reaksi',
    description:
      'Membaca tabel eksperimen, memplot kurva konsentrasi vs waktu, serta menentukan laju awal dan hukum laju reaksi.',
    isAvailable: false,
    statusBadge: 'Belum Tersedia (Bab 4)',
    upcomingNote: 'Disiapkan untuk Bab 4 bersama latihan analisis kuantitatif dan integrasi database hasil belajar.',
  },
  {
    id: 5,
    code: 'Bab 5',
    title: 'Proyek Investigasi STEM: Sensor Kekeruhan',
    description:
      'Panduan rancangan pengukuran kekeruhan larutan dengan sensor LDR dan mikrokontroler Arduino secara aman dan terukur.',
    isAvailable: false,
    statusBadge: 'Belum Tersedia (Bab 5)',
    upcomingNote: 'Disiapkan untuk Bab 5 bersama panel analisis hasil investigasi bagi guru.',
  },
  {
    id: 6,
    code: 'Bab 6',
    title: 'Evaluasi Akhir & Ringkasan Capaian',
    description:
      'Uji pemahaman komprehensif seluruh materi laju reaksi dengan diagnostik miskonsepsi dan rekomendasi materi penguatan.',
    isAvailable: false,
    statusBadge: 'Belum Tersedia',
    upcomingNote: 'Tahap evaluasi menyeluruh setelah seluruh materi inti diselesaikan.',
  },
];
