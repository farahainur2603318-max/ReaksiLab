import React, { useState } from 'react';
import { FormulaBox } from './FormulaBox';
import { RateCalculatorMini } from './RateCalculatorMini';

interface LabStudySheetProps {
  onBackToHome: () => void;
}

export const LabStudySheet: React.FC<LabStudySheetProps> = ({ onBackToHome }) => {
  const [activeTab, setActiveTab] = useState<'makro' | 'submikro' | 'simbolik'>('makro');

  return (
    <div className="lab-sheet-container" id="study-sheet">
      {/* Header Lembar Kerja Lab */}
      <div className="lab-sheet-header">
        <button
          type="button"
          className="btn-back"
          onClick={onBackToHome}
          aria-label="Kembali ke Beranda Peta Modul"
        >
          <span aria-hidden="true">←</span>
          <span>Kembali ke Peta Modul</span>
        </button>

        <div className="lab-badge-strip">
          <span className="lab-id-badge">LKPD Digital 01</span>
          <span className="lab-topic-badge">Topik: Laju Reaksi & Konsep Mol</span>
          <span className="lab-target-badge">Tingkat: SMA Kelas XI</span>
        </div>

        <h2 className="lab-sheet-title">
          Lembar Belajar Laboratorium: Mengenal Laju Reaksi
        </h2>
        <p className="lab-sheet-lead">
          Pelajari bagaimana reaksi kimia berlangsung melalui keterpaduan tiga tingkat representasi:
          pengamatan makroskopis, penataan partikel submikroskopis berdasarkan mol, dan perumusan
          matematika simbolik.
        </p>
      </div>

      {/* Navigasi Tab 3 Level Representasi */}
      <div className="representation-tabs" role="tablist" aria-label="Tiga Level Kimia">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'makro'}
          className={`tab-item ${activeTab === 'makro' ? 'tab-item-active' : ''}`}
          onClick={() => setActiveTab('makro')}
        >
          <span className="tab-number">1</span>
          <div className="tab-label-group">
            <span className="tab-title">Makroskopis</span>
            <span className="tab-desc">Fenomena Teramati</span>
          </div>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'submikro'}
          className={`tab-item ${activeTab === 'submikro' ? 'tab-item-active' : ''}`}
          onClick={() => setActiveTab('submikro')}
        >
          <span className="tab-number">2</span>
          <div className="tab-label-group">
            <span className="tab-title">Submikroskopis</span>
            <span className="tab-desc">Mol & Partikel</span>
          </div>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'simbolik'}
          className={`tab-item ${activeTab === 'simbolik' ? 'tab-item-active' : ''}`}
          onClick={() => setActiveTab('simbolik')}
        >
          <span className="tab-number">3</span>
          <div className="tab-label-group">
            <span className="tab-title">Simbolik & Rumus</span>
            <span className="tab-desc">Perhitungan Laju</span>
          </div>
        </button>
      </div>

      {/* KONTEN TAB 1: MAKROSKOPIS */}
      {activeTab === 'makro' && (
        <section className="tab-panel animate-fade-in" aria-labelledby="makro-heading">
          <div className="section-intro">
            <h3 id="makro-heading" className="section-title">
              1. Level Makroskopis: Mengamati Perbedaan Kecepatan Reaksi
            </h3>
            <p className="section-lead">
              Di kehidupan nyata, reaksi kimia tidak terjadi dalam tempo yang sama. Ada reaksi yang
              selesai dalam hitungan milidetik, sementara reaksi lainnya memerlukan waktu berbulan-bulan.
            </p>
          </div>

          <div className="phenomena-comparison-grid">
            <div className="phenomena-card fast-reaction">
              <div className="phenomena-tag tag-fast">⚡ Reaksi Cepat</div>
              <h4 className="phenomena-title">Tablet Effervescent dalam Air</h4>
              <div className="phenomena-metric">
                <span className="metric-label">Durasi Waktu Teramati:</span>
                <span className="metric-value">15 – 45 Detik</span>
              </div>
              <p className="phenomena-text">
                Ketika tablet dilarutkan ke dalam air, asam sitrat dan natrium bikarbonat langsung
                bereaksi menghasilkan gelembung gas karbondioksida (CO₂) dengan cepat hingga tablet
                habis terlarut.
              </p>
              <div className="observation-tip">
                <strong>Indikator pengamatan:</strong> Gelembung gas muncul deras dan massa larutan
                berkurang cepat karena pelepasan gas.
              </div>
            </div>

            <div className="phenomena-card slow-reaction">
              <div className="phenomena-tag tag-slow">⏳ Reaksi Lambat</div>
              <h4 className="phenomena-title">Perkaratan Besi (Korosi)</h4>
              <div className="phenomena-metric">
                <span className="metric-label">Durasi Waktu Teramati:</span>
                <span className="metric-value">Berminggu-minggu s.d. Berbulan-bulan</span>
              </div>
              <p className="phenomena-text">
                Besi bereaksi dengan oksigen dan uap air di udara terbuka membentuk karat besi (Fe₂O₃·xH₂O).
                Perubahan warna dan kerapuhan struktur besi memerlukan waktu lama untuk terlihat jelas.
              </p>
              <div className="observation-tip">
                <strong>Indikator pengamatan:</strong> Perubahan warna dari abu-abu mengilap menjadi
                cokelat kemerahan terjadi secara perlahan.
              </div>
            </div>
          </div>

          <div className="inquiry-box">
            <span className="inquiry-badge">Pertanyaan Pemantik Inkuiri:</span>
            <p className="inquiry-question">
              "Apa yang membedakan kedua peristiwa di atas? Mengapa jumlah partikel yang bereaksi
              tiap detiknya bisa sangat berbeda? Klik tab berikutnya untuk melihat apa yang terjadi di
              tingkat partikel!"
            </p>
            <button
              type="button"
              className="btn-next-tab"
              onClick={() => setActiveTab('submikro')}
            >
              Lanjut ke Tingkat Submikroskopis (Konsep Mol) →
            </button>
          </div>
        </section>
      )}

      {/* KONTEN TAB 2: SUBMIKROSKOPIS */}
      {activeTab === 'submikro' && (
        <section className="tab-panel animate-fade-in" aria-labelledby="submikro-heading">
          <div className="section-intro">
            <h3 id="submikro-heading" className="section-title">
              2. Level Submikroskopis: Konsep Mol dan Partikel dalam Wadah Reaksi
            </h3>
            <p className="section-lead">
              Untuk mengukur seberapa cepat reaksi berlangsung, kimiawan menghubungkan jumlah partikel
              zat (dinyatakan dalam <strong>mol</strong>) dengan ruang larutan (dinyatakan dalam{' '}
              <strong>Molaritas</strong>).
            </p>
          </div>

          <div className="mole-concept-deep-dive">
            <div className="concept-explanation-card">
              <h4 className="concept-card-title">🔍 Mengapa Konsep Mol Sangat Penting di Laju Reaksi?</h4>
              <ul className="concept-points">
                <li>
                  <strong>Partikel Terlalu Kecil untuk Dihitung Satu per Satu:</strong> Satu tetes
                  larutan mengandung triliunan atom/molekul. Oleh karena itu, Satuan Internasional (SI)
                  menggunakan konsep <strong>mol (n)</strong> sebagai paket jumlah partikel:
                  <div className="sub-callout">
                    <code>1 mol zat = 6,022 × 10²³ partikel (Bilangan Avogadro)</code>
                  </div>
                </li>
                <li>
                  <strong>Molaritas (M) Menyatakan Kerapatan Partikel:</strong> Laju reaksi sangat
                  bergantung pada seberapa padat partikel pereaksi berada di dalam larutan:
                  <div className="sub-callout">
                    <code>Molaritas (M) = mol zat terlarut / Volume larutan (Liter) = mol/L</code>
                  </div>
                  Makin banyak mol pereaksi dalam volume yang sama, makin rapat partikelnya, dan makin
                  sering partikel saling bertumbukan.
                </li>
                <li>
                  <strong>Dinamika Perubahan Partikel Seiring Waktu:</strong>
                  <div className="dynamics-grid">
                    <div className="dynamics-card reactant">
                      <span className="dynamics-badge">Pereaksi (Reaktan A)</span>
                      <p>
                        Partikel reaktan saling bertumbukan dan berubah menjadi zat baru. Akibatnya,
                        jumlah mol <code>[A]</code> <strong>berkurang terus-menerus</strong> seiring
                        berjalannya detik reaksi.
                      </p>
                    </div>
                    <div className="dynamics-card product">
                      <span className="dynamics-badge">Hasil Reaksi (Produk B)</span>
                      <p>
                        Partikel produk baru terbentuk dari pemutusan dan penyusunan ulang ikatan.
                        Akibatnya, jumlah mol <code>[B]</code> <strong>bertambah terus-menerus</strong>{' '}
                        seiring bertambahnya waktu.
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="graph-explanation-card">
              <h4 className="concept-card-title">📈 Sketsa Grafik Perubahan Konsentrasi vs Waktu</h4>
              <div className="graph-sketch-container">
                <svg
                  className="graph-svg"
                  viewBox="0 0 500 240"
                  role="img"
                  aria-label="Grafik Konsentrasi terhadap Waktu"
                >
                  {/* Grid Lines */}
                  <line x1="60" y1="30" x2="60" y2="190" stroke="var(--border)" strokeWidth="2" />
                  <line x1="60" y1="190" x2="460" y2="190" stroke="var(--border)" strokeWidth="2" />

                  {/* Axis Labels */}
                  <text x="25" y="110" className="svg-label y-axis-label">
                    Konsentrasi [M] (mol/L)
                  </text>
                  <text x="220" y="225" className="svg-label x-axis-label">
                    Waktu t (detik)
                  </text>

                  {/* Kurva Pereaksi (Menurun) */}
                  <path
                    d="M 60 50 Q 180 160, 440 175"
                    fill="none"
                    stroke="#dc2626"
                    strokeWidth="3.5"
                  />
                  <text x="280" y="115" fill="#dc2626" fontWeight="600" fontSize="13">
                    Pereaksi [A] (Berkurang)
                  </text>

                  {/* Kurva Produk (Menaik) */}
                  <path
                    d="M 60 190 Q 180 80, 440 60"
                    fill="none"
                    stroke="#16a34a"
                    strokeWidth="3.5"
                  />
                  <text x="280" y="68" fill="#16a34a" fontWeight="600" fontSize="13">
                    Produk [P] (Bertambah)
                  </text>

                  {/* Points */}
                  <circle cx="60" cy="50" r="4" fill="#dc2626" />
                  <circle cx="60" cy="190" r="4" fill="#16a34a" />
                </svg>
              </div>
              <p className="graph-caption">
                <em>Keterangan Grafik Model:</em> Kemiringan (gradien) kurva paling curam di awal reaksi
                karena konsentrasi mol reaktan masih maksimal, lalu kurva perlahan melandai seiring
                habisnya reaktan.
              </p>
            </div>
          </div>

          <div className="inquiry-box">
            <span className="inquiry-badge">Langkah Selanjutnya:</span>
            <p className="inquiry-question">
              "Bagaimana kimiawan merumuskan perubahan konsentrasi dan waktu ini ke dalam rumus matematis
              baku? Mari kita bedah di Ruang Rumus Simbolik!"
            </p>
            <button
              type="button"
              className="btn-next-tab"
              onClick={() => setActiveTab('simbolik')}
            >
              Lanjut ke Tingkat Simbolik & Ruang Rumus →
            </button>
          </div>
        </section>
      )}

      {/* KONTEN TAB 3: SIMBOLIK & RUANG RUMUS */}
      {activeTab === 'simbolik' && (
        <section className="tab-panel animate-fade-in" aria-labelledby="simbolik-heading">
          <div className="section-intro">
            <h3 id="simbolik-heading" className="section-title">
              3. Level Simbolik: Ruang Rumus & Laju Reaksi Rata-Rata
            </h3>
            <p className="section-lead">
              Bagian ini menyediakan ruang rumus terstruktur dengan notasi kimia standar, penjelasan
              tanda minus/plus matematis, serta alat bantu latihan hitung interaktif.
            </p>
          </div>

          {/* Komponen Ruang Rumus Terbuka & Jelas */}
          <FormulaBox />

          {/* Simulator Mini Hitung Laju */}
          <div className="calculator-section-wrapper">
            <RateCalculatorMini />
          </div>

          <div className="lab-summary-card">
            <div className="summary-header">
              <span className="summary-icon" aria-hidden="true">
                📋
              </span>
              <h4 className="summary-title">Rangkuman Kunci Lembar Belajar Modul 1</h4>
            </div>
            <ul className="summary-list">
              <li>
                <strong>Laju Reaksi:</strong> Kecepatan berkurangnya molaritas pereaksi atau
                bertambahnya molaritas produk reaksi per satuan waktu (sekon).
              </li>
              <li>
                <strong>Konsep Mol:</strong> Mengaitkan jumlah partikel mikroskopis zat terlarut dengan
                volume larutan agar laju reaksi dapat dihitung secara kuantitatif dalam satuan{' '}
                <code>M/s</code> atau <code>mol·L⁻¹·s⁻¹</code>.
              </li>
              <li>
                <strong>Tanda Minus (-):</strong> Wajib ditulis pada rumus reaktan{' '}
                <code>r = -Δ[A]/Δt</code> agar hasil perhitungan laju selalu bernilai positif.
              </li>
              <li>
                <strong>Perbandingan Laju:</strong> Mengikuti koefisien stoikiometri persamaan reaksi
                yang sudah disetarakan.
              </li>
            </ul>
          </div>
        </section>
      )}
    </div>
  );
};

