/**
 * OptionButton Component for multiple choice quiz options
 */
export const OptionButton = ({
  letter,
  text,
  isSelected = false,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={isSelected}
      className={`w-full min-h-[52px] flex items-center p-4 rounded-xl border text-left transition-all duration-200 select-none group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22437C] ${
        disabled ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'
      } ${
        isSelected
          ? 'border-[#22437C] bg-[#22437C] text-white shadow-md'
          : disabled
          ? 'border-gray-200 bg-gray-100 text-gray-500'
          : 'border-[#C4C6D1] bg-[#F9F9FF] hover:bg-[#F0F3FF] text-[#151C27]'
      }`}
    >
      {/* Letter Badge Container */}
      <div
        className={`w-9 h-9 rounded-full border flex items-center justify-center font-bold text-sm mr-4 shrink-0 transition-colors ${
          isSelected
            ? 'border-white bg-[#012C64] text-white'
            : disabled
            ? 'border-gray-300 bg-gray-200 text-gray-500'
            : 'border-[#C4C6D1] bg-white text-[#151C27] group-hover:border-[#22437C]'
        }`}
      >
        {letter}
      </div>

      {/* Option Text */}
      <span className="text-base md:text-lg flex-1 font-medium leading-snug">
        {text}
      </span>

      {/* Checkmark Icon when Selected */}
      {isSelected && (
        <span className="material-symbols-outlined text-[24px] text-white ml-3 filled" aria-hidden="true">
          check_circle
        </span>
      )}
    </button>
  );
};

export default OptionButton;
