/**
 * components/Navbar.tsx
 * Bilah navigasi atas ReaksiLab XI.
 * Redesain modern: Minimalis, elegan, bernuansa laboratorium kimia digital,
 * dilengkapi logo interaktif, selektor modul, dan status akses terbuka.
 */
import React from 'react';
import type { ViewMode, UserProfile } from '../types';

interface NavbarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  currentUser?: UserProfile | null;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, currentUser, onLogout }) => {
  return (
    <header className="modern-navbar" role="banner">
      <div className="navbar-inner">
        {/* Brand: Logo & Identitas */}
        <button
          type="button"
          className="brand-pill"
          onClick={() => onNavigate('home')}
          aria-label="Kembali ke Beranda ReaksiLab XI"
        >
          <div className="brand-logo-flask" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none" className="flask-svg">
              <path
                d="M13 5H19M14 5V12L8 23C7.2 24.5 8.2 26.5 10 26.5H22C23.8 26.5 24.8 24.5 24 23L18 12V5"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.5 19C12 18 14 20 16 19C18 18 20 20 21.5 19L23 22C23.5 23 22.8 24.5 21.5 24.5H10.5C9.2 24.5 8.5 23 9 22L10.5 19Z"
                fill="currentColor"
                opacity="0.35"
              />
              <circle cx="13" cy="22" r="1" fill="currentColor" />
              <circle cx="18" cy="21" r="1.5" fill="currentColor" />
              <circle cx="15" cy="16" r="0.8" fill="currentColor" />
            </svg>
          </div>
          <div className="brand-titles">
            <span className="brand-name">
              ReaksiLab<span className="brand-badge-xi">XI</span>
            </span>
            <span className="brand-subtitle">Laboratorium Digital Laju Reaksi</span>
          </div>
        </button>

        {/* Center: Dropdown Pemilihan Modul Pembelajaran */}
        <div className="nav-module-picker">
          <label htmlFor="nav-chapter-select" className="picker-label">
            <span className="picker-dot" aria-hidden="true"></span>
            Modul:
          </label>
          <div className="select-wrapper">
            <select
              id="nav-chapter-select"
              className="module-dropdown"
              value={currentView}
              onChange={(e) => onNavigate(e.target.value as ViewMode)}
              aria-label="Pilih Modul Pembelajaran"
            >
              <option value="home">🏠 Beranda Utama</option>
              <option value="roadmap">🗺️ Peta 6 Modul Belajar</option>
              <option value="bab1">🧪 Bab 1: Mengenal Laju Reaksi</option>
              <option value="bab2">⚛️ Bab 2: Teori Tumbukan & Ea</option>
              <option value="bab3">🔬 Bab 3: Faktor Laju (Lab Virtual)</option>
              <option value="bab4">📊 Bab 4: Analisis Data & Hukum Laju</option>
              <option value="bab5">🤖 Bab 5: Proyek STEM Arduino</option>
              <option value="bab6">📝 Bab 6: Evaluasi Pembelajaran</option>
              <option value="auth">🔐 Portal Masuk / Akun</option>
            </select>
            <span className="select-arrow" aria-hidden="true">▾</span>
          </div>
        </div>

        {/* Right: Status Akun & Tombol Navigasi Cepat */}
        <div className="navbar-actions">
          {/* User Profile Pill jika sudah masuk / aktif */}
          {currentUser && (
            <div className="user-profile-nav-pill" title={`Akun: ${currentUser.email}`}>
              <span className="user-nav-avatar" aria-hidden="true">
                {currentUser.avatar || '🧑‍🔬'}
              </span>
              <span className="user-nav-name">
                {currentUser.name.length > 15 ? `${currentUser.name.slice(0, 15)}...` : currentUser.name}
              </span>
              <button
                type="button"
                className="btn-user-logout"
                onClick={onLogout}
                title="Keluar / Ganti Akun"
                aria-label="Keluar dari akun"
              >
                Keluar
              </button>
            </div>
          )}

          {!currentUser && (
            <button
              type="button"
              className="btn-nav-login"
              onClick={() => onNavigate('auth')}
              title="Masuk atau Daftar Akun ReaksiLab"
            >
              <span aria-hidden="true">🔐</span> Masuk
            </button>
          )}

          {currentView === 'home' && (
            <div className="access-chip" title="Seluruh Bab 1 s.d. 6 dapat diakses bebas tanpa login">
              <span className="chip-indicator" aria-hidden="true"></span>
              <span className="chip-text">Bab 1 s.d. 6 Terbuka Penuh</span>
            </div>
          )}

          {currentView === 'roadmap' && (
            <div className="nav-actions-group">
              <button
                type="button"
                className="btn-return-home"
                onClick={() => onNavigate('home')}
                title="Kembali ke Beranda"
              >
                <span aria-hidden="true">←</span> Beranda
              </button>
            </div>
          )}

          {currentView !== 'home' && currentView !== 'roadmap' && currentView !== 'auth' && (
            <div className="nav-actions-group">
              <button
                type="button"
                className="btn-return-roadmap"
                onClick={() => onNavigate('roadmap')}
                title="Buka Peta 6 Modul"
              >
                <span aria-hidden="true">🗺️</span> Peta Modul
              </button>
              <button
                type="button"
                className="btn-return-home"
                onClick={() => onNavigate('home')}
                title="Kembali ke Beranda"
              >
                <span aria-hidden="true">←</span> Beranda
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
