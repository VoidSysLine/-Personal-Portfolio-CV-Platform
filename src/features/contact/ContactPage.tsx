import type { ReactNode } from 'react';
import { Mail, MapPin, Github, Linkedin } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';
import { getProfile } from '@/lib/dataLoader';
import { SectionHeading } from '@/components/common/SectionHeading';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { Card } from '@/components/ui/Card';
import { ContactForm } from './components/ContactForm';

export default function ContactPage(): ReactNode {
  const { locale, t } = useI18n();
  const profile = getProfile();

  return (
    <>
      <title>{t('nav.contact')} — Portfolio</title>

      <SectionHeading title={t('nav.contact')} />

      <div className="grid gap-8 lg:grid-cols-5">
        <AnimatedSection className="lg:col-span-3">
          <Card>
            <ContactForm />
          </Card>
        </AnimatedSection>

        <AnimatedSection delay={0.2} className="lg:col-span-2">
          <Card className="h-full">
            <h3
              className="mb-6 text-lg font-semibold"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {locale === 'de' ? 'Kontaktinformationen' : 'Contact Information'}
            </h3>

            <div className="space-y-4">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 text-sm transition-colors"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <Mail size={18} style={{ color: 'var(--color-accent)' }} />
                {profile.email}
              </a>

              <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                <MapPin size={18} style={{ color: 'var(--color-accent)' }} />
                {profile.location[locale]}
              </div>

              {profile.social.github && (
                <a
                  href={profile.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm transition-colors"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  <Github size={18} style={{ color: 'var(--color-accent)' }} />
                  GitHub
                </a>
              )}

              {profile.social.linkedin && (
                <a
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm transition-colors"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  <Linkedin size={18} style={{ color: 'var(--color-accent)' }} />
                  LinkedIn
                </a>
              )}
            </div>
          </Card>
        </AnimatedSection>
      </div>
    </>
  );
}
