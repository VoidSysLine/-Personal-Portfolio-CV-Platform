import type { ReactNode } from 'react';
import { useI18n } from '@/hooks/useI18n';
import { getLegal } from '@/lib/dataLoader';
import { SectionHeading } from '@/components/common/SectionHeading';

export default function ImprintPage(): ReactNode {
  const { locale, t } = useI18n();
  const legal = getLegal();
  const imprint = legal.imprint[locale];

  return (
    <>
      <title>{t('footer.imprint')} — Portfolio</title>

      <SectionHeading title={imprint.title} />

      <div className="prose max-w-none whitespace-pre-line text-text-secondary">
        {imprint.content}
      </div>
    </>
  );
}
