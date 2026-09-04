import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const STEPS_DATA = [
  {
    id: 1,
    number: '1',
    title: 'Lengkapi Biodata',
    icon: 'person_edit',
    description: 'Isi profil singkat, riwayat belajar, dan tentukan target capaianmu.',
    // Koordinat waypoint pada viewBox 540 x 680 (x=140, y=50)
    xPercent: 25.9,
    yPercent: 7.4,
    side: 'left', // label di sisi kiri agar jalan di sisi kanan tidak tertutup
    color: '#22437C',
    badge: null,
  },
  {
    id: 2,
    number: '2',
    title: 'Kerjakan Test',
    icon: 'quiz',
    description: 'Jawab 15 butir soal adaptif guna mengukur grammar & vocab secara akurat.',
    // Koordinat waypoint pada viewBox 540 x 680 (x=390, y=230)
    xPercent: 72.2,
    yPercent: 33.8,
    side: 'right', // label di sisi kanan agar jalan di sisi kiri tidak tertutup
    color: '#22437C',
    badge: null,
  },
  {
    id: 3,
    number: '3',
    title: 'Lihat Hasil',
    icon: 'analytics',
    description: 'Skor CEFR resmi dan evaluasi kekuatan serta kelemahan realtime.',
    // Koordinat waypoint pada viewBox 540 x 680 (x=140, y=420)
    xPercent: 25.9,
    yPercent: 61.8,
    side: 'left', // label di sisi kiri agar jalan di sisi kanan tidak tertutup
    color: '#22437C',
    badge: null,
  },
  {
    id: 4,
    number: '4',
    title: 'Rekomendasi',
    icon: 'stars',
    description: 'Saran kurikulum yang tepat sasaran serta konsultasi kelas terarah.',
    // Koordinat waypoint pada viewBox 540 x 680 (x=400, y=620)
    xPercent: 74.1,
    yPercent: 91.2,
    side: 'right', // label di sisi kanan agar jalan di sisi kiri tidak tertutup
    color: '#A9213F',
    badge: 'Hasil Akhir',
  },
];

