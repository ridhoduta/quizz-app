import { useNavigate } from 'react-router-dom';

export const CtaSection = ({ onStartTest }) => {
  const navigate = useNavigate();

  const handleStart = (e) => {
    e.preventDefault();
    if (onStartTest) {
      onStartTest();
    } else {
      navigate('/biodata');
    }
  };

  return (
    <section className="w-full bg-[#22437C] text-white py-16 md:py-20 relative overflow-hidden">
      {/* Decorative ambient background spots */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#A9213F]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left Column: Heading & Key Points */}
          <div className="flex flex-col items-start text-left max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#A9213F] text-white text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
              <span className="material-symbols-outlined text-[15px]">schedule</span>
              Gratis &amp; Bebas Biaya
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[44px] font-bold tracking-tight text-white leading-tight mb-4">
              Sudah Siap Mengetahui Level Bahasa Inggrismu?
            </h2>
            <p className="text-base md:text-lg text-white/90 leading-relaxed mb-6">
              Luangkan sekitar 10 menit untuk mengetahui kemampuanmu secara objektif dan temukan program bahasa Inggris yang paling pas untuk akselerasi kariermu.
            </p>
            <div className="flex flex-wrap items-center gap-3 md:gap-4 text-white text-xs md:text-sm">
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
                <span className="material-symbols-outlined text-[16px] text-white">check_circle</span>
                15 Soal Pilihan
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
                <span className="material-symbols-outlined text-[16px] text-white">timer</span>
                ±10 Menit
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
                <span className="material-symbols-outlined text-[16px] text-white">bolt</span>
                Hasil Langsung Keluar
              </span>
            </div>
          </div>

          {/* Right Column: CTA Action Button */}
          <div className="flex flex-col items-center lg:items-end w-full sm:w-auto shrink-0">
            <button
              type="button"
              onClick={handleStart}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#22437C] hover:bg-slate-100 text-base md:text-lg px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all active:scale-95 font-bold text-center cursor-pointer"
            >
              <span>Mulai Placement Test</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
            <span className="flex items-center gap-1.5 mt-3 text-white/90 text-xs md:text-[13px]">
              <span className="material-symbols-outlined text-[16px] text-white">verified_user</span>
              Akurat &amp; Hasil Instan Berstandar CEFR
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
