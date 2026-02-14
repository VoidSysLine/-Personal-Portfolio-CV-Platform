import type { ReactNode } from 'react';
import { useI18n } from '@/hooks/useI18n';
import { getCareerEntries } from '@/lib/dataLoader';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Timeline } from './components/Timeline';
import { TimelineEntry } from './components/TimelineEntry';

export default function CareerPage(): ReactNode {
  const { locale, t } = useI18n();
  const entries = getCareerEntries();

  return (
    <>
      <title>{t('nav.career')} — Portfolio</title>

      <SectionHeading title={t('nav.career')} />

      <Timeline>
        {entries.map((entry, index) => (
          <TimelineEntry
            key={entry.id}
            title={entry.role[locale]}
            organization={entry.company[locale]}
            organizationUrl={entry.companyUrl}
            location={entry.location[locale]}
            period={entry.period}
            description={[...entry.description[locale]]}
            tags={[...entry.tags]}
            index={index}
          />
        ))}
      </Timeline>
    </>
  );
}
