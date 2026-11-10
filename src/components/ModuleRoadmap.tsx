/**
 * components/ModuleRoadmap.tsx
 * Halaman / Bagian Peta 6 Modul Laju Reaksi (ReaksiLab XI).
 *
 * Konsep: "Interactive Chemistry Learning Roadmap"
 * - Header halaman dengan label "YOUR CHEMISTRY LEARNING JOURNEY" & ilustrasi kimia SVG
 * - Judul Utama: "Peta Perjalanan Belajar Laju Reaksi"
 * - Subjudul lengkap sesuai PRD
 * - 4 Kartu Statistik / Ringkasan Pembelajaran
 * - Visual Learning Roadmap (Phase Track: Tahap 1, 2, 3)
 * - Grid 6 Kartu Modul Pembelajaran (3 Kolom Desktop / 2 Kolom Tablet / 1 Kolom Mobile)
 * - Bagian Penutup Ajakan Belajar ("Mulai Perjalanan Belajarmu!" -> "Mulai dari Bab 1")
 */
import React from 'react';
import type { ViewMode } from '../types';
import { MODULES_DATA } from '../data/modulesData';
import { ModuleCard } from './ModuleCard';

interface ModuleRoadmapProps {
  onOpenModule: (viewKey: ViewMode) => void;
  isFullPage?: boolean;
}

