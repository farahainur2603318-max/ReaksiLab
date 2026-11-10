/**
 * components/auth/AuthPage.tsx
 * Halaman Gerbang Awal (Sebelum Beranda) ReaksiLab XI.
 *
 * Fitur:
 * - Log In (dengan opsi masuk instan menggunakan Akun Google)
 * - Register (pendaftaran akun siswa kelas XI atau guru kimia)
 * - Forget Password (pemulihan kata sandi interaktif)
 * - Masuk Cepat sebagai Tamu (eksplorasi langsung tanpa akun)
 * - Visual Laju Reaksi Interaktif (tumbukan efektif partikel, kurva laju, gelas reaksi, dan faktor penentu)
 */
import React, { useState } from 'react';
import type { UserProfile } from '../../types';

interface AuthPageProps {
  onLoginSuccess: (user: UserProfile) => void;
  onExploreAsGuest: () => void;
}

type AuthMode = 'login' | 'register' | 'forgot';

export const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess, onExploreAsGuest }) => {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<'siswa' | 'guru'>('siswa');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Penanganan Masuk dengan Akun Google
  const handleGoogleAuth = () => {
    setIsLoading(true);
    setFeedbackMessage(null);

    setTimeout(() => {
      setIsLoading(false);
      const googleUser: UserProfile = {
        name: 'Siswa Kimia XI (Google)',
        email: 'siswa.reaksilab@gmail.com',
        role: 'siswa',
        avatar: '🧪',
        isLoggedIn: true,
        loginMethod: 'google',
      };
      onLoginSuccess(googleUser);
    }, 800);
  };

  // Penanganan Masuk Email & Password
  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setFeedbackMessage({ type: 'error', text: 'Silakan isi email dan kata sandi Anda.' });
      return;
    }

    setIsLoading(true);
    setFeedbackMessage(null);

    setTimeout(() => {
      setIsLoading(false);
      // Ekstrak nama panggilan dari email jika nama belum diisi
      const displayName = fullName.trim() || email.split('@')[0] || 'Siswa ReaksiLab';
      const user: UserProfile = {
        name: displayName,
        email: email,
        role: role,
        avatar: role === 'guru' ? '👨‍🏫' : '🧑‍🔬',
        isLoggedIn: true,
        loginMethod: 'email',
      };
      onLoginSuccess(user);
    }, 700);
  };

  // Penanganan Registrasi Akun Baru
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password || !confirmPassword) {
      setFeedbackMessage({ type: 'error', text: 'Semua kolom pendaftaran wajib diisi.' });
      return;
    }
    if (password !== confirmPassword) {
      setFeedbackMessage({ type: 'error', text: 'Konfirmasi kata sandi tidak cocok.' });
      return;
    }
    if (password.length < 6) {
      setFeedbackMessage({ type: 'error', text: 'Kata sandi minimal 6 karakter demi keamanan.' });
      return;
    }

    setIsLoading(true);
    setFeedbackMessage(null);

    setTimeout(() => {
      setIsLoading(false);
      const newUser: UserProfile = {
        name: fullName,
        email: email,
        role: role,
        avatar: role === 'guru' ? '👨‍🏫' : '🧑‍🔬',
        isLoggedIn: true,
        loginMethod: 'email',
      };
      setFeedbackMessage({ type: 'success', text: 'Pendaftaran berhasil! Mengalihkan ke laboratorium...' });
      setTimeout(() => {
        onLoginSuccess(newUser);
      }, 600);
    }, 800);
  };

  // Penanganan Lupa Password
  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setFeedbackMessage({ type: 'error', text: 'Masukkan alamat email Anda terlebih dahulu.' });
      return;
    }

    setIsLoading(true);
    setFeedbackMessage(null);

    setTimeout(() => {
      setIsLoading(false);
      setFeedbackMessage({
        type: 'success',
        text: `Tautan reset kata sandi telah dikirim ke ${email}. Silakan periksa kotak masuk atau folder spam Anda.`,
      });
    }, 700);
  };

  return (
    <div className="auth-portal-page">
      {/* Background Glow Elegan */}
      <div className="auth-ambient-glow" aria-hidden="true" />

      <div className="auth-page-container">
        {/* ================= SISI KIRI: KARTU FORMULIR AUTENTIKASI ================= */}
        <div className="auth-form-card">
          {/* Header Brand Portal */}
          <div className="auth-card-brand">
            <div className="auth-flask-icon" aria-hidden="true">
              <svg viewBox="0 0 32 32" fill="none" className="auth-flask-svg">
                <path
                  d="M13 5H19M14 5V12L8 23C7.2 24.5 8.2 26.5 10 26.5H22C23.8 26.5 24.8 24.5 24 23L18 12V5"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.5 19C12 18 14 20 16 19C18 18 20 20 21.5 19L23 22C23.5 23 22.8 24.5 21.5 24.5H10.5C9.2 24.5 8.5 23 9 22L10.5 19Z"
                  fill="currentColor"
                  opacity="0.35"
                />
                <circle cx="13" cy="22" r="1.2" fill="currentColor" />
                <circle cx="18" cy="21" r="1.6" fill="currentColor" />
              </svg>
            </div>
            <div className="auth-brand-text">
              <span className="auth-brand-name">
                ReaksiLab<span className="auth-badge-xi">XI</span>
              </span>
              <span className="auth-brand-tagline">Laboratorium Digital Laju Reaksi</span>
            </div>
          </div>

          {/* Tab Pemilihan Mode Autentikasi (Log In / Register) */}
          {authMode !== 'forgot' && (
            <div className="auth-tabs-nav" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={authMode === 'login'}
                className={`auth-tab-btn ${authMode === 'login' ? 'active' : ''}`}
                onClick={() => {
                  setAuthMode('login');
                  setFeedbackMessage(null);
                }}
              >
                Masuk (Log In)
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={authMode === 'register'}
                className={`auth-tab-btn ${authMode === 'register' ? 'active' : ''}`}
                onClick={() => {
                  setAuthMode('register');
                  setFeedbackMessage(null);
                }}
              >
                Daftar Akun Baru
              </button>
            </div>
          )}

          {/* Notifikasi / Feedback Message */}
          {feedbackMessage && (
            <div
              className={`auth-feedback-banner feedback-${feedbackMessage.type} animate-fade-in`}
              role="alert"
            >
              <span className="feedback-icon" aria-hidden="true">
                {feedbackMessage.type === 'success' ? '✓' : '⚠️'}
              </span>
              <span className="feedback-text">{feedbackMessage.text}</span>
            </div>
          )}

          {/* ================= MODE 1: LOG IN ================= */}
          {authMode === 'login' && (
            <div className="auth-pane animate-fade-in">
              <div className="auth-pane-intro">
                <h2 className="auth-pane-title">Selamat Datang Kembali</h2>
                <p className="auth-pane-desc">
                  Masuk untuk melanjutkan eksplorasi laju reaksi dan eksperimen virtual Anda.
                </p>
              </div>

              {/* Tombol Masuk Cepat dengan Akun Google */}
              <button
                type="button"
                className="btn-google-auth"
                onClick={handleGoogleAuth}
                disabled={isLoading}
                aria-label="Masuk langsung dengan Akun Google"
              >
                <svg className="google-icon-svg" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span className="btn-google-text">
                  {isLoading ? 'Menghubungkan...' : 'Masuk Langsung dengan Google'}
                </span>
              </button>

              <div className="auth-divider">
                <span className="divider-line" />
                <span className="divider-label">atau gunakan email &amp; kata sandi</span>
                <span className="divider-line" />
              </div>

              {/* Formulir Email & Kata Sandi */}
              <form onSubmit={handleEmailLogin} className="auth-fields-form">
                <div className="form-group">
                  <label htmlFor="login-email" className="field-label">
                    Email Pengguna
                  </label>
                  <div className="input-wrap">
                    <span className="input-icon" aria-hidden="true">✉️</span>
                    <input
                      id="login-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="contoh: siswa@sekolah.sch.id"
                      className="auth-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="label-with-action">
                    <label htmlFor="login-password" className="field-label">
                      Kata Sandi
                    </label>
                    <button
                      type="button"
                      className="link-forgot-pw"
                      onClick={() => {
                        setAuthMode('forgot');
                        setFeedbackMessage(null);
                      }}
                    >
                      Lupa Kata Sandi?
                    </button>
                  </div>
                  <div className="input-wrap">
                    <span className="input-icon" aria-hidden="true">🔒</span>
                    <input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Masukkan kata sandi akun"
                      className="auth-input"
                      required
                    />
                    <button
                      type="button"
                      className="btn-toggle-pw"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                    >
                      {showPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>

                <div className="form-options-row">
                  <label className="checkbox-wrap">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span className="checkbox-text">Ingat sesi saya di perangkat ini</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn-auth-submit btn-primary-submit"
                  disabled={isLoading}
                >
                  <span>{isLoading ? 'Sedang Memproses...' : 'Masuk ke ReaksiLab XI'}</span>
                  <span className="btn-arrow" aria-hidden="true">→</span>
                </button>
              </form>
            </div>
          )}

          {/* ================= MODE 2: REGISTER (DAFTAR AKUN BARU) ================= */}
          {authMode === 'register' && (
            <div className="auth-pane animate-fade-in">
              <div className="auth-pane-intro">
                <h2 className="auth-pane-title">Daftar Akun Belajar</h2>
                <p className="auth-pane-desc">
                  Mulai pengalaman belajar kimia interaktif dengan profil siswa atau guru.
                </p>
              </div>

              {/* Opsi Google Register */}
              <button
                type="button"
                className="btn-google-auth"
                onClick={handleGoogleAuth}
                disabled={isLoading}
                aria-label="Daftar cepat dengan Akun Google"
              >
                <svg className="google-icon-svg" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span className="btn-google-text">
                  {isLoading ? 'Menghubungkan...' : 'Daftar Cepat dengan Google'}
                </span>
              </button>

              <div className="auth-divider">
                <span className="divider-line" />
                <span className="divider-label">atau lengkapi formulir</span>
                <span className="divider-line" />
              </div>

              {/* Formulir Pendaftaran */}
              <form onSubmit={handleRegister} className="auth-fields-form">
                <div className="form-group">
                  <label htmlFor="reg-name" className="field-label">
                    Nama Lengkap
                  </label>
                  <div className="input-wrap">
                    <span className="input-icon" aria-hidden="true">👤</span>
                    <input
                      id="reg-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="contoh: Ahmad Farhan"
                      className="auth-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="reg-email" className="field-label">
                    Alamat Email
                  </label>
                  <div className="input-wrap">
                    <span className="input-icon" aria-hidden="true">✉️</span>
                    <input
                      id="reg-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@sekolah.sch.id"
                      className="auth-input"
                      required
                    />
                  </div>
                </div>

                {/* Pemilihan Peran */}
                <div className="form-group">
                  <label className="field-label">Peran Pengguna</label>
                  <div className="role-selector-pills">
                    <button
                      type="button"
                      className={`role-pill ${role === 'siswa' ? 'selected' : ''}`}
                      onClick={() => setRole('siswa')}
                    >
                      <span className="role-emoji" aria-hidden="true">🧑‍🔬</span>
                      <span>Siswa SMA Kelas XI</span>
                    </button>
                    <button
                      type="button"
                      className={`role-pill ${role === 'guru' ? 'selected' : ''}`}
                      onClick={() => setRole('guru')}
                    >
                      <span className="role-emoji" aria-hidden="true">👨‍🏫</span>
                      <span>Guru Kimia</span>
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="reg-password" className="field-label">
                    Kata Sandi (Minimal 6 Karakter)
                  </label>
                  <div className="input-wrap">
                    <span className="input-icon" aria-hidden="true">🔒</span>
                    <input
                      id="reg-password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Buat kata sandi aman"
                      className="auth-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="reg-confirm-password" className="field-label">
                    Ulangi Kata Sandi
                  </label>
                  <div className="input-wrap">
                    <span className="input-icon" aria-hidden="true">🛡️</span>
                    <input
                      id="reg-confirm-password"
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Masukkan kembali kata sandi"
                      className="auth-input"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-auth-submit btn-primary-submit"
                  disabled={isLoading}
                >
                  <span>{isLoading ? 'Mendaftarkan Akun...' : 'Daftar Akun ReaksiLab'}</span>
                  <span className="btn-arrow" aria-hidden="true">→</span>
                </button>
              </form>
            </div>
          )}

          {/* ================= MODE 3: FORGET PASSWORD (LUPA KATA SANDI) ================= */}
          {authMode === 'forgot' && (
            <div className="auth-pane animate-fade-in">
              <div className="auth-pane-intro">
                <button
                  type="button"
                  className="btn-back-to-login"
                  onClick={() => {
                    setAuthMode('login');
                    setFeedbackMessage(null);
                  }}
                >
                  <span aria-hidden="true">←</span> Kembali ke Halaman Masuk
                </button>
                <h2 className="auth-pane-title">Pemulihan Kata Sandi</h2>
                <p className="auth-pane-desc">
                  Masukkan email yang terdaftar. Kami akan mengirimkan tautan verifikasi
                  untuk mengatur ulang kata sandi Anda.
                </p>
              </div>

              <form onSubmit={handleForgotPassword} className="auth-fields-form">
                <div className="form-group">
                  <label htmlFor="forgot-email" className="field-label">
                    Email Terdaftar
                  </label>
                  <div className="input-wrap">
                    <span className="input-icon" aria-hidden="true">✉️</span>
                    <input
                      id="forgot-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Masukkan email Anda"
                      className="auth-input"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-auth-submit btn-primary-submit"
                  disabled={isLoading}
                >
                  <span>{isLoading ? 'Mengirim Instruksi...' : 'Kirim Tautan Pemulihan'}</span>
                  <span className="btn-arrow" aria-hidden="true">📨</span>
                </button>
              </form>
            </div>
          )}

          {/* Akses Tamu Langsung (Akses Tanpa Login) */}
          <div className="auth-guest-bypass">
            <span className="guest-divider-text">atau eksplorasi materi langsung:</span>
            <button
              type="button"
              className="btn-guest-explore"
              onClick={onExploreAsGuest}
              title="Masuk ke Beranda tanpa akun (Open Access)"
            >
              <span>🚀 Masuk sebagai Tamu (Akses Terbuka)</span>
              <span className="guest-arrow" aria-hidden="true">→</span>
            </button>
            <p className="guest-disclaimer">
              100% Bebas Biaya • Seluruh Bab 1 s.d. 6 dapat diakses penuh
            </p>
          </div>
        </div>

        {/* ================= SISI KANAN: VISUAL LAJU REAKSI MODERN ================= */}
        <div className="auth-visual-showcase" aria-label="Visualisasi Konsep Laju Reaksi">
          {/* Card Visual Utama */}
          <div className="visual-display-box">
            {/* Header Mini Lab Showcase */}
            <div className="showcase-header">
              <div className="showcase-badge">
                <span className="badge-pulse-dot" aria-hidden="true" />
                SIMULASI DIGITAL LAJU REAKSI
              </div>
              <span className="showcase-rate-eq">v = -Δ[R] / Δt</span>
            </div>

            {/* Ilustrasi Interaktif SVG Laju Reaksi */}
            <div className="showcase-svg-wrapper">
              <svg viewBox="0 0 460 330" fill="none" className="auth-reaction-svg" aria-hidden="true">
                <defs>
                  <linearGradient id="flaskGradAuth" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity="0.85" />
                    <stop offset="60%" stopColor="#06B6D4" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.75" />
                  </linearGradient>

                  <linearGradient id="curveGradAuth" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#EF4444" />
                    <stop offset="50%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#10B981" />
                  </linearGradient>

                  <filter id="glowAuth" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* 1. Beaker & Larutan Berubah Warna */}
                <rect x="25" y="110" width="130" height="150" rx="16" fill="#FFFFFF" stroke="#93C5FD" strokeWidth="2.5" />
                <path d="M25 105H155M20 105H30M150 105H160" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" />
                
                {/* Cairan Reaktan & Gelembung */}
                <path d="M28 175C55 168 85 180 120 172C138 168 152 173 152 173V246C152 254 146 258 138 258H42C34 258 28 254 28 246V175Z" fill="url(#flaskGradAuth)" />
                
                {/* Gelembung Reaksi Naik */}
                <circle cx="50" cy="225" r="4.5" fill="#FFFFFF" opacity="0.8" className="auth-bubble bubble-a1" />
                <circle cx="75" cy="205" r="6" fill="#FFFFFF" opacity="0.7" className="auth-bubble bubble-a2" />
                <circle cx="105" cy="220" r="5" fill="#FFFFFF" opacity="0.75" className="auth-bubble bubble-a3" />
                <circle cx="130" cy="195" r="4" fill="#FFFFFF" opacity="0.85" className="auth-bubble bubble-a4" />
                <circle cx="65" cy="185" r="3.5" fill="#FFFFFF" opacity="0.9" className="auth-bubble bubble-a5" />

                {/* Skala Ukur Gelas Kimia */}
                <line x1="32" y1="140" x2="48" y2="140" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
                <line x1="32" y1="165" x2="42" y2="165" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="32" y1="190" x2="48" y2="190" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
                <line x1="32" y1="215" x2="42" y2="215" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" />

                {/* 2. Zona Tumbukan Efektif Antarpartikel (Center) */}
                <g transform="translate(175, 45)">
                  {/* Lingkaran Zona Tumbukan */}
                  <circle cx="65" cy="65" r="55" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1.5" strokeDasharray="4 4" />
                  
                  {/* Molekul Reaktan A (Merah) */}
                  <circle cx="42" cy="65" r="14" fill="#EF4444" className="auth-particle-left" />
                  <text x="42" y="69" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="800">A</text>
                  
                  {/* Molekul Reaktan B (Cyan) */}
                  <circle cx="88" cy="65" r="14" fill="#06B6D4" className="auth-particle-right" />
                  <text x="88" y="69" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="800">B</text>
                  
                  {/* Titik Kilau Tumbukan Efektif */}
                  <path d="M65 48L68 62L82 65L68 68L65 82L62 68L48 65L62 62Z" fill="#F59E0B" filter="url(#glowAuth)" className="auth-sparkle" />
                  
                  {/* Label Tumbukan */}
                  <rect x="15" y="128" width="100" height="22" rx="6" fill="#173B78" />
                  <text x="65" y="143" textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontWeight="800" letterSpacing="0.03em">
                    TUMBUKAN EFEKTIF
                  </text>
                </g>

                {/* 3. Kurva Laju Reaksi [Konsentrasi vs Waktu] */}
                <g transform="translate(295, 110)">
                  {/* Sumbu Grafik */}
                  <line x1="15" y1="15" x2="15" y2="145" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
                  <line x1="15" y1="145" x2="145" y2="145" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
                  
                  {/* Label Sumbu */}
                  <text x="18" y="12" fill="#173B78" fontSize="10" fontWeight="800">[C]</text>
                  <text x="145" y="160" fill="#173B78" fontSize="10" fontWeight="800">waktu (t)</text>

                  {/* Garis Grid Halus */}
                  <line x1="15" y1="60" x2="140" y2="60" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="15" y1="105" x2="140" y2="105" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />

                  {/* Kurva Reaktan: Konsentrasi Berkurang Cepat lalu Melandai */}
                  <path d="M15 30C45 35 75 105 138 128" stroke="#EF4444" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  <text x="135" y="122" fill="#EF4444" fontSize="9" fontWeight="700">Reaktan</text>

                  {/* Kurva Produk: Konsentrasi Bertambah Cepat lalu Mendatar */}
                  <path d="M15 142C45 130 75 55 138 45" stroke="#10B981" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  <text x="135" y="40" fill="#10B981" fontSize="9" fontWeight="700">Produk</text>

                  {/* Titik Pantau Kemiringan Laju */}
                  <circle cx="58" cy="85" r="4" fill="#2563EB" />
                </g>

                {/* Banner Formula Laju Reaksi */}
                <rect x="50" y="280" width="360" height="36" rx="10" fill="#FFFFFF" stroke="#BFDBFE" strokeWidth="1.5" />
                <text x="230" y="303" textAnchor="middle" fill="#173B78" fontSize="12" fontWeight="800" letterSpacing="0.02em">
                  HUKUM LAJU: v = k [A]ᵐ [B]ⁿ  •  Eₐ &amp; KATALIS
                </text>
              </svg>
            </div>

            {/* 3 Kartu Poin Pembelajaran Laju Reaksi */}
            <div className="showcase-features-grid">
              <div className="showcase-feat-item">
                <span className="feat-emoji" aria-hidden="true">⚛️</span>
                <div className="feat-text">
                  <strong>Teori Tumbukan</strong>
                  <span>Tumbukan efektif &amp; orientasi molekul</span>
                </div>
              </div>

              <div className="showcase-feat-item">
                <span className="feat-emoji" aria-hidden="true">🌡️</span>
                <div className="feat-text">
                  <strong>4 Faktor Laju</strong>
                  <span>Konsentrasi, suhu, luas sentuh &amp; katalis</span>
                </div>
              </div>

              <div className="showcase-feat-item">
                <span className="feat-emoji" aria-hidden="true">📊</span>
                <div className="feat-text">
                  <strong>Analisis Data</strong>
                  <span>Tabel orde reaksi &amp; integrasi STEM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial / Catatan Guru Lab */}
          <div className="visual-lab-badge">
            <div className="lab-badge-avatar" aria-hidden="true">⚗️</div>
            <div className="lab-badge-text">
              <span className="lab-badge-title">Media Pembelajaran Digital SMA Kelas XI</span>
              <span className="lab-badge-desc">
                Dirancang untuk memudahkan visualisasi partikel kimia tak kasat mata
                menjadi konsep ilmiah yang nyata dan terukur.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

