import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useQuiz from '../hooks/useQuiz';
import QuestionCard from '../components/quiz/QuestionCard';
import QuestionNavigation from '../components/quiz/QuestionNavigation';
import SubmitConfirmation from '../components/quiz/SubmitConfirmation';
import ProgressBar from '../components/common/ProgressBar';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';

export const QuizPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    questions,
    currentIndex,
    currentQuestion,
    totalQuestions,
    answers,
    progress,
    isLoaded,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    goToQuestion,
    submitQuiz,
  } = useQuiz();

  if (!isLoaded) {
    return <Loading fullScreen text="Memuat kuis placement test..." />;
  }

  // Count answered questions
  const answeredCount = Object.keys(answers).filter(
    (key) => answers[key] !== undefined && answers[key] !== null
  ).length;
  const unansweredCount = totalQuestions - answeredCount;

  // Handle final quiz submission and navigate to /result
  const handleConfirmSubmit = () => {
    submitQuiz();
    setIsModalOpen(false);
    navigate('/result');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased text-[#151C27] bg-[#FEFCFF]">
      {/* Top Header Bar */}
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

          <div className="flex items-center gap-4">
            <span className="text-xs md:text-sm font-medium text-[#434750] hidden sm:block">
              Soal {currentIndex + 1} / {totalQuestions}
            </span>
            <Button
              variant="accent"
              size="sm"
              onClick={() => setIsModalOpen(true)}
            >
              Selesai Test
            </Button>
          </div>
        </div>
      </header>

      {/* Main Quiz Area */}
      <main className="flex-grow w-full max-w-4xl mx-auto px-4 md:px-8 py-6 md:py-10">
        {/* Progress Bar Header */}
        <div className="mb-6 md:mb-8">
          <ProgressBar
            progress={progress}
            label={`Soal ${currentIndex + 1} dari ${totalQuestions}`}
            subLabel={`${progress}% selesai`}
          />
        </div>

        {/* Current Active Question Card */}
        <div className="mb-8">
          {currentQuestion && (
            <QuestionCard
              questionNumber={currentIndex + 1}
              totalQuestions={totalQuestions}
              question={currentQuestion}
              selectedOption={answers[currentQuestion.id]}
              onSelectOption={(optionIndex) =>
                selectAnswer(currentQuestion.id, optionIndex)
              }
            />
          )}
        </div>

        {/* Question Navigation Controls & Grid */}
        <div>
          <QuestionNavigation
            currentIndex={currentIndex}
            totalQuestions={totalQuestions}
            answers={answers}
            questions={questions}
            onNext={nextQuestion}
            onPrevious={previousQuestion}
            onGoToQuestion={goToQuestion}
            onSubmitClick={() => setIsModalOpen(true)}
          />
        </div>
      </main>

      {/* Submit Confirmation Modal Dialog */}
      <SubmitConfirmation
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmSubmit}
        unansweredCount={unansweredCount}
        totalQuestions={totalQuestions}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-[#C4C6D1] text-xs text-[#434750] py-6 mt-auto">
        <div className="max-w-5xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-3 text-center md:text-left">
          <span>© 2026 Academic English Systems. All rights reserved.</span>
          <div className="flex gap-4">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span className="hover:underline cursor-pointer">Terms of Service</span>
            <span className="hover:underline cursor-pointer">Help Center</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default QuizPage;
