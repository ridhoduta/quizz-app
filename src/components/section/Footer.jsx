import { useNavigate } from 'react-router-dom';

export const Footer = ({ onStartTest }) => {
  const navigate = useNavigate();

  const handleStart = (e) => {
    e.preventDefault();
    if (onStartTest) {
      onStartTest();
    } else {
      navigate('/biodata');
    }
  };

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="w-full bg-[#FEFCFF] border-t border-slate-200 shadow-[0_-1px_6px_rgba(34,67,124,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-10 md:py-12">
        <div className="flex flex-col lg:flex-row justify-between gap-10 mb-8">
          {/* Brand Info */}
          <div className="max-w-md">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#22437C] text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">school</span>
              </div>
              <span className="text-xl text-[#22437C] font-bold">
                English Placement Test
              </span>
            </div>
            <p className="text-sm text-[#434750] leading-relaxed">
              Test kemampuan bahasa Inggris dan temukan program yang sesuai dengan levelmu bersama kurikulum berstandar CEFR.
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Menu Utama */}
            <div className="flex flex-col gap-2.5">
              <span className="text-sm text-[#151c27] font-semibold">Menu Utama</span>
              <a
                href="#program-section"
                onClick={(e) => scrollToSection(e, 'program-section')}
                className="text-sm text-[#434750] hover:text-[#22437C] transition-colors"
              >
                Program
              </a>
              <a
                href="#cara-mengikuti"
                onClick={(e) => scrollToSection(e, 'cara-mengikuti')}
                className="text-sm text-[#434750] hover:text-[#22437C] transition-colors"
              >
                Cara Mengikuti
              </a>
              <button
                type="button"
                onClick={handleStart}
                className="text-left text-sm text-[#434750] hover:text-[#22437C] transition-colors cursor-pointer"
              >
                Mulai Placement Test
              </button>
            </div>

            {/* Legalitas */}
            <div className="flex flex-col gap-2.5">
              <span className="text-sm text-[#151c27] font-semibold">Legalitas</span>
              <a
                href="#privacy"
                onClick={(e) => e.preventDefault()}
                className="text-sm text-[#434750] hover:text-[#22437C] transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#terms"
                onClick={(e) => e.preventDefault()}
                className="text-sm text-[#434750] hover:text-[#22437C] transition-colors"
              >
                Terms of Service
              </a>
            </div>

            {/* Bantuan */}
            <div className="flex flex-col gap-2.5">
              <span className="text-sm text-[#151c27] font-semibold">Bantuan</span>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#434750] hover:text-[#22437C] transition-colors flex items-center gap-1"
              >
                <span>WhatsApp Support</span>
              </a>
              <a
                href="#faq"
                onClick={(e) => e.preventDefault()}
                className="text-sm text-[#434750] hover:text-[#22437C] transition-colors"
              >
                FAQ
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="text-center sm:text-left bg-[#f4f7fd] rounded-lg p-4 border border-slate-200">
          <p className="text-xs text-[#434750]">
            © 2026 English Placement Test. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
