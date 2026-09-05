export const Input = ({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  options = [],
  required = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const isSelect = type === 'select';
  const inputId = id || name;
  const errorId = error && inputId ? `${inputId}-error` : undefined;

  const baseInputStyle =
    'w-full bg-surface border rounded-lg px-4 py-3 text-base text-on-surface placeholder:text-outline-variant focus:outline-none transition-colors duration-150';
  
  const borderStyle = error
    ? 'border-brand-accent focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20'
    : 'border-surface-variant focus:border-primary-container focus:ring-2 focus:ring-primary-container/20';

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-on-surface mb-1.5"
        >
          {label}
          {required && <span className="text-brand-accent ml-1" aria-hidden="true">*</span>}
        </label>
      )}

      {isSelect ? (
        <div className="relative">
          <select
            id={inputId}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            aria-describedby={errorId}
            className={`${baseInputStyle} ${borderStyle} appearance-none pr-10 cursor-pointer`}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <span className="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 text-outline pointer-events-none text-[20px]">
            expand_more
          </span>
        </div>
      ) : (
        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          className={`${baseInputStyle} ${borderStyle}`}
          {...props}
        />
      )}

      {error && (
        <p id={errorId} className="mt-1.5 text-xs text-brand-accent flex items-center gap-1" role="alert">
          <span className="material-symbols-outlined text-[16px]">error</span>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};

export default Input;
