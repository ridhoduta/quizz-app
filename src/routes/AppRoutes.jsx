import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import QuizInfoPage from '../pages/QuizInfoPage';
import QuizPage from '../pages/QuizPage';
import ResultPage from '../pages/ResultPage';

export const USER_SESSION_KEY = 'userSession';
export const QUIZ_RESULT_KEY = 'quizResult';

const checkQuizSessionValid = () => {
  try {
    const session = localStorage.getItem(USER_SESSION_KEY);
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
    const result = localStorage.getItem(QUIZ_RESULT_KEY);
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

      {/* Fallback Catch-all Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
