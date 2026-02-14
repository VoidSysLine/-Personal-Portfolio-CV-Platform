import type { ReactNode } from 'react';
import { useI18n } from '@/hooks/useI18n';
import { getLegal } from '@/lib/dataLoader';
import { SectionHeading } from '@/components/common/SectionHeading';

export default function PrivacyPage(): ReactNode {
  const { locale, t } = useI18n();
  const legal = getLegal();
  const privacy = legal.privacy[locale];

  return (
    <>
      <title>{t('footer.privacy')} — Portfolio</title>

      <SectionHeading title={privacy.title} />

      <div className="prose max-w-none whitespace-pre-line text-text-secondary">
        {privacy.content}
      </div>
    </>
  );
}
