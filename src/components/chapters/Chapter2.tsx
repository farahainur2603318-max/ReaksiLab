/**
 * components/chapters/Chapter2.tsx
 * Halaman Lengkap Bab 2: Teori Tumbukan dan Energi Aktivasi
 */
import React, { useState } from 'react';
import { MODULE_2_SECTIONS } from '../../data/modulesData';

interface Chapter2Props {
  onBackToHome: () => void;
  onPrevChapter: () => void;
  onNextChapter: () => void;
}

export const Chapter2: React.FC<Chapter2Props> = ({ onBackToHome, onPrevChapter, onNextChapter }) => {
  const [activeSectionId, setActiveSectionId] = useState<string>('sec-2-1');
  const [energyDiagramType, setEnergyDiagramType] = useState<'eksoterm' | 'endoterm'>('eksoterm');
  const [selectedCheck, setSelectedCheck] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  const activeSection = MODULE_2_SECTIONS.find((sec) => sec.id === activeSectionId) || MODULE_2_SECTIONS[0];

  return (
    <div className="module-page-container">
      {/* Bilah Breadcrumb & Navigasi Kembali */}
      <div className="module-top-bar">
        <button
          type="button"
          className="btn-back-link"
          onClick={onBackToHome}
          aria-label="Kembali ke Beranda"
        >
          ← Kembali ke Beranda & Peta Modul
        </button>
        <span className="breadcrumb-current">
          Beranda / <strong>Bab 2: Teori Tumbukan & Energi Aktivasi</strong>
        </span>
      </div>

      <section className="labsheet-container" aria-labelledby="chapter2-title">
        {/* Header Lembar Kerja */}
        <div className="labsheet-header">
          <div className="labsheet-meta">
            <span className="labsheet-code">LKPD-XI-02 • TEORI SUBMIKROSKOPIS</span>
            <span className="labsheet-topic">KIMIA SMA KELAS XI</span>
          </div>
          <h1 id="chapter2-title" className="labsheet-title">
            Bab 2: Teori Tumbukan & Energi Aktivasi
          </h1>
          <p className="labsheet-lead">
            Menyelidiki peristiwa pada tingkat partikel (atom, molekul, ion): mengapa reaksi memerlukan
            tumbukan efektif, bagaimana orientasi memengaruhi hasil, dan bagaimana bukit energi aktivasi (Ea) dilampaui.
          </p>

          <div className="labsheet-info-strip">
            <div className="strip-item">
              <span className="strip-label">Fokus Utama:</span>
              <span className="strip-value">Tumbukan Efektif, Orientasi, & Energi Aktivasi (Ea)</span>
            </div>
            <div className="strip-item">
              <span className="strip-label">Representasi:</span>
              <span className="strip-value">Submikroskopis & Diagram Energi Potensial</span>
            </div>
            <div className="strip-item">
              <span className="strip-label">Akses:</span>
              <span className="strip-value value-ready">✓ Terbuka Penuh (Open Access)</span>
            </div>
          </div>
        </div>

        {/* Visualisasi Khusus: Diagram Profil Energi Reaksi Interaktif */}
        <div className="labsheet-section">
          <div className="lab-formula-box">
            <div className="formula-header">
              <span className="formula-tag">VISUALISASI BUKIT ENERGI (PROFIL REAKSI)</span>
              <div className="diagram-toggle-group">
                <button
                  type="button"
                  className={`toggle-btn ${energyDiagramType === 'eksoterm' ? 'active' : ''}`}
                  onClick={() => setEnergyDiagramType('eksoterm')}
                >
                  Reaksi Eksoterm (ΔH &lt; 0)
                </button>
                <button
                  type="button"
                  className={`toggle-btn ${energyDiagramType === 'endoterm' ? 'active' : ''}`}
                  onClick={() => setEnergyDiagramType('endoterm')}
                >
                  Reaksi Endoterm (ΔH &gt; 0)
                </button>
              </div>
            </div>

            {/* Ilustrasi Visual Kurva Energi Potensial SVG */}
            <div className="energy-diagram-wrapper">
              <svg viewBox="0 0 540 240" className="energy-svg" role="img" aria-label="Diagram profil energi reaksi">
                {/* Garis Sumbu */}
                <line x1="40" y1="20" x2="40" y2="210" stroke="#94a3b8" strokeWidth="2" />
                <line x1="40" y1="210" x2="510" y2="210" stroke="#94a3b8" strokeWidth="2" />
                <text x="35" y="15" fill="#475569" fontSize="12" textAnchor="end" fontWeight="bold">Energi Potensial</text>
                <text x="510" y="228" fill="#475569" fontSize="12" textAnchor="end">Jalur Reaksi (Waktu) →</text>

                {energyDiagramType === 'eksoterm' ? (
                  <>
                    {/* Kurva Eksoterm: Reaktan (tinggi 130), Puncak (tinggi 40), Produk (tinggi 170) */}
                    <path
                      d="M 50 130 L 120 130 C 180 130, 210 40, 270 40 C 330 40, 360 170, 420 170 L 490 170"
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="3.5"
                    />

                    {/* Titik Reaktan */}
                    <line x1="120" y1="130" x2="270" y2="130" stroke="#94a3b8" strokeDasharray="4" />
                    <text x="80" y="122" fill="#1e3a8a" fontSize="12" fontWeight="bold">Reaktan</text>

                    {/* Titik Puncak: Kompleks Teraktivasi */}
                    <circle cx="270" cy="40" r="5" fill="#ea580c" />
                    <text x="270" y="28" fill="#c2410c" fontSize="12" textAnchor="middle" fontWeight="bold">
                      Kompleks Teraktivasi
                    </text>

                    {/* Panah Ea dari Reaktan ke Puncak */}
                    <line x1="250" y1="130" x2="250" y2="45" stroke="#ea580c" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    <text x="240" y="90" fill="#ea580c" fontSize="12" textAnchor="end" fontWeight="bold">Ea (Energi Aktivasi)</text>

                    {/* Titik Produk */}
                    <text x="450" y="162" fill="#15803d" fontSize="12" fontWeight="bold">Produk</text>

                    {/* Garis delta H */}
                    <line x1="390" y1="130" x2="390" y2="170" stroke="#15803d" strokeWidth="2" />
                    <text x="400" y="152" fill="#15803d" fontSize="11" fontWeight="bold">ΔH (Eksoterm: Lepas Kalor)</text>
                  </>
                ) : (
                  <>
                    {/* Kurva Endoterm: Reaktan (tinggi 170), Puncak (tinggi 40), Produk (tinggi 100) */}
                    <path
                      d="M 50 170 L 120 170 C 180 170, 210 40, 270 40 C 330 40, 360 100, 420 100 L 490 100"
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="3.5"
                    />

                    <line x1="120" y1="170" x2="270" y2="170" stroke="#94a3b8" strokeDasharray="4" />
                    <text x="80" y="162" fill="#1e3a8a" fontSize="12" fontWeight="bold">Reaktan</text>

                    <circle cx="270" cy="40" r="5" fill="#ea580c" />
                    <text x="270" y="28" fill="#c2410c" fontSize="12" textAnchor="middle" fontWeight="bold">
                      Kompleks Teraktivasi
                    </text>

                    <line x1="250" y1="170" x2="250" y2="45" stroke="#ea580c" strokeWidth="2" />
                    <text x="240" y="110" fill="#ea580c" fontSize="12" textAnchor="end" fontWeight="bold">Ea (Energi Aktivasi)</text>

                    <text x="450" y="92" fill="#6d28d9" fontSize="12" fontWeight="bold">Produk</text>

                    <line x1="390" y1="170" x2="390" y2="100" stroke="#6d28d9" strokeWidth="2" />
                    <text x="400" y="138" fill="#6d28d9" fontSize="11" fontWeight="bold">ΔH (Endoterm: Serap Kalor)</text>
                  </>
                )}
              </svg>
            </div>

            <div className="formula-legend-grid">
              <div className="legend-item">
                <div className="legend-symbol">Ea</div>
                <div className="legend-desc">
                  <strong>Energi Aktivasi:</strong> Energi minimum yang harus diserap oleh partikel reaktan untuk mencapai kompleks teraktivasi. Selalu diukur dari tingkat energi reaktan.
                </div>
              </div>
              <div className="legend-item">
                <div className="legend-symbol">Orientasi</div>
                <div className="legend-desc">
                  <strong>Arah Tumbukan:</strong> Posisi atom-atom pembentuk ikatan baru harus saling berhadapan. Jika salah orientasi, partikel hanya memantul tanpa bereaksi.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Kartu Sub-Bagian Belajar Bab 2 */}
        <div className="labsheet-section">
          <div className="section-title-wrap">
            <h2 className="section-title">Kartu Bagian Belajar Bab 2</h2>
            <p className="section-subtitle">
              Pilih konsep di bawah ini untuk memahami peristiwa pada tingkat submikroskopis:
            </p>
          </div>

          <div className="section-tabs" role="tablist" aria-label="Daftar Bagian Belajar Bab 2">
            {MODULE_2_SECTIONS.map((section) => (
              <button
                key={section.id}
                role="tab"
                aria-selected={activeSectionId === section.id}
                className={`section-tab-btn ${activeSectionId === section.id ? 'active' : ''}`}
                onClick={() => setActiveSectionId(section.id)}
              >
                <span className="tab-code">{section.code}</span>
                <span className="tab-title">{section.title}</span>
              </button>
            ))}
          </div>

          <div className="section-content-card">
            <div className="content-card-header">
              <div>
                <span className="content-category-tag">{activeSection.category}</span>
                <h3 className="content-title">{activeSection.title}</h3>
                <p className="content-subtitle">{activeSection.subtitle}</p>
              </div>
              <span className="content-code-pill">{activeSection.code}</span>
            </div>

            <p className="content-summary">{activeSection.summary}</p>

            <div className="content-points-box">
              <div className="points-header">Poin Penting Penyelidikan:</div>
              <ul className="points-list">
                {activeSection.keyPoints.map((point, idx) => (
                  <li key={idx} className="point-item">
                    <span className="point-bullet" aria-hidden="true">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="scientific-note-box">
              <div className="note-icon" aria-hidden="true">💡</div>
              <div>
                <strong>Catatan Konseptual Guru & Kimiawan:</strong>
                <p>{activeSection.scientificNote}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cek Pemahaman Cepat Bab 2 */}
        <div className="labsheet-section">
          <div className="self-check-card">
            <div className="check-badge">UJI PEMAHAMAN MANDIRI • TEORI TUMBUKAN</div>
            <h2 className="check-title">Pertanyaan Pemantik: Mengapa Tidak Semua Tumbukan Menghasilkan Reaksi?</h2>
            <p className="check-question">
              Dua molekul gas bereaksi saling bertumbukan dengan kecepatan rendah sehingga energi kinetik totalnya
              lebih kecil dari energi aktivasi (E &lt; Ea). Apakah reaksi akan berlangsung?
            </p>

            <div className="check-options-grid">
              <button
                type="button"
                className={`option-btn ${selectedCheck === 'A' ? 'selected' : ''}`}
                onClick={() => { setSelectedCheck('A'); setShowExplanation(true); }}
              >
                <strong>Opsi A:</strong> Ya, reaksi tetap terjadi asalkan molekul bertumbukan secara langsung.
              </button>

              <button
                type="button"
                className={`option-btn ${selectedCheck === 'B' ? 'selected' : ''}`}
                onClick={() => { setSelectedCheck('B'); setShowExplanation(true); }}
              >
                <strong>Opsi B:</strong> Tidak, molekul hanya akan memantul kembali tanpa memutuskan ikatan lama karena energi tidak cukup melampaui bukit Ea.
              </button>

              <button
                type="button"
                className={`option-btn ${selectedCheck === 'C' ? 'selected' : ''}`}
                onClick={() => { setSelectedCheck('C'); setShowExplanation(true); }}
              >
                <strong>Opsi C:</strong> Reaksi langsung selesai seketika karena energi kinetik tidak memengaruhi laju.
              </button>
            </div>

            {showExplanation && (
              <div className="check-feedback-box">
                {selectedCheck === 'B' ? (
                  <div className="feedback-content feedback-correct">
                    <div className="feedback-heading">✅ Tepat Sekali! (Konsep Benar)</div>
                    <p>
                      Agar ikatan kimia lama dapat terputus, diperlukan energi tumbukan minimum sebesar <strong>Energi Aktivasi (Ea)</strong>. Jika energi tumbukan lebih kecil dari Ea (E &lt; Ea), molekul hanya akan memantul kembali secara elastis tanpa membentuk produk.
                    </p>
                  </div>
                ) : (
                  <div className="feedback-content feedback-review">
                    <div className="feedback-heading">ℹ️ Mari Tinjau Kembali Syarat Tumbukan Efektif</div>
                    <p>
                      Tumbukan saja belum menjamin terjadinya reaksi! Harus dipenuhi dua syarat: <strong>orientasi yang tepat</strong> DAN <strong>energi kinetik yang cukup (E ≥ Ea)</strong>. Jika energi di bawah Ea, reaksi tidak akan terjadi.
                    </p>
                  </div>
                )}
                <button
                  type="button"
                  className="btn-retry"
                  onClick={() => { setSelectedCheck(null); setShowExplanation(false); }}
                >
                  Coba Pertanyaan Ulang
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Navigasi Bawah */}
        <div className="module-bottom-nav">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onPrevChapter}
          >
            ← Kembali ke Bab 1: Mengenal Laju
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onNextChapter}
          >
            Lanjut ke Bab 3: Faktor Laju Reaksi →
          </button>
        </div>
      </section>
    </div>
  );
};

