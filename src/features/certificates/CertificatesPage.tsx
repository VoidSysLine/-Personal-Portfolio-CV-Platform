import { useState, useMemo, type ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useI18n } from '@/hooks/useI18n';
import { getCertificateEntries } from '@/lib/dataLoader';
import { SectionHeading } from '@/components/common/SectionHeading';
import { CertificateCard } from './components/CertificateCard';
import type { CertificateCategory } from '@/types/certificate';

const categories: { key: CertificateCategory | 'all'; label: { de: string; en: string } }[] = [
  { key: 'all', label: { de: 'Alle', en: 'All' } },
  { key: 'professional', label: { de: 'Berufszeugnisse', en: 'Professional' } },
  { key: 'academic', label: { de: 'Akademisch', en: 'Academic' } },
  { key: 'training', label: { de: 'Fortbildungen', en: 'Training' } },
  { key: 'certification', label: { de: 'Zertifikate', en: 'Certifications' } },
];

export default function CertificatesPage(): ReactNode {
  const { locale, t } = useI18n();
  const certificates = getCertificateEntries();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return certificates;
    return certificates.filter(c => c.category === activeCategory);
  }, [certificates, activeCategory]);

  return (
    <>
      <Helmet>
        <title>{t('nav.certificates')} — Portfolio</title>
      </Helmet>

      <SectionHeading title={t('nav.certificates')} />

      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className="rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
            style={{
              backgroundColor: activeCategory === cat.key ? 'var(--color-accent)' : 'var(--color-bg-tertiary)',
              color: activeCategory === cat.key ? 'white' : 'var(--color-text-secondary)',
            }}
          >
            {cat.label[locale]}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2">
          {filtered.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <CertificateCard certificate={cert} />
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center py-12" style={{ color: 'var(--color-text-muted)' }}>
          {t('common.noResults')}
        </p>
      )}
    </>
  );
}
