import type { ReactNode } from 'react';

interface PdfInlineViewerProps {
  pdfPath: string;
  title?: string;
}

export function PdfInlineViewer({ pdfPath, title }: PdfInlineViewerProps): ReactNode {
  return (
    <div className="w-full overflow-hidden rounded-lg border" style={{ borderColor: 'var(--color-border)' }}>
      {title && (
        <div className="border-b px-4 py-2" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-secondary)' }}>
          <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{title}</p>
        </div>
      )}
      <iframe
        src={pdfPath}
        title={title || 'PDF Document'}
        className="h-[600px] w-full"
        style={{ border: 'none' }}
      />
    </div>
  );
}
