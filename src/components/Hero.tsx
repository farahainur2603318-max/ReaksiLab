/**
 * components/Hero.tsx
 * Bagian Hero (Utama) Beranda ReaksiLab XI.
 * Desain modern 2-kolom:
 * - Kolom Kiri: Judul, deskripsi, tombol aksi, dan indikator kurikulum.
 * - Kolom Kanan: Ilustrasi laboratorium kimia digital interaktif & beranimasi (SVG).
 */
import React from 'react';

interface HeroProps {
  onStartLearning: () => void;
  onViewRoadmap: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartLearning, onViewRoadmap }) => {
  return (
    <section className="modern-hero-section" aria-labelledby="hero-main-title">
      <div className="hero-grid-two-col">
        {/* ================= KOLOM KIRI ================= */}
        <div className="hero-text-column">
          {/* Label Kecil Kurikulum */}
          <div className="hero-curriculum-pill">
            <span className="pill-dot-pulse" aria-hidden="true"></span>
            <span className="pill-text">DIGITAL CHEMISTRY LEARNING – GRADE XI</span>
          </div>

          {/* Heading Utama */}
          <h1 id="hero-main-title" className="hero-headline">
            Jelajahi Dunia <span className="text-gradient-cyan">Laju Reaksi</span>
          </h1>

          {/* Subheading Penjelasan */}
          <p className="hero-subheading">
            Pahami bagaimana dan mengapa reaksi kimia berlangsung dengan kecepatan berbeda
            melalui eksperimen virtual, simulasi partikel, analisis grafik, dan proyek STEM.
          </p>

          {/* Tombol Aksi Utama */}
          <div className="hero-cta-buttons">
            <button
              type="button"
              className="btn-hero-primary"
              onClick={onStartLearning}
              aria-label="Mulai Belajar Bab 1"
            >
              <span className="btn-icon-flask" aria-hidden="true">🧪</span>
              <span>Mulai Belajar</span>
              <span className="btn-arrow" aria-hidden="true">→</span>
            </button>

            <button
              type="button"
              className="btn-hero-secondary"
              onClick={onViewRoadmap}
              aria-label="Jelajahi 6 Modul Pembelajaran"
            >
              <span>Jelajahi 6 Modul</span>
              <span className="btn-arrow" aria-hidden="true">↓</span>
            </button>
          </div>

          {/* Feature Highlights */}
          <div className="hero-feature-chips">
            <div className="feature-chip">
              <span className="chip-icon" aria-hidden="true">🎓</span>
              <span>Siswa Kelas XI SMA</span>
            </div>
            <div className="feature-chip">
              <span className="chip-icon" aria-hidden="true">🔬</span>
              <span>Lab Virtual Terkontrol</span>
            </div>
            <div className="feature-chip">
              <span className="chip-icon" aria-hidden="true">🛡️</span>
              <span>100% Bebas Biaya &amp; Tanpa Login</span>
            </div>
          </div>
        </div>

        {/* ================= KOLOM KANAN: ILUSTRASI LAB DIGITAL ================= */}
        <div className="hero-visual-column" aria-label="Ilustrasi Laboratorium Kimia Digital">
          <div className="lab-visual-card">
            {/* Background Glow */}
            <div className="visual-glow-halo" aria-hidden="true"></div>

            {/* Floating Formula Badge 1: Rate Formula */}
            <div className="floating-badge badge-rate" aria-hidden="true">
              <span className="badge-math-icon">⚡</span>
              <div className="badge-math-text">
                <span className="badge-label">Persamaan Laju</span>
                <code>v = -Δ[R]/Δt</code>
              </div>
            </div>

            {/* Floating Formula Badge 2: Collision & Ea */}
            <div className="floating-badge badge-collision" aria-hidden="true">
              <span className="badge-math-icon">⚛️</span>
              <div className="badge-math-text">
                <span className="badge-label">Ambang Energi</span>
                <code>E ≥ Ea (Efektif)</code>
              </div>
            </div>

            {/* Main Interactive SVG Chemistry Laboratory Illustration */}
            <svg
              className="digital-lab-svg"
              viewBox="0 0 520 440"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Ilustrasi tabung Erlenmeyer kimia bereaksi dan partikel tumbukan"
            >
              <defs>
                {/* Gradien Cairan Reaksi Cyan - Royal Blue */}
                <linearGradient id="liquidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06B6D4" />
                  <stop offset="60%" stopColor="#2563EB" />
                  <stop offset="100%" stopColor="#173B78" />
                </linearGradient>

                {/* Gradien Kaca Lab */}
                <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.85)" />
                  <stop offset="40%" stopColor="rgba(255,255,255,0.25)" />
                  <stop offset="100%" stopColor="rgba(6,182,212,0.4)" />
                </linearGradient>

                {/* Gradien Glow Reaksi */}
                <radialGradient id="reactionGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
                  <stop offset="60%" stopColor="#2563EB" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#173B78" stopOpacity="0" />
                </radialGradient>

                {/* Filter Efek Glow Halus */}
                <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Meja Laboratorium Reflektif */}
              <ellipse cx="260" cy="400" rx="210" ry="22" fill="#E2E8F0" opacity="0.6" />
              <ellipse cx="260" cy="398" rx="180" ry="14" fill="#CBD5E1" opacity="0.4" />

              {/* ================= BEAKER KECIL KIRI (0.5M Reaktan) ================= */}
              <g className="lab-beaker-left">
                {/* Siluet Gelas */}
                <rect x="70" y="270" width="80" height="110" rx="6" fill="rgba(255,255,255,0.7)" stroke="#94A3B8" strokeWidth="2.5" />
                <path d="M 68 270 L 152 270" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
                {/* Cairan Kuning/Cyan */}
                <path d="M 72 315 L 148 315 L 148 376 Q 148 378 146 378 L 74 378 Q 72 378 72 376 Z" fill="#06B6D4" opacity="0.45" />
                {/* Garis Ukur */}
                <line x1="75" y1="330" x2="90" y2="330" stroke="#64748B" strokeWidth="1.5" />
                <line x1="75" y1="345" x2="85" y2="345" stroke="#64748B" strokeWidth="1.5" />
                <line x1="75" y1="360" x2="90" y2="360" stroke="#64748B" strokeWidth="1.5" />
                {/* Gelembung kecil */}
                <circle cx="110" cy="350" r="3" fill="#FFFFFF" opacity="0.8" className="bubble-anim-fast" />
                <circle cx="95" cy="335" r="2" fill="#FFFFFF" opacity="0.7" className="bubble-anim-slow" />
                <text x="110" y="300" textAnchor="middle" fill="#0E7490" fontSize="10" fontWeight="bold">Reaktan A</text>
              </g>

              {/* ================= TABUNG ERLENMEYER UTAMA (TENGAH) ================= */}
              <g className="lab-erlenmeyer-main">
                {/* Glow di dasar labu */}
                <circle cx="260" cy="330" r="80" fill="url(#reactionGlow)" filter="url(#glowFilter)" />

                {/* Cairan Reaksi Aktif */}
                <path
                  d="M 188 340 
                     C 220 348, 250 334, 280 342 
                     C 310 348, 325 340, 332 344 
                     L 358 376 
                     Q 364 384 354 384 
                     L 166 384 
                     Q 156 384 162 376 Z"
                  fill="url(#liquidGrad)"
                  opacity="0.9"
                />

                {/* Dinding Kaca Erlenmeyer */}
                <path
                  d="M 235 150 
                     L 235 220 
                     L 160 374 
                     Q 154 386 168 386 
                     L 352 386 
                     Q 366 386 360 374 
                     L 285 220 
                     L 285 150 Z"
                  fill="url(#glassGrad)"
                  stroke="#173B78"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                />

                {/* Leher & Bibir Labu */}
                <ellipse cx="260" cy="150" rx="25" ry="6" fill="#FFFFFF" stroke="#173B78" strokeWidth="3" />

                {/* Pantulan Cahaya Kaca Kiri */}
                <path
                  d="M 242 165 L 242 220 L 175 365"
                  stroke="#FFFFFF"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.6"
                />

                {/* Gelembung Reaksi Naik (CO₂ / Gas Produk) */}
                <circle cx="240" cy="360" r="4.5" fill="#FFFFFF" opacity="0.9" className="bubble-up bubble-1" />
                <circle cx="270" cy="350" r="6" fill="#A5F3FC" opacity="0.85" className="bubble-up bubble-2" />
                <circle cx="255" cy="320" r="5" fill="#FFFFFF" opacity="0.95" className="bubble-up bubble-3" />
                <circle cx="280" cy="290" r="3.5" fill="#A5F3FC" opacity="0.8" className="bubble-up bubble-4" />
                <circle cx="250" cy="250" r="4" fill="#FFFFFF" opacity="0.9" className="bubble-up bubble-5" />
                <circle cx="262" cy="180" r="3" fill="#67E8F9" opacity="0.9" className="bubble-up bubble-6" />

                {/* Uap Gas Keluar dari Mulut Labu */}
                <path
                  d="M 252 140 Q 245 110 258 90 T 250 60"
                  stroke="#06B6D4"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.75"
                  className="vapor-trace"
                />
                <path
                  d="M 268 140 Q 275 115 264 95 T 272 65"
                  stroke="#38BDF8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.6"
                  className="vapor-trace-delay"
                />
              </g>

              {/* ================= TABUNG REAKSI KANAN DENGAN RAK ================= */}
              <g className="lab-tube-right">
                {/* Tabung Reaksi 1 */}
                <rect x="390" y="230" width="22" height="130" rx="11" fill="rgba(255,255,255,0.7)" stroke="#64748B" strokeWidth="2.2" />
                <path d="M 392 280 L 410 280 L 410 350 A 9 9 0 0 1 392 350 Z" fill="#8B5CF6" opacity="0.6" />
                <ellipse cx="401" cy="230" rx="11" ry="3.5" fill="#FFFFFF" stroke="#64748B" strokeWidth="2" />

                {/* Tabung Reaksi 2 */}
                <rect x="424" y="245" width="22" height="115" rx="11" fill="rgba(255,255,255,0.7)" stroke="#64748B" strokeWidth="2.2" />
                <path d="M 426 295 L 444 295 L 444 350 A 9 9 0 0 1 426 350 Z" fill="#10B981" opacity="0.6" />
                <ellipse cx="435" cy="245" rx="11" ry="3.5" fill="#FFFFFF" stroke="#64748B" strokeWidth="2" />

                {/* Kaki Rak Tabung */}
                <rect x="375" y="335" width="85" height="8" rx="2" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1.5" />
                <rect x="382" y="343" width="6" height="35" fill="#94A3B8" />
                <rect x="445" y="343" width="6" height="35" fill="#94A3B8" />
              </g>

              {/* ================= SIMULASI TUMBUKAN PARTIKEL DI UDARA (ATAS KIRI) ================= */}
              <g className="particle-collision-zone" transform="translate(60, 40)">
                {/* Lingkaran Zona Partikel */}
                <rect x="0" y="0" width="165" height="110" rx="12" fill="#FFFFFF" opacity="0.92" stroke="#BAE6FD" strokeWidth="1.5" />
                <text x="12" y="22" fill="#0284C7" fontSize="10" fontWeight="bold" letterSpacing="0.05em">
                  SIMULASI TUMBUKAN PARTIKEL
                </text>

                {/* Partikel Reaktan A (Biru Navy) */}
                <circle cx="45" cy="65" r="14" fill="#173B78" className="particle-a-pulse">
                  <animate attributeName="cx" values="42; 68; 42" dur="2.4s" repeatCount="indefinite" />
                </circle>
                <text x="45" y="69" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">
                  A
                  <animate attributeName="x" values="42; 68; 42" dur="2.4s" repeatCount="indefinite" />
                </text>

                {/* Vektor Gerak A */}
                <line x1="25" y1="65" x2="35" y2="65" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />

                {/* Titik Kilau Tumbukan Efektif (Flash Sparkle) */}
                <path
                  d="M 80 55 L 83 62 L 90 65 L 83 68 L 80 75 L 77 68 L 70 65 L 77 62 Z"
                  fill="#F59E0B"
                  className="collision-spark"
                >
                  <animate attributeName="opacity" values="0.2; 1; 0.2" dur="1.2s" repeatCount="indefinite" />
                  <animate attributeName="transform" type="scale" values="0.8; 1.25; 0.8" dur="1.2s" repeatCount="indefinite" />
                </path>

                {/* Partikel Reaktan B (Cyan) */}
                <circle cx="115" cy="65" r="14" fill="#06B6D4" className="particle-b-pulse">
                  <animate attributeName="cx" values="118; 92; 118" dur="2.4s" repeatCount="indefinite" />
                </circle>
                <text x="115" y="69" textAnchor="middle" fill="#173B78" fontSize="11" fontWeight="bold">
                  B
                  <animate attributeName="x" values="118; 92; 118" dur="2.4s" repeatCount="indefinite" />
                </text>

                {/* Label Status Tumbukan */}
                <text x="82" y="98" textAnchor="middle" fill="#15803D" fontSize="10" fontWeight="bold">
                  ✓ Tumbukan Efektif (E ≥ Ea)
                </text>
              </g>

              {/* Partikel Ion Mengambang Kecil */}
              <circle cx="210" cy="80" r="5" fill="#06B6D4" opacity="0.6" className="floating-ion-1" />
              <circle cx="340" cy="110" r="4" fill="#2563EB" opacity="0.5" className="floating-ion-2" />
              <circle cx="380" cy="170" r="6" fill="#8B5CF6" opacity="0.4" className="floating-ion-3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};
