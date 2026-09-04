import { env } from '../config/env.js';

export const storage = {
  // User Session
  getUserSession() {
    return localStorage.getItem(env.userSessionKey);
  },
  setUserSession(session) {
    const value = typeof session === 'object' ? JSON.stringify(session) : session;
    localStorage.setItem(env.userSessionKey, value);
  },
  removeUserSession() {
    localStorage.removeItem(env.userSessionKey);
  },

  // Quiz Answers
  getQuizAnswers() {
    return localStorage.getItem(env.quizAnswersKey);
  },
  setQuizAnswers(answers) {
    const value = typeof answers === 'object' ? JSON.stringify(answers) : answers;
    localStorage.setItem(env.quizAnswersKey, value);
  },
  removeQuizAnswers() {
    localStorage.removeItem(env.quizAnswersKey);
  },

  // Quiz Progress
  getQuizProgress() {
    return localStorage.getItem(env.quizProgressKey);
  },
  setQuizProgress(progress) {
    localStorage.setItem(env.quizProgressKey, String(progress));
  },
  removeQuizProgress() {
    localStorage.removeItem(env.quizProgressKey);
  },

  // Quiz Result
  getQuizResult() {
    return localStorage.getItem(env.quizResultKey);
  },
  setQuizResult(result) {
    const value = typeof result === 'object' ? JSON.stringify(result) : result;
    localStorage.setItem(env.quizResultKey, value);
  },
  removeQuizResult() {
    localStorage.removeItem(env.quizResultKey);
  },

  // Quiz Timer
  getQuizTimer() {
    return localStorage.getItem(env.quizTimerKey);
  },
  setQuizTimer(time) {
    localStorage.setItem(env.quizTimerKey, String(time));
  },
  removeQuizTimer() {
    localStorage.removeItem(env.quizTimerKey);
  },

  // Helper methods
  clearQuizSession() {
    this.removeQuizAnswers();
    this.removeQuizProgress();
    this.removeQuizTimer();
  },

  clearAll() {
    this.removeUserSession();
    this.removeQuizAnswers();
    this.removeQuizProgress();
    this.removeQuizResult();
    this.removeQuizTimer();
  },
};

export default storage;