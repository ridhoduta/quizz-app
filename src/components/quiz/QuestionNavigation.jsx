import React from 'react';
import Button from '../common/Button';

/**
 * QuestionNavigation Component for navigating questions and showing question status grid
 */
export const QuestionNavigation = ({
  currentIndex = 0,
  totalQuestions = 15,
  answers = {},
  questions = [],
  onNext,
  onPrevious,
  onGoToQuestion,
  onSubmitClick,
}) => {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalQuestions - 1;

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 w-full">
      {/* Navigation Action Buttons */}
      <div className="flex items-center gap-3 order-2 md:order-1 w-full md:w-auto">
        <Button
          variant="secondary"
          onClick={onPrevious}
          disabled={isFirst}
          icon="arrow_back"
          iconPosition="left"
          className="flex-1 md:flex-none"
        >
          Sebelumnya
        </Button>

        {!isLast ? (
          <Button
            variant="primary"
            onClick={onNext}
            icon="arrow_forward"
            iconPosition="right"
            className="flex-1 md:flex-none"
          >
            Selanjutnya
          </Button>
        ) : (
          <Button
            variant="accent"
            onClick={onSubmitClick}
            icon="check_circle"
            iconPosition="right"
            className="flex-1 md:flex-none"
          >
            Selesai Test
          </Button>
        )}
      </div>

      {/* Question Number Grid Indicators */}
      <div className="flex flex-wrap justify-center items-center gap-1.5 order-1 md:order-2">
        {Array.from({ length: totalQuestions }).map((_, idx) => {
          const questionId = questions[idx]?.id || idx + 1;
          const isAnswered =
            answers[questionId] !== undefined && answers[questionId] !== null;
          const isActive = idx === currentIndex;

          let btnStyles = 'bg-white border-[#C4C6D1] text-[#151C27] hover:bg-[#F0F3FF]';
          if (isActive) {
            btnStyles = 'bg-[#22437C] border-[#22437C] text-white font-bold shadow-md';
          } else if (isAnswered) {
            btnStyles = 'bg-[#E2E8F8] border-[#22437C]/40 text-[#22437C] font-semibold';
          }

          return (
            <button
              key={idx}
              type="button"
              onClick={() => onGoToQuestion(idx)}
              className={`w-9 h-9 rounded-lg border text-xs transition-all duration-150 cursor-pointer flex items-center justify-center ${btnStyles}`}
              title={`Soal ${idx + 1}${isAnswered ? ' (Terjawab)' : ''}`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionNavigation;
