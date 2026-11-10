/**
 * components/virtuallab/VirtualLabHub.tsx
 * Pusat Laboratorium Virtual ReaksiLab XI (Virtual Chemistry Laboratory).
 *
 * Menghadirkan pengalaman inkuiri digital interaktif:
 * 1. Eksperimen 1: Pengaruh Konsentrasi terhadap Laju Reaksi
 * 2. Eksperimen 2: Pengaruh Suhu terhadap Laju Reaksi (Maxwell-Boltzmann & Ea)
 * 3. Eksperimen 3: Pengaruh Luas Permukaan terhadap Laju Reaksi
 * 4. Eksperimen 4: Pengaruh Katalis terhadap Laju Reaksi (Profil Energi Ea)
 * 5. Simulator Teori Tumbukan (Bab 2)
 *
 * Struktur Tiap Eksperimen (5 Bagian Konsisten):
 * A. INFORMASI EKSPERIMEN (Tujuan, Variabel Bebas, Terikat, Kontrol)
 * B. PENGATURAN PERCOBAAN (Slider / Pemilih Interaktif)
 * C. VISUALISASI EKSPERIMEN (Animasi Partikel & Fenomena Makroskopis/Submikroskopis)
 * D. HASIL PENGAMATAN (Metrik Waktu, Laju, Tabel Pengamatan Dinamis, Ekspor CSV, Grafik Real-Time)
 * E. ANALISIS DAN KESIMPULAN (Pertanyaan Reflektif Pemandu & Umpan Balik Edukatif)
 */
import React, { useState } from 'react';
import { CollisionSimulator } from './CollisionSimulator';

export type LabExperimentType = 'konsentrasi' | 'suhu' | 'luas_permukaan' | 'katalis' | 'tumbukan';

interface TableRow {
  id: number;
  runNo: number;
  testedVarValue: string;
  measuredTime: string;
  relativeRate: string;
  notes: string;
}

interface VirtualLabHubProps {
  initialExperiment?: LabExperimentType;
  onNavigateHome?: () => void;
  onNavigateRoadmap?: () => void;
}

