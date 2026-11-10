/**
 * components/ThreeLevelsSection.tsx
 * Bagian Tiga Tingkat Representasi Kimia (Makroskopis, Submikroskopis, Simbolik).
 * Dirancang sebagai 3 kartu horizontal modern dengan visual ilustrasi khas,
 * warna aksen harmonis, dan efek interaktif yang seimbang.
 */
import React from 'react';

export const ThreeLevelsSection: React.FC = () => {
  return (
    <section className="three-levels-section" aria-labelledby="three-levels-title">
      <div className="section-head-center">
        <span className="section-eyebrow">PENDEKATAN PEMBELAJARAN KIMIA</span>
        <h2 id="three-levels-title" className="section-title-modern">
          Tiga Tingkat Representasi Kimia
        </h2>
        <p className="section-subtitle-modern">
          ReaksiLab XI mengintegrasikan tiga tingkatan pemahaman sains agar siswa tidak sekadar menghafal,
          melainkan benar-benar memahami mekanisme laju reaksi secara utuh.
        </p>
      </div>

      <div className="levels-cards-grid">
        {/* ================= KARTU 1: MAKROSKOPIS ================= */}
        <article className="level-card-modern level-macro">
          <div className="card-top-indicator">
            <span className="level-tag tag-macro">TINGKAT 1 • MAKROSKOPIS</span>
            <div className="card-glyph-icon" aria-hidden="true">🔬</div>
          </div>

          {/* Ilustrasi Visual Khusus Kartu 1: Eksperimen Reaksi Nyata */}
          <div className="card-visual-slot" aria-hidden="true">
            <svg viewBox="0 0 160 100" fill="none" className="card-mini-svg">
              <ellipse cx="80" cy="88" rx="60" ry="8" fill="#E0F2FE" />
              {/* Labu Beaker dengan cairan bergelembung */}
              <rect x="50" y="30" width="60" height="55" rx="5" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2.5" />
              <path d="M 48 30 L 112 30" stroke="#0369A1" strokeWidth="3" strokeLinecap="round" />
              <path d="M 52 50 L 108 50 L 108 82 Q 108 84 106 84 L 54 84 Q 52 84 52 82 Z" fill="#06B6D4" opacity="0.35" />
              {/* Skala Ukur */}
              <line x1="56" y1="58" x2="66" y2="58" stroke="#0284C7" strokeWidth="1.5" />
              <line x1="56" y1="68" x2="63" y2="68" stroke="#0284C7" strokeWidth="1.5" />
              {/* Gelembung Gas Naik */}
              <circle cx="75" cy="70" r="3" fill="#0284C7" opacity="0.7" />
              <circle cx="88" cy="62" r="4.5" fill="#06B6D4" opacity="0.9" />
              <circle cx="82" cy="45" r="3.5" fill="#0284C7" opacity="0.8" />
              <circle cx="94" cy="38" r="2.5" fill="#0EA5E9" opacity="0.8" />
            </svg>
          </div>

          <h3 className="card-level-title">Pengamatan Nyata</h3>
          <p className="card-level-desc">
            Amati perubahan kimia yang dapat dilihat secara langsung, seperti perubahan warna,
            pembentukan gas, endapan, dan perubahan massa.
          </p>

          <div className="card-footer-pill">
            <span className="dot-pill dot-cyan"></span>
            <span>Contoh: Gelembung CO₂ effervescent &amp; perkaratan</span>
          </div>
        </article>

        {/* ================= KARTU 2: SUBMIKROSKOPIS ================= */}
        <article className="level-card-modern level-submicro">
          <div className="card-top-indicator">
            <span className="level-tag tag-submicro">TINGKAT 2 • SUBMIKROSKOPIS</span>
            <div className="card-glyph-icon" aria-hidden="true">⚛️</div>
          </div>

          {/* Ilustrasi Visual Khusus Kartu 2: Tumbukan Molekul */}
          <div className="card-visual-slot" aria-hidden="true">
            <svg viewBox="0 0 160 100" fill="none" className="card-mini-svg">
              <ellipse cx="80" cy="88" rx="60" ry="8" fill="#DBEAFE" />
              {/* Partikel Reaktan 1 (Royal Blue) */}
              <circle cx="48" cy="50" r="16" fill="#2563EB" opacity="0.9" />
              <text x="48" y="55" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">A</text>
              <line x1="24" y1="50" x2="32" y2="50" stroke="#1D4ED8" strokeWidth="2.5" strokeLinecap="round" />

              {/* Sparkle Tumbukan Efektif */}
              <path d="M 80 40 L 83 47 L 90 50 L 83 53 L 80 60 L 77 53 L 70 50 L 77 47 Z" fill="#F59E0B" />

              {/* Partikel Reaktan 2 (Navy) */}
              <circle cx="112" cy="50" r="16" fill="#173B78" opacity="0.9" />
              <text x="112" y="55" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">B</text>
              <line x1="136" y1="50" x2="128" y2="50" stroke="#1E40AF" strokeWidth="2.5" strokeLinecap="round" />

              {/* Garis orbit partikel */}
              <path d="M 40 25 Q 80 15 120 25" stroke="#93C5FD" strokeDasharray="3 3" strokeWidth="1.5" />
            </svg>
          </div>

          <h3 className="card-level-title">Dunia Partikel</h3>
          <p className="card-level-desc">
            Pelajari bagaimana partikel reaktan bergerak, bertumbukan, dan menghasilkan tumbukan efektif
            yang menentukan laju reaksi.
          </p>

          <div className="card-footer-pill">
            <span className="dot-pill dot-blue"></span>
            <span>Konsep: Orientasi tepat &amp; energi aktivasi (Ea)</span>
          </div>
        </article>

        {/* ================= KARTU 3: SIMBOLIK ================= */}
        <article className="level-card-modern level-symbolic">
          <div className="card-top-indicator">
            <span className="level-tag tag-symbolic">TINGKAT 3 • SIMBOLIK</span>
            <div className="card-glyph-icon" aria-hidden="true">📊</div>
          </div>

          {/* Ilustrasi Visual Khusus Kartu 3: Grafik Kurva Laju & Rumus */}
          <div className="card-visual-slot" aria-hidden="true">
            <svg viewBox="0 0 160 100" fill="none" className="card-mini-svg">
              <ellipse cx="80" cy="88" rx="60" ry="8" fill="#EDE9FE" />
              {/* Sumbu Grafik */}
              <line x1="28" y1="20" x2="28" y2="80" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
              <line x1="28" y1="80" x2="140" y2="80" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />

              {/* Kurva Penurunan Reaktan (Merah/Oranye) */}
              <path d="M 32 30 Q 60 70 135 78" stroke="#EF4444" strokeWidth="2.5" fill="none" />
              {/* Kurva Pembentukan Produk (Biru/Ungu) */}
              <path d="M 32 78 Q 65 35 135 28" stroke="#8B5CF6" strokeWidth="2.5" fill="none" />

              {/* Rumus Mini Tag */}
              <rect x="75" y="42" width="60" height="20" rx="4" fill="#FFFFFF" stroke="#C4B5FD" strokeWidth="1.2" />
              <text x="105" y="56" fill="#6D28D9" fontSize="10" fontWeight="bold" textAnchor="middle">v = k[A]ᵐ[B]ⁿ</text>
            </svg>
          </div>

          <h3 className="card-level-title">Rumus dan Grafik</h3>
          <p className="card-level-desc">
            Hubungkan fenomena kimia dengan persamaan laju reaksi, perhitungan matematis,
            dan grafik konsentrasi terhadap waktu.
          </p>

          <div className="card-footer-pill">
            <span className="dot-pill dot-purple"></span>
            <span>Formula: v = -Δ[R]/Δt &amp; orde reaksi 0, 1, 2</span>
          </div>
        </article>
      </div>
    </section>
  );
};

