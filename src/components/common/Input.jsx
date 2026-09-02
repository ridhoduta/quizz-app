import React from 'react';

/**
 * Reusable Form Input & Select Component with Label, Focus, and Error styling
 */
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

  const baseInputStyle =
    'w-full bg-[#F9FAFB] border rounded px-4 py-3 text-base text-[#151C27] placeholder:text-[#C4C6D1] focus:outline-none transition-colors duration-150';
  
  const borderStyle = error
    ? 'border-[#A9213F] focus:border-[#A9213F] focus:ring-1 focus:ring-[#A9213F]'
    : 'border-[#E5E7EB] focus:border-[#22437C] focus:ring-1 focus:ring-[#22437C]';

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={id || name}
          className="block text-sm font-medium text-[#151C27] mb-1.5"
        >
          {label}
          {required && <span className="text-[#A9213F] ml-1">*</span>}
        </label>
      )}

      {isSelect ? (
        <div className="relative">
          <select
            id={id || name}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
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
          <span className="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 text-[#747781] pointer-events-none text-[20px]">
            expand_more
          </span>
        </div>
      ) : (
        <input
          id={id || name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`${baseInputStyle} ${borderStyle}`}
          {...props}
        />
      )}

      {error && (
        <p className="mt-1.5 text-xs text-[#A9213F] flex items-center gap-1">
          <span className="material-symbols-outlined text-[16px]">error</span>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};

export default Input;
