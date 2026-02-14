import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, hover = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl border p-6 transition-all duration-200',
          hover && 'hover:-translate-y-1 hover:shadow-lg cursor-pointer',
          className
        )}
        style={{
          backgroundColor: 'var(--color-card-bg)',
          borderColor: 'var(--color-border)',
          boxShadow: `0 1px 3px var(--color-card-shadow)`,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
