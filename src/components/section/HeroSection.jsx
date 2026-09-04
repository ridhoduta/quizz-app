import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const HeroSection = ({ onStartTest }) => {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);

  const handleStart = (e) => {
    e.preventDefault();
    if (onStartTest) {
      onStartTest();
    } else {
      navigate('/biodata');
    }
  };

  return (
    <div id="top" className="relative w-full overflow-hidden bg-[#22437C] text-white">
      {/* Background Subtle Gradient Accents */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#A9213F]/20 blur-3xl pointer-events-none" />

      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pt-8 md:pt-14 pb-12 md:pb-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline, Narrative & CTA */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-2 text-white/80 text-sm mb-4">
              <a href="#top" className="hover:text-white transition-colors">
                Home
              </a>
              <span>›</span>
              <span className="text-white font-medium">belajar-bahasa-inggris</span>
            </nav>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.15] mb-5 max-w-xl">
              Kursus Bahasa Inggris di Cakap Bikin Makin Percaya Diri!
            </h1>

            {/* Sub-headline */}
            <p className="text-base md:text-lg text-white/90 leading-relaxed max-w-xl mb-8">
              Belajar Bahasa Inggris jadi lebih mudah &amp; bikin percaya diri bersama Cakap! 
              Ikuti kelas interaktif langsung dengan pengajar profesional, belajar fleksibel lewat HP/laptop, sesuai dengan jadwalmu.
            </p>

            {/* Action CTA Button */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={handleStart}
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white text-[#22437C] text-base font-bold shadow-lg hover:bg-slate-100 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span>Mulai Placement Test</span>
              </button>
            </div>

            {/* Quality Standard Badges */}
            <div className="flex items-center gap-2 mt-6 text-white/90 text-xs md:text-sm">
              <span className="material-symbols-outlined text-[18px] text-white">
                verified_user
              </span>
              <span>Standar referensi CEFR • 15 Soal Adaptif • Hasil Instan</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 flex justify-center items-center mt-6 lg:mt-0 relative z-10">
            <div className="relative w-full max-w-[540px] rounded-2xl overflow-hidden shadow-2xl bg-white/10 border-2 border-white/30 p-2 group hover:shadow-2xl transition-all duration-300">
              {!imgError ? (
                <img
                  alt="Kursus Bahasa Inggris di Cakap Showcase"
                  className="w-full h-auto object-cover rounded-xl group-hover:scale-[1.02] transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzrqTZDPvh0MTHWMnLFAuuhT3acEQhfaRCb02kCFiJgaSMTCopyTbA-ahOdmvh-RmcS4s-ZVSG_MaEMBLby8hj8xmTS_SzV-_htq6JgBN7HFKuL7VoM-tpVu2iep5YVUfARXAah5g-j5wqdA6T_sfBfCNn4xAxCN-Kdio7TOeaazvG4uCb6NpitnCZynEVpfLLWTlHUq6GSCBkQKzsEXf8X-txGqz2M82__xeOSrxm2D7VSqOfzxW8gakVQG9ZwUatWA"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-72 rounded-xl bg-gradient-to-tr from-[#1a3461] to-[#2e5aa8] flex flex-col items-center justify-center p-6 text-center text-white">
                  <span className="material-symbols-outlined text-6xl mb-3 text-white/80">
                    school
                  </span>
                  <p className="font-bold text-lg">English Placement Test</p>
                  <p className="text-sm text-white/80 mt-1">Uji kemampuan dan raih level optimalmu</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Bottom Line & Dot */}
      <div className="w-full flex justify-center items-center py-2">
        <div className="flex flex-col items-center">
          <div className="w-px h-8 bg-white/30" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#A9213F] shadow-sm" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
