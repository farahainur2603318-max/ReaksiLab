import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ModuleCard } from './components/ModuleCard';
import { LabStudySheet } from './components/LabStudySheet';
import { Footer } from './components/Footer';
import { MODULES_DATA } from './data/modulesData';
import './App.css';

/**
 * Komponen Utama: App
 * --------------------------------------------------------------------------
 * Dirancang dengan alur yang mudah dipahami bagi pembelajar React:
 * 1. State `currentView`: menentukan apakah pengguna berada di 'home' (Peta Modul)
 *    atau 'lab' (Lembar Belajar Laboratorium).
 * 2. Fungsi `handleStartLearning`: menangani klik tombol "Mulai Belajar".
 * 3. Tampilan responsif yang nyaman dibaca di layar HP maupun komputer.
 */
function App() {
  // State untuk mengontrol tampilan aktif
  const [currentView, setCurrentView] = useState<'home' | 'lab'>('home');

  // Aksi ketika siswa menekan "Mulai Belajar" dari Hero
  const handleStartLearning = () => {
    setCurrentView('lab');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Aksi ketika siswa membuka kartu modul
  const handleOpenModule = (moduleId: number) => {
    if (moduleId === 1) {
      setCurrentView('lab');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Kembali ke beranda peta modul
  const handleBackToHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-layout">
      {/* 1. Bar Navigasi Atas */}
      <Navbar currentView={currentView} onNavigate={(view) => setCurrentView(view)} />

      <main className="main-content">
        {currentView === 'home' ? (
          <>
            {/* 2. Bagian Hero: Judul, Sasaran Pengguna, Penjelasan Singkat, & Tombol Mulai Belajar */}
            <Hero onStartLearning={handleStartLearning} />

            {/* 3. Peta Belajar ReaksiLab: Kartu Modul 1 Aktif & Kartu Modul Rencana (Belum Tersedia) */}
            <section className="modules-section" aria-labelledby="modules-roadmap-heading">
              <div className="section-header-block">
                <span className="section-tag">Peta Jalur Pembelajaran</span>
                <h2 id="modules-roadmap-heading" className="section-main-heading">
                  Peta Belajar ReaksiLab XI
                </h2>
                <p className="section-subtext">
                  Jalur belajar berurutan sesuai kurikulum kimia SMA. Modul 1 saat ini telah aktif
                  dan siap dipelajari, sementara modul lanjutan sedang disiapkan untuk tahap berikutnya.
                </p>
              </div>

              {/* Grid Kartu Modul */}
              <div className="modules-grid">
                {MODULES_DATA.map((module) => (
                  <ModuleCard
                    key={module.id}
                    module={module}
                    onOpenModule={handleOpenModule}
                  />
                ))}
              </div>
            </section>
          </>
        ) : (
          /* 4. Tampilan Lembar Belajar Laboratorium (Modul 1 Aktif) */
          <LabStudySheet onBackToHome={handleBackToHome} />
        )}
      </main>

      {/* 5. Footer Platform */}
      <Footer />
    </div>
  );
}

export default App;
