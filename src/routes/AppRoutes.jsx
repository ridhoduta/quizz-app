import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import BiodataPage from '../pages/BiodataPage';
import QuizInfoPage from '../pages/QuizInfoPage';
import QuizPage from '../pages/QuizPage';
import ResultPage from '../pages/ResultPage';
import NotFound from '../pages/Notfound';

import { storage } from '../lib/storage';

const checkQuizSessionValid = () => {
  try {
    const session = storage.getUserSession();
    if (!session) return false;
    const parsed = JSON.parse(session);
    return Boolean(parsed && typeof parsed === 'object' && parsed.name);
  } catch (err) {
    console.error('Quiz session validation failed:', err);
    return false;
  }
};

const checkResultSessionValid = () => {
  try {
    const result = storage.getQuizResult();
    if (!result) return false;
    const parsed = JSON.parse(result);
    return Boolean(parsed && typeof parsed === 'object' && parsed.score !== undefined);
  } catch (err) {
    console.error('Result session validation failed:', err);
    return false;
  }
};

/**
 * Route Guard for /quiz & /info
 */
const QuizRouteGuard = ({ children }) => {
  const isValid = checkQuizSessionValid();
  if (!isValid) {
    return <Navigate to="/" replace />;
  }
  return children;
};

/**
 * Route Guard for /result
 */
const ResultRouteGuard = ({ children }) => {
  const isValid = checkResultSessionValid();
  if (!isValid) {
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

      {/* Biodata Registration Page */}
      <Route path="/biodata" element={<BiodataPage />} />

      {/* Info Page */}
      <Route
        path="/info"
        element={
          <QuizRouteGuard>
            <QuizInfoPage />
          </QuizRouteGuard>
        }
      />

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

      {/* 404 Not Found — Catch-all Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
