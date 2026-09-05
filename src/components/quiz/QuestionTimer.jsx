import useTimer, { TOTAL_QUIZ_TIME_SECONDS } from '../../hooks/useTimer';

export const QuestionTimer = ({
  duration = TOTAL_QUIZ_TIME_SECONDS,
  onTimeUp,
  isActive = true,
  answers = {},
  totalQuestions = 15,
}) => {
  const {
    formattedTime,
    remainingPercent,
    ringColor,
    ringBg,
    level,
    urgencyLabel,
    pulseRing,
  } = useTimer({ duration, onTimeUp, isActive });

  const timerTextClasses = {
    critical: 'text-error',
    warning: 'text-amber-600',
    normal: 'text-emerald-600',
  };

  const timerBadgeClasses = {
    critical: 'text-error bg-error-container/30 border border-error-container',
    warning: 'text-amber-700 bg-amber-50 border border-amber-200',
    normal: 'text-emerald-700 bg-emerald-50 border border-emerald-200',
  };

  const answeredCount = Object.keys(answers).filter(
    (k) => answers[k] !== undefined && answers[k] !== null
  ).length;
  const progressPercent = totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;

  // SVG circle 
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (remainingPercent / 100) * circumference;

  return (
    <div className="flex flex-row md:flex-col items-center justify-between gap-4 md:gap-3.5 w-full">
      <div className={`relative w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 shrink-0 flex items-center justify-center ${pulseRing}`}>
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
            className="stroke-surface-container-high"
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
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          <span className={`font-mono text-xl sm:text-2xl md:text-3xl font-extrabold leading-none tracking-tight ${timerTextClasses[level] || 'text-emerald-600'}`}>
            {formattedTime}
          </span>
          <span className="text-[9px] md:text-[10px] text-outline font-semibold mt-0.5 md:mt-1 uppercase tracking-wider">
            Sisa Waktu
          </span>
        </div>
      </div>

      {/* Right Details on Mobile */}
      <div className="flex flex-col items-center gap-2 md:gap-3 flex-grow min-w-0 w-full">
        <div className={`inline-flex items-center text-[10px] md:text-[11px] font-bold px-2.5 py-0.5 md:px-3 md:py-1 rounded-full ${timerBadgeClasses[level] || 'text-emerald-700 bg-emerald-50 border border-emerald-200'}`}>
          {urgencyLabel}
        </div>

        {/* Answered Questions Progress */}
        <div className="w-full bg-surface-container-low border border-surface-variant rounded-xl p-2.5 md:p-3 text-center">
          <p className="text-[11px] md:text-xs text-on-surface-variant font-medium">Soal Terjawab</p>
          <p className="text-xl md:text-2xl font-extrabold text-primary-container leading-tight">
            {answeredCount}
            <span className="text-xs md:text-base font-medium text-outline"> / {totalQuestions}</span>
          </p>
          <div className="mt-1.5 md:mt-2 w-full bg-surface-container-high rounded-full h-1.5 md:h-2 overflow-hidden">
            <div
              className="h-full bg-primary-container rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionTimer;

