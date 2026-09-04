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
    textColor,
    urgencyLabel,
    urgencyClass,
    pulseRing,
  } = useTimer({ duration, onTimeUp, isActive });

  // Answered questions progress calculation
  const answeredCount = Object.keys(answers).filter(
    (k) => answers[k] !== undefined && answers[k] !== null
  ).length;
  const progressPercent = totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;

  // SVG circle ring math
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (remainingPercent / 100) * circumference;

  return (
    <div className="flex flex-row md:flex-col items-center justify-between gap-4 md:gap-3.5 w-full">
      {/* Circular Countdown Ring */}
      <div className={`relative w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 shrink-0 flex items-center justify-center ${pulseRing}`}>
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
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          <span className={`font-mono text-xl sm:text-2xl md:text-3xl font-extrabold leading-none tracking-tight ${textColor}`}>
            {formattedTime}
          </span>
          <span className="text-[9px] md:text-[10px] text-gray-500 font-semibold mt-0.5 md:mt-1 uppercase tracking-wider">
            Sisa Waktu
          </span>
        </div>
      </div>

      {/* Right Details on Mobile / Stacked Details on Desktop */}
      <div className="flex flex-col items-center gap-2 md:gap-3 flex-grow min-w-0 w-full">
        {/* Timer Urgency Status Badge */}
        <div className={`inline-flex items-center text-[10px] md:text-[11px] font-bold px-2.5 py-0.5 md:px-3 md:py-1 rounded-full border ${urgencyClass}`}>
          {urgencyLabel}
        </div>

        {/* Answered Questions Progress */}
        <div className="w-full bg-[#F0F4FF] border border-[#C4D0F0] rounded-xl p-2.5 md:p-3 text-center">
          <p className="text-[11px] md:text-xs text-[#434750] font-medium">Soal Terjawab</p>
          <p className="text-xl md:text-2xl font-extrabold text-[#22437C] leading-tight">
            {answeredCount}
            <span className="text-xs md:text-base font-medium text-gray-500"> / {totalQuestions}</span>
          </p>
          <div className="mt-1.5 md:mt-2 w-full bg-gray-200 rounded-full h-1.5 md:h-2 overflow-hidden">
            <div
              className="h-full bg-[#22437C] rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionTimer;

