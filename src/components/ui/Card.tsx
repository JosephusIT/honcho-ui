import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
  interactive?: boolean;
}

export function Card({ elevated, interactive, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'card',
        elevated && 'card-elevated',
        interactive && 'card-interactive',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
