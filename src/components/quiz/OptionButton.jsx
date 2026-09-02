import React from 'react';

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
      className={`w-full flex items-center p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer select-none group ${
        isSelected
          ? 'border-[#22437C] bg-[#22437C] text-white shadow-md'
          : 'border-[#C4C6D1] bg-[#F9F9FF] hover:bg-[#F0F3FF] text-[#151C27]'
      }`}
    >
      {/* Letter Badge Container */}
      <div
        className={`w-9 h-9 rounded-full border flex items-center justify-center font-bold text-sm mr-4 shrink-0 transition-colors ${
          isSelected
            ? 'border-white bg-[#012C64] text-white'
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
        <span className="material-symbols-outlined text-[24px] text-white ml-3 filled">
          check_circle
        </span>
      )}
    </button>
  );
};

export default OptionButton;
