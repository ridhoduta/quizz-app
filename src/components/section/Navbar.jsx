import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = ({ onStartTest }) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleStart = (e) => {
    e.preventDefault();
    if (onStartTest) {
      onStartTest();
    } else {
      navigate("/biodata");
    }
  };

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (sectionId === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FEFCFF]/95 backdrop-blur-xl border-b border-[#22437C]/10 shadow-[0_2px_12px_rgba(34,67,124,0.06)]">
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex items-center justify-between gap-6">
        {/* Brand Logo & Name */}
        <div
          onClick={(e) => scrollToSection(e, "top")}
          className="flex items-center gap-3 cursor-pointer select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-[#22437C] text-white flex items-center justify-center shadow-md">
            <span className="material-symbols-outlined text-[24px]">
              school
            </span>
          </div>
          <span className="text-lg md:text-xl text-[#22437C] tracking-tight font-bold">
            BunnySpeak Course
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#top"
            onClick={(e) => scrollToSection(e, "top")}
            className="transition-colors text-[#22437C] font-semibold border-b-2 border-[#22437C] pb-0.5 text-sm"
          >
            Beranda
          </a>
          <a
            href="#program-section"
            onClick={(e) => scrollToSection(e, "program-section")}
            className="text-sm font-medium text-[#434750] hover:text-[#22437C] transition-colors"
          >
            Program
          </a>
          <a
            href="#cara-mengikuti"
            onClick={(e) => scrollToSection(e, "cara-mengikuti")}
            className="text-sm font-medium text-[#434750] hover:text-[#22437C] transition-colors"
          >
            Cara Mengikuti
          </a>
        </nav>

        {/* Action Button & Avatar (Desktop) */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            type="button"
            onClick={handleStart}
            className="inline-flex items-center justify-center bg-[#22437C] text-white text-sm px-5 py-2.5 rounded-lg hover:bg-[#1a3461] transition-all shadow-[0_2px_8px_rgba(34,67,124,0.25)] font-semibold cursor-pointer active:scale-95"
          >
            Mulai Placement Test
          </button>
          <div
            onClick={handleStart}
            title="Mulai Placement Test"
            className="w-9 h-9 rounded-full bg-[#22437C] flex items-center justify-center text-white border-2 border-white shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined text-[19px]">
              person
            </span>
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            type="button"
            onClick={handleStart}
            className="bg-[#22437C] text-white text-xs px-3 py-2 rounded-lg font-semibold"
          >
            Mulai Test
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-[#22437C] hover:bg-[#f0f3ff]"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-[26px]">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#FEFCFF] border-b border-slate-200 px-6 py-4 shadow-lg animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-3">
            <a
              href="#top"
              onClick={(e) => scrollToSection(e, "top")}
              className="text-[#22437C] font-semibold text-base py-1"
            >
              Beranda
            </a>
            <a
              href="#program-section"
              onClick={(e) => scrollToSection(e, "program-section")}
              className="text-[#434750] hover:text-[#22437C] font-medium text-base py-1"
            >
              Program
            </a>
            <a
              href="#cara-mengikuti"
              onClick={(e) => scrollToSection(e, "cara-mengikuti")}
              className="text-[#434750] hover:text-[#22437C] font-medium text-base py-1"
            >
              Cara Mengikuti
            </a>
            <div className="pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={handleStart}
                className="w-full inline-flex items-center justify-center bg-[#22437C] text-white text-sm px-5 py-2.5 rounded-lg font-semibold shadow-md cursor-pointer"
              >
                Mulai Placement Test
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
