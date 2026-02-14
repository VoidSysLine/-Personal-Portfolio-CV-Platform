import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({ title, subtitle, className }: SectionHeadingProps): ReactNode {
  return (
    <div className={cn('mb-10', className)}>
      <h2
        className="text-3xl font-bold tracking-tight sm:text-4xl"
        style={{ color: 'var(--color-text-primary)' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-lg" style={{ color: 'var(--color-text-secondary)' }}>
          {subtitle}
        </p>
      )}
      <div
        className="mt-4 h-1 w-16 rounded-full"
        style={{ backgroundColor: 'var(--color-accent)' }}
      />
    </div>
  );
}
