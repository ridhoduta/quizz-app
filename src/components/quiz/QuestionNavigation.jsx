export const QuestionNavigation = ({
  currentIndex = 0,
  totalQuestions = 15,
  answers = {},
  questions = [],
  onGoToQuestion,
  onNext,
  onSubmitClick,
}) => {
  const isLast = currentIndex === totalQuestions - 1;

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Legend */}
      <div className="flex flex-wrap gap-2 text-[10px] font-semibold">
        <span className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-300 text-emerald-800 px-2.5 py-1 rounded-full">
          <span className="w-4 h-4 rounded-full bg-emerald-600 text-surface-container-lowest font-extrabold text-[9px] flex items-center justify-center">✓</span>
          <span>Sudah Dijawab</span>
        </span>
        <span className="flex items-center gap-1.5 bg-error-container/30 border border-error-container text-brand-accent-dark px-2.5 py-1 rounded-full">
          <span className="w-4 h-4 rounded-full bg-brand-accent text-surface-container-lowest font-bold text-[10px] flex items-center justify-center">!</span>
          <span>Belum Dijawab</span>
        </span>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: totalQuestions }).map((_, idx) => {
          const questionId = questions[idx]?.id || idx + 1;
          const isAnswered = answers[questionId] !== undefined && answers[questionId] !== null;
          const isActive = idx === currentIndex;

          let style;

          if (isActive) {
            style = isAnswered
              ? 'bg-emerald-600 border border-emerald-700 text-surface-container-lowest font-extrabold shadow-md ring-2 ring-emerald-400 scale-105'
              : 'bg-primary-container border border-primary text-surface-container-lowest font-extrabold shadow-md ring-2 ring-primary-container/50 scale-105';
          } else if (isAnswered) {
            style = 'bg-emerald-50 border border-emerald-400 text-emerald-900 hover:bg-emerald-100 cursor-pointer font-bold';
          } else {
            style = 'bg-error-container/20 border border-error-container text-brand-accent-dark hover:bg-error-container/40 cursor-pointer font-bold';
          }

          return (
            <div key={idx} className="relative">
              <button
                type="button"
                onClick={() => onGoToQuestion(idx)}
                aria-label={`Soal ${idx + 1}: ${isAnswered ? 'Sudah Dijawab' : 'Belum Dijawab'}${isActive ? ', Soal Aktif' : ''}`}
                title={`Soal ${idx + 1}: ${isAnswered ? 'Sudah Dijawab' : 'Belum Dijawab'}`}
                className={`w-full h-11 rounded-lg text-xs transition-all duration-150 flex items-center justify-center select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container ${style}`}
              >
                <span className="leading-none">{idx + 1}</span>
              </button>
              {isAnswered && (
                <span
                  className="absolute -top-1 -right-1 bg-emerald-600 text-surface-container-lowest rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-extrabold shadow-xs border border-surface-container-lowest z-10 pointer-events-none"
                  title="Sudah Dijawab"
                  aria-hidden="true"
                >
                  ✓
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2.5 pt-1">
        {!isLast && (
          <button
            type="button"
            onClick={onNext}
            className="w-full min-h-[44px] flex items-center justify-center gap-2 bg-primary-container hover:bg-primary-container-hover active:scale-95 text-surface-container-lowest font-bold text-sm px-4 py-3 rounded-xl shadow transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
          >
            <span>Soal Berikutnya</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        )}

        <button
          type="button"
          onClick={onSubmitClick}
          className="w-full min-h-[44px] flex items-center justify-center gap-2 bg-brand-accent hover:bg-brand-accent-hover active:scale-95 text-surface-container-lowest font-bold text-sm px-4 py-3 rounded-xl shadow transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
        >
          <span className="material-symbols-outlined text-sm">assignment_turned_in</span>
          <span>Kumpulkan Jawaban</span>
        </button>
      </div>
    </div>
  );
};

export default QuestionNavigation;
