import React from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input: React.FC<InputProps> = ({ error, className, ...props }) => {
  return (
    <input
      className={cn('input', error && 'input-error', className)}
      {...props}
    />
  );
};
