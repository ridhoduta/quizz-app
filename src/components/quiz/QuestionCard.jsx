import OptionButton from './OptionButton';
const OPTION_LETTERS = ['A', 'B', 'C', 'D'];
export const QuestionCard = ({
  questionNumber,
  totalQuestions,
  question,
  selectedOption,
  onSelectOption,
}) => {
  if (!question) {
    return (
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-8 text-center text-outline">
        Tidak ada soal yang dapat ditampilkan.
      </div>
    );
  }

  const isAnswered = selectedOption !== undefined && selectedOption !== null;
  const selectedLetter = isAnswered ? OPTION_LETTERS[selectedOption] : null;

  return (
    <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-sm p-6 md:p-8 transition-all duration-300">
      {/* Question Number + Answered Status Badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <span className="text-xs font-bold text-outline uppercase tracking-widest">
          Soal {questionNumber} dari {totalQuestions}
        </span>

        <div>
          {/* Mark / Badge if user has answered */}
          {isAnswered ? (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-600 text-surface-container-lowest font-bold text-[9px] flex items-center justify-center shrink-0">✓</span>
              <span>Sudah Dijawab ({selectedLetter})</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full bg-error-container/30 text-brand-accent-dark border border-error-container">
              <span className="w-3.5 h-3.5 rounded-full bg-brand-accent text-surface-container-lowest font-bold text-[9px] flex items-center justify-center shrink-0">!</span>
              <span>Belum Dijawab</span>
            </span>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-surface-container-high mb-5" />

      {/* Question Text */}
      <h2 className="text-lg md:text-xl font-bold text-on-surface leading-snug mb-6">
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
