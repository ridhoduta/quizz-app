
export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  onClick,
  disabled = false,
  isLoading = false,
  icon,
  iconPosition = 'left',
  className = '',
  fullWidth = false,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

  const variantClasses = {
    primary:
      'bg-primary-container hover:bg-primary-container-hover text-surface-container-lowest shadow-sm hover:shadow-md focus-visible:ring-primary-container',
    secondary:
      'bg-transparent border border-primary-container text-primary-container hover:bg-surface-container-low focus-visible:ring-primary-container',
    accent:
      'bg-brand-accent hover:bg-brand-accent-hover text-surface-container-lowest shadow-sm hover:shadow-md focus-visible:ring-brand-accent',
    outline:
      'border border-outline-variant bg-surface-container-lowest text-on-surface hover:bg-surface focus-visible:ring-primary-container',
    ghost:
      'bg-transparent text-on-surface-variant hover:text-primary-container hover:bg-surface-container-low focus-visible:ring-primary-container',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs gap-1.5 h-8',
    md: 'px-6 py-2.5 text-sm gap-2 h-11',
    lg: 'px-8 py-3.5 text-base gap-2.5 h-13',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      className={`${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${
        sizeClasses[size] || sizeClasses.md
      } ${widthClass} ${className}`}
      {...props}
    >
      {isLoading && (
        <span className="material-symbols-outlined animate-spin text-[18px]">
          progress_activity
        </span>
      )}

      {!isLoading && icon && iconPosition === 'left' && (
        <span className="material-symbols-outlined text-[20px]">{icon}</span>
      )}

      <span>{children}</span>

      {!isLoading && icon && iconPosition === 'right' && (
        <span className="material-symbols-outlined text-[20px]">{icon}</span>
      )}
    </button>
  );
};

export default Button;
