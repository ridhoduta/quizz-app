import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useQuiz from '../hooks/useQuiz';
import QuestionCard from '../components/quiz/QuestionCard';
import QuestionNavigation from '../components/quiz/QuestionNavigation';
import QuestionTimer from '../components/quiz/QuestionTimer';
import SubmitConfirmation from '../components/quiz/SubmitConfirmation';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';

export const QuizPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(true);

  const {
    questions,
    currentIndex,
    currentQuestion,
    totalQuestions,
    answers,
    lockedQuestions,
    isLoaded,
    selectAnswer,
    lockQuestion,
    nextQuestion,
    goToQuestion,
    submitQuiz,
  } = useQuiz();

  /* ── Fullscreen ── */
  const enterFullscreen = useCallback(() => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement
        .requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch((err) => console.warn('Fullscreen request failed:', err));
    }
  }, []);

  useEffect(() => {
    enterFullscreen();
    const onChange = () => {
      setIsFullscreen(Boolean(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      ));
    };
    document.addEventListener('fullscreenchange', onChange);
    document.addEventListener('webkitfullscreenchange', onChange);
    document.addEventListener('mozfullscreenchange', onChange);
    document.addEventListener('MSFullscreenChange', onChange);
    return () => {
      document.removeEventListener('fullscreenchange', onChange);
      document.removeEventListener('webkitfullscreenchange', onChange);
      document.removeEventListener('mozfullscreenchange', onChange);
      document.removeEventListener('MSFullscreenChange', onChange);
    };
  }, [enterFullscreen]);

  /* ── Timer up: lock + advance ── */
  const handleTimeUp = useCallback(() => {
    if (currentQuestion) lockQuestion(currentQuestion.id);
    if (currentIndex < totalQuestions - 1) {
      nextQuestion();
    } else {
      setIsModalOpen(true);
    }
  }, [currentQuestion, currentIndex, totalQuestions, lockQuestion, nextQuestion]);

  /* ── Next button: lock + advance ── */
  const handleNextWithLock = useCallback(() => {
    if (currentQuestion) lockQuestion(currentQuestion.id);
    nextQuestion();
  }, [currentQuestion, lockQuestion, nextQuestion]);

  if (!isLoaded) {
    return <Loading fullScreen text="Memuat kuis placement test..." />;
  }

  const answeredCount = Object.keys(answers).filter(
    (k) => answers[k] !== undefined && answers[k] !== null
  ).length;
  const unansweredCount = totalQuestions - answeredCount;
  const isCurrentLocked = Boolean(currentQuestion && lockedQuestions[currentQuestion.id]);

  const handleConfirmSubmit = () => {
    submitQuiz();
    setIsModalOpen(false);
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
    navigate('/result');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F4FB] font-sans antialiased text-[#151C27]">

      {/* ── Top Minimal Bar ── */}
      <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-2.5 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Brand + mode */}
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#22437C] text-2xl filled">school</span>
            <span className="font-extrabold text-[#012C64] text-sm md:text-base hidden sm:block">
              English Placement Test
            </span>
            <span className="text-xs text-gray-400 hidden md:block">— Focus Mode</span>
          </div>

          {/* Center: question counter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#22437C] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
              Soal {currentIndex + 1} / {totalQuestions}
            </span>
            {isCurrentLocked && (
              <span className="text-xs font-bold text-red-700 bg-red-50 border border-red-200 px-3 py-1 rounded-full flex items-center gap-1">
                <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>lock</span>
                Terkunci
              </span>
            )}
          </div>

          {/* Right: fullscreen + submit */}
          <div className="flex items-center gap-2">
            {!isFullscreen && (
              <button
                type="button"
                onClick={enterFullscreen}
                className="flex items-center gap-1 text-xs text-amber-700 bg-amber-50 border border-amber-300 px-2.5 py-1 rounded-lg hover:bg-amber-100 transition-colors font-bold cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">fullscreen</span>
                <span className="hidden sm:inline">Fullscreen</span>
              </button>
            )}
            <Button variant="accent" size="sm" onClick={() => setIsModalOpen(true)} icon="check_circle">
              <span className="hidden sm:inline">Kumpulkan</span>
            </Button>
          </div>
        </div>
      </div>

      {/* ── Main 2-Column Layout ── */}
      <div className="flex-grow w-full max-w-7xl mx-auto px-3 md:px-6 py-5 md:py-8 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5">

        {/* ── LEFT: Question Area ── */}
        <div className="flex flex-col gap-4 min-w-0">
          {/* Question Card */}
          <QuestionCard
            questionNumber={currentIndex + 1}
            totalQuestions={totalQuestions}
            question={currentQuestion}
            selectedOption={currentQuestion ? answers[currentQuestion.id] : undefined}
            isLocked={isCurrentLocked}
            onSelectOption={(optionIndex) =>
              currentQuestion && selectAnswer(currentQuestion.id, optionIndex)
            }
          />
        </div>

        {/* ── RIGHT: Sidebar ── */}
        <div className="flex flex-col gap-4">

          {/* Timer Card */}
          <div className={`bg-white rounded-2xl border shadow-sm p-5 flex flex-col items-center gap-3 transition-all duration-300 ${
            isCurrentLocked
              ? 'border-red-200'
              : 'border-gray-200'
          }`}>
            <div className="flex items-center gap-2 self-start">
              <span className="material-symbols-outlined text-[#22437C] text-base">timer</span>
              <span className="text-xs font-bold text-[#012C64] uppercase tracking-wide">
                Waktu Soal Ini
              </span>
            </div>

            {currentQuestion && (
              <QuestionTimer
                key={currentQuestion.id}
                duration={currentQuestion.timeLimitSeconds || 30}
                onTimeUp={handleTimeUp}
                isActive={!isModalOpen && isFullscreen && !isCurrentLocked}
                isLocked={isCurrentLocked}
              />
            )}
          </div>

          {/* Navigation Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
            <QuestionNavigation
              currentIndex={currentIndex}
              totalQuestions={totalQuestions}
              answers={answers}
              lockedQuestions={lockedQuestions}
              questions={questions}
              onGoToQuestion={goToQuestion}
              onNext={handleNextWithLock}
              onSubmitClick={() => setIsModalOpen(true)}
            />
          </div>

        </div>
      </div>

      {/* ── Fullscreen Warning Overlay ── */}
      {!isFullscreen && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-sm w-full text-center shadow-2xl flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-4xl">fullscreen</span>
            </div>
            <h2 className="text-lg font-extrabold text-gray-900 mb-2">Mode Fullscreen Diperlukan</h2>
            <p className="text-sm text-gray-500 mb-5 leading-relaxed">
              Kuis harus dilakukan dalam mode layar penuh untuk menjaga fokus dan keamanan pengerjaan.
            </p>
            <Button variant="primary" size="lg" fullWidth onClick={enterFullscreen} icon="fullscreen">
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
