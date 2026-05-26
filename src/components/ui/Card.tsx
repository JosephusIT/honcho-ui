import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({
  elevated,
  interactive,
  className,
  children,
  ...props
}) => {
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
};
