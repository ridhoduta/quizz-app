export const Header = () => {
  return (
    <header className="bg-white border-b border-[#C4C6D1] py-4 px-4 md:px-10 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[28px] text-[#22437C] filled">
            school
          </span>
          <span className="text-lg md:text-xl font-bold text-[#012C64]">
            BunnySpeak Course
          </span>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 text-[#434750] text-xs md:text-sm font-medium">
          <span>Langkah 1 dari 2</span>
          <div className="w-16 h-2 bg-[#DCE2F3] rounded-full overflow-hidden">
            <div className="w-1/2 h-full bg-[#22437C] rounded-full" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
