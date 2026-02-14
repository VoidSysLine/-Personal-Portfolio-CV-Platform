import { useMemo, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';
import { getBlogEntries } from '@/lib/dataLoader';
import { formatDate } from '@/lib/dateUtils';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/cn';

export default function BlogPage(): ReactNode {
  const { locale, t } = useI18n();
  const entries = getBlogEntries();
  const [activeTag, setActiveTag] = useState<string>('all');

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    entries.forEach(e => e.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }, [entries]);

  const filtered = useMemo(() => {
    if (activeTag === 'all') return entries;
    return entries.filter(e => e.tags.includes(activeTag));
  }, [entries, activeTag]);

  return (
    <>
      <title>{t('nav.blog')} — Portfolio</title>

      <SectionHeading title={t('nav.blog')} />

      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTag('all')}
          className={cn(
            'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
            activeTag === 'all' ? 'bg-accent text-white' : 'bg-bg-tertiary text-text-secondary'
          )}
        >
          {t('common.filterAll')}
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={cn(
              'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
              activeTag === tag ? 'bg-accent text-white' : 'bg-bg-tertiary text-text-secondary'
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="space-y-6">
          {filtered.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link to={`/blog/${entry.id}`}>
                <Card hover>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-text-primary">
                        {entry.title[locale]}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                        {entry.teaser[locale]}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-text-muted">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {formatDate(entry.date, locale)}
                        </span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {entry.tags.map(tag => (
                          <Badge key={tag} variant="accent">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                    {entry.featured && (
                      <Badge variant="accent" className="shrink-0">
                        Featured
                      </Badge>
                    )}
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center py-12 text-text-muted">
          {t('common.noResults')}
        </p>
      )}
    </>
  );
}
