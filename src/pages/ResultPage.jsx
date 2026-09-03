import { useNavigate } from 'react-router-dom';
import useQuiz from '../hooks/useQuiz';
import useBiodata from '../hooks/useBiodata';
import ResultCard from '../components/result/ResultCard';
import RecommendationCard from '../components/result/RecommendationCard';
import QuestionReviewList from '../components/result/QuestionReviewList';
import WhatsAppButton from '../components/result/WhatsAppButton';
import Loading from '../components/common/Loading';

export const ResultPage = () => {
  const navigate = useNavigate();
  const { quizResult, resetQuiz, isLoaded: isQuizLoaded } = useQuiz();
  const { biodata, isLoaded: isBiodataLoaded } = useBiodata();

  if (!isQuizLoaded || !isBiodataLoaded) {
    return <Loading fullScreen text="Memuat hasil placement test..." />;
  }

  // Handle resetting test and returning to info/landing
  const handleRetakeTest = () => {
    resetQuiz();
    navigate('/info');
  };

  return (
    <div className="font-sans antialiased text-[#151C27] min-h-screen flex flex-col bg-[#FEFCFF]">
      {/* ── 1. NAVBAR ── */}
      <header className="bg-white border-b border-[#C4C6D1] sticky top-0 z-40 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 md:px-8 h-16 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[28px] text-[#22437C] filled">
              school
            </span>
            <span className="font-bold text-lg md:text-xl text-[#012C64]">
              English Placement Test
            </span>
          </div>

          <div className="flex items-center gap-2 text-[#22437C] font-semibold text-xs md:text-sm bg-[#E2E8F8] px-3.5 py-1.5 rounded-full">
            <span className="material-symbols-outlined text-[18px] filled">
              check_circle
            </span>
            <span>Test Selesai</span>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-grow w-full max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12 flex flex-col gap-10">

        {/* ── 2. HASIL TEST SECTION ── */}
        <section className="flex flex-col gap-6">
          <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-2">
            <span className="text-[#A9213F] font-bold text-xs uppercase tracking-wider">
              PLACEMENT TEST RESULT
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#012C64]">
              HASIL TEST
            </h1>
            <p className="text-sm md:text-base text-[#434750] leading-relaxed">
              Berikut adalah evaluasi skor akhir, tingkat kemampuan, dan ringkasan pencapaian Anda.
            </p>
          </div>

          {/* Circle Gauge & 3 Stat Cards Row */}
          <ResultCard quizResult={quizResult} />
        </section>


        {/* ── 3. REKOMENDASI PROGRAM SECTION ── */}
        {quizResult?.recommendation && (
          <section className="flex flex-col gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-xl md:text-2xl font-extrabold text-[#012C64]">
                REKOMENDASI PROGRAM
              </h2>
              <p className="text-xs md:text-sm text-[#434750] mt-1">
                Program belajar yang disesuaikan khusus dengan skor dan tingkat kemampuan Anda.
              </p>
            </div>
            <RecommendationCard recommendation={quizResult.recommendation} />
          </section>
        )}

        {/* ── 4. CTA SECTION ── */}
        <section>
          <WhatsAppButton
            userSession={biodata}
            quizResult={quizResult}
            onRetakeTest={handleRetakeTest}
          />
        </section>
       
        


        
        {/* ── 5. REVIEW SOAL & JAWABAN SECTION ── */}
        <section className="flex flex-col gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-xl md:text-2xl font-extrabold text-[#012C64]">
              REVIEW SOAL & JAWABAN
            </h2>
            <p className="text-xs md:text-sm text-[#434750] mt-1">
              Evaluasi jawaban Anda untuk setiap nomor soal beserta kunci jawaban yang benar.
            </p>
          </div>
          <QuestionReviewList userAnswers={quizResult?.answers || {}} />
        </section>

      </main>

      {/* ── 6. FOOTER ── */}
      <footer className="bg-white border-t border-[#C4C6D1] text-xs text-[#434750] py-6 mt-auto">
        <div className="max-w-5xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-3 text-center md:text-left">
          <span className="font-bold text-[#012C64]">English Placement Test Engine</span>
          <div className="flex gap-4">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span className="hover:underline cursor-pointer">Terms of Service</span>
            <span className="hover:underline cursor-pointer">Contact Support</span>
          </div>
          <span>© 2026 Academic English Systems. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
};

export default ResultPage;
