import React, { useState, useId } from 'react';
import { Eye, EyeOff, X, Loader2 } from 'lucide-react';
import { InputFieldProps } from './InputField.types';

export const InputField: React.FC<InputFieldProps> = ({
  value = '',
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  loading = false,
  variant = 'outlined',
  size = 'md',
  type = 'text',
  clearable = false,
  showPasswordToggle = false,
  className = '',
  id,
  name,
  required = false,
  onClear,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || useId();
  const isError = invalid || !!errorMessage;
  const inputType = type === 'password' && showPassword ? 'text' : type;
  
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base',
  };

  // Variant classes
  const getVariantClasses = () => {
    if (disabled) {
      return 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed';
    }
    
    if (isError) {
      switch (variant) {
        case 'filled':
          return 'bg-red-50 border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500';
        case 'ghost':
          return 'bg-transparent border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500';
        default:
          return 'bg-white border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500';
      }
    }

    switch (variant) {
      case 'filled':
        return 'bg-gray-50 border-gray-200 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-blue-500 hover:bg-gray-100';
      case 'ghost':
        return 'bg-transparent border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500 hover:border-gray-400';
      default:
        return 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500 hover:border-gray-400';
    }
  };

  const handleClear = () => {
    if (onClear) {
      onClear();
    } else if (onChange) {
      const event = {
        target: { value: '' }
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  const shouldShowRightIcon = (clearable && value) || (showPasswordToggle && type === 'password') || loading;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className={`block text-sm font-medium mb-1.5 ${
            isError ? 'text-red-700' : disabled ? 'text-gray-400' : 'text-gray-700'
          }`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <input
          id={inputId}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          aria-describedby={
            errorMessage ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          aria-invalid={isError}
          className={`
            w-full rounded-md border transition-all duration-200 ease-in-out
            focus:outline-none focus:ring-1
            ${sizeClasses[size]}
            ${getVariantClasses()}
            ${shouldShowRightIcon ? 'pr-10' : ''}
          `}
        />
        
        {shouldShowRightIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-1">
            {loading && (
              <Loader2 className="h-4 w-4 text-gray-400 animate-spin" />
            )}
            
            {clearable && value && !loading && (
              <button
                type="button"
                onClick={handleClear}
                disabled={disabled}
                className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 disabled:cursor-not-allowed disabled:hover:text-gray-400"
                aria-label="Clear input"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            
            {showPasswordToggle && type === 'password' && !loading && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={disabled}
                className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 disabled:cursor-not-allowed disabled:hover:text-gray-400"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            )}
          </div>
        )}
      </div>
      
      {(errorMessage || helperText) && (
        <p
          id={errorMessage ? `${inputId}-error` : `${inputId}-helper`}
          className={`mt-1.5 text-xs ${
            errorMessage ? 'text-red-600' : 'text-gray-500'
          }`}
          role={errorMessage ? 'alert' : undefined}
        >
          {errorMessage || helperText}
        </p>
      )}
    </div>
  );
};