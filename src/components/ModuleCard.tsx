import React from 'react';
import type { ModuleItem } from '../types/learning';

interface ModuleCardProps {
  module: ModuleItem;
  onOpenModule: (moduleId: number) => void;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ module, onOpenModule }) => {
  const isAvailable = module.isAvailable;

  return (
    <article
      className={`module-card ${isAvailable ? 'module-card-available' : 'module-card-disabled'}`}
      aria-disabled={!isAvailable}
    >
      <div className="module-card-header">
        <span className="module-code">{module.code}</span>
        <span
          className={`module-status-badge ${
            isAvailable ? 'status-badge-active' : 'status-badge-locked'
          }`}
        >
          {module.statusBadge}
        </span>
      </div>

      <h3 className="module-title">{module.title}</h3>
      <p className="module-description">{module.description}</p>

      {/* Jika modul aktif, tampilkan kartu bagian belajar di dalamnya */}
      {isAvailable && module.sections && (
        <div className="learning-sections-preview">
          <h4 className="preview-heading">Bagian Belajar yang Tersedia:</h4>
          <ul className="sections-list">
            {module.sections.map((sec) => (
              <li key={sec.id} className="section-preview-item">
                <span className="section-number">{sec.number}</span>
                <div className="section-info">
                  <span className="section-title-text">{sec.title}</span>
                  <span className={`level-pill level-${sec.level.toLowerCase()}`}>
                    Level: {sec.level}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Jika modul belum tersedia, tampilkan keterangan rencana tindak lanjut */}
      {!isAvailable && module.upcomingNote && (
        <div className="upcoming-note-box">
          <span className="lock-icon" aria-hidden="true">
            🔒
          </span>
          <p className="upcoming-text">{module.upcomingNote}</p>
        </div>
      )}

      <div className="module-card-footer">
        {isAvailable ? (
          <button
            type="button"
            className="btn-module-open"
            onClick={() => onOpenModule(module.id)}
          >
            <span>Buka Lembar Belajar</span>
            <span aria-hidden="true">→</span>
          </button>
        ) : (
          <div className="unavailable-notice" aria-live="polite">
            <span>Belum Tersedia Saat Ini</span>
          </div>
        )}
      </div>
    </article>
  );
};
