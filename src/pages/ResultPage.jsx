import { useNavigate } from 'react-router-dom';
import useQuiz from '../hooks/useQuiz';
import useBiodata from '../hooks/useBiodata';
import ResultCard from '../components/result/ResultCard';
import RecommendationCard from '../components/result/RecommendationCard';
import QuestionReviewList from '../components/result/QuestionReviewList';
import WhatsAppButton from '../components/result/WhatsAppButton';
import Loading from '../components/common/Loading';
import Header from '../components/section/Header';
import Footerv2 from '../components/section/Footerv2';

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
      <Header/>
      {/* Main Content Container */}
      <main className="flex-grow w-full max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12 flex flex-col gap-10">

        {/* ── 2. HASIL TEST SECTION ── */}
        <section className="flex flex-col gap-6">
          <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-2">
            <span className="text-[#A9213F] font-bold text-xs uppercase tracking-wider">
              Hasil Evaluasi
            </span>
            <h1 className="text-2xl md:text-4xl font-bold text-[#012C64]">
              Hasil Placement Test
            </h1>
            <p className="text-sm md:text-base text-[#434750] leading-relaxed">
              Berikut adalah evaluasi skor akhir, tingkat kemampuan, dan ringkasan pencapaian Anda.
            </p>
          </div>
          <ResultCard quizResult={quizResult} />
        </section>

        {/* ── 3. REKOMENDASI PROGRAM SECTION ── */}
        {quizResult?.recommendation && (
          <section className="flex flex-col gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-xl md:text-2xl font-bold text-[#012C64]">
                Rekomendasi Program
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
            <h2 className="text-xl md:text-2xl font-bold text-[#012C64]">
              Review Soal & Jawaban
            </h2>
            <p className="text-xs md:text-sm text-[#434750] mt-1">
              Evaluasi jawaban Anda untuk setiap nomor soal beserta kunci jawaban yang benar.
            </p>
          </div>
          <QuestionReviewList userAnswers={quizResult?.answers || {}} />
        </section>

      </main>

      {/* ── 6. FOOTER ── */}
      <Footerv2/>
    </div>
  );
};

export default ResultPage;
