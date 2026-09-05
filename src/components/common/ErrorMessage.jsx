export const ErrorMessage = ({
  title = 'Terjadi Kesalahan',
  message,
  onRetry,
  className = '',
}) => {
  return (
    <div
      className={`bg-error-container/50 border border-error-container text-on-error-container p-4 rounded-lg flex items-start gap-3 ${className}`}
    >
      <span className="material-symbols-outlined text-[24px] text-brand-accent shrink-0">
        error
      </span>
      <div className="flex-1">
        {title && <h4 className="font-semibold text-sm">{title}</h4>}
        {message && <p className="text-xs mt-0.5 opacity-90">{message}</p>}
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-xs font-semibold underline hover:no-underline text-brand-accent cursor-pointer"
        >
          Coba Lagi
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
