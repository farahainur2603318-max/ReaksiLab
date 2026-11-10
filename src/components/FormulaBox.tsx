import React from 'react';

export const FormulaBox: React.FC = () => {
  return (
    <section className="formula-showcase" aria-labelledby="formula-title">
      <div className="formula-header">
        <span className="formula-icon" aria-hidden="true">
          📐
        </span>
        <div>
          <h3 id="formula-title" className="formula-heading">
            Ruang Rumus Laboratorium & Definisi Konsep Mol
          </h3>
          <p className="formula-subheading">
            Representasi matematis dan simbolik laju reaksi berdasarkan perubahan mol zat terlarut per
            satuan waktu.
          </p>
        </div>
      </div>

      <div className="formula-grid">
        {/* Kartu 1: Definisi Molaritas & Mol */}
        <div className="formula-card">
          <div className="formula-badge">Fondasi 1: Konsep Mol & Molaritas</div>
          <div className="formula-display">
            <div className="math-row">
              <span className="math-var">M</span>
              <span className="math-op">=</span>
              <div className="math-fraction">
                <span className="fraction-top">n (mol zat terlarut)</span>
                <span className="fraction-bottom">V (Volume larutan dalam Liter)</span>
              </div>
            </div>
          </div>
          <div className="formula-explanation">
            <p>
              <strong>Mol (n)</strong> menyatakan jumlah partikel zat (1 mol = 6,022 × 10²³ partikel).
              Dalam larutan cair, konsentrasi pereaksi diukur sebagai <strong>Molaritas (M)</strong>{' '}
              atau notasi kurung siku <code>[A]</code> dengan satuan <code>mol/L</code>.
            </p>
          </div>
        </div>

        {/* Kartu 2: Rumus Laju Reaksi */}
        <div className="formula-card">
          <div className="formula-badge">Fondasi 2: Laju Reaksi Rata-Rata</div>
          <div className="formula-display">
            <div className="math-row">
              <span className="math-var">r</span>
              <span className="math-op">=</span>
              <span className="math-op">±</span>
              <div className="math-fraction">
                <span className="fraction-top">Δ[Konsentrasi Molar]</span>
                <span className="fraction-bottom">Δt (Selang Waktu)</span>
              </div>
            </div>
          </div>
          <div className="formula-explanation">
            <p>
              Perubahan konsentrasi <code>Δ[C] = [C]akhir - [C]awal</code> dibagi dengan selang waktu{' '}
              <code>Δt = takhir - tawal</code>. Satuan standar laju reaksi adalah{' '}
              <code>M/s</code> (molar per detik) atau <code>mol·L⁻¹·s⁻¹</code>.
            </p>
          </div>
        </div>

        {/* Kartu 3: Tanda Negatif dan Positif */}
        <div className="formula-card">
          <div className="formula-badge">Fondasi 3: Aturan Tanda Laju</div>
          <div className="formula-display-dual">
            <div className="dual-item">
              <span className="dual-label">Laju Pengurangan Pereaksi (Reaktan):</span>
              <div className="math-row math-compact">
                <span className="math-var">r_A</span>
                <span className="math-op">=</span>
                <span className="math-op">-</span>
                <div className="math-fraction">
                  <span className="fraction-top">Δ[A]</span>
                  <span className="fraction-bottom">Δt</span>
                </div>
              </div>
            </div>

            <div className="dual-item">
              <span className="dual-label">Laju Pertambahan Hasil Reaksi (Produk):</span>
              <div className="math-row math-compact">
                <span className="math-var">r_P</span>
                <span className="math-op">=</span>
                <span className="math-op">+</span>
                <div className="math-fraction">
                  <span className="fraction-top">Δ[P]</span>
                  <span className="fraction-bottom">Δt</span>
                </div>
              </div>
            </div>
          </div>
          <div className="formula-explanation">
            <p>
              Tanda <strong>minus (-)</strong> disertakan karena jumlah mol dan konsentrasi pereaksi{' '}
              <em>selalu berkurang</em> (nilai Δ[A] bernilai negatif), sehingga nilai laju reaksi{' '}
              <code>r</code> tetap positif sesuai kaidah ilmiah.
            </p>
          </div>
        </div>

        {/* Kartu 4: Hubungan Stoikiometri Reaksi */}
        <div className="formula-card">
          <div className="formula-badge">Fondasi 4: Hubungan Koefisien Reaksi</div>
          <div className="formula-display">
            <div className="reaction-equation">
              <code>aA + bB → cC + dD</code>
            </div>
            <div className="math-row math-scrollable">
              <span className="math-var">r</span>
              <span className="math-op">=</span>
              <span className="math-term">- <sup>1</sup>/<sub>a</sub> (Δ[A]/Δt)</span>
              <span className="math-op">=</span>
              <span className="math-term">- <sup>1</sup>/<sub>b</sub> (Δ[B]/Δt)</span>
              <span className="math-op">=</span>
              <span className="math-term">+ <sup>1</sup>/<sub>c</sub> (Δ[C]/Δt)</span>
              <span className="math-op">=</span>
              <span className="math-term">+ <sup>1</sup>/<sub>d</sub> (Δ[D]/Δt)</span>
            </div>
          </div>
          <div className="formula-explanation">
            <p>
              Perbandingan laju reaksi antarzat selalu sebanding dengan koefisien reaksi setara
              masing-masing zat berdasarkan perbandingan mol reaksi stoikiometri.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

