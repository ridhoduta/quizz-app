import { useState, useEffect, useCallback, useMemo } from 'react';
import questionsData from '../data/questions.json' with { type: 'json' };
import { calculateScore, determineLevel } from '../utils/quizCalculator';
import { getRecommendation } from '../utils/recommendation';
import { storage } from '../lib/storage';
import { env } from '../config/env';

export const QUIZ_ANSWERS_KEY = env.quizAnswersKey;
export const QUIZ_PROGRESS_KEY = env.quizProgressKey;
export const QUIZ_RESULT_KEY = env.quizResultKey;

export const useQuiz = (questions = questionsData) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const totalQuestions = questions.length;
  useEffect(() => {
    try {
      const savedAnswers = storage.getQuizAnswers();
      if (savedAnswers) {
        const parsed = JSON.parse(savedAnswers);
        if (parsed && typeof parsed === 'object') {
          setAnswers(parsed);
        }
      }

      const savedResult = storage.getQuizResult();
      if (savedResult) {
        const parsedResult = JSON.parse(savedResult);
        if (parsedResult && typeof parsedResult === 'object') {
          setQuizResult(parsedResult);
        }
      }
    } catch (err) {
      console.error('Failed to restore quiz state from storage:', err);
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

  // Select/update answer for a specific question
  const selectAnswer = useCallback(
    (questionId, optionIndex) => {
      setAnswers((prev) => {
        const updated = {
          ...prev,
          [questionId]: optionIndex,
        };

        // Auto-save progress to storage
        try {
          storage.setQuizAnswers(updated);
          const answeredCount = Object.keys(updated).filter(
            (k) => updated[k] !== undefined && updated[k] !== null
          ).length;
          const updatedProgress = Math.round((answeredCount / totalQuestions) * 100);
          storage.setQuizProgress(updatedProgress);
        } catch (err) {
          console.error('Failed to auto-save quiz answers to storage:', err);
        }

        return updated;
      });
    },
    [totalQuestions]
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
      completedAt: new Date().toISOString(),
    };

    try {
      storage.setQuizResult(resultPayload);
      setQuizResult(resultPayload);
      // Hapus data sesi pengerjaan kuis dari storage
      storage.clearQuizSession();
    } catch (err) {
      console.error('Failed to save quizResult to storage:', err);
    }

    return resultPayload;
  }, [answers, questions, totalQuestions]);

  // Reset quiz progress and clear storage
  const resetQuiz = useCallback(() => {
    setAnswers({});
    setCurrentIndex(0);
    setQuizResult(null);
    try {
      storage.clearQuizSession();
      storage.removeQuizResult();
    } catch (err) {
      console.error('Failed to clear quiz storage:', err);
    }
  }, []);

  return {
    questions,
    currentIndex,
    currentQuestion,
    totalQuestions,
    answers,
    progress,
    quizResult,
    isLoaded,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    goToQuestion,
    submitQuiz,
    resetQuiz,
  };
};

export default useQuiz;
