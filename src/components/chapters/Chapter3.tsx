/**
 * components/chapters/Chapter3.tsx
 * Halaman Lengkap Bab 3: Faktor-Faktor yang Memengaruhi Laju Reaksi
 * Dilengkapi Lab Virtual Interaktif: Penentuan Variabel Bebas, Terikat, Kontrol
 */
import React, { useState } from 'react';
import { MODULE_3_SECTIONS } from '../../data/modulesData';

interface Chapter3Props {
  onBackToHome: () => void;
  onPrevChapter: () => void;
  onNextChapter: () => void;
}

type FactorType = 'konsentrasi' | 'luas_permukaan' | 'suhu' | 'katalis';

export const Chapter3: React.FC<Chapter3Props> = ({ onBackToHome, onPrevChapter, onNextChapter }) => {
  const [activeSectionId, setActiveSectionId] = useState<string>('sec-3-1');
  const [selectedFactor, setSelectedFactor] = useState<FactorType>('konsentrasi');

  // Nilai simulasi kontrol interaktif
  const [simLevel, setSimLevel] = useState<number>(2); // 1: rendah, 2: sedang, 3: tinggi
  const [selectedCheck, setSelectedCheck] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  const activeSection = MODULE_3_SECTIONS.find((sec) => sec.id === activeSectionId) || MODULE_3_SECTIONS[0];

  // Model kalkulasi simulasi terkontrol (Data Model/Simulasi sesuai AGENTS.md & PRD)
  const getSimulatedData = () => {
    switch (selectedFactor) {
      case 'konsentrasi': {
        const conc = simLevel === 1 ? '0.5 M' : simLevel === 2 ? '1.0 M' : '2.0 M';
        const time = simLevel === 1 ? 58 : simLevel === 2 ? 30 : 14;
        const rateRel = simLevel === 1 ? '1x (Lambat)' : simLevel === 2 ? '2x (Sedang)' : '4x (Cepat)';
        return {
          testedVar: `Konsentrasi HCl: ${conc}`,
          timeSec: time,
          rateRelative: rateRel,
          controlVars: 'Massa pualam (1 gram butiran), Suhu larutan (25°C), Volume HCl (20 mL)',
          particleExplanation: 'Partikel asam lebih padat per satuan volume, memperbesar frekuensi tumbukan total antarpartikel.',
        };
      }
      case 'luas_permukaan': {
        const surface = simLevel === 1 ? 'Bongkahan Besar' : simLevel === 2 ? 'Butiran Sedang' : 'Serbuk Halus';
        const time = simLevel === 1 ? 85 : simLevel === 2 ? 36 : 10;
        const rateRel = simLevel === 1 ? '1x (Lambat)' : simLevel === 2 ? '2.4x (Sedang)' : '8.5x (Sangat Cepat)';
        return {
          testedVar: `Bentuk Kalsium Karbonat (CaCO₃): ${surface}`,
          timeSec: time,
          rateRelative: rateRel,
          controlVars: 'Massa total pualam (1 gram), Konsentrasi HCl (1.0 M), Suhu (25°C), Volume (20 mL)',
          particleExplanation: 'Bentuk serbuk membuka miliaran bidang sentuh baru, memungkinkan ion H⁺ menabrak partikel pualam dari berbagai sisi.',
        };
      }
      case 'suhu': {
        const temp = simLevel === 1 ? '25°C (Suhu Ruang)' : simLevel === 2 ? '35°C (+10°C)' : '45°C (+20°C)';
        const time = simLevel === 1 ? 60 : simLevel === 2 ? 28 : 12;
        const rateRel = simLevel === 1 ? '1x (Dasar)' : simLevel === 2 ? '2.1x (Cepat)' : '5.0x (Sangat Cepat)';
        return {
          testedVar: `Suhu Sistem: ${temp}`,
          timeSec: time,
          rateRelative: rateRel,
          controlVars: 'Konsentrasi reaktan (1.0 M), Massa & ukuran padatan (1 gram butiran), Volume larutan (20 mL)',
          particleExplanation: 'Energi kinetik partikel naik; persentase partikel yang energi kinetiknya melampaui Ea meningkat pesat.',
        };
      }
      case 'katalis': {
        const cat = simLevel === 1 ? 'Tanpa Katalis' : simLevel === 2 ? 'Sedikit Katalis' : 'Katalis Optimal';
        const time = simLevel === 1 ? 90 : simLevel === 2 ? 22 : 6;
        const rateRel = simLevel === 1 ? '1x (Lambat)' : simLevel === 2 ? '4x (Cepat)' : '15x (Sangat Cepat)';
        return {
          testedVar: `Kondisi Katalis: ${cat}`,
          timeSec: time,
          rateRelative: rateRel,
          controlVars: 'Konsentrasi H₂O₂ (3%), Suhu (25°C), Volume larutan (50 mL)',
          particleExplanation: 'Katalis membuka jalur reaksi alternatif dengan energi aktivasi (Ea) yang jauh lebih rendah, mempercepat pembentukan produk.',
        };
      }
    }
  };

  const simData = getSimulatedData();

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
          Beranda / <strong>Bab 3: Faktor-Faktor yang Memengaruhi Laju</strong>
        </span>
      </div>

      <section className="labsheet-container" aria-labelledby="chapter3-title">
        {/* Header Lembar Kerja */}
        <div className="labsheet-header">
          <div className="labsheet-meta">
            <span className="labsheet-code">LKPD-XI-03 • LAB VIRTUAL INKUIRI</span>
            <span className="labsheet-topic">KIMIA SMA KELAS XI</span>
          </div>
          <h1 id="chapter3-title" className="labsheet-title">
            Bab 3: Faktor-Faktor Laju Reaksi
          </h1>
          <p className="labsheet-lead">
            Menyelidiki secara terisolasi bagaimana konsentrasi, luas permukaan sentuh, suhu, dan katalis
            memengaruhi laju reaksi dengan prinsip kontrol variabel ilmiah (bebas, terikat, dan kontrol).
          </p>

          <div className="labsheet-info-strip">
            <div className="strip-item">
              <span className="strip-label">Faktor Diuji:</span>
              <span className="strip-value">Konsentrasi, Luas Permukaan, Suhu, Katalis</span>
            </div>
            <div className="strip-item">
              <span className="strip-label">Metode:</span>
              <span className="strip-value">Eksperimen Terkontrol Satu Variabel</span>
            </div>
            <div className="strip-item">
              <span className="strip-label">Akses:</span>
              <span className="strip-value value-ready">✓ Terbuka Penuh (Open Access)</span>
            </div>
          </div>
        </div>

        {/* LAB VIRTUAL: Simulator Pengendalian Variabel */}
        <div className="labsheet-section">
          <div className="lab-virtual-box">
            <div className="virtual-header">
              <div>
                <span className="virtual-badge">LAB VIRTUAL INTERAKTIF</span>
                <h2 className="virtual-title">Simulasi Investigasi Faktor Laju Reaksi</h2>
              </div>
              <span className="simulation-model-tag">⚠️ Data Model Simulasi Pendidikan</span>
            </div>

            {/* Pemilih Faktor (Variabel Bebas) */}
            <div className="factor-selector-group">
              <span className="selector-label">1. Pilih Faktor yang Ingin Diuji (Variabel Bebas):</span>
              <div className="factor-buttons">
                <button
                  type="button"
                  className={`factor-btn ${selectedFactor === 'konsentrasi' ? 'active' : ''}`}
                  onClick={() => { setSelectedFactor('konsentrasi'); setSimLevel(2); }}
                >
                  🧪 Konsentrasi Larutan
                </button>
                <button
                  type="button"
                  className={`factor-btn ${selectedFactor === 'luas_permukaan' ? 'active' : ''}`}
                  onClick={() => { setSelectedFactor('luas_permukaan'); setSimLevel(2); }}
                >
                  🧱 Luas Permukaan Sentuh
                </button>
                <button
                  type="button"
                  className={`factor-btn ${selectedFactor === 'suhu' ? 'active' : ''}`}
                  onClick={() => { setSelectedFactor('suhu'); setSimLevel(2); }}
                >
                  🌡️ Suhu Sistem (°C)
                </button>
                <button
                  type="button"
                  className={`factor-btn ${selectedFactor === 'katalis' ? 'active' : ''}`}
                  onClick={() => { setSelectedFactor('katalis'); setSimLevel(2); }}
                >
                  ⚡ Kehadiran Katalis
                </button>
              </div>
            </div>

            {/* Pengatur Level Variabel Bebas */}
            <div className="level-slider-panel">
              <div className="slider-header">
                <span>2. Ubah Kondisi Variabel Bebas:</span>
                <span className="current-level-text"><strong>{simData.testedVar}</strong></span>
              </div>
              <div className="level-buttons-row">
                <button
                  type="button"
                  className={`lvl-btn ${simLevel === 1 ? 'selected' : ''}`}
                  onClick={() => setSimLevel(1)}
                >
                  Level 1 (Rendah / Bongkahan / Tanpa)
                </button>
                <button
                  type="button"
                  className={`lvl-btn ${simLevel === 2 ? 'selected' : ''}`}
                  onClick={() => setSimLevel(2)}
                >
                  Level 2 (Sedang / Butiran / Sedikit)
                </button>
                <button
                  type="button"
                  className={`lvl-btn ${simLevel === 3 ? 'selected' : ''}`}
                  onClick={() => setSimLevel(3)}
                >
                  Level 3 (Tinggi / Serbuk / Optimal)
                </button>
              </div>
            </div>

            {/* Panel Hasil Percobaan Terkontrol */}
            <div className="sim-results-grid">
              <div className="result-metric-card">
                <div className="metric-label">Waktu Reaksi Terukur (Variabel Terikat)</div>
                <div className="metric-value time-value">{simData.timeSec} detik</div>
                <div className="metric-sub">Semakin kecil waktu (t), semakin CEPAT laju reaksi (v ∝ 1/t)</div>
              </div>

              <div className="result-metric-card">
                <div className="metric-label">Perbandingan Kelajuan Relatif</div>
                <div className="metric-value rate-value">{simData.rateRelative}</div>
                <div className="metric-sub">Dihitung relatif terhadap kondisi awal level 1</div>
              </div>

              <div className="result-metric-card full-width">
                <div className="metric-label">Variabel Kontrol (Dijaga Tetap Tidak Berubah)</div>
                <div className="metric-desc"><code>{simData.controlVars}</code></div>
                <div className="metric-sub">
                  <em>Syarat ilmiah:</em> Hanya satu variabel yang diubah pada satu waktu agar kesimpulan valid.
                </div>
              </div>
            </div>

            {/* Penjelasan Submikroskopis dari Hasil Simulasi */}
            <div className="sim-particle-insight">
              <span className="insight-icon" aria-hidden="true">🔬</span>
              <div>
                <strong>Penjelasan Submikroskopis (Tingkat Partikel):</strong>
                <p>{simData.particleExplanation}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Kartu Sub-Bagian Belajar Bab 3 */}
        <div className="labsheet-section">
          <div className="section-title-wrap">
            <h2 className="section-title">Kartu Teori 4 Faktor Laju Reaksi</h2>
            <p className="section-subtitle">
              Pelajari landasan ilmiah masing-masing faktor secara mendalam:
            </p>
          </div>

          <div className="section-tabs" role="tablist" aria-label="Daftar Bagian Belajar Bab 3">
            {MODULE_3_SECTIONS.map((section) => (
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

        {/* Cek Pemahaman Interaktif */}
        <div className="labsheet-section">
          <div className="self-check-card">
            <div className="check-badge">UJI PEMAHAMAN MANDIRI • VARIABEL PENELITIAN</div>
            <h2 className="check-title">Pertanyaan Pemantik: Mengapa Harus Mengendalikan Variabel Kontrol?</h2>
            <p className="check-question">
              Jika seorang siswa menguji pengaruh suhu dengan menaikkan suhu dari 25°C ke 50°C, namun secara bersamaan ia juga menambah konsentrasi asam dari 1 M ke 3 M, apakah kesimpulan pengaruh suhu dapat ditarik secara ilmiah?
            </p>

            <div className="check-options-grid">
              <button
                type="button"
                className={`option-btn ${selectedCheck === 'A' ? 'selected' : ''}`}
                onClick={() => { setSelectedCheck('A'); setShowExplanation(true); }}
              >
                <strong>Opsi A:</strong> Ya, karena reaksi pasti berlangsung lebih cepat dengan kombinasi kedua faktor tersebut.
              </button>

              <button
                type="button"
                className={`option-btn ${selectedCheck === 'B' ? 'selected' : ''}`}
                onClick={() => { setSelectedCheck('B'); setShowExplanation(true); }}
              >
                <strong>Opsi B:</strong> Tidak, karena terjadi percampuran variabel bebas; kita tidak dapat mengetahui percepatan reaksi disebabkan oleh suhu atau oleh konsentrasi.
              </button>

              <button
                type="button"
                className={`option-btn ${selectedCheck === 'C' ? 'selected' : ''}`}
                onClick={() => { setSelectedCheck('C'); setShowExplanation(true); }}
              >
                <strong>Opsi C:</strong> Ya, asalkan diulangi sebanyak tiga kali dengan tabung reaksi yang sama.
              </button>
            </div>

            {showExplanation && (
              <div className="check-feedback-box">
                {selectedCheck === 'B' ? (
                  <div className="feedback-content feedback-correct">
                    <div className="feedback-heading">✅ Benar Sekali! (Prinsip Inkuiri Ilmiah)</div>
                    <p>
                      Dalam metode ilmiah, untuk menguji pengaruh <strong>suhu</strong>, maka variabel lain seperti <strong>konsentrasi, massa padatan, dan volume larutan</strong> harus dijaga konstan sebagai <strong>variabel kontrol</strong>.
                    </p>
                  </div>
                ) : (
                  <div className="feedback-content feedback-review">
                    <div className="feedback-heading">ℹ️ Tinjau Kembali Prinsip Isolasi Variabel</div>
                    <p>
                      Jika dua variabel diubah sekaligus (suhu dan konsentrasi), hasil eksperimen tidak valid karena kita tidak tahu faktor mana yang sebenarnya memicu percepatan laju reaksi.
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
            ← Kembali ke Bab 2: Teori Tumbukan
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onNextChapter}
          >
            Lanjut ke Bab 4: Data & Orde Reaksi →
          </button>
        </div>
      </section>
    </div>
  );
};

