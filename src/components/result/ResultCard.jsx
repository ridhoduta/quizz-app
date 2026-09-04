export const ResultCard = ({ quizResult }) => {
  const score = quizResult?.score ?? 0;
  const correctCount = quizResult?.correctCount ?? 0;
  const totalQuestions = quizResult?.totalQuestions ?? 15;
  const level = quizResult?.level || 'Beginner';

  const levelDescriptions = {
    Beginner:
      'Hasil placement test menunjukkan Anda berada di tingkat dasar. Anda siap memperkuat fondasi grammar dan percakapan sehari-hari.',
    Intermediate:
      'Hasil placement test menunjukkan pemahaman yang baik pada tata bahasa dan komunikasi dasar. Anda siap melangkah ke tingkat lanjutan.',
    Advanced:
      'Selamat! Hasil placement test menunjukkan penguasaan tata bahasa dan pemahaman bahasa Inggris yang sangat baik.',
  };

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (score / 100) * circumference;

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="bg-white rounded-2xl border border-[#C4C6D1] ambient-shadow p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at center, #22437C 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        {/* Circular SVG Gauge */}
        <div className="relative w-48 h-48 mb-6 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Track Circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="8"
            />
            {/* Progress Fill Circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="#22437C"
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl md:text-5xl font-extrabold text-[#22437C]">
              {score}%
            </span>
          </div>
        </div>

        {/* Level Title & Description */}
        <h2 className="text-2xl md:text-3xl font-bold text-[#22437C] mb-2">
          {level}
        </h2>
        <p className="text-sm md:text-base text-[#434750] max-w-lg leading-relaxed">
          {levelDescriptions[level] || levelDescriptions.Beginner}
        </p>
      </div>

      {/* Statistics Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Stat 1: Correct Count */}
        <div className="bg-white rounded-xl border border-[#C4C6D1] ambient-shadow p-5 flex flex-col items-center justify-center text-center hover-shadow">
          <span className="material-symbols-outlined text-[#22437C] text-[32px] mb-1">
            task_alt
          </span>
          <span className="text-xl font-bold text-[#151C27] mb-0.5">
            {correctCount} / {totalQuestions}
          </span>
          <span className="text-xs text-[#434750]">Jawaban Benar</span>
        </div>

        {/* Stat 2: Score % */}
        <div className="bg-white rounded-xl border border-[#C4C6D1] ambient-shadow p-5 flex flex-col items-center justify-center text-center hover-shadow">
          <span className="material-symbols-outlined text-[#22437C] text-[32px] mb-1">
            percent
          </span>
          <span className="text-xl font-bold text-[#151C27] mb-0.5">
            {score}%
          </span>
          <span className="text-xs text-[#434750]">Skor Akhir</span>
        </div>

        {/* Stat 3: Level */}
        <div className="bg-white rounded-xl border border-[#C4C6D1] ambient-shadow p-5 flex flex-col items-center justify-center text-center hover-shadow">
          <span className="material-symbols-outlined text-[#22437C] text-[32px] mb-1">
            school
          </span>
          <span className="text-xl font-bold text-[#151C27] mb-0.5">
            {level}
          </span>
          <span className="text-xs text-[#434750]">Tingkat Kemampuan</span>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
