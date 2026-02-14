import type { ReactNode } from 'react';
import { FileText } from 'lucide-react';
import { cn } from '@/lib/cn';

interface PdfThumbnailProps {
  onClick?: () => void;
  className?: string;
}

export function PdfThumbnail({ onClick, className }: PdfThumbnailProps): ReactNode {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex h-32 w-24 flex-col items-center justify-center rounded-lg border border-border bg-bg-tertiary transition-all hover:shadow-md',
        className
      )}
    >
      <FileText size={32} className="text-accent" />
      <span className="mt-2 text-xs text-text-muted">PDF</span>
    </button>
  );
}
