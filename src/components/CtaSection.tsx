/**
 * components/CtaSection.tsx
 * Section Ajakan Belajar (CTA - Call To Action) sebelum Footer.
 * Mengajak siswa memulai eksplorasi laju reaksi dengan visual molekuler dan tombol aksi utama.
 */
import React from 'react';

interface CtaSectionProps {
  onStartExploration: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onStartExploration }) => {
  return (
    <section className="cta-journey-section" aria-labelledby="cta-heading">
      <div className="cta-card-wrapper">
        {/* Latar Grafis Partikel Molekul Halus SVG */}
        <div className="cta-molecular-bg" aria-hidden="true">
          <svg viewBox="0 0 800 300" fill="none" className="cta-svg-bg">
            <circle cx="100" cy="80" r="40" fill="#06B6D4" opacity="0.15" />
            <circle cx="700" cy="220" r="60" fill="#2563EB" opacity="0.2" />
            <circle cx="650" cy="60" r="25" fill="#38BDF8" opacity="0.18" />
            <circle cx="180" cy="230" r="30" fill="#06B6D4" opacity="0.12" />
            <line x1="100" y1="80" x2="180" y2="230" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="4 4" opacity="0.2" />
            <line x1="650" y1="60" x2="700" y2="220" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="4 4" opacity="0.2" />
          </svg>
        </div>

        <div className="cta-content-center">
          <div className="cta-sparkle-badge" aria-hidden="true">
            <span>✨</span> LABORATORIUM KIMIA DIGITAL KELAS XI
          </div>

          <h2 id="cta-heading" className="cta-title">
            Siap Menjadi Penjelajah Dunia Kimia?
          </h2>

          <p className="cta-description">
            Mulai perjalanan belajarmu dan temukan bagaimana konsentrasi, suhu, luas permukaan,
            serta katalis memengaruhi kecepatan suatu reaksi kimia.
          </p>

          <div className="cta-action-wrap">
            <button
              type="button"
              className="btn-cta-launch"
              onClick={onStartExploration}
              aria-label="Mulai Eksplorasi Sekarang di Bab 1"
            >
              <span className="btn-icon-atom" aria-hidden="true">⚛️</span>
              <span>Mulai Eksplorasi Sekarang</span>
              <span className="btn-arrow" aria-hidden="true">→</span>
            </button>
          </div>

          {/* Quick Perks / Trust */}
          <div className="cta-quick-perks">
            <span>✓ Tanpa Registrasi Akun</span>
            <span className="perk-separator">•</span>
            <span>✓ Gratis untuk Seluruh Sekolah</span>
            <span className="perk-separator">•</span>
            <span>✓ Langsung Mulai dari Perangkat Anda</span>
          </div>
        </div>
      </div>
    </section>
  );
};

