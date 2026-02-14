import { useRef, type ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Printer } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import { Button } from '@/components/ui/Button';
import { PrintableCV } from '@/components/common/PrintableCV';
import type { Locale } from '@/types/common';

export default function PrintPage(): ReactNode {
  const [searchParams] = useSearchParams();
  const locale = (searchParams.get('lang') as Locale) || 'de';
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({ contentRef });

  return (
    <div>
      <div className="no-print fixed right-4 top-4 z-50 flex gap-2">
        <Button onClick={() => handlePrint()} size="lg">
          <Printer size={18} />
          {locale === 'de' ? 'Drucken / PDF speichern' : 'Print / Save as PDF'}
        </Button>
        <a href="/">
          <Button variant="outline" size="lg">
            {locale === 'de' ? 'Zurück' : 'Back'}
          </Button>
        </a>
      </div>
      <div ref={contentRef}>
        <PrintableCV locale={locale} />
      </div>
    </div>
  );
}
