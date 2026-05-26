import type { HTMLAttributes, ReactNode } from 'react';
import './Card.css';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  elevated?: boolean;
  interactive?: boolean;
}

export function Card({
  children,
  elevated = false,
  interactive = false,
  className = '',
  ...props
}: CardProps) {
  return (
    <div
      className={`card ${elevated ? 'card-elevated' : ''} ${interactive ? 'card-interactive' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
