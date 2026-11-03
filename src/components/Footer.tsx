import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <span className="footer-logo">⚗️ ReaksiLab XI</span>
            <p className="footer-tagline">
              Platform Pembelajaran Laju Reaksi Interaktif untuk Siswa & Guru Kimia SMA Kelas XI.
            </p>
          </div>

          <div className="footer-notes">
            <div className="footer-note-item">
              <strong>Prinsip Ilmiah:</strong> Menghubungkan fenomena makroskopis, partikel
              submikroskopis, dan representasi simbolik secara terpadu.
            </div>
            <div className="footer-note-item">
              <strong>Privasi & Keamanan:</strong> Beroperasi tanpa pengumpulan identitas siswa dan
              tanpa layanan berbayar.
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 ReaksiLab XI. Dikembangkan sesuai panduan PRD & Agent Kimia SMA.</p>
          <span className="footer-version">Versi 1.0 (MVP Modul 1 Aktif)</span>
        </div>
      </div>
    </footer>
  );
};

