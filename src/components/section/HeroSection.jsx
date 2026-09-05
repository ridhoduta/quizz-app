import { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../../assets/images/image-hero.jpg";

export const HeroSection = ({ onStartTest }) => {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);

  const handleStart = (e) => {
    e.preventDefault();
    if (onStartTest) {
      onStartTest();
    } else {
      navigate("/biodata");
    }
  };

  return (
    <div
      id="top"
      className="relative w-full overflow-hidden bg-hero text-white"
    >
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pt-8 md:pt-14 pb-14 md:pb-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.18] mb-5 max-w-2xl">
              Kursus Bahasa Inggris di BunnySpeak Bikin Makin{" "}
              <span className="text-gold underline decoration-wavy decoration-brand-accent decoration-2 underline-offset-4">
                Percaya Diri!
              </span>
            </h1>

            <p className="text-base md:text-lg text-white/90 leading-relaxed max-w-xl mb-8">
              Belajar Bahasa Inggris jadi lebih seru &amp; terarah bersama
              BunnySpeak! Cari tahu level kemahiranmu melalui tes adaptif dan raih kelas interaktif bersama tutor berpengalaman.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={handleStart}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-primary-container text-base font-bold shadow-xl shadow-black/20 hover:bg-yellow-light hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer group"
              >
                <span>Mulai Placement Test</span>
                <span className="material-symbols-outlined text-[20px] transition-transform duration-200 group-hover:translate-x-1">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center items-center mt-6 lg:mt-0 relative z-10">
            <div className="relative w-full max-w-[500px]">
              <div className="relative w-full rounded-3xl overflow-hidden p-3 sm:p-4 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)] border-2 border-white/60 transition-all duration-300 hover:shadow-[0_30px_60px_-10px_rgba(0,0,0,0.45)] group">
                {!imgError ? (
                  <div className="relative overflow-hidden rounded-2xl bg-blue-lightest">
                    <img
                      src={heroImage}
                      alt="BunnySpeak Course Mascot Hero"
                      className="w-full h-auto object-contain rounded-2xl transform group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                      onError={() => setImgError(true)}
                    />

                    <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-t from-primary-container/10 via-transparent to-transparent" />
                  </div>
                ) : (
                  <div className="w-full h-72 rounded-2xl bg-gradient-to-tr from-primary-container-hover to-blue-gradient flex flex-col items-center justify-center p-6 text-center text-white">
                    <span className="material-symbols-outlined text-6xl mb-3 text-white/80">
                      school
                    </span>
                    <p className="font-bold text-lg">BunnySpeak Course</p>
                    <p className="text-sm text-white/80 mt-1">
                      Uji kemampuan dan raih level optimalmu
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full flex justify-center items-center py-2">
        <div className="flex flex-col items-center">
          <div className="w-px h-8 bg-white/30" />
          <div className="w-2.5 h-2.5 rounded-full bg-brand-accent shadow-sm ring-4 ring-brand-accent/20" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
