/**
 * Quiz calculation utilities for scoring and level determination
 */

export const LEVEL_THRESHOLDS = {
  BEGINNER: 'Beginner',
  INTERMEDIATE: 'Intermediate',
  ADVANCED: 'Advanced',
};

/**
 * Calculates quiz score based on user answers and question dataset
 * @param {Object} answers Map of questionId -> selectedOptionIndex (e.g. { 1: 1, 2: 0 })
 * @param {Array} questions Array of question objects with id and correctAnswer
 * @returns {Object} { correctCount, totalQuestions, score }
 */
export const calculateScore = (answers = {}, questions = []) => {
  if (!Array.isArray(questions) || questions.length === 0) {
    return { correctCount: 0, totalQuestions: 0, score: 0 };
  }

  const totalQuestions = questions.length;
  let correctCount = 0;

  questions.forEach((q) => {
    const selectedAnswer = answers[q.id];
    if (selectedAnswer !== undefined && selectedAnswer !== null && Number(selectedAnswer) === q.correctAnswer) {
      correctCount += 1;
    }
  });

  const rawScore = (correctCount / totalQuestions) * 100;
  const score = Math.round(rawScore);

  return {
    correctCount,
    totalQuestions,
    score,
  };
};

/**
 * Determines level based on score percentage according to plan-data specs:
 * 0–40%  -> Beginner
 * 41–75% -> Intermediate
 * 76–100% -> Advanced
 * 
 * @param {number} score Score percentage (0 to 100)
 * @returns {string} Level ('Beginner' | 'Intermediate' | 'Advanced')
 */
export const determineLevel = (score = 0) => {
  const numericScore = Number(score) || 0;

  if (numericScore <= 40) {
    return LEVEL_THRESHOLDS.BEGINNER;
  }
  if (numericScore <= 75) {
    return LEVEL_THRESHOLDS.INTERMEDIATE;
  }
  return LEVEL_THRESHOLDS.ADVANCED;
};
