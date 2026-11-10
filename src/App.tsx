/**
 * App.tsx
 * Komponen utama (Root Component) ReaksiLab XI.
 *
 * Mengontrol navigasi antara Beranda (Home) dan Bab 1 s.d. Bab 6.
 * Beranda telah diredesain dengan konsep "Modern Interactive Digital Chemistry Laboratory":
 * - Hero 2-kolom interaktif dengan ilustrasi lab kimia digital SVG
 * - Tiga Tingkat Representasi Kimia (Makroskopis, Submikroskopis, Simbolik)
 * - Peta Perjalanan Belajar 6 Modul Lengkap
 * - Section Ajakan Belajar (CTA)
 * - Footer informatif & minimalis
 */
import React, { useState } from 'react';
import type { ViewMode, UserProfile } from './types';
import { AuthPage } from './components/auth/AuthPage';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ThreeLevelsSection } from './components/ThreeLevelsSection';
import { ModuleRoadmap } from './components/ModuleRoadmap';
import { CtaSection } from './components/CtaSection';
import { Chapter1 } from './components/chapters/Chapter1';
import { Chapter2 } from './components/chapters/Chapter2';
import { Chapter3 } from './components/chapters/Chapter3';
import { Chapter4 } from './components/chapters/Chapter4';
import { Chapter5 } from './components/chapters/Chapter5';
import { Chapter6 } from './components/chapters/Chapter6';
import { Footer } from './components/Footer';
import './App.css';

