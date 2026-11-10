/**
 * types.ts
 * Definisi tipe data untuk aplikasi ReaksiLab XI.
 * Mendukung navigasi terpisah untuk Beranda dan seluruh 6 Bab Pembelajaran.
 */

// Tipe tampilan halaman (Auth/Login Gerbang Awal, Beranda, Peta 6 Modul, Lab Virtual, dan 6 Bab Pembelajaran)
export type ViewMode = 'auth' | 'home' | 'roadmap' | 'virtuallab' | 'bab1' | 'bab2' | 'bab3' | 'bab4' | 'bab5' | 'bab6';

// Tipe profil pengguna (Siswa, Guru, atau Mode Tamu)
export interface UserProfile {
  name: string;
  email: string;
  role: 'siswa' | 'guru' | 'tamu';
  avatar?: string;
  isLoggedIn: boolean;
  loginMethod?: 'google' | 'email' | 'guest';
}

// Tipe data untuk sub-bagian belajar di dalam Modul
export interface LearningSection {
  id: string;
  code: string; // Contoh: '1.1', '2.2', dst.
  title: string;
  subtitle: string;
  category: 'Fenomena' | 'Konsep & Rumus' | 'Analisis Grafik' | 'Eksperimen' | 'Simulasi Partikel' | 'Proyek STEM';
  summary: string;
  keyPoints: string[];
  scientificNote: string;
}

// Tipe data untuk Kartu Modul Pembelajaran
export interface ModuleItem {
  id: number;
  viewKey: ViewMode;
  chapter: string; // 'Bab 1', 'Bab 2', dst.
  chapterNumber: string; // '01', '02', dst.
  title: string;
  subtitle: string;
  description: string;
  isAvailable: boolean; // Seluruh 6 bab berstatus true (open access)
  badgeText: string;
  topicTag: string;
  sectionsCount: number;
  icon: string;
  accentColor?: string;
  phaseLabel?: string; // Tahapan belajar, e.g. 'Tahap 1: Pondasi Konsep'
  activities?: string[]; // Daftar 3-4 aktivitas belajar spesifik
}