export const ModuleRoadmap: React.FC<ModuleRoadmapProps> = ({ onOpenModule, isFullPage = false }) => {
  return (
    <section
      id="peta-modul"
      className={`roadmap-page-container ${isFullPage ? 'roadmap-fullpage-mode' : ''}`}
      aria-labelledby="roadmap-page-title"
    >
      {/* ================= 1. HEADER & JUDUL ROADMAP ================= */}
      <header className="roadmap-hero-header">
        <div className="roadmap-header-glow" aria-hidden="true" />

        {/* Label & Dekorasi Kimia */}
        <div className="roadmap-eyebrow-pill">
          <svg viewBox="0 0 20 20" fill="currentColor" className="pill-flask-icon" aria-hidden="true">
            <path d="M10 2a1 1 0 00-1 1v2.586l-4.707 7.06A3 3 0 006.8 17h6.4a3 3 0 002.507-4.354L11 5.586V3a1 1 0 00-1-1z" />
          </svg>
          <span className="eyebrow-text">YOUR CHEMISTRY LEARNING JOURNEY</span>
        </div>

        {/* Judul Utama & Subjudul */}
        <h1 id="roadmap-page-title" className="roadmap-main-heading">
          Peta Perjalanan Belajar Laju Reaksi
        </h1>

        <p className="roadmap-main-subheading">
          Jelajahi enam tahapan pembelajaran untuk memahami konsep, mengamati fenomena,
          melakukan eksperimen virtual, menganalisis data, hingga menerapkan ilmu kimia melalui proyek STEM.
        </p>

        {/* Elemen Dekoratif Partikel Reaksi */}
        <div className="roadmap-deco-particles" aria-hidden="true">
          <span className="deco-dot dot-1" />
          <span className="deco-dot dot-2" />
          <span className="deco-dot dot-3" />
        </div>
      </header>

      {/* ================= 2. INFORMASI RINGKAS PEMBELAJARAN (4 KARTU STATISTIK) ================= */}
      <div className="roadmap-stats-grid" role="region" aria-label="Ringkasan Pembelajaran">
        {/* Kartu 1: Jumlah Modul */}
        <div className="stat-card">
          <div className="stat-icon-box stat-blue" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-number">6 Modul</div>
            <div className="stat-label">Tahapan Kurikulum Terstruktur</div>
          </div>
        </div>

        {/* Kartu 2: Materi Utama */}
        <div className="stat-card">
          <div className="stat-icon-box stat-cyan" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 2v7.31L4.69 17.5A3 3 0 0 0 7.23 22h9.54a3 3 0 0 0 2.54-4.5L14 9.31V2"/>
              <line x1="8.5" y1="2" x2="15.5" y2="2"/>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-number">1 Materi Inti</div>
            <div className="stat-label">Laju Reaksi Kimia Kelas XI</div>
          </div>
        </div>

        {/* Kartu 3: Eksperimen Virtual */}
        <div className="stat-card">
          <div className="stat-icon-box stat-orange" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polygon points="10 8 16 12 10 16 10 8"/>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-number">Lab Virtual</div>
            <div className="stat-label">Eksperimen &amp; Simulasi Partikel</div>
          </div>
        </div>

        {/* Kartu 4: Evaluasi Pembelajaran */}
        <div className="stat-card">
          <div className="stat-icon-box stat-purple" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11l3 3L22 4"/>
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-number">Evaluasi</div>
            <div className="stat-label">Asesmen &amp; Refleksi Formatif</div>
          </div>
        </div>
      </div>

      {/* ================= 3. VISUAL LEARNING ROADMAP (PHASE TRACKER) ================= */}
      <div className="roadmap-phase-tracker" role="region" aria-label="Alur Tahapan Belajar">
        <div className="phase-tracker-title">
          <span className="track-pin" aria-hidden="true">🗺️</span>
          <span>Alur Perjalanan Pembelajaran Bertahap</span>
        </div>

        <div className="phase-track-steps">
          {/* Phase 1 */}
          <div className="track-step-node">
            <div className="step-circle step-1">01</div>
            <div className="step-text-meta">
              <span className="step-tag">Tahap I: Fondasi</span>
              <span className="step-name">Konsep &amp; Teori Partikel</span>
              <span className="step-range">(Bab 1 – Bab 2)</span>
            </div>
          </div>

          <div className="track-connector-line" aria-hidden="true">
            <span className="line-pulse"></span>
          </div>

          {/* Phase 2 */}
          <div className="track-step-node">
            <div className="step-circle step-2">02</div>
            <div className="step-text-meta">
              <span className="step-tag">Tahap II: Investigasi</span>
              <span className="step-name">Lab Virtual &amp; Hukum Laju</span>
              <span className="step-range">(Bab 3 – Bab 4)</span>
            </div>
          </div>

          <div className="track-connector-line" aria-hidden="true">
            <span className="line-pulse"></span>
          </div>

          {/* Phase 3 */}
          <div className="track-step-node">
            <div className="step-circle step-3">03</div>
            <div className="step-text-meta">
              <span className="step-tag">Tahap III: Penerapan</span>
              <span className="step-name">Proyek STEM &amp; Asesmen</span>
              <span className="step-range">(Bab 5 – Bab 6)</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 4. GRID ENAM KARTU MODUL ================= */}
      <div className="roadmap-grid-wrapper">
        <div className="modern-modules-grid">
          {MODULES_DATA.map((moduleItem, index) => (
            <ModuleCard
              key={moduleItem.id}
              module={moduleItem}
              index={index}
              onOpenModule={onOpenModule}
            />
          ))}
        </div>
      </div>

      {/* ================= 5. SECTION AJAKAN BELAJAR (ROADMAP CLOSING CTA) ================= */}
      <div className="roadmap-closing-banner">
        <div className="closing-banner-inner">
          <div className="closing-content">
            <div className="closing-badge">
              <span className="badge-sparkle" aria-hidden="true">✨</span>
              LANGKAH PERTAMA PEMBELAJARAN
            </div>
            <h2 className="closing-title">Mulai Perjalanan Belajarmu!</h2>
            <p className="closing-desc">
              Bangun pemahaman tentang laju reaksi secara bertahap melalui teori, eksperimen, simulasi, dan evaluasi.
            </p>
          </div>

          <div className="closing-action">
            <button
              type="button"
              className="btn-start-ch1"
              onClick={() => onOpenModule('bab1')}
              aria-label="Mulai dari Bab 1: Mengenal Laju Reaksi"
            >
              <span>Mulai dari Bab 1</span>
              <span className="btn-arrow-big" aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
