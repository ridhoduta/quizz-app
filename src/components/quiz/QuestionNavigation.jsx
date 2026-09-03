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
          <span className="w-4 h-4 rounded-full bg-emerald-600 text-white font-extrabold text-[9px] flex items-center justify-center">✓</span>
          <span>Sudah Dijawab</span>
        </span>
        <span className="flex items-center gap-1.5 bg-red-50 border border-red-300 text-red-800 px-2.5 py-1 rounded-full">
          <span className="w-4 h-4 rounded-full bg-red-500 text-white font-bold text-[10px] flex items-center justify-center">!</span>
          <span>Belum Dijawab</span>
        </span>
      </div>

      {/* Grid of question buttons with answered checkmark badges */}
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: totalQuestions }).map((_, idx) => {
          const questionId = questions[idx]?.id || idx + 1;
          const isAnswered = answers[questionId] !== undefined && answers[questionId] !== null;
          const isActive = idx === currentIndex;

          let style = '';

          if (isActive) {
            style = isAnswered
              ? 'bg-emerald-600 border-emerald-700 text-white font-extrabold shadow-md ring-2 ring-emerald-400 scale-105'
              : 'bg-[#22437C] border-[#1a3463] text-white font-extrabold shadow-md ring-2 ring-blue-400 scale-105';
          } else if (isAnswered) {
            style = 'bg-emerald-50 border-emerald-400 text-emerald-900 hover:bg-emerald-100 cursor-pointer font-bold';
          } else {
            style = 'bg-red-50 border-red-300 text-red-800 hover:bg-red-100 cursor-pointer font-bold';
          }

          return (
            <div key={idx} className="relative">
              <button
                type="button"
                onClick={() => onGoToQuestion(idx)}
                aria-label={`Soal ${idx + 1}: ${isAnswered ? 'Sudah Dijawab' : 'Belum Dijawab'}${isActive ? ', Soal Aktif' : ''}`}
                title={`Soal ${idx + 1}: ${isAnswered ? 'Sudah Dijawab' : 'Belum Dijawab'}`}
                className={`w-full h-11 rounded-lg border text-xs transition-all duration-150 flex items-center justify-center select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22437C] ${style}`}
              >
                <span className="leading-none">{idx + 1}</span>
              </button>

              {/* Explicit Checkmark Badge Mark for Answered Questions */}
              {isAnswered && (
                <span
                  className="absolute -top-1 -right-1 bg-emerald-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-extrabold shadow-xs border border-white z-10 pointer-events-none"
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
            className="w-full min-h-[44px] flex items-center justify-center gap-2 bg-[#22437C] hover:bg-[#1a3463] active:scale-95 text-white font-bold text-sm px-4 py-3 rounded-xl shadow transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22437C]"
          >
            <span>Soal Berikutnya</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        )}

        <button
          type="button"
          onClick={onSubmitClick}
          className="w-full min-h-[44px] flex items-center justify-center gap-2 bg-[#A9213F] hover:bg-[#8A1A32] active:scale-95 text-white font-bold text-sm px-4 py-3 rounded-xl shadow transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A9213F]"
        >
          <span className="material-symbols-outlined text-sm">assignment_turned_in</span>
          <span>Kumpulkan Jawaban</span>
        </button>
      </div>
    </div>
  );
};

export default QuestionNavigation;