export const VirtualLabHub: React.FC<VirtualLabHubProps> = ({
  initialExperiment = 'konsentrasi',
  onNavigateHome,
  onNavigateRoadmap,
}) => {
  const [activeExp, setActiveExp] = useState<LabExperimentType>(initialExperiment);

  // ================= 1. STATE EKSPERIMEN 1: KONSENTRASI =================
  const [concentration, setConcentration] = useState<number>(1.0); // 0.2 - 2.0 M
  const [tableDataConc, setTableDataConc] = useState<TableRow[]>([
    { id: 1, runNo: 1, testedVarValue: '0.5 M HCl', measuredTime: '60 detik', relativeRate: '0.5x', notes: 'Reaksi lambat, partikel asam renggang' },
    { id: 2, runNo: 2, testedVarValue: '1.0 M HCl', measuredTime: '30 detik', relativeRate: '1.0x (Dasar)', notes: 'Kondisi standar rujukan' },
  ]);
  const [answersConc, setAnswersConc] = useState({ q1: '', q2: '', q3: '' });
  const [feedbackConc, setFeedbackConc] = useState<boolean>(false);

  // Model kalkulasi Konsentrasi
  const rateConc = concentration; // Laju berbanding lurus (orde 1)
  const timeConc = Math.max(8, Math.round(30 / (concentration || 0.1)));
  const collisionFreqConc = Math.round(concentration * 50);

  // ================= 2. STATE EKSPERIMEN 2: SUHU =================
  const [temperature, setTemperature] = useState<number>(25); // 10 - 80 °C
  const [tableDataTemp, setTableDataTemp] = useState<TableRow[]>([
    { id: 1, runNo: 1, testedVarValue: '25 °C', measuredTime: '32 detik', relativeRate: '1.0x', notes: 'Suhu kamar standar' },
    { id: 2, runNo: 2, testedVarValue: '35 °C (+10°C)', measuredTime: '16 detik', relativeRate: '2.0x', notes: 'Laju berlipat ganda' },
  ]);
  const [answersTemp, setAnswersTemp] = useState({ q1: '', q2: '', q3: '' });
  const [feedbackTemp, setFeedbackTemp] = useState<boolean>(false);

  // Model kalkulasi Suhu (Aturan kenaikan 10°C laju melipat ~2x)
  const deltaT = temperature - 25;
  const rateTemp = Number(Math.pow(2, deltaT / 10).toFixed(2));
  const timeTemp = Math.max(3, Math.round(32 / rateTemp));
  const kineticEnergyPct = Math.round(100 + (temperature - 25) * 3);

  // ================= 3. STATE EKSPERIMEN 3: LUAS PERMUKAAN =================
  const [surfaceForm, setSurfaceForm] = useState<'bongkahan' | 'butiran' | 'serbuk'>('butiran');
  const [tableDataSurf, setTableDataSurf] = useState<TableRow[]>([
    { id: 1, runNo: 1, testedVarValue: 'Bongkahan Besar', measuredTime: '75 detik', relativeRate: '1.0x', notes: 'Hanya permukaan luar yang bereaksi' },
    { id: 2, runNo: 2, testedVarValue: 'Butiran Sedang', measuredTime: '30 detik', relativeRate: '2.5x', notes: 'Bidang sentuh bertambah' },
  ]);
  const [answersSurf, setAnswersSurf] = useState({ q1: '', q2: '', q3: '' });
  const [feedbackSurf, setFeedbackSurf] = useState<boolean>(false);

  // Model kalkulasi Luas Permukaan
  const surfConfig = {
    bongkahan: { label: 'Bongkahan Besar (1 keping)', areaRel: '1x (Minimum)', rateRel: '1.0x', time: 75, rateVal: 1.0 },
    butiran: { label: 'Butiran Sedang (10 butir)', areaRel: '3x (Sedang)', rateRel: '2.5x', time: 30, rateVal: 2.5 },
    serbuk: { label: 'Serbuk Halus (Jutaan partikel)', areaRel: '8x (Maksimum)', rateRel: '8.3x', time: 9, rateVal: 8.3 },
  }[surfaceForm];

  // ================= 4. STATE EKSPERIMEN 4: KATALIS =================
  const [hasCatalyst, setHasCatalyst] = useState<boolean>(false);
  const [tableDataCat, setTableDataCat] = useState<TableRow[]>([
    { id: 1, runNo: 1, testedVarValue: 'Tanpa Katalis', measuredTime: '80 detik', relativeRate: '1.0x', notes: 'Bukit Ea tinggi (75 kJ/mol)' },
    { id: 2, runNo: 2, testedVarValue: 'Dengan Katalis', measuredTime: '12 detik', relativeRate: '6.7x', notes: 'Ea turun menjadi 45 kJ/mol' },
  ]);
  const [answersCat, setAnswersCat] = useState({ q1: '', q2: '', q3: '', q4: '' });
  const [feedbackCat, setFeedbackCat] = useState<boolean>(false);

  // Model kalkulasi Katalis
  const catConfig = hasCatalyst
    ? { condition: 'Dengan Katalis', eaVal: 45, rateRel: '6.7x', timeSec: 12, rateVal: 6.7 }
    : { condition: 'Tanpa Katalis', eaVal: 75, rateRel: '1.0x', timeSec: 80, rateVal: 1.0 };

  // Helper fungsi pencatatan data ke tabel
  const handleAddDataRow = (exp: LabExperimentType) => {
    if (exp === 'konsentrasi') {
      const newRow: TableRow = {
        id: Date.now(),
        runNo: tableDataConc.length + 1,
        testedVarValue: `${concentration} M HCl`,
        measuredTime: `${timeConc} detik`,
        relativeRate: `${rateConc.toFixed(1)}x`,
        notes: `Frekuensi tumbukan: ~${collisionFreqConc}/detik`,
      };
      setTableDataConc([...tableDataConc, newRow]);
    } else if (exp === 'suhu') {
      const newRow: TableRow = {
        id: Date.now(),
        runNo: tableDataTemp.length + 1,
        testedVarValue: `${temperature} °C`,
        measuredTime: `${timeTemp} detik`,
        relativeRate: `${rateTemp}x`,
        notes: `Energi Kinetik Relatif: ${kineticEnergyPct}%`,
      };
      setTableDataTemp([...tableDataTemp, newRow]);
    } else if (exp === 'luas_permukaan') {
      const newRow: TableRow = {
        id: Date.now(),
        runNo: tableDataSurf.length + 1,
        testedVarValue: surfConfig.label,
        measuredTime: `${surfConfig.time} detik`,
        relativeRate: surfConfig.rateRel,
        notes: `Luas bidang sentuh: ${surfConfig.areaRel}`,
      };
      setTableDataSurf([...tableDataSurf, newRow]);
    } else if (exp === 'katalis') {
      const newRow: TableRow = {
        id: Date.now(),
        runNo: tableDataCat.length + 1,
        testedVarValue: catConfig.condition,
        measuredTime: `${catConfig.timeSec} detik`,
        relativeRate: catConfig.rateRel,
        notes: `Energi Aktivasi Ea: ${catConfig.eaVal} kJ/mol`,
      };
      setTableDataCat([...tableDataCat, newRow]);
    }
  };

  // Helper ekspor data ke CSV
  const handleExportCSV = (data: TableRow[], title: string) => {
    const headers = 'No,Variabel Diuji,Waktu Terukur,Laju Relatif,Keterangan Pengamatan\n';
    const rows = data
      .map((r) => `${r.runNo},"${r.testedVarValue}","${r.measuredTime}","${r.relativeRate}","${r.notes}"`)
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `reaksilab_${title.toLowerCase().replace(/\s+/g, '_')}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="virtual-lab-hub-wrapper">
      {/* ================= 1. HEADER UTAMA VIRTUAL LAB ================= */}
      <div className="vlab-header-banner">
        <div className="vlab-badge-pill">
          <span className="vlab-dot-live" aria-hidden="true" />
          INTERACTIVE VIRTUAL CHEMISTRY LABORATORY
        </div>
        <h1 className="vlab-main-title">Virtual Chemistry Laboratory</h1>
        <p className="vlab-main-subtitle">
          Jelajahi pengaruh berbagai faktor terhadap laju reaksi melalui eksperimen virtual.
          Ubah kondisi percobaan, amati perilaku partikel, kumpulkan data, dan analisis hasilnya.
        </p>

        {/* Tautan Navigasi Cepat */}
        <div className="vlab-quick-nav-bar">
          {onNavigateHome && (
            <button type="button" onClick={onNavigateHome} className="btn-vlab-back">
              ← Kembali ke Beranda
            </button>
          )}
          {onNavigateRoadmap && (
            <button type="button" onClick={onNavigateRoadmap} className="btn-vlab-roadmap">
              🗺️ Peta 6 Modul
            </button>
          )}
        </div>
      </div>

      {/* ================= 2. PILIHAN 4 EKSPERIMEN UTAMA + SIMULATOR TUMBUKAN ================= */}
      <div className="vlab-experiment-selector-grid" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeExp === 'konsentrasi'}
          className={`exp-select-card ${activeExp === 'konsentrasi' ? 'active' : ''}`}
          onClick={() => setActiveExp('konsentrasi')}
        >
          <div className="exp-card-top">
            <span className="exp-num-badge">EKSPERIMEN 01</span>
            <span className="exp-icon-emoji">🧪</span>
          </div>
          <h2 className="exp-card-title">Pengaruh Konsentrasi</h2>
          <p className="exp-card-desc">Kerapatan partikel reaktan terhadap frekuensi tumbukan total.</p>
          <div className="exp-card-vars">
            <span>Bebas: [Konsentrasi]</span> • <span>Terikat: Laju Reaksi</span>
          </div>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeExp === 'suhu'}
          className={`exp-select-card ${activeExp === 'suhu' ? 'active' : ''}`}
          onClick={() => setActiveExp('suhu')}
        >
          <div className="exp-card-top">
            <span className="exp-num-badge">EKSPERIMEN 02</span>
            <span className="exp-icon-emoji">🌡️</span>
          </div>
          <h2 className="exp-card-title">Pengaruh Suhu</h2>
          <p className="exp-card-desc">Energi kinetik partikel dan fraksi tumbukan berenergi &ge; Ea.</p>
          <div className="exp-card-vars">
            <span>Bebas: Suhu (°C)</span> • <span>Terikat: Laju Reaksi</span>
          </div>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeExp === 'luas_permukaan'}
          className={`exp-select-card ${activeExp === 'luas_permukaan' ? 'active' : ''}`}
          onClick={() => setActiveExp('luas_permukaan')}
        >
          <div className="exp-card-top">
            <span className="exp-num-badge">EKSPERIMEN 03</span>
            <span className="exp-icon-emoji">🧱</span>
          </div>
          <h2 className="exp-card-title">Pengaruh Luas Permukaan</h2>
          <p className="exp-card-desc">Bongkahan vs butiran vs serbuk padatan dengan massa sama.</p>
          <div className="exp-card-vars">
            <span>Bebas: Bentuk Padatan</span> • <span>Terikat: Laju Reaksi</span>
          </div>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeExp === 'katalis'}
          className={`exp-select-card ${activeExp === 'katalis' ? 'active' : ''}`}
          onClick={() => setActiveExp('katalis')}
        >
          <div className="exp-card-top">
            <span className="exp-num-badge">EKSPERIMEN 04</span>
            <span className="exp-icon-emoji">⚡</span>
          </div>
          <h2 className="exp-card-title">Pengaruh Katalis</h2>
          <p className="exp-card-desc">Penyediaan rute reaksi baru dengan energi aktivasi (Ea) rendah.</p>
          <div className="exp-card-vars">
            <span>Bebas: Keberadaan Katalis</span> • <span>Terikat: Laju Reaksi</span>
          </div>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeExp === 'tumbukan'}
          className={`exp-select-card exp-card-collision ${activeExp === 'tumbukan' ? 'active' : ''}`}
          onClick={() => setActiveExp('tumbukan')}
        >
          <div className="exp-card-top">
            <span className="exp-num-badge">SIMULATOR BAB 02</span>
            <span className="exp-icon-emoji">⚛️</span>
          </div>
          <h2 className="exp-card-title">Teori Tumbukan (Collision Simulator)</h2>
          <p className="exp-card-desc">Amati langsung tumbukan efektif vs tidak efektif antarpartikel.</p>
          <div className="exp-card-vars">
            <span>Submikroskopis</span> • <span>Energi Aktivasi Ea</span>
          </div>
        </button>
      </div>

      {/* ================= 3. RUANG EKSPERIMEN VIRTUAL SESUAI PILIHAN ================= */}
      <div className="vlab-experiment-room-container">
        {/* ===================== RUANG 1: KONSENTRASI ===================== */}
        {activeExp === 'konsentrasi' && (
          <div className="exp-room-view animate-fade-in">
            {/* Bagian A: Informasi Eksperimen */}
            <div className="exp-info-card">
              <div className="exp-info-header">
                <span className="exp-code-pill">EKSPERIMEN 1 • PENGARUH KONSENTRASI</span>
                <h2 className="exp-heading">Bagaimana Konsentrasi Memengaruhi Laju Reaksi?</h2>
              </div>
              <p className="exp-aim">
                <strong>Tujuan Percobaan:</strong> Menganalisis pengaruh perubahan konsentrasi reaktan terhadap
                frekuensi tumbukan total antarpartikel dan laju reaksi kimia.
              </p>
              <div className="exp-variables-badge-grid">
                <div className="var-chip var-free">
                  <strong>Variabel Bebas:</strong> Konsentrasi larutan reaktan HCl (0,2 – 2,0 mol/L)
                </div>
                <div className="var-chip var-bound">
                  <strong>Variabel Terikat:</strong> Waktu reaksi (detik) &amp; Laju reaksi relatif
                </div>
                <div className="var-chip var-ctrl">
                  <strong>Variabel Kontrol:</strong> Suhu sistem (25°C), Luas permukaan padatan CaCO₃, Volume larutan (20 mL)
                </div>
              </div>
            </div>

            {/* Layout 2 Kolom: B. Pengaturan & C. Visualisasi */}
            <div className="exp-interactive-two-col">
              {/* Bagian B: Pengaturan Percobaan */}
              <div className="exp-controls-box">
                <h3 className="sub-box-title">⚙️ Pengaturan Variabel Bebas</h3>
                <div className="slider-container">
                  <div className="slider-header-flex">
                    <label htmlFor="conc-slider">Konsentrasi HCl [C]:</label>
                    <span className="slider-display-val">{concentration.toFixed(1)} mol/L (M)</span>
                  </div>
                  <input
                    id="conc-slider"
                    type="range"
                    min="0.2"
                    max="2.0"
                    step="0.2"
                    value={concentration}
                    onChange={(e) => setConcentration(Number(e.target.value))}
                    className="vlab-slider"
                  />
                  <div className="slider-minmax-labels">
                    <span>0,2 M (Encer)</span>
                    <span>1,0 M (Standar)</span>
                    <span>2,0 M (Pekat)</span>
                  </div>
                </div>

                <div className="exp-quick-summary-pill">
                  <span className="summary-dot" />
                  <span>Kondisi saat ini: <strong>{concentration >= 1.4 ? 'Pekat' : concentration <= 0.6 ? 'Encer' : 'Sedang'}</strong></span>
                </div>
              </div>

              {/* Bagian C: Visualisasi Partikel & Gelas Reaksi */}
              <div className="exp-visual-box">
                <div className="visual-header-strip">
                  <span>🔬 Visualisasi Makroskopis &amp; Partikel Submikroskopis</span>
                  <span className="live-tag">● Interaktif</span>
                </div>

                <div className="beaker-simulation-display">
                  {/* Visual SVG Partikel Reaktan yang Rapat/Renggang */}
                  <svg viewBox="0 0 340 180" className="beaker-svg" aria-label="Simulasi wadah reaksi konsentrasi">
                    <rect x="20" y="20" width="300" height="140" rx="14" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
                    {/* Partikel yang jumlahnya dinamis sesuai konsentrasi */}
                    {Array.from({ length: Math.round(concentration * 18) }).map((_, i) => {
                      const px = 35 + ((i * 37) % 270);
                      const py = 35 + ((i * 29) % 110);
                      return (
                        <circle
                          key={i}
                          cx={px}
                          cy={py}
                          r={concentration > 1.4 ? 6 : 7}
                          fill={i % 2 === 0 ? '#EF4444' : '#06B6D4'}
                          opacity="0.85"
                          className="vlab-particle-pulse"
                        />
                      );
                    })}
                  </svg>
                </div>
                <p className="visual-caption">
                  {concentration >= 1.2
                    ? 'Partikel sangat rapat! Jarak antarpartikel pendek menghasilkan frekuensi tumbukan per detik yang sangat tinggi.'
                    : 'Partikel renggang. Jarak antarpartikel relatif jauh sehingga frekuensi tumbukan total berkurang.'}
                </p>
              </div>
            </div>

            {/* Bagian D: Hasil Pengamatan (Metrik, Grafik Real-Time & Tabel) */}
            <div className="exp-results-section">
              <h3 className="section-subheading">📊 D. Hasil Pengamatan &amp; Data Eksperimen</h3>

              {/* 3 Kartu Metrik Live */}
              <div className="vlab-metrics-row">
                <div className="vlab-metric-card">
                  <span className="m-label">Waktu Reaksi Terukur (t)</span>
                  <span className="m-val val-time">{timeConc} detik</span>
                  <span className="m-sub">Laju reaksi v &prop; 1/t</span>
                </div>
                <div className="vlab-metric-card">
                  <span className="m-label">Laju Reaksi Relatif (v)</span>
                  <span className="m-val val-rate">{rateConc.toFixed(1)}x</span>
                  <span className="m-sub">Relatif terhadap 1.0 M</span>
                </div>
                <div className="vlab-metric-card">
                  <span className="m-label">Frekuensi Tumbukan Relatif</span>
                  <span className="m-val val-freq">~{collisionFreqConc}/detik</span>
                  <span className="m-sub">Meningkat seiring konsentrasi</span>
                </div>
              </div>

              {/* Grafik Real-time Konsentrasi vs Laju Reaksi */}
              <div className="vlab-graph-card">
                <div className="graph-header">
                  <h4>Grafik Hubungan: Konsentrasi [C] terhadap Laju Reaksi (v)</h4>
                  <span className="graph-note">Titik aktif biru menandakan kondisi saat ini</span>
                </div>
                <div className="graph-svg-wrapper">
                  <svg viewBox="0 0 480 180" className="vlab-chart-svg" role="img" aria-label="Grafik Konsentrasi vs Laju Reaksi">
                    {/* Sumbu X & Y */}
                    <line x1="50" y1="20" x2="50" y2="150" stroke="#64748B" strokeWidth="2" />
                    <line x1="50" y1="150" x2="450" y2="150" stroke="#64748B" strokeWidth="2" />
                    <text x="45" y="15" fill="#173B78" fontSize="11" fontWeight="bold" textAnchor="end">Laju (v)</text>
                    <text x="450" y="170" fill="#173B78" fontSize="11" fontWeight="bold" textAnchor="end">Konsentrasi (mol/L) →</text>

                    {/* Garis Grid */}
                    <line x1="50" y1="85" x2="440" y2="85" stroke="#E2E8F0" strokeDasharray="3 3" />
                    <line x1="250" y1="20" x2="250" y2="150" stroke="#E2E8F0" strokeDasharray="3 3" />

                    {/* Kurva Laju vs Konsentrasi Linier v = k[C] */}
                    <line x1="50" y1="150" x2="430" y2="30" stroke="#2563EB" strokeWidth="3" />

                    {/* Titik Aktif Real-Time */}
                    {(() => {
                      const cx = 50 + (concentration / 2.0) * 380;
                      const cy = 150 - (rateConc / 2.0) * 120;
                      return (
                        <g>
                          <circle cx={cx} cy={cy} r="7" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2" />
                          <text x={cx} y={cy - 12} fill="#EF4444" fontSize="11" fontWeight="bold" textAnchor="middle">
                            ({concentration.toFixed(1)} M, {rateConc.toFixed(1)}x)
                          </text>
                        </g>
                      );
                    })()}
                  </svg>
                </div>
              </div>

              {/* Tabel Pengamatan Dinamis */}
              <div className="vlab-table-container">
                <div className="table-actions-bar">
                  <div className="table-title">Tabel Hasil Pencatatan Percobaan</div>
                  <div className="table-btn-group">
                    <button
                      type="button"
                      className="btn-add-record"
                      onClick={() => handleAddDataRow('konsentrasi')}
                    >
                      + Catat Hasil Pengamatan
                    </button>
                    <button
                      type="button"
                      className="btn-export-csv"
                      onClick={() => handleExportCSV(tableDataConc, 'Eksperimen Konsentrasi')}
                    >
                      📥 Ekspor CSV
                    </button>
                    <button
                      type="button"
                      className="btn-reset-table"
                      onClick={() => setTableDataConc([])}
                    >
                      Reset Tabel
                    </button>
                  </div>
                </div>

                <table className="vlab-data-table">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Konsentrasi HCl (Bebas)</th>
                      <th>Waktu Reaksi (Terikat)</th>
                      <th>Laju Relatif</th>
                      <th>Keterangan Pengamatan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableDataConc.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="empty-table-msg">Belum ada data dicatat. Klik tombol "+ Catat Hasil Pengamatan".</td>
                      </tr>
                    ) : (
                      tableDataConc.map((row) => (
                        <tr key={row.id}>
                          <td><strong>{row.runNo}</strong></td>
                          <td>{row.testedVarValue}</td>
                          <td className="cell-time">{row.measuredTime}</td>
                          <td className="cell-rate">{row.relativeRate}</td>
                          <td>{row.notes}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bagian E: Analisis dan Kesimpulan */}
            <div className="exp-analysis-card">
              <h3 className="section-subheading">📝 E. Analisis &amp; Kesimpulan Siswa</h3>
              <p className="analysis-guide-lead">
                Jawab pertanyaan pemandu berikut berdasarkan data yang Anda kumpulkan dari simulasi:
              </p>

              <div className="questions-form">
                <div className="q-block">
                  <label htmlFor="q1-conc">1. Apa yang terjadi ketika konsentrasi reaktan dinaikkan?</label>
                  <textarea
                    id="q1-conc"
                    rows={2}
                    placeholder="Tuliskan hasil pengamatan Anda terhadap waktu dan kecepatan reaksi..."
                    value={answersConc.q1}
                    onChange={(e) => setAnswersConc({ ...answersConc, q1: e.target.value })}
                  />
                </div>

                <div className="q-block">
                  <label htmlFor="q2-conc">2. Mengapa frekuensi tumbukan meningkat saat konsentrasi lebih pekat?</label>
                  <textarea
                    id="q2-conc"
                    rows={2}
                    placeholder="Jelaskan berdasarkan visualisasi jarak antarpartikel per satuan volume..."
                    value={answersConc.q2}
                    onChange={(e) => setAnswersConc({ ...answersConc, q2: e.target.value })}
                  />
                </div>

                <div className="q-block">
                  <label htmlFor="q3-conc">3. Bagaimana hubungan konsentrasi dengan laju reaksi berdasarkan teori tumbukan?</label>
                  <textarea
                    id="q3-conc"
                    rows={2}
                    placeholder="Tarik kesimpulan ilmiah dari hubungan kedua variabel..."
                    value={answersConc.q3}
                    onChange={(e) => setAnswersConc({ ...answersConc, q3: e.target.value })}
                  />
                </div>

                <button
                  type="button"
                  className="btn-submit-analysis"
                  onClick={() => setFeedbackConc(true)}
                >
                  Simpan &amp; Tampilkan Umpan Balik Edukatif
                </button>

                {feedbackConc && (
                  <div className="educational-feedback-box animate-fade-in">
                    <div className="feedback-head">
                      <span className="check-icon">✓</span>
                      <h4>Umpan Balik Edukatif &amp; Verifikasi Konseptual</h4>
                    </div>
                    <ul className="feedback-points">
                      <li>
                        <strong>Konsentrasi &amp; Tumbukan:</strong> Semakin tinggi konsentrasi, semakin banyak partikel reaktan per satuan volume. Akibatnya, jarak antarpartikel memendek dan peluang terjadinya tumbukan antarpartikel meningkat tajam.
                      </li>
                      <li>
                        <strong>Laju Reaksi:</strong> Dengan bertambahnya frekuensi tumbukan total, frekuensi tumbukan efektif yang menghasilkan produk juga meningkat, sehingga reaksi berlangsung lebih cepat (waktu reaksi lebih singkat).
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ===================== RUANG 2: SUHU ===================== */}
        {activeExp === 'suhu' && (
          <div className="exp-room-view animate-fade-in">
            {/* Bagian A: Informasi Eksperimen */}
            <div className="exp-info-card">
              <div className="exp-info-header">
                <span className="exp-code-pill pill-orange">EKSPERIMEN 2 • PENGARUH SUHU</span>
                <h2 className="exp-heading">Bagaimana Suhu Memengaruhi Laju Reaksi?</h2>
              </div>
              <p className="exp-aim">
                <strong>Tujuan Percobaan:</strong> Menganalisis pengaruh suhu sistem terhadap energi kinetik partikel
                dan peningkatan fraksi tumbukan efektif yang mampu melampaui energi aktivasi (\(E \ge E_a\)).
              </p>
              <div className="exp-variables-badge-grid">
                <div className="var-chip var-free">
                  <strong>Variabel Bebas:</strong> Suhu sistem reaksi (10 – 80 °C)
                </div>
                <div className="var-chip var-bound">
                  <strong>Variabel Terikat:</strong> Waktu reaksi &amp; Energi kinetik partikel
                </div>
                <div className="var-chip var-ctrl">
                  <strong>Variabel Kontrol:</strong> Konsentrasi reaktan (1,0 M), Luas permukaan zat, Volume larutan
                </div>
              </div>
            </div>

            {/* Layout 2 Kolom: B. Pengaturan & C. Visualisasi */}
            <div className="exp-interactive-two-col">
              {/* Bagian B: Pengaturan Percobaan */}
              <div className="exp-controls-box">
                <h3 className="sub-box-title">⚙️ Pengaturan Variabel Bebas</h3>
                <div className="slider-container">
                  <div className="slider-header-flex">
                    <label htmlFor="temp-slider">Suhu Sistem (T):</label>
                    <span className="slider-display-val val-orange">{temperature} °C</span>
                  </div>
                  <input
                    id="temp-slider"
                    type="range"
                    min="10"
                    max="80"
                    step="5"
                    value={temperature}
                    onChange={(e) => setTemperature(Number(e.target.value))}
                    className="vlab-slider slider-orange"
                  />
                  <div className="slider-minmax-labels">
                    <span>10 °C (Dingin)</span>
                    <span>25 °C (Suhu Kamar)</span>
                    <span>80 °C (Panas)</span>
                  </div>
                </div>

                <div className="exp-quick-summary-pill">
                  <span className="summary-dot dot-orange" />
                  <span>Kondisi termal: <strong>{temperature >= 50 ? 'Suhu Tinggi (Sangat Cepat)' : temperature <= 20 ? 'Dingin (Lambat)' : 'Normal'}</strong></span>
                </div>
              </div>

              {/* Bagian C: Visualisasi Distribusi Maxwell-Boltzmann & Kecepatan Partikel */}
              <div className="exp-visual-box">
                <div className="visual-header-strip">
                  <span>🔬 Kurva Distribusi Energi Maxwell-Boltzmann &amp; Ambang Ea</span>
                  <span className="live-tag">● Termal</span>
                </div>

                <div className="beaker-simulation-display">
                  <svg viewBox="0 0 340 180" className="beaker-svg" aria-label="Distribusi Maxwell-Boltzmann">
                    {/* Sumbu Kurva */}
                    <rect x="10" y="10" width="320" height="160" rx="10" fill="#0F172A" />
                    <line x1="30" y1="20" x2="30" y2="150" stroke="#94A3B8" strokeWidth="1.5" />
                    <line x1="30" y1="150" x2="310" y2="150" stroke="#94A3B8" strokeWidth="1.5" />
                    <text x="35" y="25" fill="#94A3B8" fontSize="9">Fraksi Partikel</text>
                    <text x="300" y="165" fill="#94A3B8" fontSize="9" textAnchor="end">Energi Kinetik (E) →</text>

                    {/* Garis Ambang Energi Aktivasi (Ea) */}
                    <line x1="210" y1="25" x2="210" y2="150" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 4" />
                    <text x="210" y="20" fill="#F59E0B" fontSize="10" fontWeight="bold" textAnchor="middle">Garis Ea</text>

                    {/* Kurva Maxwell-Boltzmann Dinamis */}
                    {(() => {
                      // Kurva bergeser ke kanan dan mendatar saat suhu naik
                      const peakX = 80 + (temperature - 10) * 1.4;
                      const peakY = 50 + (temperature - 10) * 0.7;
                      return (
                        <path
                          d={`M 30 150 Q ${peakX} ${peakY}, 210 120 T 300 145`}
                          fill="none"
                          stroke="#EF4444"
                          strokeWidth="2.5"
                        />
                      );
                    })()}

                    {/* Daerah Partikel dengan E >= Ea yang berhasil bereaksi */}
                    <rect x="210" y="120" width="90" height="30" fill="rgba(16, 185, 129, 0.3)" />
                    <text x="255" y="140" fill="#34D399" fontSize="9" textAnchor="middle" fontWeight="bold">
                      E &ge; Ea ({Math.min(90, Math.round(15 + rateTemp * 8))}%)
                    </text>
                  </svg>
                </div>
                <p className="visual-caption">
                  Saat suhu dinaikkan ke <strong>{temperature} °C</strong>, puncak kurva bergeser ke kanan:
                  fraksi molekul yang memiliki energi kinetik melampaui bukit \(E_a\) bertambah pesat!
                </p>
              </div>
            </div>

            {/* Bagian D: Hasil Pengamatan */}
            <div className="exp-results-section">
              <h3 className="section-subheading">📊 D. Hasil Pengamatan &amp; Data Eksperimen</h3>

              <div className="vlab-metrics-row">
                <div className="vlab-metric-card">
                  <span className="m-label">Waktu Reaksi Terukur (t)</span>
                  <span className="m-val val-time">{timeTemp} detik</span>
                  <span className="m-sub">Waktu berkurang drastis</span>
                </div>
                <div className="vlab-metric-card">
                  <span className="m-label">Laju Reaksi Relatif (v)</span>
                  <span className="m-val val-rate">{rateTemp}x</span>
                  <span className="m-sub">Relatif terhadap suhu 25°C</span>
                </div>
                <div className="vlab-metric-card">
                  <span className="m-label">Energi Kinetik Relatif</span>
                  <span className="m-val val-orange">{kineticEnergyPct}%</span>
                  <span className="m-sub">Kecepatan gerak partikel</span>
                </div>
              </div>

              {/* Grafik Suhu vs Laju Reaksi Eksponensial */}
              <div className="vlab-graph-card">
                <div className="graph-header">
                  <h4>Grafik Hubungan: Suhu (°C) terhadap Laju Reaksi Relatif (v)</h4>
                  <span className="graph-note">Kurva nonlinier (eksponensial)</span>
                </div>
                <div className="graph-svg-wrapper">
                  <svg viewBox="0 0 480 180" className="vlab-chart-svg" role="img" aria-label="Grafik Suhu vs Laju Reaksi">
                    <line x1="50" y1="20" x2="50" y2="150" stroke="#64748B" strokeWidth="2" />
                    <line x1="50" y1="150" x2="450" y2="150" stroke="#64748B" strokeWidth="2" />
                    <text x="45" y="15" fill="#173B78" fontSize="11" fontWeight="bold" textAnchor="end">Laju (v)</text>
                    <text x="450" y="170" fill="#173B78" fontSize="11" fontWeight="bold" textAnchor="end">Suhu (°C) →</text>

                    {/* Kurva Eksponensial */}
                    <path
                      d="M 50 148 Q 200 145, 300 110 T 440 25"
                      fill="none"
                      stroke="#EA580C"
                      strokeWidth="3"
                    />

                    {/* Titik Suhu Aktif */}
                    {(() => {
                      const cx = 50 + ((temperature - 10) / 70) * 380;
                      const cy = Math.max(25, 148 - Math.pow(2, (temperature - 10) / 18) * 6);
                      return (
                        <g>
                          <circle cx={cx} cy={cy} r="7" fill="#EA580C" stroke="#FFFFFF" strokeWidth="2" />
                          <text x={cx} y={cy - 12} fill="#EA580C" fontSize="11" fontWeight="bold" textAnchor="middle">
                            ({temperature} °C, {rateTemp}x)
                          </text>
                        </g>
                      );
                    })()}
                  </svg>
                </div>
              </div>

              {/* Tabel Data Suhu */}
              <div className="vlab-table-container">
                <div className="table-actions-bar">
                  <div className="table-title">Tabel Hasil Pencatatan Percobaan Suhu</div>
                  <div className="table-btn-group">
                    <button type="button" className="btn-add-record" onClick={() => handleAddDataRow('suhu')}>
                      + Catat Hasil Pengamatan
                    </button>
                    <button type="button" className="btn-export-csv" onClick={() => handleExportCSV(tableDataTemp, 'Eksperimen Suhu')}>
                      📥 Ekspor CSV
                    </button>
                    <button type="button" className="btn-reset-table" onClick={() => setTableDataTemp([])}>
                      Reset Tabel
                    </button>
                  </div>
                </div>

                <table className="vlab-data-table">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Suhu Sistem (Bebas)</th>
                      <th>Waktu Reaksi (Terikat)</th>
                      <th>Laju Relatif</th>
                      <th>Keterangan Pengamatan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableDataTemp.length === 0 ? (
                      <tr><td colSpan={5} className="empty-table-msg">Belum ada data dicatat.</td></tr>
                    ) : (
                      tableDataTemp.map((row) => (
                        <tr key={row.id}>
                          <td><strong>{row.runNo}</strong></td>
                          <td>{row.testedVarValue}</td>
                          <td className="cell-time">{row.measuredTime}</td>
                          <td className="cell-rate">{row.relativeRate}</td>
                          <td>{row.notes}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bagian E: Analisis dan Kesimpulan */}
            <div className="exp-analysis-card">
              <h3 className="section-subheading">📝 E. Analisis &amp; Kesimpulan Siswa</h3>
              <div className="questions-form">
                <div className="q-block">
                  <label htmlFor="q1-temp">1. Mengapa partikel bergerak lebih cepat ketika suhu sistem meningkat?</label>
                  <textarea
                    id="q1-temp"
                    rows={2}
                    placeholder="Hubungkan kalor/suhu dengan energi kinetik rata-rata partikel..."
                    value={answersTemp.q1}
                    onChange={(e) => setAnswersTemp({ ...answersTemp, q1: e.target.value })}
                  />
                </div>

                <div className="q-block">
                  <label htmlFor="q2-temp">2. Bagaimana suhu memengaruhi jumlah partikel yang mampu melampaui energi aktivasi (Ea)?</label>
                  <textarea
                    id="q2-temp"
                    rows={2}
                    placeholder="Jelaskan berdasarkan pergeseran kurva Maxwell-Boltzmann..."
                    value={answersTemp.q2}
                    onChange={(e) => setAnswersTemp({ ...answersTemp, q2: e.target.value })}
                  />
                </div>

                <div className="q-block">
                  <label htmlFor="q3-temp">3. Apakah peningkatan suhu selalu menyebabkan perubahan laju reaksi dengan besaran yang sama?</label>
                  <textarea
                    id="q3-temp"
                    rows={2}
                    placeholder="Amati kelipatan laju pada setiap kenaikan 10°C..."
                    value={answersTemp.q3}
                    onChange={(e) => setAnswersTemp({ ...answersTemp, q3: e.target.value })}
                  />
                </div>

                <button
                  type="button"
                  className="btn-submit-analysis"
                  onClick={() => setFeedbackTemp(true)}
                >
                  Simpan &amp; Tampilkan Umpan Balik Edukatif
                </button>

                {feedbackTemp && (
                  <div className="educational-feedback-box animate-fade-in">
                    <div className="feedback-head">
                      <span className="check-icon">✓</span>
                      <h4>Umpan Balik Edukatif &amp; Verifikasi Konseptual</h4>
                    </div>
                    <ul className="feedback-points">
                      <li>
                        <strong>Energi Kinetik &amp; Kecepatan:</strong> Suhu adalah ukuran energi kinetik rata-rata partikel. Kenaikan suhu membuat molekul bergerak lebih cepat dan bertumbukan lebih sering.
                      </li>
                      <li>
                        <strong>Ambang Batas Ea:</strong> Pengaruh utama suhu bukan sekadar frekuensi tumbukan, melainkan peningkatan eksponensial fraksi molekul yang memiliki energi kinetik sama atau lebih besar dari energi aktivasi (\(E \ge E_a\)).
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ===================== RUANG 3: LUAS PERMUKAAN ===================== */}
        {activeExp === 'luas_permukaan' && (
          <div className="exp-room-view animate-fade-in">
            {/* Bagian A: Informasi Eksperimen */}
            <div className="exp-info-card">
              <div className="exp-info-header">
                <span className="exp-code-pill pill-cyan">EKSPERIMEN 3 • LUAS PERMUKAAN</span>
                <h2 className="exp-heading">Apakah Ukuran Partikel Memengaruhi Kecepatan Reaksi?</h2>
              </div>
              <p className="exp-aim">
                <strong>Tujuan Percobaan:</strong> Menganalisis pengaruh luas permukaan bidang sentuh zat padat
                terhadap frekuensi tumbukan efektif dengan larutan reaktan (massa total dijaga sama: 1 gram).
              </p>
              <div className="exp-variables-badge-grid">
                <div className="var-chip var-free">
                  <strong>Variabel Bebas:</strong> Bentuk fisik padatan CaCO₃ (Bongkahan, Butiran, Serbuk)
                </div>
                <div className="var-chip var-bound">
                  <strong>Variabel Terikat:</strong> Waktu reaksi &amp; Laju reaksi relatif
                </div>
                <div className="var-chip var-ctrl">
                  <strong>Variabel Kontrol:</strong> Massa padatan (1 gram tetap), Konsentrasi asam HCl (1.0 M), Suhu (25°C)
                </div>
              </div>
            </div>

            {/* Layout 2 Kolom: B. Pengaturan & C. Visualisasi */}
            <div className="exp-interactive-two-col">
              {/* Bagian B: Pengaturan Percobaan */}
              <div className="exp-controls-box">
                <h3 className="sub-box-title">⚙️ Pengaturan Variabel Bebas</h3>
                <div className="surface-buttons-selector">
                  <button
                    type="button"
                    className={`btn-surf-opt ${surfaceForm === 'bongkahan' ? 'active' : ''}`}
                    onClick={() => setSurfaceForm('bongkahan')}
                  >
                    <span className="surf-icon">🪨</span>
                    <strong>Bongkahan Besar</strong>
                    <span className="surf-sub">1 keping utuh (1 gram)</span>
                  </button>

                  <button
                    type="button"
                    className={`btn-surf-opt ${surfaceForm === 'butiran' ? 'active' : ''}`}
                    onClick={() => setSurfaceForm('butiran')}
                  >
                    <span className="surf-icon">🧱</span>
                    <strong>Butiran Sedang</strong>
                    <span className="surf-sub">10 butir pecahan (1 gram)</span>
                  </button>

                  <button
                    type="button"
                    className={`btn-surf-opt ${surfaceForm === 'serbuk' ? 'active' : ''}`}
                    onClick={() => setSurfaceForm('serbuk')}
                  >
                    <span className="surf-icon">✨</span>
                    <strong>Serbuk Halus</strong>
                    <span className="surf-sub">Jutaan butir (1 gram)</span>
                  </button>
                </div>

                <div className="exp-quick-summary-pill">
                  <span className="summary-dot dot-cyan" />
                  <span>Bidang sentuh: <strong>{surfConfig.areaRel}</strong></span>
                </div>
              </div>

              {/* Bagian C: Visualisasi Bidang Sentuh Reaksi */}
              <div className="exp-visual-box">
                <div className="visual-header-strip">
                  <span>🔬 Kontak Reaktan Cairan dengan Permukaan Padatan</span>
                  <span className="live-tag">● Sentuh</span>
                </div>

                <div className="beaker-simulation-display">
                  <svg viewBox="0 0 340 180" className="beaker-svg" aria-label="Simulasi Luas Permukaan">
                    <rect x="20" y="20" width="300" height="140" rx="14" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
                    {/* Cairan Reaktan */}
                    <rect x="24" y="60" width="292" height="96" fill="#1E3A8A" opacity="0.6" />

                    {surfaceForm === 'bongkahan' && (
                      <g transform="translate(130, 80)">
                        <rect x="0" y="0" width="80" height="65" rx="8" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="2" />
                        <text x="40" y="38" fill="#0F172A" fontSize="11" fontWeight="bold" textAnchor="middle">1 Bongkahan</text>
                      </g>
                    )}

                    {surfaceForm === 'butiran' && (
                      <g transform="translate(50, 80)">
                        {Array.from({ length: 8 }).map((_, i) => (
                          <rect
                            key={i}
                            x={(i % 4) * 58 + 10}
                            y={Math.floor(i / 4) * 35 + 5}
                            width="28"
                            height="24"
                            rx="4"
                            fill="#F1F5F9"
                            stroke="#94A3B8"
                          />
                        ))}
                      </g>
                    )}

                    {surfaceForm === 'serbuk' && (
                      <g transform="translate(40, 75)">
                        {Array.from({ length: 55 }).map((_, i) => (
                          <circle
                            key={i}
                            cx={(i % 11) * 24 + 10}
                            cy={Math.floor(i / 11) * 14 + 10}
                            r="3.5"
                            fill="#F1F5F9"
                          />
                        ))}
                      </g>
                    )}
                  </svg>
                </div>
                <p className="visual-caption">
                  {surfaceForm === 'serbuk'
                    ? 'Serbuk membuka miliaran bidang sentuh di seluruh sudut, memungkinkan partikel asam menabrak CaCO₃ secara serempak!'
                    : 'Pada bongkahan besar, partikel di bagian dalam terlindungi dan belum dapat bertumbukan hingga lapisan luar habis bereaksi.'}
                </p>
              </div>
            </div>

            {/* Bagian D: Hasil Pengamatan */}
            <div className="exp-results-section">
              <h3 className="section-subheading">📊 D. Hasil Pengamatan &amp; Data Eksperimen</h3>

              <div className="vlab-metrics-row">
                <div className="vlab-metric-card">
                  <span className="m-label">Waktu Reaksi Terukur (t)</span>
                  <span className="m-val val-time">{surfConfig.time} detik</span>
                  <span className="m-sub">Serbuk bereaksi jauh lebih singkat</span>
                </div>
                <div className="vlab-metric-card">
                  <span className="m-label">Laju Reaksi Relatif (v)</span>
                  <span className="m-val val-rate">{surfConfig.rateRel}</span>
                  <span className="m-sub">Relatif terhadap bongkahan</span>
                </div>
                <div className="vlab-metric-card">
                  <span className="m-label">Luas Permukaan Sentuh</span>
                  <span className="m-val val-cyan">{surfConfig.areaRel}</span>
                  <span className="m-sub">Massa total sama (1 gram)</span>
                </div>
              </div>

              {/* Grafik Batang Perbandingan Bentuk Padatan terhadap Laju */}
              <div className="vlab-graph-card">
                <div className="graph-header">
                  <h4>Grafik Perbandingan: Bentuk Fisik Padatan terhadap Laju Reaksi</h4>
                  <span className="graph-note">Massa total sama (1 gram)</span>
                </div>
                <div className="graph-svg-wrapper">
                  <svg viewBox="0 0 480 180" className="vlab-chart-svg" role="img" aria-label="Grafik Luas Permukaan vs Laju Reaksi">
                    <line x1="50" y1="20" x2="50" y2="150" stroke="#64748B" strokeWidth="2" />
                    <line x1="50" y1="150" x2="450" y2="150" stroke="#64748B" strokeWidth="2" />
                    <text x="45" y="15" fill="#173B78" fontSize="11" fontWeight="bold" textAnchor="end">Laju (v)</text>

                    {/* Bar 1: Bongkahan */}
                    <rect x="90" y="135" width="65" height="15" fill={surfaceForm === 'bongkahan' ? '#06B6D4' : '#94A3B8'} rx="4" />
                    <text x="122" y="166" fill="#173B78" fontSize="10" textAnchor="middle">Bongkahan</text>
                    <text x="122" y="128" fill="#173B78" fontSize="10" fontWeight="bold" textAnchor="middle">1.0x</text>

                    {/* Bar 2: Butiran */}
                    <rect x="210" y="112" width="65" height="38" fill={surfaceForm === 'butiran' ? '#06B6D4' : '#94A3B8'} rx="4" />
                    <text x="242" y="166" fill="#173B78" fontSize="10" textAnchor="middle">Butiran</text>
                    <text x="242" y="105" fill="#173B78" fontSize="10" fontWeight="bold" textAnchor="middle">2.5x</text>

                    {/* Bar 3: Serbuk */}
                    <rect x="330" y="35" width="65" height="115" fill={surfaceForm === 'serbuk' ? '#06B6D4' : '#94A3B8'} rx="4" />
                    <text x="362" y="166" fill="#173B78" fontSize="10" textAnchor="middle">Serbuk</text>
                    <text x="362" y="28" fill="#0891B2" fontSize="11" fontWeight="bold" textAnchor="middle">8.3x</text>
                  </svg>
                </div>
              </div>

              {/* Tabel Data Luas Permukaan */}
              <div className="vlab-table-container">
                <div className="table-actions-bar">
                  <div className="table-title">Tabel Hasil Pencatatan Luas Permukaan</div>
                  <div className="table-btn-group">
                    <button type="button" className="btn-add-record" onClick={() => handleAddDataRow('luas_permukaan')}>
                      + Catat Hasil Pengamatan
                    </button>
                    <button type="button" className="btn-export-csv" onClick={() => handleExportCSV(tableDataSurf, 'Eksperimen Luas Permukaan')}>
                      📥 Ekspor CSV
                    </button>
                    <button type="button" className="btn-reset-table" onClick={() => setTableDataSurf([])}>
                      Reset Tabel
                    </button>
                  </div>
                </div>

                <table className="vlab-data-table">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Bentuk Padatan (Bebas)</th>
                      <th>Waktu Reaksi (Terikat)</th>
                      <th>Laju Relatif</th>
                      <th>Keterangan Pengamatan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableDataSurf.length === 0 ? (
                      <tr><td colSpan={5} className="empty-table-msg">Belum ada data dicatat.</td></tr>
                    ) : (
                      tableDataSurf.map((row) => (
                        <tr key={row.id}>
                          <td><strong>{row.runNo}</strong></td>
                          <td>{row.testedVarValue}</td>
                          <td className="cell-time">{row.measuredTime}</td>
                          <td className="cell-rate">{row.relativeRate}</td>
                          <td>{row.notes}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bagian E: Analisis dan Kesimpulan */}
            <div className="exp-analysis-card">
              <h3 className="section-subheading">📝 E. Analisis &amp; Kesimpulan Siswa</h3>
              <div className="questions-form">
                <div className="q-block">
                  <label htmlFor="q1-surf">1. Mengapa serbuk bereaksi jauh lebih cepat daripada bongkahan besar?</label>
                  <textarea
                    id="q1-surf"
                    rows={2}
                    placeholder="Jelaskan mengenai bidang sentuh kontak antar reaktan..."
                    value={answersSurf.q1}
                    onChange={(e) => setAnswersSurf({ ...answersSurf, q1: e.target.value })}
                  />
                </div>

                <div className="q-block">
                  <label htmlFor="q2-surf">2. Mengapa massa total zat padat harus dibuat sama (1 gram) dalam percobaan?</label>
                  <textarea
                    id="q2-surf"
                    rows={2}
                    placeholder="Jelaskan mengenai prinsip variabel kontrol dalam eksperimen ilmiah..."
                    value={answersSurf.q2}
                    onChange={(e) => setAnswersSurf({ ...answersSurf, q2: e.target.value })}
                  />
                </div>

                <div className="q-block">
                  <label htmlFor="q3-surf">3. Bagaimana luas permukaan memengaruhi frekuensi tumbukan?</label>
                  <textarea
                    id="q3-surf"
                    rows={2}
                    placeholder="Tarik kesimpulan berdasarkan teori tumbukan partikel..."
                    value={answersSurf.q3}
                    onChange={(e) => setAnswersSurf({ ...answersSurf, q3: e.target.value })}
                  />
                </div>

                <button
                  type="button"
                  className="btn-submit-analysis"
                  onClick={() => setFeedbackSurf(true)}
                >
                  Simpan &amp; Tampilkan Umpan Balik Edukatif
                </button>

                {feedbackSurf && (
                  <div className="educational-feedback-box animate-fade-in">
                    <div className="feedback-head">
                      <span className="check-icon">✓</span>
                      <h4>Umpan Balik Edukatif &amp; Verifikasi Konseptual</h4>
                    </div>
                    <ul className="feedback-points">
                      <li>
                        <strong>Luas Permukaan Sentuh:</strong> Pada zat heterogen (padat-cair), reaksi hanya terjadi pada permukaan luar padatan. Membagi padatan menjadi serbuk membuka permukaan kontak yang sebelumnya terkurung di bagian dalam.
                      </li>
                      <li>
                        <strong>Validitas Kontrol:</strong> Massa harus sama agar jumlah mol reaktan tetap konstan, sehingga murni hanya luas permukaan yang menjadi faktor penyebab perbedaan laju reaksi.
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ===================== RUANG 4: KATALIS ===================== */}
        {activeExp === 'katalis' && (
          <div className="exp-room-view animate-fade-in">
            {/* Bagian A: Informasi Eksperimen */}
            <div className="exp-info-card">
              <div className="exp-info-header">
                <span className="exp-code-pill pill-purple">EKSPERIMEN 4 • PERAN KATALIS</span>
                <h2 className="exp-heading">Bagaimana Katalis Mempercepat Reaksi Kimia?</h2>
              </div>
              <p className="exp-aim">
                <strong>Tujuan Percobaan:</strong> Memahami peran katalis dalam menyediakan rute tahapan reaksi
                alternatif dengan energi aktivasi (\(E_a\)) yang lebih rendah tanpa mengubah \(\Delta H\) maupun posisi kesetimbangan.
              </p>
              <div className="exp-variables-badge-grid">
                <div className="var-chip var-free">
                  <strong>Variabel Bebas:</strong> Keberadaan katalis (Tanpa Katalis vs Dengan Katalis)
                </div>
                <div className="var-chip var-bound">
                  <strong>Variabel Terikat:</strong> Energi aktivasi \(E_a\) &amp; Waktu reaksi
                </div>
                <div className="var-chip var-ctrl">
                  <strong>Variabel Kontrol:</strong> Suhu sistem (25°C), Konsentrasi H₂O₂ (3%), Volume larutan (50 mL)
                </div>
              </div>
            </div>

            {/* Layout 2 Kolom: B. Pengaturan & C. Visualisasi */}
            <div className="exp-interactive-two-col">
              {/* Bagian B: Pengaturan Percobaan */}
              <div className="exp-controls-box">
                <h3 className="sub-box-title">⚙️ Pengaturan Variabel Bebas</h3>
                <div className="catalyst-toggle-panel">
                  <button
                    type="button"
                    className={`btn-cat-toggle ${!hasCatalyst ? 'active' : ''}`}
                    onClick={() => setHasCatalyst(false)}
                  >
                    <span className="cat-icon">⚪</span>
                    <strong>1. Tanpa Katalis</strong>
                    <span className="cat-sub">Jalur reaksi standar (Ea Tinggi: 75 kJ/mol)</span>
                  </button>

                  <button
                    type="button"
                    className={`btn-cat-toggle ${hasCatalyst ? 'active' : ''}`}
                    onClick={() => setHasCatalyst(true)}
                  >
                    <span className="cat-icon">⚡</span>
                    <strong>2. Dengan Katalis</strong>
                    <span className="cat-sub">Jalur alternatif (Ea Rendah: 45 kJ/mol)</span>
                  </button>
                </div>

                <div className="exp-quick-summary-pill">
                  <span className="summary-dot dot-purple" />
                  <span>Ambang Energi: <strong>{hasCatalyst ? 'Ea Rendah (Reaksi Kilat)' : 'Ea Tinggi (Reaksi Lambat)'}</strong></span>
                </div>
              </div>

              {/* Bagian C: Visualisasi Profil Energi Reaksi Perbandingan */}
              <div className="exp-visual-box">
                <div className="visual-header-strip">
                  <span>🔬 Kurva Profil Energi: Jalur Tanpa Katalis vs Dengan Katalis</span>
                  <span className="live-tag">● Alternatif</span>
                </div>

                <div className="beaker-simulation-display">
                  <svg viewBox="0 0 340 180" className="beaker-svg" aria-label="Profil Energi Katalis">
                    <rect x="10" y="10" width="320" height="160" rx="10" fill="#0F172A" />
                    {/* Sumbu */}
                    <line x1="30" y1="20" x2="30" y2="150" stroke="#94A3B8" strokeWidth="1.5" />
                    <line x1="30" y1="150" x2="310" y2="150" stroke="#94A3B8" strokeWidth="1.5" />
                    <text x="35" y="25" fill="#94A3B8" fontSize="9">Energi Potensial (E)</text>

                    {/* Garis Dasar Reaktan & Produk (Tetap Sama!) */}
                    <line x1="30" y1="110" x2="90" y2="110" stroke="#60A5FA" strokeWidth="3" />
                    <text x="60" y="105" fill="#60A5FA" fontSize="10" fontWeight="bold" textAnchor="middle">Reaktan</text>

                    <line x1="250" y1="130" x2="300" y2="130" stroke="#34D399" strokeWidth="3" />
                    <text x="275" y="125" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle">Produk</text>

                    {/* 1. Kurva Tanpa Katalis (Merah, Puncak Tinggi 35) */}
                    <path
                      d="M 90 110 C 130 110, 150 35, 175 35 C 200 35, 220 130, 250 130"
                      fill="none"
                      stroke="#EF4444"
                      strokeWidth={!hasCatalyst ? 3.5 : 1.5}
                      opacity={!hasCatalyst ? 1 : 0.4}
                    />
                    <text x="175" y="28" fill="#EF4444" fontSize="9.5" textAnchor="middle" fontWeight="bold">
                      Ea Tanpa Katalis (75 kJ)
                    </text>

                    {/* 2. Kurva Dengan Katalis (Kuning/Hijau, Puncak Rendah 75) */}
                    <path
                      d="M 90 110 C 130 110, 150 75, 175 75 C 200 75, 220 130, 250 130"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth={hasCatalyst ? 3.5 : 1.5}
                      strokeDasharray={hasCatalyst ? 'none' : '3 3'}
                      opacity={hasCatalyst ? 1 : 0.4}
                    />
                    <text x="175" y="70" fill="#10B981" fontSize="9.5" textAnchor="middle" fontWeight="bold">
                      Ea Dengan Katalis (45 kJ)
                    </text>

                    {/* Panah Selisih Ea */}
                    <line x1="175" y1="75" x2="175" y2="35" stroke="#F59E0B" strokeWidth="1.5" />
                    <text x="185" y="55" fill="#F59E0B" fontSize="9">Penurunan Ea</text>
                  </svg>
                </div>
                <p className="visual-caption">
                  {hasCatalyst
                    ? 'Katalis memotong bukit energi menjadi jauh lebih rendah (Ea: 45 kJ/mol)! Perhatikan bahwa tingkat energi reaktan dan produk TETAP sama (ΔH tidak berubah).'
                    : 'Tanpa katalis, partikel harus melompati bukit aktivasi setinggi 75 kJ/mol sehingga hanya sedikit partikel yang sanggup bereaksi.'}
                </p>
              </div>
            </div>

            {/* Bagian D: Hasil Pengamatan */}
            <div className="exp-results-section">
              <h3 className="section-subheading">📊 D. Hasil Pengamatan &amp; Data Eksperimen</h3>

              <div className="vlab-metrics-row">
                <div className="vlab-metric-card">
                  <span className="m-label">Waktu Reaksi Terukur (t)</span>
                  <span className="m-val val-time">{catConfig.timeSec} detik</span>
                  <span className="m-sub">{hasCatalyst ? 'Sangat singkat' : 'Lambat'}</span>
                </div>
                <div className="vlab-metric-card">
                  <span className="m-label">Laju Reaksi Relatif (v)</span>
                  <span className="m-val val-rate">{catConfig.rateRel}</span>
                  <span className="m-sub">Kelajuan meningkat pesat</span>
                </div>
                <div className="vlab-metric-card">
                  <span className="m-label">Energi Aktivasi (Ea)</span>
                  <span className="m-val val-purple">{catConfig.eaVal} kJ/mol</span>
                  <span className="m-sub">Bukit energi yang dilompati</span>
                </div>
              </div>

              {/* Tabel Data Katalis */}
              <div className="vlab-table-container">
                <div className="table-actions-bar">
                  <div className="table-title">Tabel Hasil Pencatatan Efek Katalis</div>
                  <div className="table-btn-group">
                    <button type="button" className="btn-add-record" onClick={() => handleAddDataRow('katalis')}>
                      + Catat Hasil Pengamatan
                    </button>
                    <button type="button" className="btn-export-csv" onClick={() => handleExportCSV(tableDataCat, 'Eksperimen Katalis')}>
                      📥 Ekspor CSV
                    </button>
                    <button type="button" className="btn-reset-table" onClick={() => setTableDataCat([])}>
                      Reset Tabel
                    </button>
                  </div>
                </div>

                <table className="vlab-data-table">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Kondisi Katalis (Bebas)</th>
                      <th>Waktu Reaksi (Terikat)</th>
                      <th>Laju Relatif</th>
                      <th>Keterangan Pengamatan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableDataCat.length === 0 ? (
                      <tr><td colSpan={5} className="empty-table-msg">Belum ada data dicatat.</td></tr>
                    ) : (
                      tableDataCat.map((row) => (
                        <tr key={row.id}>
                          <td><strong>{row.runNo}</strong></td>
                          <td>{row.testedVarValue}</td>
                          <td className="cell-time">{row.measuredTime}</td>
                          <td className="cell-rate">{row.relativeRate}</td>
                          <td>{row.notes}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bagian E: Analisis dan Kesimpulan */}
            <div className="exp-analysis-card">
              <h3 className="section-subheading">📝 E. Analisis &amp; Kesimpulan Siswa</h3>
              <div className="questions-form">
                <div className="q-block">
                  <label htmlFor="q1-cat">1. Bagaimana mekanisme kerja katalis dalam mempercepat reaksi?</label>
                  <textarea
                    id="q1-cat"
                    rows={2}
                    placeholder="Jelaskan mengenai penyediaan jalur tahapan reaksi baru..."
                    value={answersCat.q1}
                    onChange={(e) => setAnswersCat({ ...answersCat, q1: e.target.value })}
                  />
                </div>

                <div className="q-block">
                  <label htmlFor="q2-cat">2. Mengapa energi aktivasi menjadi lebih rendah ketika menggunakan katalis?</label>
                  <textarea
                    id="q2-cat"
                    rows={2}
                    placeholder="Hubungkan dengan keadaan transisi (kompleks teraktivasi) alternatif..."
                    value={answersCat.q2}
                    onChange={(e) => setAnswersCat({ ...answersCat, q2: e.target.value })}
                  />
                </div>

                <div className="q-block">
                  <label htmlFor="q3-cat">3. Apakah katalis mengubah energi pereaksi, energi produk, atau nilai perubahan entalpi (ΔH)?</label>
                  <textarea
                    id="q3-cat"
                    rows={2}
                    placeholder="Amati garis tingkat energi reaktan dan produk pada grafik..."
                    value={answersCat.q3}
                    onChange={(e) => setAnswersCat({ ...answersCat, q3: e.target.value })}
                  />
                </div>

                <div className="q-block">
                  <label htmlFor="q4-cat">4. Apakah katalis mengubah posisi kesetimbangan kimia reaksi?</label>
                  <textarea
                    id="q4-cat"
                    rows={2}
                    placeholder="Jelaskan pengaruh katalis terhadap reaksi maju dan reaksi balik..."
                    value={answersCat.q4}
                    onChange={(e) => setAnswersCat({ ...answersCat, q4: e.target.value })}
                  />
                </div>

                <button
                  type="button"
                  className="btn-submit-analysis"
                  onClick={() => setFeedbackCat(true)}
                >
                  Simpan &amp; Tampilkan Umpan Balik Edukatif
                </button>

                {feedbackCat && (
                  <div className="educational-feedback-box animate-fade-in">
                    <div className="feedback-head">
                      <span className="check-icon">✓</span>
                      <h4>Umpan Balik Edukatif &amp; Verifikasi Konseptual</h4>
                    </div>
                    <ul className="feedback-points">
                      <li>
                        <strong>Jalur Alternatif:</strong> Katalis tidak menurunkan puncak kurva asli, melainkan membuka rute reaksi baru dengan energi aktivasi (\(E_a\)) yang lebih rendah.
                      </li>
                      <li>
                        <strong>Integritas Termodinamika:</strong> Energi reaktan dan produk tetap sama, sehingga \(\Delta H\) tidak berubah sama sekali. Katalis mempercepat laju reaksi maju dan balik dalam laju yang sama sehingga <em>tidak menggeser posisi kesetimbangan</em>, hanya mempercepat waktu pencapaian kesetimbangan.
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ===================== RUANG 5: SIMULATOR TEORI TUMBUKAN (BAB 2) ===================== */}
        {activeExp === 'tumbukan' && (
          <div className="exp-room-view animate-fade-in">
            <div className="exp-info-card">
              <div className="exp-info-header">
                <span className="exp-code-pill pill-purple">LAB TEORI TUMBUKAN • BAB 2</span>
                <h2 className="exp-heading">Collision Theory Simulator</h2>
              </div>
              <p className="exp-aim">
                <strong>Tujuan Penyelidikan:</strong> Mengamati secara visual interaksi partikel submikroskopis,
                membedakan tumbukan efektif yang menghasilkan produk dengan tumbukan tidak efektif, serta
                menganalisis pengaruh kecepatan dan ambang batas energi aktivasi (\(E_a\)).
              </p>
            </div>

            {/* Komponen Canvas Simulator Teori Tumbukan */}
            <CollisionSimulator />
          </div>
        )}
      </div>
    </div>
  );
};

