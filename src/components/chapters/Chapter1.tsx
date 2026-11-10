/**
 * components/chapters/Chapter1.tsx
 * Halaman Lengkap Bab 1: Mengenal Laju Reaksi
 */
import React, { useState } from 'react';
import { MODULE_1_SECTIONS } from '../../data/modulesData';
import { LabFormulaBox } from '../LabFormulaBox';

interface Chapter1Props {
  onBackToHome: () => void;
  onNextChapter: () => void;
}

export const Chapter1: React.FC<Chapter1Props> = ({ onBackToHome, onNextChapter }) => {
  const [activeSectionId, setActiveSectionId] = useState<string>('sec-1-1');
  const [selectedPrediction, setSelectedPrediction] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  const activeSection = MODULE_1_SECTIONS.find((sec) => sec.id === activeSectionId) || MODULE_1_SECTIONS[0];

  const handlePrediction = (choice: string) => {
    setSelectedPrediction(choice);
    setShowExplanation(true);
  };

  const handleResetCheck = () => {
    setSelectedPrediction(null);
    setShowExplanation(false);
  };

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
          Beranda / <strong>Bab 1: Mengenal Laju Reaksi</strong>
        </span>
      </div>

      <section className="labsheet-container" aria-labelledby="chapter1-title">
        {/* Header Lembar Kerja Bergaya Catatan Laboratorium */}
        <div className="labsheet-header">
          <div className="labsheet-meta">
            <span className="labsheet-code">LKPD-XI-01 • LEMBAR BELAJAR LAB</span>
            <span className="labsheet-topic">KIMIA SMA KELAS XI</span>
          </div>
          <h1 id="chapter1-title" className="labsheet-title">
            Bab 1: Mengenal Laju Reaksi
          </h1>
          <p className="labsheet-lead">
            Penyelidikan dasar tentang bagaimana kecepatan perubahan kimia didefinisikan, diukur,
            serta disajikan dalam bentuk kuantitatif dan grafik konsentrasi terhadap waktu.
          </p>

          <div className="labsheet-info-strip">
            <div className="strip-item">
              <span className="strip-label">Fokus Utama:</span>
              <span className="strip-value">Definisi, Perubahan [Zat], & Interval Waktu (Δt)</span>
            </div>
            <div className="strip-item">
              <span className="strip-label">Representasi:</span>
              <span className="strip-value">Makroskopis & Simbolik</span>
            </div>
            <div className="strip-item">
              <span className="strip-label">Akses:</span>
              <span className="strip-value value-ready">✓ Terbuka Penuh (Open Access)</span>
            </div>
          </div>
        </div>

        {/* Bagian Ruang Rumus Utama */}
        <div className="labsheet-section">
          <LabFormulaBox />
        </div>

        {/* Bagian Kartu Sub-Bagian Belajar (1.1, 1.2, 1.3) */}
        <div className="labsheet-section">
          <div className="section-title-wrap">
            <h2 className="section-title">Kartu Bagian Belajar Bab 1</h2>
            <p className="section-subtitle">
              Pilih bagian di bawah ini untuk menelaah konsep secara terstruktur:
            </p>
          </div>

          <div className="section-tabs" role="tablist" aria-label="Daftar Bagian Belajar Modul 1">
            {MODULE_1_SECTIONS.map((section) => (
              <button
                key={section.id}
                role="tab"
                aria-selected={activeSectionId === section.id}
                aria-controls={`panel-${section.id}`}
                id={`tab-${section.id}`}
                className={`section-tab-btn ${activeSectionId === section.id ? 'active' : ''}`}
                onClick={() => setActiveSectionId(section.id)}
              >
                <span className="tab-code">{section.code}</span>
                <span className="tab-title">{section.title}</span>
              </button>
            ))}
          </div>

          <div
            id={`panel-${activeSection.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeSection.id}`}
            className="section-content-card"
          >
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

        {/* Cek Pemahaman Cepat Mandiri */}
        <div className="labsheet-section">
          <div className="self-check-card">
            <div className="check-badge">UJI PEMAHAMAN MANDIRI • TANPA FORM DATA SISWA</div>
            <h2 className="check-title">Pertanyaan Pemantik: Apa yang Terjadi pada Pereaksi?</h2>
            <p className="check-question">
              Jika sebuah reaksi kimia berlangsung dalam wadah tertutup antara Zat A (pereaksi) menjadi Zat B (produk),
              bagaimanakah konsentrasi molaritas Zat A seiring bertambahnya waktu reaksi?
            </p>

            <div className="check-options-grid">
              <button
                type="button"
                className={`option-btn ${selectedPrediction === 'A' ? 'selected' : ''}`}
                onClick={() => handlePrediction('A')}
              >
                <strong>Opsi A:</strong> Konsentrasi Zat A selalu berkurang per satuan waktu (-Δ[A]/Δt)
              </button>

              <button
                type="button"
                className={`option-btn ${selectedPrediction === 'B' ? 'selected' : ''}`}
                onClick={() => handlePrediction('B')}
              >
                <strong>Opsi B:</strong> Konsentrasi Zat A selalu bertambah per satuan waktu (+Δ[A]/Δt)
              </button>

              <button
                type="button"
                className={`option-btn ${selectedPrediction === 'C' ? 'selected' : ''}`}
                onClick={() => handlePrediction('C')}
              >
                <strong>Opsi C:</strong> Konsentrasi Zat A tetap konstan sepanjang reaksi berlangsung
              </button>
            </div>

            {showExplanation && (
              <div className="check-feedback-box">
                {selectedPrediction === 'A' ? (
                  <div className="feedback-content feedback-correct">
                    <div className="feedback-heading">✅ Tepat Sekali! (Konsep Benar)</div>
                    <p>
                      Sebagai <strong>pereaksi</strong>, partikel Zat A terus digunakan untuk membentuk ikatan baru
                      menjadi Zat B. Oleh karena itu, jumlah mol Zat A per volume wadah terus berkurang.
                      Inilah alasan rumus laju pereaksi diberi tanda minus: <code>v = -Δ[A]/Δt</code>.
                    </p>
                  </div>
                ) : (
                  <div className="feedback-content feedback-review">
                    <div className="feedback-heading">ℹ️ Mari Tinjau Kembali Konsep Pereaksi</div>
                    <p>
                      Ingat prinsip kekekalan materi: Zat yang bertambah adalah <strong>produk (Zat B)</strong>.
                      Sedangkan <strong>pereaksi (Zat A)</strong> dikonsumsi selama reaksi sehingga konsentrasinya
                      pasti <strong>berkurang</strong> terhadap waktu.
                    </p>
                  </div>
                )}

                <button
                  type="button"
                  className="btn-retry"
                  onClick={handleResetCheck}
                >
                  Coba Pertanyaan Ulang
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Navigasi Bawah Antar Bab */}
        <div className="module-bottom-nav">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onBackToHome}
          >
            ← Kembali ke Beranda
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={onNextChapter}
          >
            Lanjut ke Bab 2: Teori Tumbukan →
          </button>
        </div>
      </section>
    </div>
  );
};

