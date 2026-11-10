/**
 * components/Footer.tsx
 * Bagian penutup (Footer) ReaksiLab XI.
 * Redesain minimalis, elegan, dan profesional bernuansa laboratorium kimia digital.
 */
import React from 'react';
import type { ViewMode } from '../types';

interface FooterProps {
  onNavigate?: (view: ViewMode) => void;
}

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="modern-lab-footer" role="contentinfo">
      <div className="footer-inner-container">
        {/* Top Grid: Info & Navigasi */}
        <div className="footer-main-grid">
          {/* Kolom 1: Brand & Deskripsi */}
          <div className="footer-brand-col">
            <div className="footer-brand-title">
              <span className="footer-flask-icon" aria-hidden="true">⚗️</span>
              <span className="footer-name">ReaksiLab<span className="footer-badge-xi">XI</span></span>
            </div>
            <p className="footer-tagline">
              Laboratorium Digital Pembelajaran Kimia Kelas XI SMA/MA.
            </p>
            <p className="footer-subtext">
              Media pembelajaran sains interaktif yang menghubungkan pengamatan makroskopis,
              perilaku partikel submikroskopis, dan representasi simbolik laju reaksi.
            </p>
          </div>

          {/* Kolom 2: Informasi Materi Kimia */}
          <div className="footer-info-col">
            <h4 className="footer-heading">Materi Pembelajaran</h4>
            <ul className="footer-list">
              <li>Materi: <strong>Laju Reaksi Kimia SMA</strong></li>
              <li>Sasaran: <strong>Siswa SMA/MA Kelas XI</strong></li>
              <li>Pendekatan: <strong>Inkuiri &amp; Proyek STEM</strong></li>
              <li>Status: <strong>Media Terbuka Tanpa Komersialisasi</strong></li>
            </ul>
          </div>

          {/* Kolom 3: Tautan Cepat Modul */}
          <div className="footer-links-col">
            <h4 className="footer-heading">Peta Pembelajaran</h4>
            <div className="footer-chapter-chips">
              <button type="button" onClick={() => onNavigate?.('roadmap')} className="foot-ch-link foot-ch-roadmap">🗺️ Peta 6 Modul</button>
              <button type="button" onClick={() => onNavigate?.('bab1')} className="foot-ch-link">Bab 1: Konsep Laju</button>
              <button type="button" onClick={() => onNavigate?.('bab2')} className="foot-ch-link">Bab 2: Tumbukan &amp; Ea</button>
              <button type="button" onClick={() => onNavigate?.('bab3')} className="foot-ch-link">Bab 3: Faktor Laju</button>
              <button type="button" onClick={() => onNavigate?.('bab4')} className="foot-ch-link">Bab 4: Data &amp; Orde</button>
              <button type="button" onClick={() => onNavigate?.('bab5')} className="foot-ch-link">Bab 5: Proyek STEM</button>
              <button type="button" onClick={() => onNavigate?.('bab6')} className="foot-ch-link">Bab 6: Evaluasi</button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Privasi */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            © {CURRENT_YEAR} ReaksiLab XI. Hak Cipta Dilindungi. Media Pembelajaran Kimia Terbuka.
          </p>

          <div className="footer-badges-pill">
            <span className="privacy-pill-item">🔒 Tanpa Pengumpulan Data Siswa</span>
            <span className="pill-dot" aria-hidden="true">•</span>
            <span className="privacy-pill-item">🌱 100% Bebas Biaya</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
