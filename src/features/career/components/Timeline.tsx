import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface TimelineProps {
  children: ReactNode;
  className?: string;
}

export function Timeline({ children, className }: TimelineProps): ReactNode {
  return (
    <div className={cn('relative', className)}>
      {/* Vertical line */}
      <div
        className="absolute left-4 top-0 h-full w-0.5 md:left-1/2 md:-translate-x-px"
        style={{ backgroundColor: 'var(--color-border)' }}
      />
      <div className="space-y-12">{children}</div>
    </div>
  );
}
