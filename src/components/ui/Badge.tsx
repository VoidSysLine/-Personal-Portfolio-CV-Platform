import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'accent' | 'outline';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps): ReactNode {
  const variantStyles = {
    default: 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)]',
    accent: 'bg-[var(--color-accent-light)] text-[var(--color-accent)]',
    outline: 'border border-[var(--color-border)] text-[var(--color-text-secondary)] bg-transparent',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
