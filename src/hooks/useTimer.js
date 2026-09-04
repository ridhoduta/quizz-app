import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { storage } from '../lib/storage';
import { TIMER } from '../constants';

export const TOTAL_QUIZ_TIME_SECONDS = TIMER.DEFAULT_TIME;

/**
 * Custom hook to manage quiz countdown timer, storage synchronization, and urgency calculations
 * @param {Object} options
 * @param {number} options.duration Total timer duration in seconds (defaults to TIMER.DEFAULT_TIME = 600)
 * @param {Function} options.onTimeUp Callback when timer reaches 0
 * @param {boolean} options.isActive Whether timer countdown is running
 */
export const useTimer = ({
  duration = TIMER.DEFAULT_TIME,
  onTimeUp,
  isActive = true,
} = {}) => {
  // Initialize timer state from storage or fallback to duration
  const [timeLeft, setTimeLeft] = useState(() => {
    try {
      const saved = storage.getQuizTimer();
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed >= 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.error('Failed to parse quizTimeLeft from storage:', err);
    }
    return duration;
  });

  const onTimeUpRef = useRef(onTimeUp);
  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  // Continuously count down 1 second at a time
  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          try {
            storage.setQuizTimer(0);
          } catch (e) {
            console.error('Failed to save 0 quiz timer to storage:', e);
          }
          if (onTimeUpRef.current) {
            onTimeUpRef.current();
          }
          return 0;
        }
        const updated = prev - 1;
        try {
          storage.setQuizTimer(updated);
        } catch (e) {
          console.error('Failed to save quiz timer to storage:', e);
        }
        return updated;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive]);

  const resetTimer = useCallback((newDuration = duration) => {
    setTimeLeft(newDuration);
    try {
      storage.setQuizTimer(newDuration);
    } catch (e) {
      console.error('Failed to reset quiz timer in storage:', e);
    }
  }, [duration]);

  const remainingPercent = Math.max(0, Math.min(100, (timeLeft / duration) * 100));
  const elapsedPercent = 100 - remainingPercent;

  // Format seconds to mm:ss
  const formatTime = useCallback((s = timeLeft) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m < 10 ? '0' : ''}${m}:${sec < 10 ? '0' : ''}${sec}`;
  }, [timeLeft]);

  const formattedTime = useMemo(() => formatTime(timeLeft), [formatTime, timeLeft]);

  // Urgency & color states based on elapsed percentage
  const urgency = useMemo(() => {
    if (elapsedPercent >= 75) {
      // < 2.5 mins remaining
      return {
        level: 'critical',
        ringColor: '#EF4444',
        ringBg: '#FEE2E2',
        textColor: 'text-red-600',
        urgencyLabel: 'Waktu Kritis! (<2.5m)',
        urgencyClass: 'text-red-700 bg-red-50 border-red-200',
        pulseRing: 'animate-pulse',
      };
    }
    if (elapsedPercent >= 25) {
      // 2.5m - 7.5m remaining
      return {
        level: 'warning',
        ringColor: '#F59E0B',
        ringBg: '#FEF3C7',
        textColor: 'text-amber-600',
        urgencyLabel: 'Perhatikan Waktu',
        urgencyClass: 'text-amber-700 bg-amber-50 border-amber-200',
        pulseRing: '',
      };
    }
    return {
      level: 'normal',
      ringColor: '#10B981',
      ringBg: '#D1FAE5',
      textColor: 'text-emerald-600',
      urgencyLabel: 'Waktu Sangat Cukup',
      urgencyClass: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      pulseRing: '',
    };
  }, [elapsedPercent]);

  return {
    timeLeft,
    duration,
    remainingPercent,
    elapsedPercent,
    formattedTime,
    formatTime,
    resetTimer,
    ...urgency,
  };
};

export default useTimer;
