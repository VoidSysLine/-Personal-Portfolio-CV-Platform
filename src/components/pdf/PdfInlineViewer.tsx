import type { ReactNode } from 'react';

interface PdfInlineViewerProps {
  pdfPath: string;
  title?: string;
}

export function PdfInlineViewer({ pdfPath, title }: PdfInlineViewerProps): ReactNode {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-border">
      {title && (
        <div className="border-b border-border bg-bg-secondary px-4 py-2">
          <p className="text-sm font-medium text-text-primary">{title}</p>
        </div>
      )}
      <iframe
        src={pdfPath}
        title={title || 'PDF Document'}
        className="h-[600px] w-full border-0"
      />
    </div>
  );
}
