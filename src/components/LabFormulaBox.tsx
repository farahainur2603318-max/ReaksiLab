/**
 * components/LabFormulaBox.tsx
 * Komponen khusus "Ruang Rumus Laboratorium".
 * Memberikan ruang yang lapang, hierarki jelas, dan penjelasan simbol
 * spesifik untuk materi laju reaksi (laju berkurangnya pereaksi vs bertambahnya produk).
 */
import React from 'react';

export const LabFormulaBox: React.FC = () => {
  return (
    <div className="lab-formula-box" aria-labelledby="formula-heading">
      <div className="formula-header">
        <span className="formula-tag">RUANG RUMUS UTAMA</span>
        <span className="formula-sheet-ref">Persamaan Matematis Laju Reaksi</span>
      </div>

      {/* Tampilan Rumus Utama dengan tipografi besar dan ruang lega */}
      <div className="formula-display-container">
        <div className="formula-equation" role="math" aria-label="Laju reaksi v sama dengan minus perubahan konsentrasi pereaksi per selang waktu, sama dengan plus perubahan konsentrasi produk per selang waktu">
          <div className="equation-term">
            <span className="symbol-var">v</span>
            <span className="symbol-label">Laju Reaksi</span>
          </div>

          <span className="equation-equals">=</span>

          <div className="equation-fraction-group">
            <span className="sign-negative">−</span>
            <div className="fraction">
              <span className="numerator">Δ[Pereaksi]</span>
              <span className="fraction-bar"></span>
              <span className="denominator">Δt</span>
            </div>
            <span className="fraction-label">Laju Berkurangnya Pereaksi</span>
          </div>

          <span className="equation-equals">=</span>

          <div className="equation-fraction-group">
            <span className="sign-positive">+</span>
            <div className="fraction">
              <span className="numerator">Δ[Produk]</span>
              <span className="fraction-bar"></span>
              <span className="denominator">Δt</span>
            </div>
            <span className="fraction-label">Laju Bertambahnya Produk</span>
          </div>
        </div>
      </div>

      {/* Keterangan Simbol dan Satuan Kimia */}
      <div className="formula-legend-grid">
        <div className="legend-item">
          <div className="legend-symbol">v (atau r)</div>
          <div className="legend-desc">
            <strong>Laju Reaksi:</strong> Kecepatan pengurangan konsentrasi pereaksi atau pertambahan produk.
            <div className="legend-unit">Satuan: <strong>M · s⁻¹</strong> (atau mol · L⁻¹ · s⁻¹)</div>
          </div>
        </div>

        <div className="legend-item">
          <div className="legend-symbol">Δ[ ]</div>
          <div className="legend-desc">
            <strong>Perubahan Konsentrasi Molar:</strong> Selisih konsentrasi akhir dikurangi awal (<code>[Zat]ₜ - [Zat]₀</code>).
            <div className="legend-unit">Satuan: <strong>Molar (M) = mol/Liter</strong></div>
          </div>
        </div>

        <div className="legend-item">
          <div className="legend-symbol">Δt</div>
          <div className="legend-desc">
            <strong>Selang Waktu Reaksi:</strong> Waktu berlangsungnya reaksi (<code>t₂ - t₁</code>).
            <div className="legend-unit">Satuan: <strong>detik (s)</strong> atau menit</div>
          </div>
        </div>

        <div className="legend-item">
          <div className="legend-symbol">Tanda (− / +)</div>
          <div className="legend-desc">
            <strong>Makna Kimiawi:</strong> Tanda <em>minus</em> menunjukkan reaktan <strong>berkurang</strong>, tanda <em>plus</em> produk <strong>bertambah</strong>. Nilai laju reaksi itu sendiri selalu positif.
          </div>
        </div>
      </div>
    </div>
  );
};

