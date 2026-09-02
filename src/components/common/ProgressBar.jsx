import React from 'react';

/**
 * Reusable Progress Bar Component with smooth transition
 */
export const ProgressBar = ({
  progress = 0,
  label,
  subLabel,
  className = '',
}) => {
  const safeProgress = Math.min(Math.max(Number(progress) || 0, 0), 100);

  return (
    <div className={`w-full ${className}`}>
      {(label || subLabel) && (
        <div className="flex justify-between items-center mb-2 text-sm">
          {label && <span className="font-semibold text-[#012C64]">{label}</span>}
          {subLabel && <span className="text-[#434750]">{subLabel}</span>}
        </div>
      )}
      <div className="w-full bg-[#C4C6D1]/40 h-2.5 rounded-full overflow-hidden">
        <div
          className="bg-[#22437C] h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${safeProgress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
