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
          {label && <span className="font-semibold text-primary">{label}</span>}
          {subLabel && <span className="text-on-surface-variant">{subLabel}</span>}
        </div>
      )}
      <div className="w-full bg-outline-variant/40 h-2.5 rounded-full overflow-hidden">
        <div
          className="bg-primary-container h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${safeProgress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
