import { useState } from 'react';
import questionsData from '../../data/questions.json' with { type: 'json' };

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

export const QuestionReviewList = ({ userAnswers = {} }) => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [isExpanded, setIsExpanded] = useState(true);

  const questionDetails = questionsData.map((q) => {
    const selectedIndex = userAnswers[q.id];
    const isAnswered = selectedIndex !== undefined && selectedIndex !== null;
    const isCorrect = isAnswered && selectedIndex === q.correctAnswer;
    return { ...q, selectedIndex, isAnswered, isCorrect };
  });

  const totalCount = questionDetails.length;
  const correctCount = questionDetails.filter((q) => q.isCorrect).length;
  const incorrectCount = questionDetails.filter((q) => q.isAnswered && !q.isCorrect).length;
  const unansweredCount = questionDetails.filter((q) => !q.isAnswered).length;

  const filteredQuestions = questionDetails.filter((q) => {
    if (activeFilter === 'CORRECT') return q.isCorrect;
    if (activeFilter === 'INCORRECT') return q.isAnswered && !q.isCorrect;
    if (activeFilter === 'UNANSWERED') return !q.isAnswered;
    return true;
  });

  const FILTERS = [
    { key: 'ALL', label: `Semua (${totalCount})` },
    { key: 'CORRECT', label: `Benar (${correctCount})` },
    { key: 'INCORRECT', label: `Salah (${incorrectCount})` },
    ...(unansweredCount > 0 ? [{ key: 'UNANSWERED', label: `Tidak Dijawab (${unansweredCount})` }] : []),
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 py-4 border-b border-gray-200">
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-1.5">
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveFilter(key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === key
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Toggle Button */}
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-800 font-medium transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-base">
            {isExpanded ? 'visibility_off' : 'visibility'}
          </span>
          {isExpanded ? 'Sembunyikan' : 'Tampilkan'}
        </button>
      </div>

      {/* Collapsed State */}
      {!isExpanded && (
        <div className="px-5 py-8 text-center text-gray-400 text-sm">
          <span className="material-symbols-outlined block text-3xl mb-2">visibility_off</span>
          Review jawaban disembunyikan —{' '}
          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            className="underline text-gray-600 hover:text-gray-900 cursor-pointer font-medium"
          >
            tampilkan kembali
          </button>
        </div>
      )}

      {/* Question Grid */}
      {isExpanded && (
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredQuestions.length === 0 ? (
            <div className="col-span-full py-10 text-center text-gray-400 text-sm">
              Tidak ada soal dalam kategori ini.
            </div>
          ) : (
            filteredQuestions.map((q) => {
              const correctAnswerText = q.options[q.correctAnswer];
              const selectedAnswerText = q.isAnswered ? q.options[q.selectedIndex] : null;

              // Minimal card border: single subtle accent left border only
              const leftBorder = q.isCorrect
                ? 'border-l-2 border-l-emerald-500'
                : q.isAnswered
                ? 'border-l-2 border-l-red-400'
                : 'border-l-2 border-l-gray-300';

              return (
                <div
                  key={q.id}
                  className={`border border-gray-200 rounded-xl overflow-hidden flex flex-col ${leftBorder}`}
                >
                  {/* Card Top: number + status */}
                  <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 border-b border-gray-200">
                    <span className="text-xs font-bold text-gray-600">Soal #{q.id}</span>
                    <span className={`text-[11px] font-semibold ${
                      q.isCorrect ? 'text-emerald-600' : q.isAnswered ? 'text-red-500' : 'text-gray-400'
                    }`}>
                      {q.isCorrect ? '✓ Benar' : q.isAnswered ? '✗ Salah' : '— Tidak Dijawab'}
                    </span>
                  </div>

                  <div className="px-4 py-3 flex flex-col gap-3 flex-grow">
                    {/* Question Text */}
                    <p className="text-sm font-semibold text-gray-800 leading-snug">
                      {q.question}
                    </p>

                    {/* Options */}
                    <div className="space-y-1.5">
                      {q.options.map((optText, optIdx) => {
                        const optLetter = OPTION_LETTERS[optIdx] || String.fromCharCode(65 + optIdx);
                        const isSelected = q.selectedIndex === optIdx;
                        const isCorrectOpt = q.correctAnswer === optIdx;

                        let row = 'text-gray-500';
                        if (isCorrectOpt) row = 'text-emerald-700 font-semibold';
                        else if (isSelected && !isCorrectOpt) row = 'text-red-600 font-semibold line-through';

                        return (
                          <div key={optIdx} className={`flex items-start gap-2 text-xs ${row}`}>
                            <span className={`shrink-0 w-4 h-4 mt-0.5 rounded-sm flex items-center justify-center text-[10px] font-bold ${
                              isCorrectOpt
                                ? 'bg-emerald-600 text-white'
                                : isSelected
                                ? 'bg-red-400 text-white'
                                : 'bg-gray-200 text-gray-600'
                            }`}>
                              {optLetter}
                            </span>
                            <span>{optText}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Footer: your answer vs correct answer */}
                    <div className="border-t border-gray-100 pt-2.5 flex flex-col gap-1 text-[11px] text-gray-500">
                      <div className="flex justify-between">
                        <span>Jawaban Anda</span>
                        <span className={`font-semibold ${q.isCorrect ? 'text-emerald-700' : q.isAnswered ? 'text-red-500' : 'italic text-gray-400'}`}>
                          {q.isAnswered ? selectedAnswerText : 'Tidak dijawab'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Kunci Jawaban</span>
                        <span className="font-semibold text-emerald-700">{correctAnswerText}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionReviewList;
