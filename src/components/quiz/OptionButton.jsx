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
      className={`w-full min-h-[52px] flex items-center p-4 rounded-xl border text-left transition-all duration-200 select-none group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container ${
        disabled ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'
      } ${
        isSelected
          ? 'border-primary-container bg-primary-container text-surface-container-lowest shadow-md'
          : disabled
          ? 'border-gray-200 bg-gray-100 text-gray-500'
          : 'border-outline-variant bg-surface hover:bg-surface-container-low text-on-surface'
      }`}
    >
      {/* Letter Badge Container */}
      <div
        className={`w-9 h-9 rounded-full border flex items-center justify-center font-bold text-sm mr-4 shrink-0 transition-colors ${
          isSelected
            ? 'border-surface-container-lowest bg-primary text-surface-container-lowest'
            : disabled
            ? 'border-gray-300 bg-gray-200 text-gray-500'
            : 'border-outline-variant bg-surface-container-lowest text-on-surface group-hover:border-primary-container'
        }`}
      >
        {letter}
      </div>

      {/* Option Text */}
      <span className="text-base md:text-lg flex-1 font-medium leading-snug">
        {text}
      </span>
      {isSelected && (
        <span className="material-symbols-outlined text-[24px] text-surface-container-lowest ml-3 filled" aria-hidden="true">
          check_circle
        </span>
      )}
    </button>
  );
};

export default OptionButton;
