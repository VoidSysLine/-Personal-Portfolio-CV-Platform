import { useState, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface TooltipProps {
  content: string;
  children: ReactNode;
  className?: string;
}

export function Tooltip({ content, children, className }: TooltipProps): ReactNode {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className={cn('relative inline-block', className)}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className="absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 rounded-lg bg-text-primary px-3 py-1.5 text-xs font-medium text-bg-primary whitespace-nowrap shadow-lg"
          role="tooltip"
        >
          {content}
          <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-text-primary" />
        </div>
      )}
    </div>
  );
}
