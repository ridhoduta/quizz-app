import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import QuizPage from '../pages/QuizPage';
import ResultPage from '../pages/ResultPage';

export const USER_SESSION_KEY = 'userSession';
export const QUIZ_RESULT_KEY = 'quizResult';

/**
 * Route Guard for /quiz
 * Validates whether user session exists in localStorage
 */
const QuizRouteGuard = ({ children }) => {
  try {
    const session = localStorage.getItem(USER_SESSION_KEY);
    if (!session) {
      return <Navigate to="/" replace />;
    }
    const parsed = JSON.parse(session);
    if (!parsed || typeof parsed !== 'object' || !parsed.name) {
      return <Navigate to="/" replace />;
    }
  } catch (err) {
    console.error('Quiz route guard validation failed:', err);
    return <Navigate to="/" replace />;
  }

  return children;
};

/**
 * Route Guard for /result
 * Validates whether quiz result exists in localStorage
 */
const ResultRouteGuard = ({ children }) => {
  try {
    const result = localStorage.getItem(QUIZ_RESULT_KEY);
    if (!result) {
      return <Navigate to="/quiz" replace />;
    }
    const parsed = JSON.parse(result);
    if (!parsed || typeof parsed !== 'object' || parsed.score === undefined) {
      return <Navigate to="/quiz" replace />;
    }
  } catch (err) {
    console.error('Result route guard validation failed:', err);
    return <Navigate to="/quiz" replace />;
  }

  return children;
};

/**
 * Main Application Routing Component
 */
export const AppRoutes = () => {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Protected Quiz Page */}
      <Route
        path="/quiz"
        element={
          <QuizRouteGuard>
            <QuizPage />
          </QuizRouteGuard>
        }
      />

      {/* Protected Result Page */}
      <Route
        path="/result"
        element={
          <ResultRouteGuard>
            <ResultPage />
          </ResultRouteGuard>
        }
      />

      {/* Fallback Catch-all Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
