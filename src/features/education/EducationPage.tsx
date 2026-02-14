import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Calendar, GraduationCap } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';
import { getEducationEntries } from '@/lib/dataLoader';
import { formatPeriod } from '@/lib/dateUtils';
import { SectionHeading } from '@/components/common/SectionHeading';
import { FaviconImage } from '@/components/common/FaviconImage';
import { Card } from '@/components/ui/Card';

export default function EducationPage(): ReactNode {
  const { locale, t } = useI18n();
  const entries = getEducationEntries();

  return (
    <>
      <title>{t('nav.education')} — Portfolio</title>

      <SectionHeading title={t('nav.education')} />

      <div className="relative">
        <div
          className="absolute left-4 top-0 h-full w-0.5 md:left-8"
          style={{ backgroundColor: 'var(--color-border)' }}
        />

        <div className="space-y-8">
          {entries.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative ml-10 md:ml-16"
            >
              <div
                className="absolute -left-10 top-6 z-10 h-3 w-3 -translate-x-1/2 rounded-full md:-left-16"
                style={{ backgroundColor: 'var(--color-accent)' }}
              />

              <Card>
                <div className="flex items-start gap-3">
                  <FaviconImage
                    url={entry.institutionUrl}
                    alt={entry.institution[locale]}
                    size={28}
                    fallbackIcon={<GraduationCap size={28} style={{ color: 'var(--color-text-muted)' }} />}
                  />
                  <div className="flex-1">
                    <h3
                      className="text-lg font-semibold"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {entry.degree[locale]}
                    </h3>
                    <p
                      className="font-medium"
                      style={{ color: 'var(--color-accent)' }}
                    >
                      {entry.institution[locale]}
                    </p>
                  </div>
                  {entry.grade && (
                    <span
                      className="rounded-lg px-3 py-1 text-sm font-semibold"
                      style={{
                        backgroundColor: 'var(--color-accent-light)',
                        color: 'var(--color-accent)',
                      }}
                    >
                      {locale === 'de' ? 'Note' : 'Grade'}: {entry.grade}
                    </span>
                  )}
                </div>

                <div className="mt-3 flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  <Calendar size={14} />
                  {formatPeriod(entry.period.start, entry.period.end, locale, t('common.present'))}
                </div>

                <p
                  className="mt-4 text-sm leading-relaxed"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {entry.description[locale]}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
