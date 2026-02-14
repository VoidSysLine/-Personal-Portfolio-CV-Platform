import type { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { useI18n } from '@/hooks/useI18n';
import { getLegal } from '@/lib/dataLoader';
import { SectionHeading } from '@/components/common/SectionHeading';

export default function ImprintPage(): ReactNode {
  const { locale, t } = useI18n();
  const legal = getLegal();
  const imprint = legal.imprint[locale];

  return (
    <>
      <Helmet>
        <title>{t('footer.imprint')} — Portfolio</title>
      </Helmet>

      <SectionHeading title={imprint.title} />

      <div
        className="prose max-w-none whitespace-pre-line"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {imprint.content}
      </div>
    </>
  );
}
