import { useLocation, Link } from 'react-router-dom';

export const STEPS_DATA = [
  {
    id: 1,
    number: '1',
    title: 'Lengkapi Biodata',
    icon: 'person_edit',
  },
  {
    id: 2,
    number: '2',
    title: 'Kerjakan Test',
    icon: 'quiz',
  },
  {
    id: 3,
    number: '3',
    title: 'Lihat Hasil & Rekomendasi Kelas',
    icon: 'analytics',
  },
];

export const Header = ({ currentStep }) => {
  const location = useLocation();
  const getActiveStep = () => {
    if (typeof currentStep === 'number' && currentStep >= 1 && currentStep <= 3) {
      return currentStep;
    }

    const path = location.pathname;
    if (path.includes('/biodata')) return 1;
    if (path.includes('/info') || path.includes('/quiz')) return 2;
    if (path.includes('/result')) return 3;
    return 1;
  };

  const activeStep = getActiveStep();
  const currentStepInfo = STEPS_DATA.find((s) => s.id === activeStep) || STEPS_DATA[0];

  return (
    <header className="bg-surface-container-lowest border-b border-outline-variant py-3.5 px-4 md:px-10 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center gap-4">
        {/* Logo & Brand */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-primary-subtle border border-primary-container/20 flex items-center justify-center text-primary-container group-hover:bg-primary-container group-hover:text-white transition-colors duration-200">
            <span className="material-symbols-outlined text-[24px] filled">
              school
            </span>
          </div>
          <span className="text-base sm:text-lg md:text-xl font-bold text-primary tracking-tight group-hover:text-primary-container transition-colors">
            BunnySpeak Course
          </span>
        </Link>

        {/* 2-StepsSection */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary-container">
              <span className="material-symbols-outlined text-[17px] text-brand-accent">
                {currentStepInfo.icon}
              </span>
              <span>Langkah {activeStep} dari 3</span>
            </div>
            <span className="text-[11px] text-on-surface-variant hidden sm:inline font-medium">
              {currentStepInfo.title}
            </span>
          </div>

          {/* 3-Segment Progress Bar */}
          <div className="flex items-center gap-1 bg-primary-subtle p-1 rounded-full border border-surface-variant">
            {STEPS_DATA.map((step) => {
              const isCompleted = step.id < activeStep;
              const isCurrent = step.id === activeStep;

              return (
                <div
                  key={step.id}
                  title={`Langkah ${step.id}: ${step.title}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isCurrent
                      ? 'w-7 sm:w-9 bg-primary-container'
                      : isCompleted
                      ? 'w-4 sm:w-6 bg-primary-container/60'
                      : 'w-3 sm:w-5 bg-surface-variant'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

