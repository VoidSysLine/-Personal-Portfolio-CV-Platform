import type { ReactNode } from 'react';
import { Award, ExternalLink, Download } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';
import { FaviconImage } from '@/components/common/FaviconImage';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/dateUtils';
import { isPdfAvailable } from '@/lib/pdfUtils';
import type { CertificateEntry } from '@/types/certificate';

interface CertificateCardProps {
  certificate: CertificateEntry;
}

const categoryLabels: Record<string, { de: string; en: string }> = {
  professional: { de: 'Berufszeugnis', en: 'Professional' },
  academic: { de: 'Akademisch', en: 'Academic' },
  training: { de: 'Fortbildung', en: 'Training' },
  certification: { de: 'Zertifikat', en: 'Certification' },
};

export function CertificateCard({ certificate }: CertificateCardProps): ReactNode {
  const { locale, t } = useI18n();
  const hasPdf = isPdfAvailable(certificate.pdfPath);
  const label = categoryLabels[certificate.category] || categoryLabels.certification;

  return (
    <Card hover>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <FaviconImage
            url={certificate.issuerUrl}
            alt={certificate.issuer[locale]}
            size={28}
            fallbackIcon={<Award size={28} className="text-accent" />}
          />
          <div>
            <h3 className="font-semibold text-text-primary">
              {certificate.title[locale]}
            </h3>
            <p className="text-sm text-accent">
              {certificate.issuer[locale]}
            </p>
          </div>
        </div>
        <Badge variant="outline">{label[locale]}</Badge>
      </div>

      <p className="mt-3 text-sm text-text-muted">
        {formatDate(certificate.date + '-01', locale)}
      </p>

      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
        {certificate.description[locale]}
      </p>

      {hasPdf && (
        <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
          <a
            href={certificate.pdfPath}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
          >
            <ExternalLink size={14} />
            {t('common.viewPdf')}
          </a>
          <a
            href={certificate.pdfPath}
            download
            className="flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-text-primary"
          >
            <Download size={14} />
            {t('common.download')}
          </a>
        </div>
      )}
    </Card>
  );
}
