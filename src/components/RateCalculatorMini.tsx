import React, { useState } from 'react';

export const RateCalculatorMini: React.FC = () => {
  const [initialConc, setInitialConc] = useState<number>(0.8);
  const [finalConc, setFinalConc] = useState<number>(0.2);
  const [duration, setDuration] = useState<number>(20);

  // Perhitungan matematis laju reaksi
  const deltaC = finalConc - initialConc;
  const safeDuration = duration > 0 ? duration : 1;
  const rateReactant = -deltaC / safeDuration;

  return (
    <div className="rate-calculator-card" aria-labelledby="calc-title">
      <div className="calc-header">
        <span className="calc-icon" aria-hidden="true">
          🧪
        </span>
        <div>
          <h4 id="calc-title" className="calc-title">
            Simulasi Interaktif: Uji Hitung Laju Rata-Rata Pereaksi
          </h4>
          <p className="calc-subtitle">
            Coba masukkan konsentrasi pereaksi awal, konsentrasi sisa, dan selang waktu reaksi untuk
            melihat penjabaran langkah matematisnya secara transparan.
          </p>
        </div>
      </div>

      <div className="calc-inputs-grid">
        <div className="input-field">
          <label htmlFor="init-conc" className="input-label">
            Konsentrasi Awal [A]₀ (M atau mol/L)
          </label>
          <input
            id="init-conc"
            type="number"
            step="0.05"
            min="0"
            max="10"
            className="input-control"
            value={initialConc}
            onChange={(e) => setInitialConc(parseFloat(e.target.value) || 0)}
          />
        </div>

        <div className="input-field">
          <label htmlFor="final-conc" className="input-label">
            Konsentrasi Sisa [A]ₜ (M atau mol/L)
          </label>
          <input
            id="final-conc"
            type="number"
            step="0.05"
            min="0"
            max="10"
            className="input-control"
            value={finalConc}
            onChange={(e) => setFinalConc(parseFloat(e.target.value) || 0)}
          />
        </div>

        <div className="input-field">
          <label htmlFor="duration-time" className="input-label">
            Selang Waktu Δt (detik)
          </label>
          <input
            id="duration-time"
            type="number"
            step="1"
            min="1"
            max="3600"
            className="input-control"
            value={duration}
            onChange={(e) => setDuration(Math.max(1, parseFloat(e.target.value) || 1))}
          />
        </div>
      </div>

      {/* Penjabaran Langkah Demi Langkah */}
      <div className="calc-steps-box">
        <h5 className="steps-title">Langkah Penyelesaian Berdasarkan Konsep Mol & Waktu:</h5>

        <div className="step-row">
          <span className="step-num">1</span>
          <div className="step-content">
            <span className="step-label">Hitung perubahan konsentrasi (Δ[A]):</span>
            <code className="step-math">
              Δ[A] = [A]ₜ - [A]₀ = {finalConc.toFixed(3)} M - {initialConc.toFixed(3)} M ={' '}
              {deltaC.toFixed(3)} M
            </code>
          </div>
        </div>

        <div className="step-row">
          <span className="step-num">2</span>
          <div className="step-content">
            <span className="step-label">
              Terapkan rumus laju pengurangan pereaksi (dengan tanda minus):
            </span>
            <code className="step-math">
              r_A = - (Δ[A] / Δt) = - ({deltaC.toFixed(3)} M / {safeDuration} s)
            </code>
          </div>
        </div>

        <div className="step-result-box">
          <span className="result-label">Laju Reaksi Rata-Rata (r_A):</span>
          <span className="result-value">
            {rateReactant.toFixed(4)} <span className="result-unit">M/s (mol·L⁻¹·s⁻¹)</span>
          </span>
          <p className="result-explanation">
            {deltaC < 0
              ? '✅ Konsentrasi pereaksi berkurang secara wajar seiring waktu bertambah, menghasilkan laju bernilai positif.'
              : deltaC === 0
                ? 'ℹ️ Konsentrasi tidak mengalami perubahan (reaksi belum berjalan atau laju reaksi = 0).'
                : '⚠️ Perhatian: Pada reaktan murni, konsentrasi biasanya menurun (Δ[A] negatif). Jika bertambah, pastikan ini bukan zat produk.'}
          </p>
        </div>
      </div>
    </div>
  );
};

