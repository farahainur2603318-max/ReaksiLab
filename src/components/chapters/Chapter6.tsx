/**
 * components/chapters/Chapter6.tsx
 * Halaman Lengkap Bab 6: Evaluasi Akhir Komprehensif & Refleksi Belajar
 */
import React, { useState } from 'react';
import { MODULE_6_SECTIONS } from '../../data/modulesData';

interface Chapter6Props {
  onBackToHome: () => void;
  onPrevChapter: () => void;
  onJumpChapter: (chapterKey: 'bab1' | 'bab2' | 'bab3' | 'bab4' | 'bab5') => void;
}

interface QuizQuestion {
  id: number;
  topicRef: 'bab1' | 'bab2' | 'bab3' | 'bab4';
  topicName: string;
  question: string;
  options: { key: string; text: string }[];
  correctKey: string;
  explanation: string;
}

const COMPREHENSIVE_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    topicRef: 'bab1',
    topicName: 'Bab 1: Definisi Laju Reaksi',
    question: 'Mengapa laju berkurangnya pereaksi A diberi tanda negatif dalam persamaan matematis v = -Δ[A]/Δt?',
    options: [
      { key: 'A', text: 'Karena nilai kelajuan reaksi selalu bernilai negatif di alam.' },
      { key: 'B', text: 'Untuk mengompensasi nilai perubahan Δ[A] yang bernilai negatif sehingga nilai laju reaksi tetap positif.' },
      { key: 'C', text: 'Karena reaksi kimia berlangsung secara mundur ke arah reaktan.' },
    ],
    correctKey: 'B',
    explanation: 'Karena [A] akhir lebih kecil dari [A] awal, maka Δ[A] bernilai negatif. Tanda minus di depan rumus memastikan nilai laju reaksi (v) yang dihasilkan selalu bernilai positif.',
  },
  {
    id: 2,
    topicRef: 'bab2',
    topicName: 'Bab 2: Teori Tumbukan',
    question: 'Dua faktor penting apa yang wajib dipenuhi secara bersamaan agar suatu tumbukan partikel dapat menghasilkan reaksi kimia (tumbukan efektif)?',
    options: [
      { key: 'A', text: 'Jumlah partikel ganjil dan wadah bertekanan tinggi.' },
      { key: 'B', text: 'Orientasi tumbukan yang tepat dan energi kinetik partikel sama atau melampaui energi aktivasi (E ≥ Ea).' },
      { key: 'C', text: 'Warna larutan yang kontras dan suhu di atas 100°C.' },
    ],
    correctKey: 'B',
    explanation: 'Tumbukan efektif membutuhkan orientasi ruang yang sesuai agar ikatan baru dapat tersambung, serta energi kinetik minimum (Ea) untuk memutuskan ikatan kimia yang lama.',
  },
  {
    id: 3,
    topicRef: 'bab3',
    topicName: 'Bab 3: Faktor Suhu',
    question: 'Alasan ilmiah mendasar mengapa peningkatan suhu menaikkan laju reaksi secara signifikan adalah:',
    options: [
      { key: 'A', text: 'Menaikkan fraksi (persentase) partikel yang memiliki energi sama atau melampaui energi aktivasi (E ≥ Ea).' },
      { key: 'B', text: 'Menurunkan nilai energi aktivasi reaksi menjadi nol.' },
      { key: 'C', text: 'Mengubah reaksi eksoterm menjadi reaksi endoterm.' },
    ],
    correctKey: 'A',
    explanation: 'Peningkatan suhu meningkatkan energi kinetik rata-rata molekul. Sesuai kurva distribusi Boltzmann, fraksi partikel dengan energi E ≥ Ea bertambah secara eksponensial.',
  },
  {
    id: 4,
    topicRef: 'bab3',
    topicName: 'Bab 3: Peran Katalis',
    question: 'Pernyataan manakah yang BENAR mengenai cara kerja katalis dalam sistem reaksi kimia?',
    options: [
      { key: 'A', text: 'Katalis menambah jumlah kalor reaksi (ΔH) sehingga energi sistem menjadi berlipat ganda.' },
      { key: 'B', text: 'Katalis menyediakan rute mekanisme reaksi alternatif dengan energi aktivasi (Ea) yang lebih rendah.' },
      { key: 'C', text: 'Katalis habis terkonsumsi dan menjadi produk sampingan di akhir reaksi.' },
    ],
    correctKey: 'B',
    explanation: 'Katalis mempermudah terbentuknya kompleks teraktivasi dengan energi aktivasi yang lebih rendah tanpa mengubah selisih entalpi (ΔH) reaktan dan produk.',
  },
  {
    id: 5,
    topicRef: 'bab4',
    topicName: 'Bab 4: Orde Reaksi',
    question: 'Jika suatu reaksi memiliki persamaan hukum laju v = k [X]², berapakah kelipatan laju reaksinya jika konsentrasi X diperbesar menjadi 3 kali semula?',
    options: [
      { key: 'A', text: 'Laju reaksi meningkat menjadi 3 kali semula.' },
      { key: 'B', text: 'Laju reaksi meningkat menjadi 6 kali semula.' },
      { key: 'C', text: 'Laju reaksi melonjak menjadi 9 kali semula (3² = 9).' },
    ],
    correctKey: 'C',
    explanation: 'Pada reaksi orde 2 (pangkat 2), jika konsentrasi dilipatgandakan sebesar n kali, laju reaksinya akan meningkat sebesar n² kali. Maka untuk 3 kali lipat, laju naik 3² = 9 kali lipat.',
  },
];

