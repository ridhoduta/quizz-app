import OptionButton from './OptionButton';

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

/**
 * QuestionCard Component — clean focus variant for quiz
 */
export const QuestionCard = ({
  questionNumber,
  totalQuestions,
  question,
  selectedOption,
  onSelectOption,
  isLocked = false,
}) => {
  if (!question) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-gray-400">
        Tidak ada soal yang dapat ditampilkan.
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl border shadow-sm p-6 md:p-8 transition-all duration-300 ${
      isLocked ? 'border-red-200 bg-red-50/20' : 'border-gray-200'
    }`}>
      {/* Locked Banner */}
      {isLocked && (
        <div className="mb-5 bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2">
          <span className="material-symbols-outlined text-base">lock</span>
          <span>Soal ini <strong>TERKUNCI</strong> — waktu habis, jawaban tidak dapat diubah.</span>
        </div>
      )}

      {/* Question Number + Lock status badge */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          Soal {questionNumber} dari {totalQuestions}
        </span>
        <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border ${
          isLocked
            ? 'bg-red-100 text-red-700 border-red-200'
            : 'bg-emerald-100 text-emerald-700 border-emerald-200'
        }`}>
          <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>
            {isLocked ? 'lock' : 'lock_open'}
          </span>
          {isLocked ? 'Terkunci' : 'Terbuka'}
        </span>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-100 mb-5" />

      {/* Question Text */}
      <h2 className="text-lg md:text-xl font-bold text-[#151C27] leading-snug mb-6">
        {question.question}
      </h2>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((optionText, index) => {
          const letter = OPTION_LETTERS[index] || String.fromCharCode(65 + index);
          return (
            <OptionButton
              key={index}
              letter={letter}
              text={optionText}
              isSelected={selectedOption === index}
              disabled={isLocked}
              onClick={() => onSelectOption(index)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
