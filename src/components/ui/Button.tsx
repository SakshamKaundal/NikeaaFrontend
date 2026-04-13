import React from 'react';
import './Button.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export function Button({ variant = 'primary', size = 'md', isLoading = false, children, ...props }: ButtonProps) {
  return (
    <button
      aria-busy={isLoading}
      className={`btn btn-${variant} btn-${size}`}
      {...props}
    >
      {isLoading && <span aria-hidden="true" className="spinner" />}
      {children}
    </button>
  );
}