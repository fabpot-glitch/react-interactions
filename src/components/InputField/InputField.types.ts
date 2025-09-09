import { ChangeEvent } from 'react';

export interface InputFieldProps {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: 'text' | 'email' | 'password' | 'number';
  clearable?: boolean;
  showPasswordToggle?: boolean;
  className?: string;
  id?: string;
  name?: string;
  required?: boolean;
  onClear?: () => void;
}