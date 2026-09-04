import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    setTimestamp(`EPT-LIVE-${timeStr}`);
  }, []);

  return (
    <div className="font-sans antialiased text-[#151C27] min-h-screen flex flex-col bg-[#f9f9ff]">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#C4C6D1]">
        <div className="h-14 px-4 md:px-10 flex items-center justify-between gap-2 max-w-7xl mx-auto">
          <Link to="/" className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[28px] text-[#22437C] filled">
              school
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[#012C64] leading-tight">
                BunnySpeak Course
              </span>
              <span className="text-[11px] text-[#434750] leading-none">
                Beranda
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#22437C] flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-[18px]">
                person
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col w-full pt-14 pb-12 bg-[#f9f9ff]">
        <div className="w-full max-w-[1040px] mx-auto px-4 md:px-10 py-8 flex flex-col items-center">
          {/* Hero Illustration & 404 Visual */}
          <div className="relative flex items-center justify-center my-2 select-none">
            {/* Background Ambient Aura */}
            <div
              aria-hidden="true"
              className="absolute -inset-4 bg-[#e7eefe] rounded-full blur-2xl opacity-70"
            />

            {/* Illustration + SVG 404 */}
            <div className="relative z-10 flex flex-col items-center">
              {/* Mascot Image */}
              <div className="w-full flex justify-center items-center mb-2">
                <img
                  src="/src/assets/images/image-notfound.png"
                  alt="Karakter kelinci sedang belajar"
                  className="h-44 sm:h-52 w-auto object-contain drop-shadow-sm transition-transform hover:scale-105 duration-300"
                />
              </div>

              {/* SVG 404 Number */}
              <svg
                className="w-64 sm:w-80 md:w-96 h-auto drop-shadow-sm"
                fill="none"
                viewBox="0 0 380 160"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* First '4' */}
                <text
                  fill="#012c64"
                  fontFamily="Inter, sans-serif"
                  fontSize="120"
                  letterSpacing="-4"
                  x="30"
                  y="125"
                >
                  4
                </text>

                {/* Central Magnifier / Test Sheet replacing '0' */}
                <g transform="translate(145, 15)">
                  {/* Outer Question Sheet */}
                  <rect
                    fill="#ffffff"
                    height="85"
                    rx="6"
                    stroke="#dce2f3"
                    strokeWidth="3"
                    width="60"
                    x="15"
                    y="10"
                  />
                  {/* Sheet dummy lines */}
                  <line
                    stroke="#adc6ff"
                    strokeLinecap="round"
                    strokeWidth="3"
                    x1="25"
                    x2="65"
                    y1="28"
                    y2="28"
                  />
                  <line
                    stroke="#dce2f3"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    x1="25"
                    x2="58"
                    y1="40"
                    y2="40"
                  />
                  <line
                    stroke="#dce2f3"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    x1="25"
                    x2="62"
                    y1="52"
                    y2="52"
                  />
                  {/* Red Incorrect Indicator */}
                  <circle cx="32" cy="72" fill="#ffdadb" r="5" />
                  <path
                    d="M30 70L34 74M34 70L30 74"
                    stroke="#b12844"
                    strokeLinecap="round"
                    strokeWidth="1.5"
                  />
                  {/* Radio options */}
                  <circle cx="48" cy="72" fill="#e7eefe" r="4" />
                  <circle cx="62" cy="72" fill="#e7eefe" r="4" />
                  {/* Magnifier Overlay */}
                  <g transform="translate(8, 6)">
                    <circle
                      cx="36"
                      cy="48"
                      fill="#ffffff"
                      fillOpacity="0.85"
                      r="32"
                      stroke="#22437c"
                      strokeWidth="5"
                    />
                    <circle
                      cx="36"
                      cy="48"
                      fill="#e7eefe"
                      fillOpacity="0.35"
                      r="23"
                    />
                    {/* Crosshair inside lens */}
                    <path
                      d="M26 48H46M36 38V58"
                      stroke="#b12844"
                      strokeLinecap="round"
                      strokeWidth="3"
                    />
                    <circle cx="36" cy="48" fill="#b12844" r="4" />
                    {/* Magnifier Handle */}
                    <line
                      stroke="#22437c"
                      strokeLinecap="round"
                      strokeWidth="7"
                      x1="60"
                      x2="84"
                      y1="72"
                      y2="96"
                    />
                    <line
                      stroke="#adc6ff"
                      strokeLinecap="round"
                      strokeWidth="2"
                      x1="61"
                      x2="78"
                      y1="73"
                      y2="90"
                    />
                  </g>
                </g>

                {/* Second '4' */}
                <text
                  fill="#012c64"
                  fontFamily="Inter, sans-serif"
                  fontSize="120"
                  letterSpacing="-4"
                  x="250"
                  y="125"
                >
                  4
                </text>

                {/* Floating CEFR badge */}
                <rect
                  fill="#ff637b"
                  height="22"
                  rx="11"
                  width="56"
                  x="290"
                  y="24"
                />
              </svg>
            </div>
          </div>

          {/* Editorial Error Copy */}
          <div className="text-center max-w-2xl mt-4 mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#012C64] tracking-tight mb-3">
              Oops! Sepertinya Kamu Keluar dari Jalur Tes
            </h1>
            <p className="text-base text-[#434750] leading-relaxed">
              Halaman yang kamu cari telah dipindahkan, tautannya salah, atau
              belum tersedia. Jangan biarkan proses evaluasi kemampuan bahasa
              Inggrismu terhenti di sini.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md mb-4">
            {/* Primary CTA */}
            <Link
              to="/"
              className="w-full sm:flex-1 min-h-[48px] px-6 py-3 rounded-lg bg-[#012C64] hover:bg-[#22437C] text-white text-sm font-medium flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all duration-200"
            >
              <span className="material-symbols-outlined text-[20px]">
                home
              </span>
              <span>Kembali ke Beranda</span>
            </Link>

            {/* Secondary CTA */}
            <button
              type="button"
              onClick={() => navigate("/biodata")}
              className="w-full sm:flex-1 min-h-[48px] px-6 py-3 rounded-lg bg-[#b12844] hover:bg-[#8f072f] text-white text-sm font-medium flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">
                play_circle
              </span>
              <span>Mulai Placement Test</span>
            </button>
          </div>

          {/* Tertiary Assistance Link */}
          <div className="mb-8">
            <a
              href="mailto:support@ept.cakap.com"
              className="inline-flex items-center gap-1.5 text-[#b12844] hover:text-[#8f072f] text-sm font-medium group transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">
                support_agent
              </span>
              <span className="group-hover:underline">
                Hubungi Bantuan / Laporkan Kendala
              </span>
              <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-0.5">
                arrow_forward
              </span>
            </a>
          </div>

          {/* Diagnostic Meta */}
          <div className="mt-8 text-center flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-[#747781]">
            <span>
              Status:{" "}
              <strong className="font-medium text-[#151C27]">
                HTTP 404 Route Not Found
              </strong>
            </span>
            <span className="hidden sm:inline">•</span>
            <span>Sesi: {timestamp}</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-4 py-4 flex flex-col items-center gap-2 text-center bg-[#f0f3ff]/60 border-t border-[#C4C6D1]">
        <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-[#434750]">
          <a href="#" className="hover:text-[#22437C] transition-colors py-1">
            Bantuan
          </a>
          <span className="text-[#C4C6D1]">•</span>
          <a href="#" className="hover:text-[#22437C] transition-colors py-1">
            Privasi
          </a>
          <span className="text-[#C4C6D1]">•</span>
          <a href="#" className="hover:text-[#22437C] transition-colors py-1">
            Syarat &amp; Ketentuan
          </a>
        </div>
      </footer>
    </div>
  );
};

export default NotFound;
