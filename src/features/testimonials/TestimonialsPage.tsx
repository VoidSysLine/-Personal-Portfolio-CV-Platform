import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';
import { getTestimonialEntries } from '@/lib/dataLoader';
import { SectionHeading } from '@/components/common/SectionHeading';
import { FaviconImage } from '@/components/common/FaviconImage';
import { Card } from '@/components/ui/Card';

export default function TestimonialsPage(): ReactNode {
  const { locale, t } = useI18n();
  const testimonials = getTestimonialEntries();

  return (
    <>
      <title>{t('nav.testimonials')} — Portfolio</title>

      <SectionHeading title={t('nav.testimonials')} />

      <div className="grid gap-6 md:grid-cols-2">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full">
              <Quote
                size={32}
                className="mb-4 opacity-20"
                style={{ color: 'var(--color-accent)' }}
              />
              <blockquote
                className="text-lg italic leading-relaxed"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                &ldquo;{testimonial.quote[locale]}&rdquo;
              </blockquote>
              <div
                className="mt-6 flex items-center gap-3 border-t pt-4"
                style={{ borderColor: 'var(--color-border)' }}
              >
                {testimonial.companyUrl && (
                  <FaviconImage
                    url={testimonial.companyUrl}
                    alt={testimonial.company}
                    size={24}
                  />
                )}
                <div>
                  <p
                    className="font-semibold"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {testimonial.name}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    {testimonial.position[locale]} — {testimonial.company}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </>
  );
}
