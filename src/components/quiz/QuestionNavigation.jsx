/**
 * QuestionNavigation — Sidebar variant.
 * - Free navigation across all questions.
 * - Displays clear checkmark badges (✓ / check) for answered questions.
 * - Green = Answered, Red = Unanswered.
 */
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

  const answeredCount = Object.keys(answers).filter(
    (k) => answers[k] !== undefined && answers[k] !== null
  ).length;

  return (
    <div className="flex flex-col gap-4 w-full">

      {/* Progress Summary */}
      <div className="bg-[#F0F4FF] border border-[#C4D0F0] rounded-xl p-3 text-center">
        <p className="text-xs text-[#434750] mb-1">Kemajuan Menjawab</p>
        <p className="text-2xl font-extrabold text-[#22437C]">
          {answeredCount}
          <span className="text-base font-medium text-gray-500"> / {totalQuestions}</span>
        </p>
        <div className="mt-2 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-[#22437C] rounded-full transition-all duration-500"
            style={{ width: `${totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0}%` }}
          />
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-2 text-[10px] font-semibold">
        <span className="flex items-center gap-1 bg-emerald-50 border border-emerald-300 text-emerald-800 px-2 py-0.5 rounded-full">
          <span className="w-4 h-4 rounded-full bg-emerald-600 text-white font-extrabold text-[9px] flex items-center justify-center">✓</span> Terjawab
        </span>
        <span className="flex items-center gap-1 bg-red-50 border border-red-300 text-red-800 px-2 py-0.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> Belum Dijawab
        </span>
      </div>

      {/* Grid of question buttons with answered checkmark badges */}
      <div className="grid grid-cols-5 gap-1.5">
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
                title={`Soal ${idx + 1}: ${isAnswered ? 'Terjawab' : 'Belum Dijawab'}`}
                className={`w-full h-10 rounded-lg border text-[11px] transition-all duration-150 flex items-center justify-center select-none ${style}`}
              >
                <span className="leading-none">{idx + 1}</span>
              </button>

              {/* Explicit Checkmark Badge Mark for Answered Questions */}
              {isAnswered && (
                <span
                  className="absolute -top-1 -right-1 bg-emerald-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-extrabold shadow-xs border border-white z-10 pointer-events-none"
                  title="Sudah Dijawab"
                >
                  ✓
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 pt-1">
        {!isLast && (
          <button
            type="button"
            onClick={onNext}
            className="w-full flex items-center justify-center gap-2 bg-[#22437C] hover:bg-[#1a3463] active:scale-95 text-white font-bold text-sm px-4 py-3 rounded-xl shadow transition-all cursor-pointer"
          >
            <span>Selanjutnya</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        )}

        <button
          type="button"
          onClick={onSubmitClick}
          className="w-full flex items-center justify-center gap-2 bg-[#A9213F] hover:bg-[#8A1A32] active:scale-95 text-white font-bold text-sm px-4 py-3 rounded-xl shadow transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">check_circle</span>
          <span>Akhiri & Kumpulkan</span>
        </button>
      </div>
    </div>
  );
};

export default QuestionNavigation;
