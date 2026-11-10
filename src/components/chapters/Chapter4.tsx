/**
 * components/chapters/Chapter4.tsx
 * Halaman Lengkap Bab 4: Data, Grafik, dan Pengantar Orde Reaksi
 */
import React, { useState } from 'react';
import { MODULE_4_SECTIONS } from '../../data/modulesData';

interface Chapter4Props {
  onBackToHome: () => void;
  onPrevChapter: () => void;
  onNextChapter: () => void;
}

export const Chapter4: React.FC<Chapter4Props> = ({ onBackToHome, onPrevChapter, onNextChapter }) => {
  const [activeSectionId, setActiveSectionId] = useState<string>('sec-4-1');
  const [activeOrderTab, setActiveOrderTab] = useState<'orde0' | 'orde1' | 'orde2'>('orde1');
  const [selectedCheck, setSelectedCheck] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  const activeSection = MODULE_4_SECTIONS.find((sec) => sec.id === activeSectionId) || MODULE_4_SECTIONS[0];

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
          Beranda / <strong>Bab 4: Data, Grafik, & Orde Reaksi</strong>
        </span>
      </div>

      <section className="labsheet-container" aria-labelledby="chapter4-title">
        {/* Header Lembar Kerja */}
        <div className="labsheet-header">
          <div className="labsheet-meta">
            <span className="labsheet-code">LKPD-XI-04 • ANALISIS KUANTITATIF</span>
            <span className="labsheet-topic">KIMIA SMA KELAS XI</span>
          </div>
          <h1 id="chapter4-title" className="labsheet-title">
            Bab 4: Data, Grafik, & Orde Reaksi
          </h1>
          <p className="labsheet-lead">
            Mengolah data eksperimen kuantitatif: menghitung laju rata-rata, membaca kemiringan kurva grafik,
            serta menentukan persamaan hukum laju dan orde reaksi berdasarkan data empiris.
          </p>

          <div className="labsheet-info-strip">
            <div className="strip-item">
              <span className="strip-label">Fokus Utama:</span>
              <span className="strip-value">Hukum Laju, Orde Reaksi (0, 1, 2), & Tetapan (k)</span>
            </div>
            <div className="strip-item">
              <span className="strip-label">Representasi:</span>
              <span className="strip-value">Tabel Kuantitatif & Representasi Simbolik</span>
            </div>
            <div className="strip-item">
              <span className="strip-label">Akses:</span>
              <span className="strip-value value-ready">✓ Terbuka Penuh (Open Access)</span>
            </div>
          </div>
        </div>

        {/* Ruang Rumus Hukum Laju Reaksi */}
        <div className="labsheet-section">
          <div className="lab-formula-box">
            <div className="formula-header">
              <span className="formula-tag">PERSAMAAN HUKUM LAJU REAKSI</span>
              <span className="formula-sheet-ref">Bentuk Umum: A + B → Produk</span>
            </div>

            <div className="formula-display-container">
              <div className="formula-equation" role="math" aria-label="v sama dengan k dikali konsentrasi A pangkat m dikali konsentrasi B pangkat n">
                <span className="symbol-var">v</span>
                <span className="equation-equals">=</span>
                <span className="symbol-var">k</span>
                <span>[A]<sup>m</sup></span>
                <span>[B]<sup>n</sup></span>
              </div>
            </div>

            <div className="formula-legend-grid">
              <div className="legend-item">
                <div className="legend-symbol">v</div>
                <div className="legend-desc">
                  <strong>Laju Reaksi:</strong> Kecepatan reaksi pada kondisi konsentrasi tertentu (satuan M·s⁻¹).
                </div>
              </div>
              <div className="legend-item">
                <div className="legend-symbol">k</div>
                <div className="legend-desc">
                  <strong>Tetapan Laju Reaksi:</strong> Nilai khas suatu reaksi yang nilainya dipengaruhi oleh suhu dan katalis.
                </div>
              </div>
              <div className="legend-item">
                <div className="legend-symbol">m & n</div>
                <div className="legend-desc">
                  <strong>Orde Reaksi:</strong> Tingkat reaksi terhadap masing-masing pereaksi (HANYA ditentukan dari eksperimen!).
                </div>
              </div>
              <div className="legend-item">
                <div className="legend-symbol">Orde Total</div>
                <div className="legend-desc">
                  <strong>m + n:</strong> Penjumlahan seluruh pangkat konsentrasi pada persamaan hukum laju reaksi.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visualisasi Karakteristik Orde Reaksi: 0, 1, dan 2 */}
        <div className="labsheet-section">
          <div className="section-title-wrap">
            <h2 className="section-title">Perbandingan Karakteristik Orde Reaksi</h2>
            <p className="section-subtitle">
              Pilih orde di bawah ini untuk melihat pengaruh pelipatan konsentrasi terhadap laju reaksi:
            </p>
          </div>

          <div className="order-tabs">
            <button
              type="button"
              className={`order-tab-btn ${activeOrderTab === 'orde0' ? 'active' : ''}`}
              onClick={() => setActiveOrderTab('orde0')}
            >
              Orde 0 (Nol)
            </button>
            <button
              type="button"
              className={`order-tab-btn ${activeOrderTab === 'orde1' ? 'active' : ''}`}
              onClick={() => setActiveOrderTab('orde1')}
            >
              Orde 1 (Satu)
            </button>
            <button
              type="button"
              className={`order-tab-btn ${activeOrderTab === 'orde2' ? 'active' : ''}`}
              onClick={() => setActiveOrderTab('orde2')}
            >
              Orde 2 (Dua)
            </button>
          </div>

          <div className="order-display-card">
            {activeOrderTab === 'orde0' && (
              <div className="order-details">
                <div className="order-title-tag">Hukum Laju: v = k [A]⁰ = k</div>
                <h4>Karakteristik Orde 0 (Nol):</h4>
                <p>
                  Perubahan konsentrasi pereaksi <strong>sama sekali tidak memengaruhi</strong> laju reaksi. Berapapun pereaksi ditambahkan, kecepatan reaksi tetap konstan.
                </p>
                <div className="order-example-box">
                  <strong>Contoh Hubungan Angka:</strong>
                  <ul>
                    <li>Konsentrasi [A] dinaikkan <strong>2×</strong> → Laju reaksi <strong>(2)⁰ = 1×</strong> (tetap konstan).</li>
                    <li>Konsentrasi [A] dinaikkan <strong>3×</strong> → Laju reaksi <strong>(3)⁰ = 1×</strong> (tetap konstan).</li>
                  </ul>
                  <div className="graph-desc-chip">Kurva Grafik: Garis lurus horizontal sejajar sumbu X (v mendatar).</div>
                </div>
              </div>
            )}

            {activeOrderTab === 'orde1' && (
              <div className="order-details">
                <div className="order-title-tag">Hukum Laju: v = k [A]¹</div>
                <h4>Karakteristik Orde 1 (Satu):</h4>
                <p>
                  Laju reaksi berbanding <strong>lurus secara proporsional</strong> dengan konsentrasi reaktan.
                </p>
                <div className="order-example-box">
                  <strong>Contoh Hubungan Angka:</strong>
                  <ul>
                    <li>Konsentrasi [A] dinaikkan <strong>2×</strong> → Laju reaksi naik <strong>(2)¹ = 2× lebih cepat</strong>.</li>
                    <li>Konsentrasi [A] dinaikkan <strong>3×</strong> → Laju reaksi naik <strong>(3)¹ = 3× lebih cepat</strong>.</li>
                  </ul>
                  <div className="graph-desc-chip">Kurva Grafik: Garis lurus linier miring ke atas melewati titik origin (0,0).</div>
                </div>
              </div>
            )}

            {activeOrderTab === 'orde2' && (
              <div className="order-details">
                <div className="order-title-tag">Hukum Laju: v = k [A]²</div>
                <h4>Karakteristik Orde 2 (Dua):</h4>
                <p>
                  Laju reaksi berbanding lurus dengan <strong>kuadrat konsentrasi</strong> pereaksi. Perubahan konsentrasi sedikit saja memicu percepatan laju yang sangat besar.
                </p>
                <div className="order-example-box">
                  <strong>Contoh Hubungan Angka:</strong>
                  <ul>
                    <li>Konsentrasi [A] dinaikkan <strong>2×</strong> → Laju reaksi melonjak <strong>(2)² = 4× lebih cepat</strong>!</li>
                    <li>Konsentrasi [A] dinaikkan <strong>3×</strong> → Laju reaksi melonjak <strong>(3)² = 9× lebih cepat</strong>!</li>
                  </ul>
                  <div className="graph-desc-chip">Kurva Grafik: Kurva parabola melengkung naik ke atas secara eksponensial.</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tabel Data Eksperimen Interaktif */}
        <div className="labsheet-section">
          <div className="section-title-wrap">
            <h2 className="section-title">Contoh Kasus: Menentukan Orde dari Data Laboratorium</h2>
            <p className="section-subtitle">
              Reaksi hipotesis: <code>2A + B₂ → 2AB</code>. Data konsentrasi awal dan laju pembentukan produk:
            </p>
          </div>

          <div className="lab-table-container">
            <table className="lab-data-table">
              <thead>
                <tr>
                  <th>No. Percobaan</th>
                  <th>Konsentrasi Awal [A] (M)</th>
                  <th>Konsentrasi Awal [B₂] (M)</th>
                  <th>Laju Awal v (M·s⁻¹)</th>
                  <th>Tujuan Pembandingan</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>1</strong></td>
                  <td>0.10</td>
                  <td>0.10</td>
                  <td>0.02</td>
                  <td>Kondisi acuan dasar</td>
                </tr>
                <tr className="highlight-row">
                  <td><strong>2</strong></td>
                  <td><strong>0.20 (2x)</strong></td>
                  <td>0.10 (tetap)</td>
                  <td><strong>0.08 (4x)</strong></td>
                  <td>Bandingkan Perc. 1 &amp; 2: [A] naik 2x, v naik 4x = (2)² → <strong>Orde A = 2</strong></td>
                </tr>
                <tr className="highlight-row-alt">
                  <td><strong>3</strong></td>
                  <td>0.10 (tetap)</td>
                  <td><strong>0.20 (2x)</strong></td>
                  <td><strong>0.04 (2x)</strong></td>
                  <td>Bandingkan Perc. 1 &amp; 3: [B₂] naik 2x, v naik 2x = (2)¹ → <strong>Orde B₂ = 1</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="calc-solution-card">
            <div className="calc-header">Hasil Kesimpulan Matematis:</div>
            <p>
              Persamaan Hukum Laju untuk reaksi tersebut adalah: <code>v = k [A]² [B₂]¹</code>.<br />
              Orde reaksi total = <strong>2 + 1 = 3 (Tiga)</strong>.
            </p>
          </div>
        </div>

        {/* Kartu Sub-Bagian Belajar Bab 4 */}
        <div className="labsheet-section">
          <div className="section-title-wrap">
            <h2 className="section-title">Kartu Teori Bab 4</h2>
            <p className="section-subtitle">
              Pilih konsep di bawah ini untuk mempelajari teknik analisis kuantitatif:
            </p>
          </div>

          <div className="section-tabs" role="tablist" aria-label="Daftar Bagian Belajar Bab 4">
            {MODULE_4_SECTIONS.map((section) => (
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

        {/* Cek Pemahaman Mandiri Bab 4 */}
        <div className="labsheet-section">
          <div className="self-check-card">
            <div className="check-badge">UJI PEMAHAMAN MANDIRI • ORDE REAKSI</div>
            <h2 className="check-title">Pertanyaan Pemantik: Koefisien vs Orde Reaksi</h2>
            <p className="check-question">
              Sebuah reaksi memiliki persamaan stoikiometri: <code>2NO(g) + O₂(g) → 2NO₂(g)</code>. Apakah kita boleh langsung menyimpulkan bahwa orde terhadap NO adalah 2 dan terhadap O₂ adalah 1 tanpa data eksperimen?
            </p>

            <div className="check-options-grid">
              <button
                type="button"
                className={`option-btn ${selectedCheck === 'A' ? 'selected' : ''}`}
                onClick={() => { setSelectedCheck('A'); setShowExplanation(true); }}
              >
                <strong>Opsi A:</strong> Ya, orde reaksi selalu sama persis dengan angka koefisien reaksi setara.
              </button>

              <button
                type="button"
                className={`option-btn ${selectedCheck === 'B' ? 'selected' : ''}`}
                onClick={() => { setSelectedCheck('B'); setShowExplanation(true); }}
              >
                <strong>Opsi B:</strong> Tidak boleh! Orde reaksi HANYA dapat ditentukan melalui data eksperimen nyata di laboratorium, bukan ditebak dari koefisien semata.
              </button>

              <button
                type="button"
                className={`option-btn ${selectedCheck === 'C' ? 'selected' : ''}`}
                onClick={() => { setSelectedCheck('C'); setShowExplanation(true); }}
              >
                <strong>Opsi C:</strong> Ya, asalkan reaktan berada dalam fase gas.
              </button>
            </div>

            {showExplanation && (
              <div className="check-feedback-box">
                {selectedCheck === 'B' ? (
                  <div className="feedback-content feedback-correct">
                    <div className="feedback-heading">✅ Sangat Tepat! (Miskonsepsi Teratasi)</div>
                    <p>
                      Ini adalah miskonsepsi paling sering dalam kimia SMA: <strong>Orde reaksi TIDAK SELALU sama dengan koefisien stoikiometri!</strong> Orde reaksi ditentukan oleh tahapan mekanisme penentu laju (tahap lambat) yang wajib diverifikasi melalui data eksperimen.
                    </p>
                  </div>
                ) : (
                  <div className="feedback-content feedback-review">
                    <div className="feedback-heading">ℹ️ Waspada Miskonsepsi Klasik!</div>
                    <p>
                      Koefisien stoikiometri hanya menunjukkan perbandingan mol zat yang bereaksi, BUKAN bagaimana laju berubah terhadap konsentrasi. Orde reaksi harus selalu dihitung dari tabel data percobaan.
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
            ← Kembali ke Bab 3: Faktor Laju
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onNextChapter}
          >
            Lanjut ke Bab 5: Proyek STEM →
          </button>
        </div>
      </section>
    </div>
  );
};

