import { useState, useEffect, useCallback, useMemo } from 'react';
import questionsData from '../data/questions.json' with { type: 'json' };
import { calculateScore, determineLevel } from '../utils/quizCalculator';
import { getRecommendation } from '../utils/recommendation';

export const QUIZ_ANSWERS_KEY = 'quizAnswers';
export const QUIZ_PROGRESS_KEY = 'quizProgress';
export const QUIZ_RESULT_KEY = 'quizResult';
export const QUIZ_LOCKED_KEY = 'quizLocked';

/**
 * Custom hook to manage placement test state, navigation, persistence, lock/unlock questions, and submit processing
 * @param {Array} questions List of questions (defaults to questions.json)
 */
export const useQuiz = (questions = questionsData) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [lockedQuestions, setLockedQuestions] = useState({});
  const [quizResult, setQuizResult] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const totalQuestions = questions.length;

  // Restore quiz answers, locked status, and saved result from localStorage on mount
  useEffect(() => {
    try {
      const savedAnswers = localStorage.getItem(QUIZ_ANSWERS_KEY);
      if (savedAnswers) {
        const parsed = JSON.parse(savedAnswers);
        if (parsed && typeof parsed === 'object') {
          setAnswers(parsed);
        }
      }

      const savedLocked = localStorage.getItem(QUIZ_LOCKED_KEY);
      if (savedLocked) {
        const parsedLocked = JSON.parse(savedLocked);
        if (parsedLocked && typeof parsedLocked === 'object') {
          setLockedQuestions(parsedLocked);
        }
      }

      const savedResult = localStorage.getItem(QUIZ_RESULT_KEY);
      if (savedResult) {
        const parsedResult = JSON.parse(savedResult);
        if (parsedResult && typeof parsedResult === 'object') {
          setQuizResult(parsedResult);
        }
      }
    } catch (err) {
      console.error('Failed to restore quiz state from localStorage:', err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Compute progress percentage based on number of answered questions
  const progress = useMemo(() => {
    if (totalQuestions === 0) return 0;
    const answeredCount = Object.keys(answers).filter(
      (key) => answers[key] !== undefined && answers[key] !== null
    ).length;
    return Math.round((answeredCount / totalQuestions) * 100);
  }, [answers, totalQuestions]);

  // Current active question object
  const currentQuestion = useMemo(() => {
    return questions[currentIndex] || null;
  }, [questions, currentIndex]);

  // Lock a question when its timer runs out or it is locked
  const lockQuestion = useCallback((questionId) => {
    setLockedQuestions((prev) => {
      if (prev[questionId]) return prev;
      const updated = {
        ...prev,
        [questionId]: true,
      };
      try {
        localStorage.setItem(QUIZ_LOCKED_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to save locked questions to localStorage:', err);
      }
      return updated;
    });
  }, []);

  // Select/update answer for a specific question (only if not locked)
  const selectAnswer = useCallback(
    (questionId, optionIndex) => {
      // Prevent selection if question is locked
      if (lockedQuestions[questionId]) {
        return;
      }

      setAnswers((prev) => {
        const updated = {
          ...prev,
          [questionId]: optionIndex,
        };

        // Auto-save progress to localStorage
        try {
          localStorage.setItem(QUIZ_ANSWERS_KEY, JSON.stringify(updated));
          const answeredCount = Object.keys(updated).filter(
            (k) => updated[k] !== undefined && updated[k] !== null
          ).length;
          const updatedProgress = Math.round((answeredCount / totalQuestions) * 100);
          localStorage.setItem(QUIZ_PROGRESS_KEY, String(updatedProgress));
        } catch (err) {
          console.error('Failed to auto-save quiz answers:', err);
        }

        return updated;
      });
    },
    [lockedQuestions, totalQuestions]
  );

  // Navigation handlers
  const nextQuestion = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, totalQuestions - 1));
  }, [totalQuestions]);

  const previousQuestion = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const goToQuestion = useCallback(
    (index) => {
      if (index >= 0 && index < totalQuestions) {
        setCurrentIndex(index);
      }
    },
    [totalQuestions]
  );

  // Submit quiz, compute final score, level, recommendation, and store result
  const submitQuiz = useCallback(() => {
    const { correctCount, score } = calculateScore(answers, questions);
    const level = determineLevel(score);
    const recommendation = getRecommendation(level);

    const resultPayload = {
      score,
      correctCount,
      totalQuestions,
      level,
      recommendation,
      answers,
      lockedQuestions,
      completedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem(QUIZ_RESULT_KEY, JSON.stringify(resultPayload));
      setQuizResult(resultPayload);
    } catch (err) {
      console.error('Failed to save quizResult to localStorage:', err);
    }

    return resultPayload;
  }, [answers, questions, totalQuestions, lockedQuestions]);

  // Reset quiz progress and clear localStorage
  const resetQuiz = useCallback(() => {
    setAnswers({});
    setLockedQuestions({});
    setCurrentIndex(0);
    setQuizResult(null);
    try {
      localStorage.removeItem(QUIZ_ANSWERS_KEY);
      localStorage.removeItem(QUIZ_PROGRESS_KEY);
      localStorage.removeItem(QUIZ_RESULT_KEY);
      localStorage.removeItem(QUIZ_LOCKED_KEY);
    } catch (err) {
      console.error('Failed to clear quiz localStorage:', err);
    }
  }, []);

  return {
    questions,
    currentIndex,
    currentQuestion,
    totalQuestions,
    answers,
    lockedQuestions,
    progress,
    quizResult,
    isLoaded,
    selectAnswer,
    lockQuestion,
    nextQuestion,
    previousQuestion,
    goToQuestion,
    submitQuiz,
    resetQuiz,
  };
};

export default useQuiz;
