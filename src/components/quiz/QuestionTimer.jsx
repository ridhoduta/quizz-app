import { useState, useEffect, useRef } from 'react';

export const QUIZ_TIMER_KEY = 'quizTimeLeft';
export const TOTAL_QUIZ_TIME_SECONDS = 600; // 10 minutes = 600 seconds

/**
 * QuestionTimer Component — Overall 10-Minute Quiz Countdown Timer
 * Large prominent circular countdown with dynamic color ring and progress bar for the entire 10-minute quiz.
 * Colors:
 * - Green: 0% - 25% time elapsed (>7.5 minutes left)
 * - Yellow: 25% - 75% time elapsed (2.5 - 7.5 minutes left)
 * - Red: 75% - 100% time elapsed (<2.5 minutes left)
 */
export const QuestionTimer = ({
  duration = TOTAL_QUIZ_TIME_SECONDS,
  onTimeUp,
  isActive = true,
}) => {
  // Initialize timer state from localStorage or full duration (600s)
  const [timeLeft, setTimeLeft] = useState(() => {
    try {
      const saved = localStorage.getItem(QUIZ_TIMER_KEY);
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed >= 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.error('Failed to parse quizTimeLeft:', err);
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
            localStorage.setItem(QUIZ_TIMER_KEY, '0');
          } catch (e) {
            console.error(e);
          }
          if (onTimeUpRef.current) {
            onTimeUpRef.current();
          }
          return 0;
        }
        const updated = prev - 1;
        try {
          localStorage.setItem(QUIZ_TIMER_KEY, String(updated));
        } catch (e) {
          console.error(e);
        }
        return updated;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive]);

  const remainingPercent = Math.max(0, Math.min(100, (timeLeft / duration) * 100));
  const elapsedPercent = 100 - remainingPercent;

  // Color thresholds
  let ringColor = '#10B981';   // green
  let ringBg = '#D1FAE5';
  let textColor = 'text-emerald-600';
  let barColor = 'bg-emerald-500';
  let urgencyLabel = 'Waktu Sangat Cukup';
  let urgencyClass = 'text-emerald-700 bg-emerald-50 border-emerald-200';
  let pulseRing = '';

  if (elapsedPercent >= 75) { // < 2.5 mins remaining
    ringColor = '#EF4444';
    ringBg = '#FEE2E2';
    textColor = 'text-red-600';
    barColor = 'bg-red-500';
    urgencyLabel = 'Waktu Kritis! (<2.5m)';
    urgencyClass = 'text-red-700 bg-red-50 border-red-200';
    pulseRing = 'animate-pulse';
  } else if (elapsedPercent >= 25) { // 2.5m - 7.5m remaining
    ringColor = '#F59E0B';
    ringBg = '#FEF3C7';
    textColor = 'text-amber-600';
    barColor = 'bg-amber-500';
    urgencyLabel = 'Perhatikan Waktu';
    urgencyClass = 'text-amber-700 bg-amber-50 border-amber-200';
  }

  // SVG circle ring math
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (remainingPercent / 100) * circumference;

  // Format seconds to mm:ss
  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m < 10 ? '0' : ''}${m}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      {/* Circular Countdown Ring */}
      <div className={`relative w-36 h-36 flex items-center justify-center ${pulseRing}`}>
        {/* Background circle fill */}
        <div
          className="absolute inset-0 rounded-full"
          style={{ background: ringBg }}
        />
        {/* SVG Ring */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90"
          viewBox="0 0 100 100"
        >
          {/* Track */}
          <circle
            cx="50" cy="50" r={radius}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="6"
          />
          {/* Progress */}
          <circle
            cx="50" cy="50" r={radius}
            fill="none"
            stroke={ringColor}
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.5s ease' }}
          />
        </svg>

        {/* Center Content */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <span className={`font-mono text-2xl md:text-3xl font-extrabold leading-none tracking-tight ${textColor}`}>
            {formatTime(timeLeft)}
          </span>
          <span className="text-[10px] text-gray-500 font-semibold mt-1 uppercase tracking-wider">
            Sisa Waktu
          </span>
        </div>
      </div>

      {/* Timer Urgency Status Badge */}
      <div className="text-center">
        <div className={`text-[11px] font-bold px-3 py-1 rounded-full border ${urgencyClass}`}>
          {urgencyLabel}
        </div>
      </div>

      {/* Horizontal Progress Bar */}
      <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden border border-gray-200">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-linear ${barColor}`}
          style={{ width: `${remainingPercent}%` }}
        />
      </div>

      {/* Ticks Label */}
      <div className="flex justify-between w-full text-[10px] text-gray-400 font-semibold px-0.5">
        <span>0m</span>
        <span className="text-amber-500 font-bold">5m (50%)</span>
        <span className="text-emerald-500 font-bold">10m (100%)</span>
      </div>
    </div>
  );
};

export default QuestionTimer;
