import { useEffect, useState, type ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useI18n } from '@/hooks/useI18n';
import { cn } from '@/lib/cn';
import type { StatItem } from '@/types/common';

interface StatsBannerProps {
  stats: readonly StatItem[];
  className?: string;
}

function CountUpNumber({ value, suffix }: { value: number; suffix?: string }): ReactNode {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 1500;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(eased * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
}

export function StatsBanner({ stats, className }: StatsBannerProps): ReactNode {
  const { locale } = useI18n();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        'grid grid-cols-2 gap-6 rounded-2xl border border-border bg-card-bg p-8 shadow-[0_4px_6px_var(--color-card-shadow)] lg:grid-cols-4',
        className
      )}
    >
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-3xl font-bold text-accent sm:text-4xl">
            <CountUpNumber value={stat.value} suffix={stat.suffix} />
          </div>
          <div className="mt-1 text-sm font-medium text-text-secondary">
            {stat.label[locale]}
          </div>
        </div>
      ))}
    </motion.div>
  );
}
