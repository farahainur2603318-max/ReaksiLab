/**
 * components/virtuallab/CollisionSimulator.tsx
 * Simulator Teori Tumbukan (Collision Theory Simulator) - Bab 2.
 *
 * Fitur:
 * - Simulasi partikel submikroskopis berbasis HTML5 Canvas
 * - Membedakan tumbukan efektif (E >= Ea + orientasi tepat -> reaksi pembentukan produk) vs tidak efektif (memantul elastis)
 * - Kontrol interaktif: Kecepatan partikel, Energi kinetik, dan Jumlah partikel
 * - Tombol Mulai, Jeda, dan Reset
 * - Indikator live real-time: Total Tumbukan, Tumbukan Efektif, Tumbukan Tidak Efektif, % Efektif
 * - Visualisasi kilau energi aktivasi saat tumbukan efektif
 */
import React, { useState, useEffect, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  type: 'A' | 'B' | 'Product';
  color: string;
}

interface Sparkle {
  x: number;
  y: number;
  life: number;
  maxLife: number;
}

export const CollisionSimulator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);

  // Parameter kontrol simulasi
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [particleCount, setParticleCount] = useState<number>(24);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(2); // 1 = lambat, 2 = sedang, 3 = cepat
  const [energyLevel, setEnergyLevel] = useState<number>(2); // 1 = rendah (E < Ea), 2 = sedang (E ~ Ea), 3 = tinggi (E > Ea)

  // Metrik Live Real-time
  const [totalCollisions, setTotalCollisions] = useState<number>(0);
  const [effectiveCollisions, setEffectiveCollisions] = useState<number>(0);
  const [ineffectiveCollisions, setIneffectiveCollisions] = useState<number>(0);

  // State partikel & efek kilau
  const particlesRef = useRef<Particle[]>([]);
  const sparklesRef = useRef<Sparkle[]>([]);

  // Inisialisasi partikel
  const initParticles = (count: number) => {
    const width = 560;
    const height = 300;
    const newParticles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const isTypeA = i % 2 === 0;
      const angle = Math.random() * Math.PI * 2;
      const speed = (0.8 + Math.random() * 0.8) * speedMultiplier;

      newParticles.push({
        id: i,
        x: 30 + Math.random() * (width - 60),
        y: 30 + Math.random() * (height - 60),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 9,
        type: isTypeA ? 'A' : 'B',
        color: isTypeA ? '#EF4444' : '#06B6D4', // Merah (A) & Cyan (B)
      });
    }

    particlesRef.current = newParticles;
    sparklesRef.current = [];
  };

  // Reset simulasi
  const handleReset = () => {
    setTotalCollisions(0);
    setEffectiveCollisions(0);
    setIneffectiveCollisions(0);
    initParticles(particleCount);
  };

  // Toggle pause/play
  const handleTogglePlay = () => {
    setIsRunning((prev) => !prev);
  };

  // Re-inisialisasi ketika jumlah partikel diubah
  useEffect(() => {
    initParticles(particleCount);
  }, [particleCount]);

  // Update kecepatan partikel saat slider kecepatan diubah
  useEffect(() => {
    particlesRef.current.forEach((p) => {
      const currentSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy) || 1;
      const angle = Math.atan2(p.vy, p.vx);
      const targetSpeed = (0.8 + Math.random() * 0.8) * speedMultiplier;
      p.vx = Math.cos(angle) * targetSpeed;
      p.vy = Math.sin(angle) * targetSpeed;
    });
  }, [speedMultiplier]);

  // Loop Fisika & Animasi Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let localTotal = totalCollisions;
    let localEffective = effectiveCollisions;
    let localIneffective = ineffectiveCollisions;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;

      // 1. Bersihkan Canvas dengan latar belakang laboratorium digital
      ctx.fillStyle = '#0F172A'; // Dark slate lab arena
      ctx.fillRect(0, 0, width, height);

      // Gambar grid lab halus
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 25;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Border reaktor
      ctx.strokeStyle = '#38BDF8';
      ctx.lineWidth = 2.5;
      ctx.strokeRect(4, 4, width - 8, height - 8);

      const particles = particlesRef.current;

      if (isRunning) {
        // 2. Pembaruan posisi & deteksi dinding
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;

          // Tabrakan dengan dinding wadah
          if (p.x - p.radius < 6) {
            p.x = 6 + p.radius;
            p.vx = -p.vx;
          } else if (p.x + p.radius > width - 6) {
            p.x = width - 6 - p.radius;
            p.vx = -p.vx;
          }

          if (p.y - p.radius < 6) {
            p.y = 6 + p.radius;
            p.vy = -p.vy;
          } else if (p.y + p.radius > height - 6) {
            p.y = height - 6 - p.radius;
            p.vy = -p.vy;
          }
        }

        // 3. Deteksi tumbukan antarpartikel
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const p1 = particles[i];
            const p2 = particles[j];

            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const minDist = p1.radius + p2.radius;

            if (dist < minDist) {
              // Terjadi tumbukan fisik!
              localTotal += 1;

              // Pisahkan partikel agar tidak saling menembus
              const overlap = (minDist - dist) / 2;
              const nx = dx / (dist || 1);
              const ny = dy / (dist || 1);
              p1.x -= nx * overlap;
              p1.y -= ny * overlap;
              p2.x += nx * overlap;
              p2.y += ny * overlap;

              // Tukar kecepatan secara elastis
              const kx = p1.vx - p2.vx;
              const ky = p1.vy - p2.vy;
              const p = 2 * (nx * kx + ny * ky) / 2;
              p1.vx -= p * nx;
              p1.vy -= p * ny;
              p2.vx += p * nx;
              p2.vy += p * ny;

              // Evaluasi: Apakah Tumbukan Efektif?
              // Syarat 1: Reaktan A bertumbukan dengan Reaktan B (orientasi & pasangan tepat)
              // Syarat 2: Energi kinetik memenuhi ambang Ea (ditentukan oleh slider energyLevel)
              const isDifferentType = (p1.type === 'A' && p2.type === 'B') || (p1.type === 'B' && p2.type === 'A');

              // Probabilitas energi melampaui Ea berdasarkan energyLevel:
              // Level 1 (Rendah / E < Ea): peluang efektif hanya ~8%
              // Level 2 (Sedang / E ~ Ea): peluang efektif ~35%
              // Level 3 (Tinggi / E > Ea): peluang efektif ~70%
              const effectiveProb = energyLevel === 1 ? 0.08 : energyLevel === 2 ? 0.35 : 0.70;
              const isEffective = isDifferentType && Math.random() < effectiveProb;

              if (isEffective) {
                localEffective += 1;
                // Tambahkan efek kilau kilat reaksi
                sparklesRef.current.push({
                  x: (p1.x + p2.x) / 2,
                  y: (p1.y + p2.y) / 2,
                  life: 18,
                  maxLife: 18,
                });

                // Berikan efek kilau warna produk sementara
                p1.color = '#F59E0B'; // Emas sementara
                p2.color = '#10B981'; // Hijau sementara
                setTimeout(() => {
                  p1.color = p1.type === 'A' ? '#EF4444' : '#06B6D4';
                  p2.color = p2.type === 'A' ? '#EF4444' : '#06B6D4';
                }, 350);
              } else {
                localIneffective += 1;
              }
            }
          }
        }
      }

      // 4. Gambar partikel
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Glow halo partikel
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius + 3, 0, Math.PI * 2);
        ctx.fillStyle = p.color === '#EF4444' ? 'rgba(239, 68, 68, 0.25)' : 'rgba(6, 182, 212, 0.25)';
        ctx.fill();

        // Bola partikel
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Label teks molekul A/B
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 9px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.type, p.x, p.y);
      }

      // 5. Gambar efek kilau tumbukan efektif
      const sparkles = sparklesRef.current;
      for (let s = sparkles.length - 1; s >= 0; s--) {
        const sp = sparkles[s];
        const progress = sp.life / sp.maxLife;
        const radius = (1 - progress) * 24 + 4;

        ctx.save();
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(245, 158, 11, ${progress})`;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Kilau bintang
        ctx.fillStyle = `rgba(255, 255, 255, ${progress})`;
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('⚡Ea!', sp.x, sp.y - radius - 2);
        ctx.restore();

        sp.life -= 1;
        if (sp.life <= 0) {
          sparkles.splice(s, 1);
        }
      }

      // Perbarui state counters ke React secara berkala
      setTotalCollisions(localTotal);
      setEffectiveCollisions(localEffective);
      setIneffectiveCollisions(localIneffective);

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [isRunning, energyLevel, speedMultiplier]);

  const effectivePercentage =
    totalCollisions > 0 ? ((effectiveCollisions / totalCollisions) * 100).toFixed(1) : '0.0';

  return (
    <div className="collision-simulator-container" aria-label="Simulator Teori Tumbukan Partikel">
      {/* Header Simulator */}
      <div className="sim-header-bar">
        <div className="sim-title-group">
          <span className="sim-tag-submicro">TINGKAT SUBMIKROSKOPIS • BAB 2</span>
          <h3 className="sim-main-title">Collision Theory Simulator</h3>
          <p className="sim-desc">
            Amati gerakan molekul reaktan A (merah) dan B (cyan). Partikel yang bertumbukan dengan orientasi
            tepat dan energi \(\ge E_a\) akan menghasilkan <strong>tumbukan efektif</strong> (kilau ⚡Ea).
          </p>
        </div>

        {/* Tombol Play / Pause / Reset */}
        <div className="sim-playback-controls">
          <button
            type="button"
            className={`btn-play-pause ${isRunning ? 'is-playing' : 'is-paused'}`}
            onClick={handleTogglePlay}
            aria-label={isRunning ? 'Jeda Simulasi' : 'Mulai Simulasi'}
          >
            <span aria-hidden="true">{isRunning ? '⏸️ Jeda' : '▶️ Mulai'}</span>
          </button>
          <button
            type="button"
            className="btn-sim-reset"
            onClick={handleReset}
            title="Reset Jumlah Tumbukan & Partikel"
            aria-label="Reset simulasi"
          >
            <span aria-hidden="true">🔄 Reset</span>
          </button>
        </div>
      </div>

      {/* Area Canvas Visualisasi Partikel */}
      <div className="sim-canvas-wrapper">
        <canvas
          ref={canvasRef}
          width={560}
          height={300}
          className="sim-canvas-viewport"
        />

        {/* Legend Warna Partikel */}
        <div className="sim-canvas-legend">
          <div className="legend-chip">
            <span className="dot-particle-a" />
            <span>Reaktan A (Merah)</span>
          </div>
          <div className="legend-chip">
            <span className="dot-particle-b" />
            <span>Reaktan B (Cyan)</span>
          </div>
          <div className="legend-chip">
            <span className="dot-sparkle" />
            <span>Tumbukan Efektif (⚡Ea)</span>
          </div>
        </div>
      </div>

      {/* Baris Live Indicators (Total, Efektif, Tidak Efektif, Persentase) */}
      <div className="sim-live-metrics-grid">
        <div className="metric-box box-total">
          <span className="metric-box-label">Total Tumbukan Fisik</span>
          <span className="metric-box-val">{totalCollisions}</span>
          <span className="metric-box-hint">Seluruh kontak fisik partikel</span>
        </div>

        <div className="metric-box box-effective">
          <span className="metric-box-label">Tumbukan Efektif (E ≥ Ea)</span>
          <span className="metric-box-val val-green">{effectiveCollisions}</span>
          <span className="metric-box-hint">Menghasilkan reaksi kimia</span>
        </div>

        <div className="metric-box box-ineffective">
          <span className="metric-box-label">Tumbukan Tidak Efektif</span>
          <span className="metric-box-val val-muted">{ineffectiveCollisions}</span>
          <span className="metric-box-hint">Memantul kembali tanpa reaksi</span>
        </div>

        <div className="metric-box box-percentage">
          <span className="metric-box-label">% Tumbukan Efektif</span>
          <span className="metric-box-val val-cyan">{effectivePercentage}%</span>
          <span className="metric-box-hint">Penentu utama laju reaksi</span>
        </div>
      </div>

      {/* Panel Kontrol Variabel Simulasi */}
      <div className="sim-controls-panel">
        <div className="sim-controls-grid">
          {/* Kontrol 1: Jumlah Partikel (Konsentrasi Partikel) */}
          <div className="control-slider-card">
            <div className="slider-label-row">
              <label htmlFor="particle-count-slider">
                <strong>Jumlah Partikel:</strong> {particleCount} partikel
              </label>
              <span className="slider-hint">Simulasi Konsentrasi</span>
            </div>
            <input
              id="particle-count-slider"
              type="range"
              min="10"
              max="40"
              step="2"
              value={particleCount}
              onChange={(e) => setParticleCount(Number(e.target.value))}
              className="lab-range-slider"
            />
            <div className="slider-endpoints">
              <span>10 (Encer)</span>
              <span>24 (Sedang)</span>
              <span>40 (Pekat)</span>
            </div>
          </div>

          {/* Kontrol 2: Kecepatan Gerak Partikel */}
          <div className="control-slider-card">
            <div className="slider-label-row">
              <label htmlFor="speed-slider">
                <strong>Kecepatan Gerak:</strong> {speedMultiplier === 1 ? 'Lambat' : speedMultiplier === 2 ? 'Sedang' : 'Tinggi'}
              </label>
              <span className="slider-hint">Pengaruh Suhu</span>
            </div>
            <input
              id="speed-slider"
              type="range"
              min="1"
              max="3"
              step="1"
              value={speedMultiplier}
              onChange={(e) => setSpeedMultiplier(Number(e.target.value))}
              className="lab-range-slider"
            />
            <div className="slider-endpoints">
              <span>1 (Lambat)</span>
              <span>2 (Normal)</span>
              <span>3 (Cepat)</span>
            </div>
          </div>

          {/* Kontrol 3: Tingkat Energi Partikel vs Ea */}
          <div className="control-slider-card">
            <div className="slider-label-row">
              <label htmlFor="energy-slider">
                <strong>Tingkat Energi Partikel:</strong> {energyLevel === 1 ? 'Rendah (E < Ea)' : energyLevel === 2 ? 'Sedang (E ≈ Ea)' : 'Tinggi (E ≥ Ea)'}
              </label>
              <span className="slider-hint">Ambang Batas Ea</span>
            </div>
            <input
              id="energy-slider"
              type="range"
              min="1"
              max="3"
              step="1"
              value={energyLevel}
              onChange={(e) => setEnergyLevel(Number(e.target.value))}
              className="lab-range-slider"
            />
            <div className="slider-endpoints">
              <span>Rendah (E &lt; Ea)</span>
              <span>Sedang</span>
              <span>Tinggi (E &gt; Ea)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Catatan Konseptual Edukatif */}
      <div className="sim-concept-footnote">
        <span className="footnote-icon" aria-hidden="true">💡</span>
        <p>
          <strong>Prinsip Teori Tumbukan Kimia:</strong> Peningkatan konsentrasi menambah frekuensi tumbukan total,
          sedangkan kenaikan suhu dan pemakaian katalis melipatgandakan persentase partikel yang berhasil mencapai
          tumbukan efektif (\(E \ge E_a\)).
        </p>
      </div>
    </div>
  );
};

