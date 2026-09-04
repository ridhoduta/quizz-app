import { useNavigate } from 'react-router-dom';

export const ProgramsSection = ({ onSelectProgram }) => {
  const navigate = useNavigate();

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
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#A9213F] text-white text-xs uppercase font-bold tracking-wider mb-3 shadow-sm">
            <span className="material-symbols-outlined text-[14px]">school</span>
            Jalur Pembelajaran
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#22437C] font-bold">
            Temukan Program yang Sesuai dengan Levelmu
          </h2>
          <div className="w-12 h-1 bg-[#A9213F] rounded-full my-3" />
          <p className="text-sm md:text-base text-[#434750]">
            Setiap level membutuhkan pendekatan belajar yang berbeda. Placement test membantu menentukan program yang paling sesuai dengan kemampuanmu.
          </p>
        </div>

        {/* 3 Program Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-3">
          {/* Card 1: Beginner */}
          <div className="bg-white rounded-2xl border border-slate-200 border-t-4 border-t-[#22437C] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group">
            <div className="p-6 sm:p-7">
              {/* Level Badge & Icon Header */}
              <div className="flex justify-between items-center mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-md bg-[#22437C] text-white text-xs font-bold uppercase tracking-wider">
                  A1 – A2 CEFR
                </span>
                <span className="w-9 h-9 rounded-lg bg-[#f0f3ff] text-[#22437C] border border-[#22437C]/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">stairs</span>
                </span>
              </div>
              <h3 className="text-xl md:text-[22px] text-[#22437C] font-bold mb-2 group-hover:text-[#1a3461] transition-colors">
                English Beginner
              </h3>
              <p className="text-sm text-[#434750] leading-relaxed mb-5">
                Membangun fondasi dasar tata bahasa (grammar), kosakata esensial, dan rasa percaya diri untuk komunikasi percakapan sehari-hari.
              </p>

              {/* Program Metadata Chips */}
              <div className="flex flex-wrap gap-2 mb-5 pb-5 border-b border-slate-100">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs font-medium">
                  <span className="material-symbols-outlined text-[14px] text-[#22437C]">schedule</span>
                  3–4 Bulan
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs font-medium">
                  <span className="material-symbols-outlined text-[14px] text-[#22437C]">groups</span>
                  Kelas Interaktif
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs font-medium">
                  <span className="material-symbols-outlined text-[14px] text-[#22437C]">menu_book</span>
                  Fondasi Dasar
                </span>
              </div>

              {/* Key Features List */}
              <span className="text-xs font-bold uppercase text-slate-500 tracking-wider block mb-3">
                Materi Fokus:
              </span>
              <ul className="flex flex-col gap-2.5 mb-6">
                <li className="flex items-start gap-2.5 text-xs text-[#151c27]">
                  <span className="material-symbols-outlined text-[#22437C] text-[18px] shrink-0">check_circle</span>
                  <span>Kosakata dasar 500+ kata penting percakapan</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-[#151c27]">
                  <span className="material-symbols-outlined text-[#22437C] text-[18px] shrink-0">check_circle</span>
                  <span>Struktur kalimat harian &amp; perkenalan diri</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-[#151c27]">
                  <span className="material-symbols-outlined text-[#22437C] text-[18px] shrink-0">check_circle</span>
                  <span>Latihan pengucapan (pronunciation) terpantau</span>
                </li>
              </ul>
            </div>

            <div className="p-6 sm:p-7 pt-0">
              <button
                type="button"
                onClick={() => handleProgramAction('English Beginner')}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-100 text-[#22437C] hover:bg-[#22437C] hover:text-white text-sm font-bold border border-[#22437C]/20 transition-all duration-200 cursor-pointer"
              >
                <span>Lihat Program</span>
                <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>

          {/* Card 2: Intermediate (Featured - Paling Diminati) */}
          <div className="relative bg-white rounded-2xl border-2 border-[#A9213F] shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden group md:-translate-y-2">
            {/* Top Solid Accent Banner */}
            <div className="w-full bg-[#A9213F] text-white py-1.5 px-4 text-center text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-1.5 shadow-sm">
              <span className="material-symbols-outlined text-[15px]">stars</span>
              PALING BANYAK DIPILIH
            </div>

            <div className="p-6 sm:p-7">
              {/* Level Badge & Icon Header */}
              <div className="flex justify-between items-center mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-md bg-[#A9213F] text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                  B1 – B2 CEFR
                </span>
                <span className="w-9 h-9 rounded-lg bg-[#ffe4e8] text-[#A9213F] border border-[#A9213F]/30 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">trending_up</span>
                </span>
              </div>
              <h3 className="text-xl md:text-[22px] text-[#22437C] font-bold mb-2 group-hover:text-[#A9213F] transition-colors">
                English Intermediate
              </h3>
              <p className="text-sm text-[#434750] leading-relaxed mb-5">
                Mengembangkan kemampuan komunikasi aktif, kelancaran diskusi interaktif, dan pemahaman teks bahasa Inggris untuk situasi yang lebih kompleks.
              </p>

              {/* Program Metadata Chips */}
              <div className="flex flex-wrap gap-2 mb-5 pb-5 border-b border-slate-100">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#ffe4e8] text-[#A9213F] text-xs font-bold">
                  <span className="material-symbols-outlined text-[14px]">schedule</span>
                  4–6 Bulan
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs font-medium">
                  <span className="material-symbols-outlined text-[14px] text-[#22437C]">forum</span>
                  Active Speaking
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs font-medium">
                  <span className="material-symbols-outlined text-[14px] text-[#22437C]">work</span>
                  Work Readiness
                </span>
              </div>

              {/* Key Features List */}
              <span className="text-xs font-bold uppercase text-[#A9213F] tracking-wider block mb-3">
                Materi Fokus:
              </span>
              <ul className="flex flex-col gap-2.5 mb-6">
                <li className="flex items-start gap-2.5 text-xs text-[#151c27]">
                  <span className="material-symbols-outlined text-[#A9213F] text-[18px] shrink-0 font-bold">check_circle</span>
                  <span>Percakapan lancar tanpa jeda panjang &amp; spontan</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-[#151c27]">
                  <span className="material-symbols-outlined text-[#A9213F] text-[18px] shrink-0 font-bold">check_circle</span>
                  <span>Penulisan email bisnis &amp; argumen terstruktur</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-[#151c27]">
                  <span className="material-symbols-outlined text-[#A9213F] text-[18px] shrink-0 font-bold">check_circle</span>
                  <span>Pemahaman listening ragam aksen internasional</span>
                </li>
              </ul>
            </div>

            <div className="p-6 sm:p-7 pt-0">
              <button
                type="button"
                onClick={() => handleProgramAction('English Intermediate')}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#22437C] text-white hover:bg-[#A9213F] text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <span>Pilih Program Ini</span>
                <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>

          {/* Card 3: Advanced */}
          <div className="bg-white rounded-2xl border border-slate-200 border-t-4 border-t-[#22437C] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group">
            <div className="p-6 sm:p-7">
              {/* Level Badge & Icon Header */}
              <div className="flex justify-between items-center mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-md bg-[#22437C] text-white text-xs font-bold uppercase tracking-wider">
                  C1 – C2 CEFR
                </span>
                <span className="w-9 h-9 rounded-lg bg-[#f0f3ff] text-[#22437C] border border-[#22437C]/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">workspace_premium</span>
                </span>
              </div>
              <h3 className="text-xl md:text-[22px] text-[#22437C] font-bold mb-2 group-hover:text-[#1a3461] transition-colors">
                English Advanced
              </h3>
              <p className="text-sm text-[#434750] leading-relaxed mb-5">
                Mengasah kemampuan berbahasa tingkat lanjut untuk negosiasi kerja, presentasi profesional, serta persiapan sertifikasi akademik internasional.
              </p>

              {/* Program Metadata Chips */}
              <div className="flex flex-wrap gap-2 mb-5 pb-5 border-b border-slate-100">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs font-medium">
                  <span className="material-symbols-outlined text-[14px] text-[#22437C]">schedule</span>
                  6 Bulan
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs font-medium">
                  <span className="material-symbols-outlined text-[14px] text-[#22437C]">campaign</span>
                  High Negotiation
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs font-medium">
                  <span className="material-symbols-outlined text-[14px] text-[#22437C]">verified</span>
                  IELTS/TOEFL
                </span>
              </div>

              {/* Key Features List */}
              <span className="text-xs font-bold uppercase text-slate-500 tracking-wider block mb-3">
                Materi Fokus:
              </span>
              <ul className="flex flex-col gap-2.5 mb-6">
                <li className="flex items-start gap-2.5 text-xs text-[#151c27]">
                  <span className="material-symbols-outlined text-[#22437C] text-[18px] shrink-0">check_circle</span>
                  <span>Komunikasi bisnis &amp; diplomasi profesional global</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-[#151c27]">
                  <span className="material-symbols-outlined text-[#22437C] text-[18px] shrink-0">check_circle</span>
                  <span>Kesiapan intensif tes TOEFL iBT / IELTS 7.5+</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-[#151c27]">
                  <span className="material-symbols-outlined text-[#22437C] text-[18px] shrink-0">check_circle</span>
                  <span>Penulisan esai formal &amp; dokumen manajerial</span>
                </li>
              </ul>
            </div>

            <div className="p-6 sm:p-7 pt-0">
              <button
                type="button"
                onClick={() => handleProgramAction('English Advanced')}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-100 text-[#22437C] hover:bg-[#22437C] hover:text-white text-sm font-bold border border-[#22437C]/20 transition-all duration-200 cursor-pointer"
              >
                <span>Lihat Program</span>
                <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
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
