import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';
import { FaviconImage } from '@/components/common/FaviconImage';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { formatPeriod } from '@/lib/dateUtils';
import type { DateRange } from '@/types/common';

interface TimelineEntryProps {
  readonly title: string;
  readonly organization: string;
  readonly organizationUrl: string;
  readonly location: string;
  readonly period: DateRange;
  readonly description: readonly string[];
  readonly tags: readonly string[];
  readonly index: number;
}

export function TimelineEntry({
  title,
  organization,
  organizationUrl,
  location,
  period,
  description,
  tags,
  index,
}: TimelineEntryProps): ReactNode {
  const { locale, t } = useI18n();
  const isEven = index % 2 === 0;

  return (
    <div className="relative flex items-start">
      {/* Dot */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        className="absolute left-4 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-accent md:left-1/2"
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`ml-10 w-full md:ml-0 md:w-[calc(50%-2rem)] ${isEven ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}
      >
        <Card>
          <div className="flex items-start gap-3">
            <FaviconImage url={organizationUrl} alt={organization} size={28} />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-text-primary">
                {title}
              </h3>
              <p className="font-medium text-accent">
                {organization}
              </p>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-text-muted">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {formatPeriod(period.start, period.end, locale, t('common.present'))}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={14} />
              {location}
            </span>
          </div>

          <ul className="mt-4 space-y-1.5">
            {description.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-text-secondary"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>

          {tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {tags.map(tag => (
                <Badge key={tag} variant="accent">{tag}</Badge>
              ))}
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