export const App: React.FC = () => {
  // Ambil data sesi pengguna yang tersimpan di localStorage (jika ada)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('reaksilab_user_profile');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // State untuk mengontrol tampilan aktif:
  // Jika ada sesi pengguna tersimpan langsung ke 'home', jika belum maka dimulai dari 'auth' (halaman sebelum beranda)
  const [currentView, setCurrentView] = useState<ViewMode>(() => {
    try {
      const saved = localStorage.getItem('reaksilab_user_profile');
      return saved ? 'home' : 'auth';
    } catch {
      return 'auth';
    }
  });

  // Fungsi perpindahan halaman (mengganti state view dan menggulirkan ke bagian paling atas layar)
  const handleNavigate = (view: ViewMode) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Penanganan Berhasil Masuk (Google / Email)
  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('reaksilab_user_profile', JSON.stringify(user));
    } catch {
      // localStorage handling
    }
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Penanganan Eksplorasi sebagai Tamu (Open Access tanpa login)
  const handleExploreAsGuest = () => {
    const guestUser: UserProfile = {
      name: 'Penjelajah Tamu',
      email: 'tamu@reaksilab.id',
      role: 'tamu',
      avatar: '🚀',
      isLoggedIn: false,
      loginMethod: 'guest',
    };
    setCurrentUser(guestUser);
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Penanganan Keluar / Logout
  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('reaksilab_user_profile');
    } catch {
      // localStorage handling
    }
    setCurrentView('auth');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Fungsi khusus untuk menggulirkan layar ke Peta Modul di Beranda
  const handleScrollToRoadmap = () => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const element = document.getElementById('peta-modul');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById('peta-modul');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="app-layout">
      {/* 1. Header & Bilah Navigasi Utama (Ditampilkan pada Beranda, Roadmap, dan Bab 1-6) */}
      {currentView !== 'auth' && (
        <Navbar
          currentView={currentView}
          onNavigate={handleNavigate}
          currentUser={currentUser}
          onLogout={handleLogout}
        />
      )}

      <main className={`main-content ${currentView === 'auth' ? 'main-content-auth' : ''}`}>
        {/* ================= TAMPILAN 0: GERBANG AUTENTIKASI SEBELUM BERANDA ================= */}
        {currentView === 'auth' && (
          <div className="view-pane view-auth animate-fade-in">
            <AuthPage
              onLoginSuccess={handleLoginSuccess}
              onExploreAsGuest={handleExploreAsGuest}
            />
          </div>
        )}
        {/* ================= TAMPILAN 1: BERANDA REAKSILAB XI ================= */}
        {currentView === 'home' && (
          <div className="view-pane view-home animate-fade-in">
            {/* Bagian 1: Hero Section 2-Kolom (Judul + Ilustrasi Lab Digital Beranimasi) */}
            <Hero
              onStartLearning={() => handleNavigate('bab1')}
              onViewRoadmap={handleScrollToRoadmap}
            />

            {/* Bagian 2: Tiga Tingkat Representasi Kimia (Makro, Submikro, Simbolik) */}
            <ThreeLevelsSection />

            {/* Bagian 3: Peta 6 Modul ("Peta Perjalanan Belajar Laju Reaksi") */}
            <ModuleRoadmap onOpenModule={(viewKey) => handleNavigate(viewKey)} isFullPage={false} />

            {/* Bagian 4: Section Ajakan Belajar (CTA Section) */}
            <CtaSection onStartExploration={() => handleNavigate('bab1')} />
          </div>
        )}

        {/* ================= TAMPILAN 2: HALAMAN DEDIKASI PETA 6 MODUL ================= */}
        {currentView === 'roadmap' && (
          <div className="view-pane view-roadmap animate-fade-in">
            <ModuleRoadmap onOpenModule={(viewKey) => handleNavigate(viewKey)} isFullPage={true} />
          </div>
        )}

        {/* ================= TAMPILAN 3: BAB 1 ================= */}
        {currentView === 'bab1' && (
          <div className="view-pane view-bab1 animate-fade-in">
            <Chapter1
              onBackToHome={() => handleNavigate('home')}
              onNextChapter={() => handleNavigate('bab2')}
            />
          </div>
        )}

        {/* ================= TAMPILAN 3: BAB 2 ================= */}
        {currentView === 'bab2' && (
          <div className="view-pane view-bab2 animate-fade-in">
            <Chapter2
              onBackToHome={() => handleNavigate('home')}
              onPrevChapter={() => handleNavigate('bab1')}
              onNextChapter={() => handleNavigate('bab3')}
            />
          </div>
        )}

        {/* ================= TAMPILAN 4: BAB 3 ================= */}
        {currentView === 'bab3' && (
          <div className="view-pane view-bab3 animate-fade-in">
            <Chapter3
              onBackToHome={() => handleNavigate('home')}
              onPrevChapter={() => handleNavigate('bab2')}
              onNextChapter={() => handleNavigate('bab4')}
            />
          </div>
        )}

        {/* ================= TAMPILAN 5: BAB 4 ================= */}
        {currentView === 'bab4' && (
          <div className="view-pane view-bab4 animate-fade-in">
            <Chapter4
              onBackToHome={() => handleNavigate('home')}
              onPrevChapter={() => handleNavigate('bab3')}
              onNextChapter={() => handleNavigate('bab5')}
            />
          </div>
        )}

        {/* ================= TAMPILAN 6: BAB 5 ================= */}
        {currentView === 'bab5' && (
          <div className="view-pane view-bab5 animate-fade-in">
            <Chapter5
              onBackToHome={() => handleNavigate('home')}
              onPrevChapter={() => handleNavigate('bab4')}
              onNextChapter={() => handleNavigate('bab6')}
            />
          </div>
        )}

        {/* ================= TAMPILAN 7: BAB 6 ================= */}
        {currentView === 'bab6' && (
          <div className="view-pane view-bab6 animate-fade-in">
            <Chapter6
              onBackToHome={() => handleNavigate('home')}
              onPrevChapter={() => handleNavigate('bab5')}
              onJumpChapter={(targetKey) => handleNavigate(targetKey)}
            />
          </div>
        )}
      </main>

      {/* 3. Penutup / Footer Minimalis & Elegan (Ditampilkan selain halaman autentikasi) */}
      {currentView !== 'auth' && <Footer onNavigate={handleNavigate} />}
    </div>
  );
};

export default App;
export default App;
