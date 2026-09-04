import { useNavigate } from 'react-router-dom';
import usePrograms from '../../hooks/usePrograms';

export const ProgramsSection = ({ onSelectProgram }) => {
  const navigate = useNavigate();
  const { enrichedPrograms } = usePrograms();

  const handleProgramAction = (programName) => {
    if (onSelectProgram) {
      onSelectProgram(programName);
    } else {
      navigate('/biodata');
    }
  };

  return (
    <section id="program-section" className="w-full bg-[#f4f7fd] py-16 md:py-24 border-b border-[#22437C]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#22437C] font-bold">
            Temukan Program yang Sesuai dengan Levelmu
          </h2>
          <div className="w-12 h-1 bg-[#A9213F] rounded-full my-3" />
          <p className="text-sm md:text-base text-[#434750]">
            Setiap level membutuhkan pendekatan belajar yang berbeda. Placement test membantu menentukan program yang paling sesuai dengan kemampuanmu.
          </p>
        </div>

        {/* 3 Program Cards Grid dynamically populated from programs.json */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-3">
          {enrichedPrograms.map((program) => {
            const isFeatured = program.isFeatured;

            return (
              <div
                key={program.id}
                className={`relative bg-white rounded-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden group ${
                  isFeatured
                    ? 'border-2 border-[#A9213F] shadow-xl hover:shadow-2xl md:-translate-y-2'
                    : 'border border-slate-200 border-t-4 border-t-[#22437C] shadow-sm hover:shadow-xl'
                }`}
              >
                {/* Top Solid Accent Banner for Featured Program */}
                {isFeatured && (
                  <div className="w-full bg-[#A9213F] text-white py-1.5 px-4 text-center text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-1.5 shadow-sm">
                    <span className="material-symbols-outlined text-[15px]">stars</span>
                    PALING BANYAK DIPILIH
                  </div>
                )}

                <div className="p-6 sm:p-7">
                  {/* Level Icon Header */}
                  <div className="flex justify-end items-center mb-4">
                    <span
                      className={`w-9 h-9 rounded-lg border flex items-center justify-center ${
                        isFeatured
                          ? 'bg-[#ffe4e8] text-[#A9213F] border-[#A9213F]/30'
                          : 'bg-[#f0f3ff] text-[#22437C] border-[#22437C]/20'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]">{program.icon}</span>
                    </span>
                  </div>

                  <h3
                    className={`text-xl md:text-[22px] text-[#22437C] font-bold mb-2 transition-colors ${
                      isFeatured ? 'group-hover:text-[#A9213F]' : 'group-hover:text-[#1a3461]'
                    }`}
                  >
                    {program.title}
                  </h3>

                  <p className="text-sm text-[#434750] leading-relaxed mb-5 min-h-[48px]">
                    {program.description}
                  </p>

                  {/* Program Metadata Chips */}
                  <div className="flex flex-wrap gap-2 mb-5 pb-5 border-b border-slate-100">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs ${
                        isFeatured
                          ? 'bg-[#ffe4e8] text-[#A9213F] font-bold'
                          : 'bg-slate-100 text-slate-700 font-medium'
                      }`}
                    >
                      <span
                        className={`material-symbols-outlined text-[14px] ${
                          isFeatured ? 'text-[#A9213F]' : 'text-[#22437C]'
                        }`}
                      >
                        schedule
                      </span>
                      {program.duration}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs font-medium">
                      <span className="material-symbols-outlined text-[14px] text-[#22437C]">
                        {isFeatured ? 'forum' : program.level === 'Advanced' ? 'campaign' : 'groups'}
                      </span>
                      {program.method}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs font-medium">
                      <span className="material-symbols-outlined text-[14px] text-[#22437C]">
                        {isFeatured ? 'work' : program.level === 'Advanced' ? 'verified' : 'menu_book'}
                      </span>
                      {program.tag}
                    </span>
                  </div>

                  {/* Key Features List from programs.json */}
                  <span
                    className={`text-xs font-bold uppercase tracking-wider block mb-3 ${
                      isFeatured ? 'text-[#A9213F]' : 'text-slate-500'
                    }`}
                  >
                    Materi Fokus:
                  </span>
                  <ul className="flex flex-col gap-2.5 mb-6">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[#151c27]">
                        <span
                          className={`material-symbols-outlined text-[18px] shrink-0 ${
                            isFeatured ? 'text-[#A9213F] font-bold' : 'text-[#22437C]'
                          }`}
                        >
                          check_circle
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 sm:p-7 pt-0">
                  <button
                    type="button"
                    onClick={() => handleProgramAction(program.title)}
                    className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
                      isFeatured
                        ? 'bg-[#22437C] text-white hover:bg-[#A9213F] shadow-md hover:shadow-lg'
                        : 'bg-slate-100 text-[#22437C] hover:bg-[#22437C] hover:text-white border border-[#22437C]/20'
                    }`}
                  >
                    <span>{program.buttonText}</span>
                    <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Connector */}
        <div className="w-full flex justify-center items-center pt-12">
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-[#A9213F]" />
            <div className="w-0.5 h-12 bg-[#22437C]" />
            <div className="w-3 h-3 rounded-full bg-[#22437C]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
