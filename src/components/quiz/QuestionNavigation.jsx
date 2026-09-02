/**
 * QuestionNavigation — Sidebar variant.
 * Compact grid of question buttons: Green = Answered, Red = Unanswered.
 * Lock/unlock icon shown per question.
 * "Selanjutnya" button locks current question before advancing.
 */
export const QuestionNavigation = ({
  currentIndex = 0,
  totalQuestions = 15,
  answers = {},
  lockedQuestions = {},
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
        {/* Mini progress bar */}
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
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Terjawab
        </span>
        <span className="flex items-center gap-1 bg-red-50 border border-red-300 text-red-800 px-2 py-0.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> Belum Dijawab
        </span>
        <span className="flex items-center gap-1 bg-gray-100 border border-gray-300 text-gray-700 px-2 py-0.5 rounded-full">
          <span className="material-symbols-outlined text-[10px]">lock</span> Terkunci
        </span>
      </div>

      {/* Grid of question buttons */}
      <div className="grid grid-cols-5 gap-1.5">
        {Array.from({ length: totalQuestions }).map((_, idx) => {
          const questionId = questions[idx]?.id || idx + 1;
          const isAnswered = answers[questionId] !== undefined && answers[questionId] !== null;
          const isLocked = Boolean(lockedQuestions[questionId]);
          const isActive = idx === currentIndex;

          // Locked questions: grey out, disable click
          let style = '';
          if (isLocked) {
            style = isActive
              ? 'bg-gray-400 border-gray-500 text-white shadow-md cursor-not-allowed'
              : 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed opacity-60';
          } else if (isActive) {
            style = isAnswered
              ? 'bg-emerald-500 border-emerald-600 text-white shadow-md cursor-pointer'
              : 'bg-[#22437C] border-[#1a3463] text-white shadow-md cursor-pointer';
          } else if (isAnswered) {
            style = 'bg-emerald-50 border-emerald-400 text-emerald-900 hover:bg-emerald-100 cursor-pointer';
          } else {
            style = 'bg-red-50 border-red-300 text-red-800 hover:bg-red-100 cursor-pointer';
          }

          return (
            <button
              key={idx}
              type="button"
              disabled={isLocked}
              onClick={() => !isLocked && onGoToQuestion(idx)}
              title={`Soal ${idx + 1}: ${isAnswered ? 'Terjawab' : 'Belum'} | ${isLocked ? 'Terkunci — tidak bisa dipilih' : 'Terbuka'}`}
              className={`h-10 rounded-lg border text-[11px] font-bold transition-all duration-150 flex flex-col items-center justify-center gap-0.5 ${style} ${isActive && !isLocked ? 'scale-105' : ''}`}
            >
              <span className="leading-none">{idx + 1}</span>
              <span className={`material-symbols-outlined leading-none ${
                isLocked ? (isActive ? 'text-white/70' : 'text-gray-400') : isActive ? 'text-white/80' : isAnswered ? 'text-emerald-600' : 'text-red-400'
              }`} style={{ fontSize: '10px' }}>
                {isLocked ? 'lock' : 'lock_open'}
              </span>
            </button>
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
