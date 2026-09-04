import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useQuiz from "../hooks/useQuiz";
import QuestionCard from "../components/quiz/QuestionCard";
import QuestionNavigation from "../components/quiz/QuestionNavigation";
import QuestionTimer from "../components/quiz/QuestionTimer";
import SubmitConfirmation from "../components/quiz/SubmitConfirmation";
import Button from "../components/common/Button";
import Loading from "../components/common/Loading";

export const QuizPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const {
    questions,
    currentIndex,
    currentQuestion,
    totalQuestions,
    answers,
    isLoaded,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    goToQuestion,
    submitQuiz,
  } = useQuiz();

  /* ── Fullscreen ── */
  const enterFullscreen = useCallback(() => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement
        .requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch((err) => console.warn("Fullscreen request failed:", err));
    }
  }, []);

  useEffect(() => {
    enterFullscreen();
    const onChange = () => {
      setIsFullscreen(
        Boolean(
          document.fullscreenElement ||
          document.webkitFullscreenElement ||
          document.mozFullScreenElement ||
          document.msFullscreenElement,
        ),
      );
    };
    document.addEventListener("fullscreenchange", onChange);
    document.addEventListener("webkitfullscreenchange", onChange);
    document.addEventListener("mozfullscreenchange", onChange);
    document.addEventListener("MSFullscreenChange", onChange);
    return () => {
      document.removeEventListener("fullscreenchange", onChange);
      document.removeEventListener("webkitfullscreenchange", onChange);
      document.removeEventListener("mozfullscreenchange", onChange);
      document.removeEventListener("MSFullscreenChange", onChange);
    };
  }, [enterFullscreen]);

  // Handle escape key to close sidebar on mobile
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSidebarOpen]);

  // Prevent body scroll when mobile sidebar drawer is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  // Handle final quiz submission and navigate to /result
  const handleConfirmSubmit = useCallback(() => {
    submitQuiz();
    setIsModalOpen(false);
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
    navigate("/result");
  }, [submitQuiz, navigate]);

  /* ── Overall 10-Minute Timer expiration: auto submit test ── */
  const handleOverallTimeUp = useCallback(() => {
    handleConfirmSubmit();
  }, [handleConfirmSubmit]);

  if (!isLoaded) {
    return <Loading fullScreen text="Memuat kuis placement test..." />;
  }

  const answeredCount = Object.keys(answers).filter(
    (k) => answers[k] !== undefined && answers[k] !== null,
  ).length;
  const unansweredCount = totalQuestions - answeredCount;

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F4FB] font-sans antialiased text-[#151C27]">
      {/* ── Top Minimal Bar ── */}
      <div className="bg-white border-b border-gray-200 px-3 sm:px-4 md:px-8 py-2.5 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-2">
          {/* Brand + mode */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <span className="material-symbols-outlined text-[#22437C] text-2xl filled">
              school
            </span>
            <span className="font-extrabold text-[#012C64] text-xs sm:text-sm md:text-base hidden sm:block">
              BunnySpeak Course
            </span>
            <span className="text-xs text-gray-400 hidden md:block">
              — Focus Mode
            </span>
          </div>

          {/* Center: question counter */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-bold text-[#22437C] bg-blue-50 border border-blue-200 px-2.5 sm:px-3 py-1 rounded-full">
              Soal {currentIndex + 1} / {totalQuestions}
            </span>
          </div>

          {/* Right: navigation toggle (mobile) + fullscreen + submit */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Mobile Navigation Sidebar Trigger */}
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden flex items-center gap-1 text-xs font-bold text-[#22437C] bg-blue-50 border border-blue-200 px-2.5 py-1.5 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer"
              aria-label="Buka Navigasi Soal"
              title="Daftar Soal"
            >
              <span className="material-symbols-outlined text-base">menu</span>
              <span className="hidden sm:inline">Navigasi</span>
            </button>

            {!isFullscreen && (
              <button
                type="button"
                onClick={enterFullscreen}
                className="flex items-center gap-1 text-xs text-amber-800 bg-amber-50 border border-amber-300 px-2 sm:px-2.5 py-1.5 rounded-lg hover:bg-amber-100 transition-colors font-medium cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">
                  fullscreen
                </span>
                <span className="hidden sm:inline">Fullscreen</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Main Layout: Mobile = Timer at top, Desktop = 2-Column with Sidebar ── */}
      <div className="flex-grow w-full max-w-7xl mx-auto px-3 md:px-6 py-4 md:py-8 grid grid-cols-1 lg:grid-cols-[1fr_300px] lg:grid-rows-[auto_1fr] items-start gap-4 md:gap-5">
        {/* ── 1. TIMER (Mobile: Top above question, Desktop: Right Column Top) ── */}
        <div className="order-1 lg:order-none lg:col-start-2 lg:row-start-1 bg-white rounded-2xl border border-gray-200 shadow-sm p-4 md:p-5 flex flex-col items-center gap-3 transition-all duration-300 w-full">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2 w-full">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#22437C] text-base">
                timer
              </span>
              <span className="text-xs font-bold text-[#012C64] uppercase tracking-wide">
                Sisa Waktu Ujian
              </span>
            </div>
            <span className="text-[11px] text-gray-500">Total 10 menit</span>
          </div>

          <QuestionTimer
            key="total-quiz-timer"
            duration={600}
            onTimeUp={handleOverallTimeUp}
            isActive={!isModalOpen && isFullscreen}
            answers={answers}
          />
        </div>

        {/* ── 2. QUESTION AREA (Mobile: Middle, Desktop: Left Column) ── */}
        <div className="order-2 lg:order-none lg:col-start-1 lg:row-start-1 lg:row-span-2 flex flex-col gap-4 min-w-0">
          {/* Question Card */}
          <QuestionCard
            questionNumber={currentIndex + 1}
            totalQuestions={totalQuestions}
            question={currentQuestion}
            selectedOption={
              currentQuestion ? answers[currentQuestion.id] : undefined
            }
            onSelectOption={(optionIndex) =>
              currentQuestion && selectAnswer(currentQuestion.id, optionIndex)
            }
          />

          {/* Mobile Bottom Quick Navigation */}
          <div className="lg:hidden bg-white rounded-2xl border border-gray-200 p-3 shadow-sm flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={previousQuestion}
              disabled={currentIndex === 0}
              className="flex-1 min-h-[42px] flex items-center justify-center gap-1 bg-gray-100 hover:bg-gray-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 text-gray-700 font-bold text-xs px-3 py-2 rounded-xl transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">
                arrow_back
              </span>
              <span>Sebelumnya</span>
            </button>

            {/* <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="flex-1 min-h-[42px] flex items-center justify-center gap-1.5 bg-[#22437C]/10 hover:bg-[#22437C]/20 active:scale-95 text-[#22437C] font-extrabold text-xs px-3 py-2 rounded-xl border border-[#22437C]/20 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">grid_view</span>
              <span>Navigasi Soal</span>
            </button> */}

            {currentIndex === totalQuestions - 1 ? (
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="flex-1 min-h-[42px] flex items-center justify-center gap-1 bg-[#A9213F] hover:bg-[#8A1A32] active:scale-95 text-white font-bold text-xs px-3 py-2 rounded-xl transition-all shadow-xs cursor-pointer"
              >
                <span>Kumpulkan</span>
                <span className="material-symbols-outlined text-sm">check</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={nextQuestion}
                className="flex-1 min-h-[42px] flex items-center justify-center gap-1 bg-[#22437C] hover:bg-[#1a3463] active:scale-95 text-white font-bold text-xs px-3 py-2 rounded-xl transition-all shadow-xs cursor-pointer"
              >
                <span>Berikutnya</span>
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </button>
            )}
          </div>
        </div>

        {/* ── 3. NAVIGATION (Mobile: Off-canvas Sidebar Drawer, Desktop: Sidebar Bottom) ── */}
        <>
          {/* Mobile Backdrop */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300"
              onClick={() => setIsSidebarOpen(false)}
              aria-hidden="true"
            />
          )}

          <aside
            className={`
              fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[85vw] bg-white p-5 shadow-2xl overflow-y-auto transition-transform duration-300 ease-in-out
              ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}
              lg:static lg:z-auto lg:w-full lg:max-w-none lg:shadow-none lg:p-0 lg:overflow-visible lg:translate-x-0
              order-3 lg:order-none lg:col-start-2 lg:row-start-2
            `}
          >
            {/* Mobile Sidebar Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100 lg:hidden">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#22437C] text-xl">
                  grid_view
                </span>
                <h3 className="font-bold text-gray-900 text-sm">
                  Navigasi Soal
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsSidebarOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="Tutup Sidebar"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            {/* Navigation Card Content */}
            <div className="bg-transparent lg:bg-white lg:rounded-2xl lg:border lg:border-gray-200 lg:shadow-sm lg:p-4">
              <QuestionNavigation
                currentIndex={currentIndex}
                totalQuestions={totalQuestions}
                answers={answers}
                questions={questions}
                onGoToQuestion={(idx) => {
                  goToQuestion(idx);
                  setIsSidebarOpen(false);
                }}
                onNext={() => {
                  nextQuestion();
                  setIsSidebarOpen(false);
                }}
                onSubmitClick={() => {
                  setIsSidebarOpen(false);
                  setIsModalOpen(true);
                }}
              />
            </div>
          </aside>
        </>
      </div>

      {/* ── Fullscreen Blocking Modal Overlay ── */}
      {!isFullscreen && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-sm w-full text-center shadow-2xl flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-4xl">
                fullscreen
              </span>
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              Mode Fullscreen Diperlukan
            </h2>
            <p className="text-sm text-gray-600 mb-5 leading-relaxed">
              Kuis harus dilakukan dalam mode layar penuh untuk menjaga fokus
              pengerjaan tes. Silakan masuk kembali ke mode fullscreen.
            </p>
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={enterFullscreen}
              icon="fullscreen"
            >
              Masuk Fullscreen
            </Button>
          </div>
        </div>
      )}

      {/* ── Submit Modal ── */}
      <SubmitConfirmation
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmSubmit}
        unansweredCount={unansweredCount}
        totalQuestions={totalQuestions}
      />
    </div>
  );
};

export default QuizPage;
