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
}) => {
  if (!question) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-gray-400">
        Tidak ada soal yang dapat ditampilkan.
      </div>
    );
  }

  const isAnswered = selectedOption !== undefined && selectedOption !== null;
  const selectedLetter = isAnswered ? OPTION_LETTERS[selectedOption] : null;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 transition-all duration-300">
      {/* Question Number + Answered Status Badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          Soal {questionNumber} dari {totalQuestions}
        </span>

        <div>
          {/* Mark / Badge if user has answered */}
          {isAnswered ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
              <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>check_circle</span>
              Sudah Dijawab ({selectedLetter})
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-300">
              <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>help</span>
              Belum Dijawab
            </span>
          )}
        </div>
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
              onClick={() => onSelectOption(index)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
