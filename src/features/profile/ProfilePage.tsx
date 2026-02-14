import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Download, Mail, Printer, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useI18n } from '@/hooks/useI18n';
import { getProfile, getCareerEntries, getProjectEntries, getCertificateEntries } from '@/lib/dataLoader';
import { calculateYearsOfExperience } from '@/lib/dateUtils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { HeroBackground } from '@/components/common/HeroBackground';
import { StatsBanner } from '@/components/common/StatsBanner';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { SectionHeading } from '@/components/common/SectionHeading';
import type { StatItem } from '@/types/common';

function usePortfolioStats(): readonly StatItem[] {
  const career = getCareerEntries();
  const projects = getProjectEntries();
  const certificates = getCertificateEntries();

  const allTags = new Set<string>();
  career.forEach(entry => entry.tags.forEach(tag => allTags.add(tag)));
  projects.forEach(entry => entry.tags.forEach(tag => allTags.add(tag)));

  return [
    { value: calculateYearsOfExperience(career), label: { de: 'Jahre Erfahrung', en: 'Years Experience' }, suffix: '+' },
    { value: projects.length, label: { de: 'Projekte', en: 'Projects' } },
    { value: certificates.length, label: { de: 'Zertifikate', en: 'Certificates' } },
    { value: allTags.size, label: { de: 'Technologien', en: 'Technologies' }, suffix: '+' },
  ];
}

export default function ProfilePage(): ReactNode {
  const { locale, t } = useI18n();
  const profile = getProfile();
  const stats = usePortfolioStats();

  return (
    <>
      <title>{profile.name} — {profile.title[locale]}</title>
      <meta name="description" content={profile.bio[locale]} />

      {/* Hero Section */}
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden">
        <HeroBackground variant="dotGrid" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 flex justify-center">
              <div
                className="h-32 w-32 overflow-hidden rounded-full ring-4 sm:h-40 sm:w-40"
                style={{
                  backgroundColor: 'var(--color-bg-tertiary)',
                  boxShadow: '0 0 0 4px var(--color-accent)',
                }}
              >
                <img
                  src={profile.profileImage}
                  alt={profile.name}
                  className="h-full w-full object-cover"
                  onError={e => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            </div>

            <h1
              className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {profile.name}
            </h1>

            <p
              className="mt-3 text-xl sm:text-2xl"
              style={{ color: 'var(--color-accent)' }}
            >
              {profile.title[locale]}
            </p>

            <p
              className="mx-auto mt-4 max-w-2xl text-lg"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {profile.tagline[locale]}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={profile.cvPdf} download>
                <Button size="lg">
                  <Download size={18} />
                  {t('common.download')} CV
                </Button>
              </a>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  <Mail size={18} />
                  {t('nav.contact')}
                </Button>
              </Link>
              <Link to="/print">
                <Button variant="ghost" size="lg">
                  <Printer size={18} />
                  {locale === 'de' ? 'Druckansicht' : 'Print View'}
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-16"
          >
            <ChevronDown
              size={28}
              className="mx-auto animate-bounce"
              style={{ color: 'var(--color-text-muted)' }}
            />
          </motion.div>
        </div>
      </section>

      {/* Stats Banner */}
      <div className="mx-auto max-w-4xl px-4 -mt-8 relative z-20">
        <StatsBanner stats={stats} />
      </div>

      {/* Bio Section */}
      <section className="mx-auto max-w-4xl px-4 py-20">
        <AnimatedSection>
          <SectionHeading title={locale === 'de' ? 'Über mich' : 'About Me'} />
          <p
            className="text-lg leading-relaxed"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {profile.bio[locale]}
          </p>
        </AnimatedSection>
      </section>

      {/* Skills Section */}
      <section
        className="py-20"
        style={{ backgroundColor: 'var(--color-bg-secondary)' }}
      >
        <div className="mx-auto max-w-4xl px-4">
          <AnimatedSection>
            <SectionHeading title={locale === 'de' ? 'Kompetenzen' : 'Skills'} />
          </AnimatedSection>

          <div className="grid gap-8 sm:grid-cols-2">
            {profile.skills.map((group, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div
                  className="rounded-xl border p-6"
                  style={{
                    backgroundColor: 'var(--color-card-bg)',
                    borderColor: 'var(--color-border)',
                  }}
                >
                  <h3
                    className="mb-4 text-lg font-semibold"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {group.category[locale]}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map(skill => (
                      <Badge key={skill} variant="accent">{skill}</Badge>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Interests Section */}
      <section className="mx-auto max-w-4xl px-4 py-20">
        <AnimatedSection>
          <SectionHeading title={locale === 'de' ? 'Interessen' : 'Interests'} />
          <div className="flex flex-wrap gap-3">
            {profile.interests[locale].map(interest => (
              <Badge key={interest} variant="outline" className="text-sm px-4 py-2">
                {interest}
              </Badge>
            ))}
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
