import React from 'react';
import OptionButton from './OptionButton';

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

/**
 * QuestionCard Component displaying the active question prompt and choices
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
      <div className="bg-white rounded-xl border border-[#C4C6D1] p-8 text-center text-[#434750]">
        Tidak ada soal yang dapat ditampilkan.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-[#C4C6D1] shadow-sm p-6 md:p-8">
      {/* Header Badge & Question Number */}
      <div className="mb-6">
        <span className="text-xs font-semibold text-[#434750] uppercase tracking-wider block mb-2">
          Soal {questionNumber} dari {totalQuestions}
        </span>
        <h2 className="text-xl md:text-2xl font-semibold text-[#151C27] leading-snug">
          {question.question}
        </h2>
      </div>

      {/* Options List */}
      <div className="space-y-3.5">
        {question.options.map((optionText, index) => {
          const letter = OPTION_LETTERS[index] || String.fromCharCode(65 + index);
          const isSelected = selectedOption === index;

          return (
            <OptionButton
              key={index}
              letter={letter}
              text={optionText}
              isSelected={isSelected}
              onClick={() => onSelectOption(index)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
