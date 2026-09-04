import { STORAGE_KEYS } from '../constants/index.js';

export const env = {
  userSessionKey: import.meta.env.VITE_USER_SESSION_KEY || STORAGE_KEYS.USER_SESSION,
  quizAnswersKey: import.meta.env.VITE_QUIZ_ANSWERS_KEY || STORAGE_KEYS.QUIZ_ANSWERS,
  quizProgressKey: import.meta.env.VITE_QUIZ_PROGRESS_KEY || STORAGE_KEYS.QUIZ_PROGRESS,
  quizResultKey: import.meta.env.VITE_QUIZ_RESULT_KEY || STORAGE_KEYS.QUIZ_RESULT,
  quizTimerKey: import.meta.env.VITE_QUIZ_TIMER_KEY || STORAGE_KEYS.QUIZ_TIMER,
};

export default env;