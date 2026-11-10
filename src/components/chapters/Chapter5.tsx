/**
 * components/chapters/Chapter5.tsx
 * Halaman Lengkap Bab 5: Proyek Investigasi STEM (Detektor Kekeruhan Berbasis Arduino)
 */
import React, { useState } from 'react';
import { MODULE_5_SECTIONS } from '../../data/modulesData';

interface Chapter5Props {
  onBackToHome: () => void;
  onPrevChapter: () => void;
  onNextChapter: () => void;
}

export const Chapter5: React.FC<Chapter5Props> = ({ onBackToHome, onPrevChapter, onNextChapter }) => {
  const [activeSectionId, setActiveSectionId] = useState<string>('sec-5-1');
  const [testStage, setTestStage] = useState<'awal' | 'tengah' | 'akhir'>('awal');
  const [selectedCheck, setSelectedCheck] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  const activeSection = MODULE_5_SECTIONS.find((sec) => sec.id === activeSectionId) || MODULE_5_SECTIONS[0];

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
          Beranda / <strong>Bab 5: Proyek Investigasi STEM (Detektor Kekeruhan)</strong>
        </span>
      </div>

      <section className="labsheet-container" aria-labelledby="chapter5-title">
        {/* Header Lembar Kerja */}
        <div className="labsheet-header">
          <div className="labsheet-meta">
            <span className="labsheet-code">LKPD-XI-05 • INVESTIGASI TEKNOLOGI STEM</span>
            <span className="labsheet-topic">KIMIA SMA KELAS XI</span>
          </div>
          <h1 id="chapter5-title" className="labsheet-title">
            Bab 5: Proyek STEM — Detektor Kekeruhan
          </h1>
          <p className="labsheet-lead">
            Merancang instrumen sederhana pengukur kekeruhan (turbiditas) larutan menggunakan sensor LDR
            dan mikrokontroler Arduino untuk mencatat laju pembentukan endapan secara objektif.
          </p>

          <div className="labsheet-info-strip">
            <div className="strip-item">
              <span className="strip-label">Integrasi STEM:</span>
              <span className="strip-value">Sains (Kimia), Teknologi (Sensor), Rekayasa (Instrumen), Matematika (Data)</span>
            </div>
            <div className="strip-item">
              <span className="strip-label">Fokus Kritis:</span>
              <span className="strip-value">Validitas Pengukuran, Kalibrasi, &amp; Keselamatan Lab</span>
            </div>
            <div className="strip-item">
              <span className="strip-label">Akses:</span>
              <span className="strip-value value-ready">✓ Terbuka Penuh (Open Access)</span>
            </div>
          </div>
        </div>

        {/* Peringatan Keselamatan Laboratorium (Mandatory AGENTS.md & PRD) */}
        <div className="labsheet-section">
          <div className="safety-warning-banner">
            <div className="safety-icon" aria-hidden="true">⚠️</div>
            <div className="safety-content">
              <strong>PERINGATAN KESELAMATAN LABORATORIUM (SAFETY PROTOCOL):</strong>
              <p>
                Jika Anda memilih menguji reaksi pembentukan endapan belerang antara <strong>Natrium Tiosulfat (Na₂S₂O₃)</strong> dan <strong>Asam Klorida (HCl)</strong>, reaksi tersebut menghasilkan gas <strong>Sulfur Dioksida (SO₂)</strong> yang berbau menyengat dan dapat mengiritasi saluran pernapasan.
              </p>
              <ul>
                <li><strong>Wajib di bawah pengawasan Guru Kimia</strong> dan dilakukan di lemari asam atau ruangan dengan ventilasi udara yang sangat baik.</li>
                <li><strong>Dilarang keras</strong> dilakukan sebagai percobaan mandiri di kamar tidur atau ruang tertutup tanpa ventilasi!</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Skema Rangkaian Instrumen STEM Interaktif */}
        <div className="labsheet-section">
          <div className="lab-formula-box">
            <div className="formula-header">
              <span className="formula-tag">SKEMA RANGKAIAN OPTOELEKTRONIKA STEM</span>
              <div className="diagram-toggle-group">
                <button
                  type="button"
                  className={`toggle-btn ${testStage === 'awal' ? 'active' : ''}`}
                  onClick={() => setTestStage('awal')}
                >
                  t = 0s (Jernih)
                </button>
                <button
                  type="button"
                  className={`toggle-btn ${testStage === 'tengah' ? 'active' : ''}`}
                  onClick={() => setTestStage('tengah')}
                >
                  t = 15s (Mulai Keruh)
                </button>
                <button
                  type="button"
                  className={`toggle-btn ${testStage === 'akhir' ? 'active' : ''}`}
                  onClick={() => setTestStage('akhir')}
                >
                  t = 35s (Sangat Keruh)
                </button>
              </div>
            </div>

            {/* Visualisasi Skema Kerja LED - Larutan - LDR - Arduino */}
            <div className="stem-diagram-container">
              <div className="stem-block stem-source">
                <div className="stem-icon">💡</div>
                <div className="stem-label">LED Putih</div>
                <div className="stem-sub">Sumber Cahaya Konstan</div>
              </div>

              <div className="stem-arrow">➔</div>

              <div className={`stem-block stem-beaker ${testStage}`}>
                <div className="beaker-liquid">
                  {testStage === 'awal' && <span className="liquid-status">Larutan Jernih Transparan</span>}
                  {testStage === 'tengah' && <span className="liquid-status">Mulai Terbentuk Koloid S(s)</span>}
                  {testStage === 'akhir' && <span className="liquid-status">Endapan Belerang Pekat</span>}
                </div>
                <div className="stem-label">Wadah Reaksi (Kuvet)</div>
                <div className="stem-sub">Jarak tetap ke sensor</div>
              </div>

              <div className="stem-arrow">➔</div>

              <div className="stem-block stem-sensor">
                <div className="stem-icon">⚡</div>
                <div className="stem-label">Sensor LDR</div>
                <div className="stem-sub">Membaca Intensitas Cahaya</div>
              </div>

              <div className="stem-arrow">➔</div>

              <div className="stem-block stem-arduino">
                <div className="stem-icon">💻</div>
                <div className="stem-label">Arduino Analog Pin (A0)</div>
                <div className="stem-reading">
                  {testStage === 'awal' && 'ADC: 920 (Cahaya Penuh)'}
                  {testStage === 'tengah' && 'ADC: 510 (Cahaya Sebagian Terhalang)'}
                  {testStage === 'akhir' && 'ADC: 110 (Cahaya Terhalang Penuh)'}
                </div>
              </div>
            </div>

            <div className="formula-legend-grid">
              <div className="legend-item">
                <div className="legend-symbol">Validitas Data</div>
                <div className="legend-desc">
                  <strong>Bukan Konsentrasi Langsung:</strong> Nilai ADC Arduino hanya menunjukkan hambatan sensor cahaya. Tanpa grafik kalibrasi khusus, nilai ini tidak boleh diklaim sebagai konsentrasi molaritas zat secara langsung.
                </div>
              </div>
              <div className="legend-item">
                <div className="legend-symbol">Kontrol Fisik</div>
                <div className="legend-desc">
                  <strong>Jarak &amp; Cahaya Sekitar:</strong> Seluruh perakitan harus berada dalam wadah kedap cahaya ruang (gelap) dengan posisi LED dan LDR yang terkunci kokoh agar tidak bergeser.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Kartu Sub-Bagian Belajar Bab 5 */}
        <div className="labsheet-section">
          <div className="section-title-wrap">
            <h2 className="section-title">Kartu Panduan Proyek STEM</h2>
            <p className="section-subtitle">
              Tiga aspek krusial dalam merancang penyelidikan berbasis instrumen sains:
            </p>
          </div>

          <div className="section-tabs" role="tablist" aria-label="Daftar Bagian Belajar Bab 5">
            {MODULE_5_SECTIONS.map((section) => (
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

        {/* Cek Pemahaman Mandiri Bab 5 */}
        <div className="labsheet-section">
          <div className="self-check-card">
            <div className="check-badge">UJI PEMAHAMAN MANDIRI • INTEGRASI INSTRUMEN SAINS</div>
            <h2 className="check-title">Pertanyaan Pemantik: Apa yang Sebenarnya Diukur oleh Sensor LDR?</h2>
            <p className="check-question">
              Seorang siswa menuliskan kesimpulan: "Berdasarkan grafik pembacaan Arduino, konsentrasi asam klorida pada detik ke-20 adalah 450 ADC." Apakah kesimpulan ini benar secara kaidah ilmiah?
            </p>

            <div className="check-options-grid">
              <button
                type="button"
                className={`option-btn ${selectedCheck === 'A' ? 'selected' : ''}`}
                onClick={() => { setSelectedCheck('A'); setShowExplanation(true); }}
              >
                <strong>Opsi A:</strong> Benar, karena nilai ADC Arduino otomatis setara dengan nilai molaritas larutan.
              </button>

              <button
                type="button"
                className={`option-btn ${selectedCheck === 'B' ? 'selected' : ''}`}
                onClick={() => { setSelectedCheck('B'); setShowExplanation(true); }}
              >
                <strong>Opsi B:</strong> Salah! Nilai ADC hanya mencerminkan hambatan sensor cahaya akibat hamburan oleh endapan, bukan konsentrasi asam klorida secara langsung.
              </button>

              <button
                type="button"
                className={`option-btn ${selectedCheck === 'C' ? 'selected' : ''}`}
                onClick={() => { setSelectedCheck('C'); setShowExplanation(true); }}
              >
                <strong>Opsi C:</strong> Benar, asalkan warna lampu LED yang digunakan adalah warna merah.
              </button>
            </div>

            {showExplanation && (
              <div className="check-feedback-box">
                {selectedCheck === 'B' ? (
                  <div className="feedback-content feedback-correct">
                    <div className="feedback-heading">✅ Sangat Tepat! (Penalaran Ilmiah Kritis)</div>
                    <p>
                      Sensor LDR hanya mendeteksi <strong>intensitas foton cahaya</strong> yang berhasil menembus wadah reaksi. Menyimpulkan nilai sensor sebagai konsentrasi zat tanpa kurva kalibrasi standar adalah kekeliruan interpretasi instrumen.
                    </p>
                  </div>
                ) : (
                  <div className="feedback-content feedback-review">
                    <div className="feedback-heading">ℹ️ Pahami Keterbatasan Sensor Instrumen!</div>
                    <p>
                      Sensor elektronika tidak "menghitung molekul", melainkan mengubah sinyal fisika (cahaya) menjadi hambatan listrik. Untuk menjadi nilai konsentrasi kimia, diperlukan proses kalibrasi yang valid.
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
            ← Kembali ke Bab 4: Data & Orde Reaksi
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onNextChapter}
          >
            Lanjut ke Bab 6: Evaluasi Akhir & Refleksi →
          </button>
        </div>
      </section>
    </div>
  );
};