export const Chapter6: React.FC<Chapter6Props> = ({ onBackToHome, onPrevChapter, onJumpChapter }) => {
  const [activeSectionId, setActiveSectionId] = useState<string>('sec-6-2');

  // State untuk kuis formatif tanpa menyimpan data pribadi
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const activeSection = MODULE_6_SECTIONS.find((sec) => sec.id === activeSectionId) || MODULE_6_SECTIONS[1];

  const handleSelectAnswer = (qId: number, choiceKey: string) => {
    if (submitted) return; // Kunci pilihan setelah dikirim
    setAnswers((prev) => ({ ...prev, [qId]: choiceKey }));
  };

  const handleResetQuiz = () => {
    setAnswers({});
    setSubmitted(false);
  };

  // Hitung skor
  const score = COMPREHENSIVE_QUESTIONS.reduce((acc, q) => {
    return acc + (answers[q.id] === q.correctKey ? 1 : 0);
  }, 0);

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
          Beranda / <strong>Bab 6: Evaluasi Akhir & Refleksi</strong>
        </span>
      </div>

      <section className="labsheet-container" aria-labelledby="chapter6-title">
        {/* Header Lembar Kerja */}
        <div className="labsheet-header">
          <div className="labsheet-meta">
            <span className="labsheet-code">LKPD-XI-06 • EVALUASI KOMPREHENSIF</span>
            <span className="labsheet-topic">KIMIA SMA KELAS XI</span>
          </div>
          <h1 id="chapter6-title" className="labsheet-title">
            Bab 6: Evaluasi Akhir & Refleksi Belajar
          </h1>
          <p className="labsheet-lead">
            Menyatukan ketiga level representasi kimia (Makroskopis, Submikroskopis, dan Simbolik),
            menguji pemahaman konseptual lintas bab, dan memetakan capaian pembelajaran kimia Anda.
          </p>

          <div className="labsheet-info-strip">
            <div className="strip-item">
              <span className="strip-label">Cakupan:</span>
              <span className="strip-value">Sintesis Bab 1 s.d. Bab 5</span>
            </div>
            <div className="strip-item">
              <span className="strip-label">Bentuk:</span>
              <span className="strip-value">Evaluasi Mandiri & Umpan Balik Ilmiah</span>
            </div>
            <div className="strip-item">
              <span className="strip-label">Akses:</span>
              <span className="strip-value value-ready">✓ Terbuka Penuh (Open Access)</span>
            </div>
          </div>
        </div>

        {/* Kuis Evaluasi Formatif Komprehensif */}
        <div className="labsheet-section">
          <div className="quiz-box-container">
            <div className="quiz-box-header">
              <div>
                <span className="virtual-badge">EVALUASI MANDIRI SISWA</span>
                <h2 className="quiz-box-title">Uji Pemahaman Konseptual Kimia Laju Reaksi</h2>
              </div>
              <span className="privacy-badge">🔒 Tanpa Pengumpulan Identitas Siswa</span>
            </div>

            <p className="quiz-intro-text">
              Jawablah 5 pertanyaan pemahaman konsep di bawah ini. Setelah Anda menekan tombol <strong>"Periksa Jawaban Saya"</strong>, sistem akan menampilkan skor capaian, pembahasan ilmiah lengkap, serta rekomendasi bab untuk ditelaah ulang jika terdapat konsep yang keliru.
            </p>

            {/* Daftar Pertanyaan */}
            <div className="questions-list">
              {COMPREHENSIVE_QUESTIONS.map((q, idx) => (
                <div key={q.id} className="quiz-item-card">
                  <div className="quiz-item-top">
                    <span className="question-number">Soal {idx + 1} dari 5</span>
                    <span className="topic-badge">{q.topicName}</span>
                  </div>

                  <p className="question-text">{q.question}</p>

                  <div className="options-stack">
                    {q.options.map((opt) => {
                      const isSelected = answers[q.id] === opt.key;
                      let optionClass = 'quiz-opt-btn';
                      if (isSelected) optionClass += ' selected';
                      if (submitted) {
                        if (opt.key === q.correctKey) optionClass += ' correct';
                        else if (isSelected && opt.key !== q.correctKey) optionClass += ' incorrect';
                      }

                      return (
                        <button
                          key={opt.key}
                          type="button"
                          className={optionClass}
                          onClick={() => handleSelectAnswer(q.id, opt.key)}
                          disabled={submitted}
                        >
                          <span className="opt-key">{opt.key}.</span>
                          <span className="opt-text">{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>

                  {submitted && (
                    <div className="answer-explanation-card">
                      <div className="explanation-header">
                        {answers[q.id] === q.correctKey ? (
                          <span className="exp-badge exp-pass">✅ Jawaban Tepat</span>
                        ) : (
                          <span className="exp-badge exp-review">ℹ️ Perlu Ditinjau Ulang</span>
                        )}
                        <button
                          type="button"
                          className="btn-jump-topic"
                          onClick={() => onJumpChapter(q.topicRef)}
                        >
                          Pelajari Kembali di {q.topicName} →
                        </button>
                      </div>
                      <p className="exp-text"><strong>Pembahasan Konsep:</strong> {q.explanation}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Tombol Periksa Jawaban */}
            <div className="quiz-actions-bar">
              {!submitted ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setSubmitted(true)}
                  disabled={Object.keys(answers).length < 5}
                >
                  {Object.keys(answers).length < 5
                    ? `Selesaikan Seluruh Soal (${Object.keys(answers).length}/5 Terjawab)`
                    : 'Periksa Jawaban & Tampilkan Pembahasan'}
                </button>
              ) : (
                <div className="quiz-results-banner">
                  <div className="score-summary">
                    <span className="score-number">{score} / 5</span>
                    <div className="score-text">
                      <strong>Capaian Skor: {score * 20}%</strong>
                      <p>
                        {score === 5
                          ? 'Sempurna! Anda telah menguasai konsep dasar laju reaksi dengan sangat mendalam.'
                          : 'Bagus sekali! Tinjau tombol "Pelajari Kembali" pada nomor soal yang keliru untuk mematangkan konsep.'}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleResetQuiz}
                  >
                    Ulangi Evaluasi Mandiri
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Kartu Sub-Bagian Belajar Bab 6 */}
        <div className="labsheet-section">
          <div className="section-title-wrap">
            <h2 className="section-title">Kartu Refleksi Belajar &amp; Keterpaduan Sains</h2>
            <p className="section-subtitle">
              Pilih konsep di bawah ini untuk melihat keterpaduan kompetensi kimia SMA:
            </p>
          </div>

          <div className="section-tabs" role="tablist" aria-label="Daftar Bagian Belajar Bab 6">
            {MODULE_6_SECTIONS.map((section) => (
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

        {/* Navigasi Bawah */}
        <div className="module-bottom-nav">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onPrevChapter}
          >
            ← Kembali ke Bab 5: Proyek STEM
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onBackToHome}
          >
            Selesai • Kembali ke Beranda & Peta Modul
          </button>
        </div>
      </section>
    </div>
  );
};

