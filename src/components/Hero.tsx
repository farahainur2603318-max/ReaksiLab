import React from 'react';

interface HeroProps {
  onStartLearning: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartLearning }) => {
  return (
    <section className="hero-section" aria-labelledby="hero-heading">
      <div className="hero-badge">
        <span className="badge-dot"></span>
        <span>Pembelajaran Kimia Berbasis Inkuiri • SMA Kelas XI</span>
      </div>

      <h1 id="hero-heading" className="hero-title">
        ReaksiLab XI
        <span className="hero-title-sub">Jelajahi, Uji, dan Pahami Laju Reaksi</span>
      </h1>

      <p className="hero-description">
        Platform interaktif berbasis web untuk memahami seberapa cepat reaksi kimia berlangsung.
        Pelajari hubungan antara pengamatan makroskopis di laboratorium, pergerakan partikel pada
        tingkat submikroskopis, serta perhitungan matematis dan grafik secara terpadu.
      </p>

      {/* Sasaran Pengguna sesuai PRD Section 2 */}
      <div className="audience-container">
        <div className="audience-card audience-student">
          <div className="audience-header">
            <span className="audience-icon" aria-hidden="true">
              🎓
            </span>
            <span className="audience-tag">Sasaran Siswa</span>
          </div>
          <h3 className="audience-title">Siswa SMA Kelas XI</h3>
          <p className="audience-desc">
            Membantu memvisualisasikan konsep abstrak tumbukan partikel, energi aktivasi, hubungan
            konsentrasi per satuan waktu, serta melatih perhitungan laju rata-rata langkah demi
            langkah.
          </p>
        </div>

        <div className="audience-card audience-teacher">
          <div className="audience-header">
            <span className="audience-icon" aria-hidden="true">
              🔬
            </span>
            <span className="audience-tag">Sasaran Guru</span>
          </div>
          <h3 className="audience-title">Guru Kimia</h3>
          <p className="audience-desc">
            Media demonstrasi konsep sebelum praktikum nyata, penyedia skenario pembelajaran inkuiri,
            dan lembar diskusi data yang aman diakses melalui perangkat komputer maupun ponsel siswa.
          </p>
        </div>
      </div>

      {/* Tombol Aksi Utama */}
      <div className="hero-actions">
        <button
          type="button"
          className="btn-primary-cta"
          onClick={onStartLearning}
          aria-label="Mulai Belajar Modul 1 Laju Reaksi"
        >
          <span>Mulai Belajar</span>
          <span className="btn-arrow" aria-hidden="true">
            →
          </span>
        </button>
        <span className="hero-privacy-notice">
          🛡️ Bebas Akses Langsung: Tanpa login, tanpa data identitas siswa, dan tanpa layanan berbayar.
        </span>
      </div>
    </section>
  );
};

