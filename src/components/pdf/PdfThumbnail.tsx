import type { ReactNode } from 'react';
import { FileText } from 'lucide-react';

interface PdfThumbnailProps {
  onClick?: () => void;
  className?: string;
}

export function PdfThumbnail({ onClick, className }: PdfThumbnailProps): ReactNode {
  return (
    <button
      onClick={onClick}
      className={`flex h-32 w-24 flex-col items-center justify-center rounded-lg border transition-all hover:shadow-md ${className || ''}`}
      style={{
        backgroundColor: 'var(--color-bg-tertiary)',
        borderColor: 'var(--color-border)',
      }}
    >
      <FileText size={32} style={{ color: 'var(--color-accent)' }} />
      <span className="mt-2 text-xs" style={{ color: 'var(--color-text-muted)' }}>PDF</span>
    </button>
  );
}
