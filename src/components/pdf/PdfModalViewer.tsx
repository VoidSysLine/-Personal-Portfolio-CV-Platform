import type { ReactNode } from 'react';
import { Download } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

interface PdfModalViewerProps {
  isOpen: boolean;
  onClose: () => void;
  pdfPath: string;
  title?: string;
}

export function PdfModalViewer({ isOpen, onClose, pdfPath, title }: PdfModalViewerProps): ReactNode {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="xl">
      <div className="p-4">
        <iframe
          src={pdfPath}
          title={title || 'PDF Document'}
          className="h-[75vh] w-full rounded-lg"
          style={{ border: 'none' }}
        />
        <div className="mt-4 flex justify-end">
          <a href={pdfPath} download>
            <Button variant="outline" size="sm">
              <Download size={16} />
              Download
            </Button>
          </a>
        </div>
      </div>
    </Modal>
  );
}
