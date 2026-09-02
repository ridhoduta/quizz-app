import { useState } from 'react';
import questionsData from '../../data/questions.json' with { type: 'json' };

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

/**
 * QuestionReviewList Component
 * Displays complete review of questions, user's selected answers, and correct answers with status badges and filter options.
 */
export const QuestionReviewList = ({ userAnswers = {} }) => {
  const [activeFilter, setActiveFilter] = useState('ALL');

  // Compute status for each question
  const questionDetails = questionsData.map((q) => {
    const selectedIndex = userAnswers[q.id];
    const isAnswered = selectedIndex !== undefined && selectedIndex !== null;
    const isCorrect = isAnswered && selectedIndex === q.correctAnswer;

    return {
      ...q,
      selectedIndex,
      isAnswered,
      isCorrect,
    };
  });

  // Count totals
  const totalCount = questionDetails.length;
  const correctCount = questionDetails.filter((q) => q.isCorrect).length;
  const incorrectCount = questionDetails.filter((q) => q.isAnswered && !q.isCorrect).length;
  const unansweredCount = questionDetails.filter((q) => !q.isAnswered).length;

  // Filter list based on selected filter tab
  const filteredQuestions = questionDetails.filter((q) => {
    if (activeFilter === 'CORRECT') return q.isCorrect;
    if (activeFilter === 'INCORRECT') return q.isAnswered && !q.isCorrect;
    if (activeFilter === 'UNANSWERED') return !q.isAnswered;
    return true; // ALL
  });

  return (
    <div className="bg-white border border-[#C4C6D1] rounded-2xl p-6 md:p-8 custom-shadow flex flex-col gap-6">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-200 pb-4">
        <div>
          <h3 className="text-xl md:text-2xl font-extrabold text-[#012C64] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#22437C]">fact_check</span>
            Review Detail Soal & Jawaban
          </h3>
          <p className="text-xs md:text-sm text-[#434750] mt-1">
            Lihat perbandingan antara jawaban yang Anda pilih dengan jawaban yang benar.
          </p>
        </div>

        {/* Quick Stats Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">check_circle</span>
            {correctCount} Benar
          </span>
          <span className="bg-red-50 text-red-700 border border-red-200 px-3 py-1 rounded-full flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">cancel</span>
            {incorrectCount} Salah
          </span>
          {unansweredCount > 0 && (
            <span className="bg-gray-100 text-gray-700 border border-gray-300 px-3 py-1 rounded-full flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">schedule</span>
              {unansweredCount} Tidak Dijawab
            </span>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-100 pb-3 text-xs md:text-sm font-medium">
        <button
          type="button"
          onClick={() => setActiveFilter('ALL')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeFilter === 'ALL'
              ? 'bg-[#22437C] text-white font-bold shadow-xs'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Semua Soal ({totalCount})
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter('CORRECT')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeFilter === 'CORRECT'
              ? 'bg-emerald-600 text-white font-bold shadow-xs'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Jawaban Benar ({correctCount})
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter('INCORRECT')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeFilter === 'INCORRECT'
              ? 'bg-red-600 text-white font-bold shadow-xs'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Jawaban Salah ({incorrectCount})
        </button>
        {unansweredCount > 0 && (
          <button
            type="button"
            onClick={() => setActiveFilter('UNANSWERED')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeFilter === 'UNANSWERED'
                ? 'bg-gray-700 text-white font-bold shadow-xs'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Tidak Dijawab ({unansweredCount})
          </button>
        )}
      </div>

      {/* Questions Review Cards List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-8 text-gray-500 text-sm">
            Tidak ada soal dalam kategori filter ini.
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const correctAnswerText = q.options[q.correctAnswer];
            const selectedAnswerText = q.isAnswered ? q.options[q.selectedIndex] : null;

            return (
              <div
                key={q.id}
                className={`border rounded-2xl p-5 md:p-6 transition-all ${
                  q.isCorrect
                    ? 'border-emerald-200 bg-emerald-50/30'
                    : q.isAnswered
                    ? 'border-red-200 bg-red-50/30'
                    : 'border-amber-200 bg-amber-50/30'
                }`}
              >
                {/* Card Header: Question Number & Badge */}
                <div className="flex justify-between items-start gap-3 mb-3">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Soal #{q.id}
                  </span>

                  {/* Status Badge */}
                  {q.isCorrect ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                      <span className="material-symbols-outlined text-sm">check_circle</span>
                      Jawaban Benar
                    </span>
                  ) : q.isAnswered ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-red-100 text-red-800 border border-red-300">
                      <span className="material-symbols-outlined text-sm">cancel</span>
                      Jawaban Salah
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      Tidak Dijawab / Waktu Habis
                    </span>
                  )}
                </div>

                {/* Question Text */}
                <h4 className="text-base md:text-lg font-bold text-gray-900 mb-4 leading-snug">
                  {q.question}
                </h4>

                {/* Options Review Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                  {q.options.map((optText, optIdx) => {
                    const optLetter = OPTION_LETTERS[optIdx] || String.fromCharCode(65 + optIdx);
                    const isSelectedByOption = q.selectedIndex === optIdx;
                    const isCorrectOption = q.correctAnswer === optIdx;

                    let optBgStyle = 'bg-white border-gray-200 text-gray-700';
                    let badgeNode = null;

                    if (isCorrectOption) {
                      optBgStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold ring-1 ring-emerald-400';
                      badgeNode = (
                        <span className="ml-auto text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-xs">check</span>
                          Jawaban Benar
                        </span>
                      );
                    } else if (isSelectedByOption && !isCorrectOption) {
                      optBgStyle = 'bg-red-50 border-red-400 text-red-900 font-semibold ring-1 ring-red-400';
                      badgeNode = (
                        <span className="ml-auto text-[11px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-xs">close</span>
                          Pilihan Anda
                        </span>
                      );
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-xl border text-xs md:text-sm flex items-center gap-2.5 ${optBgStyle}`}
                      >
                        <span
                          className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs shrink-0 ${
                            isCorrectOption
                              ? 'bg-emerald-600 text-white'
                              : isSelectedByOption
                              ? 'bg-red-600 text-white'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {optLetter}
                        </span>
                        <span className="truncate">{optText}</span>
                        {badgeNode}
                      </div>
                    );
                  })}
                </div>

                {/* Summary Info Footer */}
                <div className="bg-white/80 p-3 rounded-xl border border-gray-200 text-xs flex flex-col sm:flex-row justify-between gap-2">
                  <div>
                    <span className="text-gray-500">Jawaban Anda: </span>
                    <span className={`font-semibold ${
                      q.isCorrect ? 'text-emerald-700' : q.isAnswered ? 'text-red-700' : 'text-amber-700 font-italic'
                    }`}>
                      {q.isAnswered ? selectedAnswerText : 'Tidak dijawab (waktu habis)'}
                    </span>
                  </div>

                  <div>
                    <span className="text-gray-500">Kunci Jawaban: </span>
                    <span className="font-semibold text-emerald-700">
                      {correctAnswerText}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default QuestionReviewList;
