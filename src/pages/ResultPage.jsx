import React from 'react';
import { useNavigate } from 'react-router-dom';
import useQuiz from '../hooks/useQuiz';
import useBiodata from '../hooks/useBiodata';
import ResultCard from '../components/result/ResultCard';
import RecommendationCard from '../components/result/RecommendationCard';
import WhatsAppButton from '../components/result/WhatsAppButton';
import Loading from '../components/common/Loading';

export const ResultPage = () => {
  const navigate = useNavigate();
  const { quizResult, resetQuiz, isLoaded: isQuizLoaded } = useQuiz();
  const { biodata, isLoaded: isBiodataLoaded } = useBiodata();

  if (!isQuizLoaded || !isBiodataLoaded) {
    return <Loading fullScreen text="Memuat hasil placement test..." />;
  }

  // Handle resetting test and returning to kuis/landing
  const handleRetakeTest = () => {
    resetQuiz();
    navigate('/quiz');
  };

  return (
    <div className="font-sans antialiased text-[#151C27] min-h-screen flex flex-col bg-[#FEFCFF]">
      {/* Top Navigation Header */}
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
            <span>Test Completed</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow w-full max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12 flex flex-col gap-8">
        {/* Page Hero Header */}
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-2">
          <span className="text-[#A9213F] font-bold text-xs uppercase tracking-wider">
            PLACEMENT TEST RESULT
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#012C64]">
            Tingkat Kemampuan Anda
          </h1>
          <p className="text-sm md:text-base text-[#434750] leading-relaxed">
            Berikut adalah hasil evaluasi placement test berdasarkan jawaban Anda.
          </p>
        </div>

        {/* Result Statistics Wheel & Grid */}
        <ResultCard quizResult={quizResult} />

        {/* Recommended Program Section */}
        {quizResult?.recommendation && (
          <div className="flex flex-col gap-3">
            <div className="mb-1">
              <h3 className="text-xl md:text-2xl font-bold text-[#012C64] mb-1">
                Rekomendasi Program Belajar
              </h3>
              <p className="text-xs md:text-sm text-[#434750]">
                Berdasarkan skor dan level hasil test Anda, kami merekomendasikan program berikut:
              </p>
            </div>
            <RecommendationCard recommendation={quizResult.recommendation} />
          </div>
        )}

        {/* WhatsApp CTA & Retake Actions */}
        <WhatsAppButton
          userSession={biodata}
          quizResult={quizResult}
          onRetakeTest={handleRetakeTest}
        />
      </main>

      {/* Footer */}
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
