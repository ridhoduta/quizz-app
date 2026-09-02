import { useState, useEffect, useRef } from 'react';

/**
 * QuestionTimer Component — Sidebar variant
 * Large prominent circular countdown with dynamic color ring and bar.
 */
export const QuestionTimer = ({
  duration = 30,
  onTimeUp,
  isActive = true,
  isLocked = false,
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const onTimeUpRef = useRef(onTimeUp);

  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  // Reset to full when duration changes (new question)
  const prevDuration = useRef(duration);
  useEffect(() => {
    if (prevDuration.current !== duration) {
      prevDuration.current = duration;
      setTimeLeft(duration);
    }
  }, [duration]);

  // Countdown ticker
  useEffect(() => {
    if (!isActive || isLocked) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (onTimeUpRef.current) onTimeUpRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [duration, isActive, isLocked]);

  const remainingPercent = Math.max(0, Math.min(100, (timeLeft / duration) * 100));
  const elapsedPercent = 100 - remainingPercent;

  // Color thresholds
  let ringColor = '#10B981';   // green
  let ringBg = '#D1FAE5';
  let textColor = 'text-emerald-600';
  let barColor = 'bg-emerald-500';
  let urgencyLabel = 'Waktu Aman';
  let urgencyClass = 'text-emerald-700 bg-emerald-50 border-emerald-200';
  let pulseRing = '';

  if (elapsedPercent >= 75) {
    ringColor = '#EF4444';
    ringBg = '#FEE2E2';
    textColor = 'text-red-600';
    barColor = 'bg-red-500';
    urgencyLabel = 'Waktu Hampir Habis!';
    urgencyClass = 'text-red-700 bg-red-50 border-red-200';
    pulseRing = 'animate-pulse';
  } else if (elapsedPercent >= 25) {
    ringColor = '#F59E0B';
    ringBg = '#FEF3C7';
    textColor = 'text-amber-600';
    barColor = 'bg-amber-500';
    urgencyLabel = 'Perhatikan Waktu';
    urgencyClass = 'text-amber-700 bg-amber-50 border-amber-200';
  }

  // SVG circle ring
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (remainingPercent / 100) * circumference;

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
          {isLocked ? (
            <>
              <span className="material-symbols-outlined text-3xl text-red-500">lock</span>
              <span className="text-xs font-bold text-red-600 mt-1">Terkunci</span>
            </>
          ) : (
            <>
              <span className={`font-mono text-2xl font-extrabold leading-none tracking-tight ${textColor}`}>
                {formatTime(timeLeft)}
              </span>
              <span className="text-[11px] text-gray-500 font-medium mt-0.5">detik</span>
            </>
          )}
        </div>
      </div>

      {/* Timer Label */}
      <div className="text-center">
        <div className={`text-[11px] font-bold px-3 py-1 rounded-full border ${urgencyClass}`}>
          {isLocked ? '🔒 Soal Terkunci' : urgencyLabel}
        </div>
      </div>

      {/* Horizontal Bar */}
      <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-linear ${barColor}`}
          style={{ width: `${remainingPercent}%` }}
        />
      </div>

      {/* Ticks label */}
      <div className="flex justify-between w-full text-[10px] text-gray-400 font-medium px-0.5">
        <span>0s</span>
        <span className="text-amber-500">{Math.round(duration * 0.5)}s</span>
        <span className="text-emerald-500">{duration}s</span>
      </div>
    </div>
  );
};

export default QuestionTimer;