export const StepsSection = ({ onStartTest }) => {
  const navigate = useNavigate();
  const [hoveredStep, setHoveredStep] = useState(null);
  const [activeStep, setActiveStep] = useState(null);

  const handleStart = (e) => {
    e.preventDefault();
    if (onStartTest) {
      onStartTest();
    } else {
      navigate('/biodata');
    }
  };

  const toggleStep = (stepId) => {
    setActiveStep((prev) => (prev === stepId ? null : stepId));
  };

  // Step yang sedang aktif (untuk detail spotlight bar jika ada)
  const currentActiveStep = STEPS_DATA.find(
    (s) => s.id === (hoveredStep || activeStep)
  );

  return (
    <section id="cara-mengikuti" className="w-full py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Sisi Kiri: Narrative Box & CTA */}
        <div className="lg:col-span-5 flex flex-col items-start z-10">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded bg-[#ffe4e8] text-[#A9213F] text-xs uppercase font-bold tracking-widest mb-4 border border-[#A9213F]/20">
            #ALURPRAKTIS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-[46px] font-bold text-[#22437C] tracking-tight leading-[1.12] mb-5">
            4 Langkah Menuju Level Bahasa Inggrismu
          </h2>
          <div className="w-14 h-1 bg-[#A9213F] rounded-full mb-6" />
          <p className="text-base md:text-lg text-[#434750] leading-relaxed mb-8">
            Roadmap praktis dari pendaftaran hingga mendapatkan rekomendasi program yang tepat, adaptif, dan akurat bersama Cakap.
          </p>

          {/* Feature callout card */}
          <div className="w-full p-5 rounded-2xl bg-white border-l-4 border-l-[#22437C] border border-slate-200 shadow-md mb-6">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#22437C] text-white flex items-center justify-center shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-[22px]">verified</span>
              </div>
              <div>
                <h4 className="text-base font-bold text-[#22437C]">Satu Tes Singkat, Hasil Teruji</h4>
                <p className="text-xs text-[#434750] leading-relaxed mt-1">
                  Hanya butuh 10 menit. Akurasi terjamin berstandar CEFR dan hasil langsung keluar tanpa menunggu.
                </p>
              </div>
            </div>
          </div>

          {/* Dynamic Active Step Insight */}
          {currentActiveStep ? (
            <div className="w-full p-4 rounded-xl bg-[#f0f3ff] border border-[#22437C]/20 shadow-sm mb-6 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-6 h-6 rounded-full bg-[#22437C] text-white text-xs font-bold flex items-center justify-center">
                  {currentActiveStep.number}
                </span>
                <span className="font-bold text-sm text-[#22437C]">
                  {currentActiveStep.title}
                </span>
                {currentActiveStep.badge && (
                  <span className="px-1.5 py-0.5 rounded bg-[#A9213F] text-white text-[10px] font-bold uppercase">
                    {currentActiveStep.badge}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#434750] leading-relaxed pl-8">
                {currentActiveStep.description}
              </p>
            </div>
          ) : (
            <div className="w-full p-3.5 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-slate-500 text-xs flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-[18px] text-[#22437C]">info</span>
              <span>Arahkan kursor atau klik pointer roadmap untuk melihat penjelasan tiap langkah.</span>
            </div>
          )}

          {/* Action CTA Button */}
          <div>
            <button
              type="button"
              onClick={handleStart}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#A9213F] text-white text-sm font-bold rounded-xl hover:bg-[#8f1933] shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <span>Ikuti Tes Sekarang</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Sisi Kanan: Connected Stepper Roadmap (SVG Tidak Tertutupi) */}
        <div className="lg:col-span-7 relative flex flex-col items-center justify-center w-full">
          {/* Instruksi interaktif */}
          <div className="mb-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-medium flex items-center gap-1.5 shadow-sm">
            <span className="material-symbols-outlined text-[16px] text-[#22437C]">touch_app</span>
            <span>Hover / klik pointer untuk penjelasan</span>
          </div>

          {/* Desktop/Tablet: Serpentine SVG Roadmap with Outer Non-Obstructing Pointers */}
          <div className="hidden sm:block w-full max-w-[580px] relative py-4">
            <div className="relative w-full aspect-[540/680] select-none">
              {/* SVG Curved Roadmap Path (100% Bebas Hambatan) */}
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none z-0" 
                viewBox="0 0 540 680" 
                fill="none" 
                preserveAspectRatio="none"
              >
                {/* Thick Road Track */}
                <path 
                  d="M 140 50 C 380 70, 430 190, 390 230 C 330 290, 110 310, 140 420 C 160 490, 420 480, 400 620" 
                  stroke="#35455E" 
                  strokeWidth="44" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
                {/* Dashed Center Road Stripe */}
                <path 
                  d="M 140 50 C 380 70, 430 190, 390 230 C 330 290, 110 310, 140 420 C 160 490, 420 480, 400 620" 
                  stroke="#ffffff" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  strokeDasharray="10 12" 
                  opacity="0.9" 
                />
              </svg>

              {/* 4 Interactive Waypoint Pointers & Non-Obstructing Outer Labels */}
              {STEPS_DATA.map((step) => {
                const isOpen = hoveredStep === step.id || activeStep === step.id;
                const isAccent = step.color === '#A9213F';
                const isLeft = step.side === 'left';

                return (
                  <div
                    key={step.id}
                    className="absolute z-20 -translate-y-1/2 flex items-center"
                    style={{
                      top: `${step.yPercent}%`,
                      // Untuk waypoint di kiri: posisikan circle di xPercent dan label di sebelah kirinya
                      // Untuk waypoint di kanan: posisikan circle di xPercent dan label di sebelah kanannya
                      left: isLeft ? undefined : `${step.xPercent}%`,
                      right: isLeft ? `${100 - step.xPercent}%` : undefined,
                      transform: isLeft 
                        ? 'translate(24px, -50%)' // offset agar center circle tepat di titik xPercent
                        : 'translate(-24px, -50%)',
                    }}
                  >
                    {/* Tata Letak untuk Sisi Kiri: [Label Card] [Pointer Circle] */}
                    {isLeft && (
                      <div className="flex items-center gap-3 flex-row-reverse">
                        {/* Pointer Circle (Duduk pas di titik lintasan SVG) */}
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={() => toggleStep(step.id)}
                          onMouseEnter={() => setHoveredStep(step.id)}
                          onMouseLeave={() => setHoveredStep(null)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              toggleStep(step.id);
                            }
                          }}
                          className={`w-12 h-12 rounded-full font-bold text-lg flex items-center justify-center shrink-0 cursor-pointer transition-all duration-300 shadow-xl ${
                            isAccent
                              ? 'bg-[#A9213F] text-white ring-4 ring-[#ffe4e8]'
                              : 'bg-[#22437C] text-white ring-4 ring-white'
                          } ${
                            isOpen
                              ? 'scale-125 ring-8 ring-[#22437C]/30 shadow-2xl brightness-110'
                              : 'hover:scale-115 hover:ring-6'
                          }`}
                          aria-label={`Langkah ${step.number}: ${step.title}`}
                        >
                          {step.number}
                        </div>

                        {/* Outer Label Card (Hanya Judul saat normal, membuka Penjelasan saat Hover/Click) */}
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={() => toggleStep(step.id)}
                          onMouseEnter={() => setHoveredStep(step.id)}
                          onMouseLeave={() => setHoveredStep(null)}
                          className={`bg-white rounded-xl border border-slate-200/90 shadow-md transition-all duration-300 cursor-pointer text-right overflow-hidden ${
                            isOpen 
                              ? 'w-64 p-3.5 border-r-4 border-r-[#22437C] shadow-xl ring-2 ring-[#22437C]/20 -translate-x-1' 
                              : 'px-3 py-2 hover:shadow-lg border-r-4 border-r-[#22437C] hover:border-slate-300'
                          }`}
                        >
                          {/* Header Bar: Icon + Judul */}
                          <div className="flex items-center justify-end gap-2">
                            <span className="text-xs sm:text-sm font-bold text-[#22437C] whitespace-nowrap">
                              {step.title}
                            </span>
                            <span className="material-symbols-outlined text-[18px] text-[#22437C]">
                              {step.icon}
                            </span>
                          </div>

                          {/* Penjelasan Accordion: Hanya tampil ketika hover/click */}
                          {isOpen && (
                            <div className="mt-2 pt-2 border-t border-slate-100 text-xs text-[#434750] leading-relaxed text-right animate-in fade-in duration-200">
                              {step.description}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Tata Letak untuk Sisi Kanan: [Pointer Circle] [Label Card] */}
                    {!isLeft && (
                      <div className="flex items-center gap-3">
                        {/* Pointer Circle (Duduk pas di titik lintasan SVG) */}
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={() => toggleStep(step.id)}
                          onMouseEnter={() => setHoveredStep(step.id)}
                          onMouseLeave={() => setHoveredStep(null)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              toggleStep(step.id);
                            }
                          }}
                          className={`w-12 h-12 rounded-full font-bold text-lg flex items-center justify-center shrink-0 cursor-pointer transition-all duration-300 shadow-xl ${
                            isAccent
                              ? 'bg-[#A9213F] text-white ring-4 ring-[#ffe4e8]'
                              : 'bg-[#22437C] text-white ring-4 ring-white'
                          } ${
                            isOpen
                              ? isAccent
                                ? 'scale-125 ring-8 ring-[#A9213F]/30 shadow-2xl brightness-110'
                                : 'scale-125 ring-8 ring-[#22437C]/30 shadow-2xl brightness-110'
                              : 'hover:scale-115 hover:ring-6'
                          }`}
                          aria-label={`Langkah ${step.number}: ${step.title}`}
                        >
                          {step.number}
                        </div>

                        {/* Outer Label Card (Hanya Judul saat normal, membuka Penjelasan saat Hover/Click) */}
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={() => toggleStep(step.id)}
                          onMouseEnter={() => setHoveredStep(step.id)}
                          onMouseLeave={() => setHoveredStep(null)}
                          className={`rounded-xl border transition-all duration-300 cursor-pointer text-left overflow-hidden ${
                            isAccent
                              ? 'bg-[#ffe4e8]/70 border-[#A9213F]/30 border-l-4 border-l-[#A9213F]'
                              : 'bg-white border-slate-200/90 border-l-4 border-l-[#22437C]'
                          } ${
                            isOpen 
                              ? 'w-64 p-3.5 shadow-xl ring-2 ' + (isAccent ? 'ring-[#A9213F]/25 translate-x-1' : 'ring-[#22437C]/20 translate-x-1') 
                              : 'px-3 py-2 shadow-md hover:shadow-lg'
                          }`}
                        >
                          {/* Header Bar: Icon + Judul */}
                          <div className="flex items-center justify-start gap-2">
                            <span className={`material-symbols-outlined text-[18px] ${isAccent ? 'text-[#A9213F]' : 'text-[#22437C]'}`}>
                              {step.icon}
                            </span>
                            <span className={`text-xs sm:text-sm font-bold whitespace-nowrap ${isAccent ? 'text-[#A9213F]' : 'text-[#22437C]'}`}>
                              {step.title}
                            </span>
                            {step.badge && (
                              <span className="px-1.5 py-0.2 rounded bg-[#A9213F] text-white text-[9px] font-bold uppercase tracking-wider">
                                {step.badge}
                              </span>
                            )}
                          </div>

                          {/* Penjelasan Accordion: Hanya tampil ketika hover/click */}
                          {isOpen && (
                            <div className="mt-2 pt-2 border-t border-slate-100 text-xs text-[#434750] leading-relaxed text-left animate-in fade-in duration-200">
                              {step.description}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile View (< sm): Clean Vertical Stepper */}
          <div className="block sm:hidden w-full max-w-sm mt-4">
            <div className="relative border-l-2 border-[#22437C]/30 ml-6 pl-6 flex flex-col gap-6 py-2">
              {STEPS_DATA.map((step) => {
                const isOpen = hoveredStep === step.id || activeStep === step.id;
                const isAccent = step.color === '#A9213F';

                return (
                  <div key={step.id} className="relative">
                    {/* Pointer Circle on the line */}
                    <div
                      onClick={() => toggleStep(step.id)}
                      className={`absolute -left-[37px] top-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white shadow-md ring-4 ring-white cursor-pointer ${
                        isAccent ? 'bg-[#A9213F]' : 'bg-[#22437C]'
                      }`}
                    >
                      {step.number}
                    </div>

                    {/* Step Card */}
                    <div
                      onClick={() => toggleStep(step.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        isAccent
                          ? 'bg-[#ffe4e8]/60 border-[#A9213F]/30 border-l-4 border-l-[#A9213F]'
                          : 'bg-white border-slate-200 border-l-4 border-l-[#22437C]'
                      } shadow-sm`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`material-symbols-outlined text-[18px] ${isAccent ? 'text-[#A9213F]' : 'text-[#22437C]'}`}>
                            {step.icon}
                          </span>
                          <h4 className={`text-sm font-bold ${isAccent ? 'text-[#A9213F]' : 'text-[#22437C]'}`}>
                            {step.title}
                          </h4>
                        </div>
                        <span className={`material-symbols-outlined text-[18px] text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                          expand_more
                        </span>
                      </div>

                      {isOpen && (
                        <p className="text-xs text-[#434750] leading-relaxed mt-2 pt-2 border-t border-slate-100">
                          {step.description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Section Connector */}
      <div className="w-full flex justify-center items-center pt-12">
        <div className="flex flex-col items-center">
          <div className="w-3 h-3 rounded-full bg-[#22437C]" />
          <div className="w-0.5 h-12 bg-[#A9213F]" />
          <div className="w-3 h-3 rounded-full bg-[#A9213F]" />
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
