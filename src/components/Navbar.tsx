import React from 'react';

interface NavbarProps {
  currentView: 'home' | 'lab';
  onNavigate: (view: 'home' | 'lab') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  return (
    <header className="site-header">
      <div className="header-container">
        <div className="brand" onClick={() => onNavigate('home')} role="button" tabIndex={0}>
          <div className="brand-icon" aria-hidden="true">
            ⚗️
          </div>
          <div className="brand-text">
            <span className="brand-title">ReaksiLab XI</span>
            <span className="brand-subtitle">Laboratorium Kimia SMA</span>
          </div>
        </div>

        <nav className="header-nav" aria-label="Navigasi Utama">
          <button
            type="button"
            className={`nav-button ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => onNavigate('home')}
          >
            Peta Modul
          </button>
          <button
            type="button"
            className={`nav-button nav-button-highlight ${currentView === 'lab' ? 'active' : ''}`}
            onClick={() => onNavigate('lab')}
          >
            Lembar Belajar Lab
          </button>
        </nav>
      </div>
    </header>
  );
};

