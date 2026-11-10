/**
 * components/ModuleCard.tsx
 * Komponen Kartu Pembelajaran Modul ReaksiLab XI.
 *
 * Desain "Interactive Chemistry Learning Roadmap":
 * - Header kartu dengan top accent bar & badge nomor urut (BAB 01, dst.)
 * - Ikon kimia digital tematik berpola SVG
 * - Judul modul & fokus pembelajaran
 * - Deskripsi ringkas konsep
 * - Daftar butir aktivitas pembelajaran terstruktur
 * - Status akses resmi terbuka ("Terbuka • Siap Akses")
 * - Tombol aksi "Pelajari Bab Ini →"
 */
import React from 'react';
import type { ModuleItem, ViewMode } from '../types';

interface ModuleCardProps {
  module: ModuleItem;
  onOpenModule: (viewKey: ViewMode) => void;
  index: number;
}

// Komponen Ikon Kimia Digital Berbasis Vektor SVG Khusus Tiap Bab
const ModuleSvgIcon: React.FC<{ chapterNumber: string; color: string }> = ({ chapterNumber, color }) => {
  switch (chapterNumber) {
    case '01':
      // Bab 1: Gelas Kimia & Pengukuran Stopwatch
      return (
        <svg viewBox="0 0 36 36" fill="none" className="module-card-svg" aria-hidden="true">
          <path d="M10 6H26M12 6V14L6 26C5 28 6.5 30 9 30H27C29.5 30 31 28 30 26L24 14V6" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 24C12 22 16 26 20 23C24 20 28 24 28 24" stroke={color} strokeWidth="1.8" strokeLinecap="round" opacity="0.6"/>
          <circle cx="27" cy="9" r="6" fill="#FFFFFF" stroke={color} strokeWidth="1.8"/>
          <path d="M27 6V9L29 10" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      );
    case '02':
      // Bab 2: Tumbukan Molekul & Energi Aktivasi
      return (
        <svg viewBox="0 0 36 36" fill="none" className="module-card-svg" aria-hidden="true">
          <circle cx="11" cy="18" r="6" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2"/>
          <circle cx="25" cy="18" r="6" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2"/>
          <path d="M15 18H21" stroke={color} strokeWidth="2.4" strokeDasharray="2 2"/>
          <path d="M18 13L18 23" stroke={color} strokeWidth="2.4" strokeLinecap="round"/>
          <path d="M15 15L21 21M15 21L21 15" stroke={color} strokeWidth="1.8"/>
        </svg>
      );
    case '03':
      // Bab 3: Laboratorium Virtual & Kontrol Suhu / Termometer
      return (
        <svg viewBox="0 0 36 36" fill="none" className="module-card-svg" aria-hidden="true">
          <path d="M14 6H22M15 6V16L8 27C7 28.5 8 30 10 30H26C28 30 29 28.5 28 27L21 16V6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="18" cy="24" r="3.5" fill={color} opacity="0.8"/>
          <path d="M18 20.5V11" stroke={color} strokeWidth="2" strokeLinecap="round"/>
          <circle cx="8" cy="12" r="1.5" fill={color}/>
          <circle cx="28" cy="10" r="2" fill={color}/>
        </svg>
      );
    case '04':
      // Bab 4: Grafik Kurva Laju & Simbol Matematika
      return (
        <svg viewBox="0 0 36 36" fill="none" className="module-card-svg" aria-hidden="true">
          <path d="M6 6V30H30" stroke={color} strokeWidth="2.2" strokeLinecap="round"/>
          <path d="M7 11C12 13 18 22 28 26" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="7" cy="11" r="2.5" fill={color}/>
          <circle cx="16" cy="19" r="2.5" fill={color}/>
          <circle cx="27" cy="26" r="2.5" fill={color}/>
        </svg>
      );
    case '05':
      // Bab 5: Sensor Digital & Rangkaian Arduino STEM
      return (
        <svg viewBox="0 0 36 36" fill="none" className="module-card-svg" aria-hidden="true">
          <rect x="8" y="8" width="20" height="20" rx="4" stroke={color} strokeWidth="2.2" fill={color} fillOpacity="0.1"/>
          <rect x="13" y="13" width="10" height="10" rx="1.5" stroke={color} strokeWidth="1.8"/>
          <path d="M18 4V8M18 28V32M4 18H8M28 18H32" stroke={color} strokeWidth="2" strokeLinecap="round"/>
          <circle cx="15" cy="15" r="1" fill={color}/>
          <circle cx="21" cy="21" r="1" fill={color}/>
        </svg>
      );
    case '06':
    default:
      // Bab 6: Evaluasi Pembelajaran & Checklist
      return (
        <svg viewBox="0 0 36 36" fill="none" className="module-card-svg" aria-hidden="true">
          <rect x="8" y="6" width="20" height="24" rx="3" stroke={color} strokeWidth="2.2" fill={color} fillOpacity="0.1"/>
          <path d="M13 13L16 16L23 9" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13 20H23M13 24H19" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
  }
};

export const ModuleCard: React.FC<ModuleCardProps> = ({ module, onOpenModule, index }) => {
  const accent = module.accentColor || '#2563EB';

  return (
    <article
      className="modern-module-card"
      style={{ '--card-accent': accent } as React.CSSProperties}
      aria-label={`${module.chapter}: ${module.title}`}
    >
      {/* Top Accent Bar Indikator Warna Khas */}
      <div className="card-top-accent-bar" style={{ backgroundColor: accent }} />

      {/* Header Kartu: Nomor Bab, Ikon Topik & Step Index */}
      <div className="card-header-flex">
        <div className="module-icon-wrap" style={{ backgroundColor: `${accent}15`, borderColor: `${accent}35` }}>
          <ModuleSvgIcon chapterNumber={module.chapterNumber} color={accent} />
        </div>

        <div className="module-index-group">
          <span className="badge-step-no" title={`Langkah ke-${index + 1} dalam alur belajar`}>
            Langkah {index + 1} of 6
          </span>
          <span className="badge-chapter-tag" style={{ color: accent, borderColor: `${accent}40` }}>
            {module.chapter} • #{module.chapterNumber}
          </span>
        </div>
      </div>

      {/* Badan Kartu: Judul, Fokus Topik, dan Deskripsi */}
      <div className="card-body-content">
        <h3 className="card-module-title">{module.title}</h3>
        <div className="card-module-focus" style={{ color: accent }}>
          <span className="focus-pin" aria-hidden="true">🎯</span>
          <span>{module.subtitle}</span>
        </div>
        <p className="card-module-desc">{module.description}</p>

        {/* Informasi Aktivitas Pembelajaran */}
        {module.activities && module.activities.length > 0 && (
          <div className="card-activities-block">
            <h4 className="activities-heading">
              <span className="act-icon" aria-hidden="true">⚡</span>
              Aktivitas Pembelajaran:
            </h4>
            <ul className="activities-list">
              {module.activities.map((act, i) => (
                <li key={i} className="activity-item">
                  <span className="activity-check-bullet" style={{ color: accent }} aria-hidden="true">✓</span>
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Footer Kartu: Status Akses & Tombol Navigasi */}
      <div className="card-bottom-actions">
        <div className="module-access-status">
          <span className="status-dot-active" aria-hidden="true"></span>
          <span className="status-text">{module.badgeText || 'Terbuka • Siap Akses'}</span>
        </div>

        <button
          type="button"
          className="btn-module-learn"
          onClick={() => onOpenModule(module.viewKey)}
          aria-label={`Pelajari ${module.chapter}: ${module.title}`}
          style={{ '--btn-accent': accent } as React.CSSProperties}
        >
          <span>Pelajari Bab Ini</span>
          <span className="btn-arrow" aria-hidden="true">→</span>
        </button>
      </div>
    </article>
  );
};
