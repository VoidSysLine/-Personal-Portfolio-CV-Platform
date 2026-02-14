import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';
import { getProfile } from '@/lib/dataLoader';

export function Footer(): ReactNode {
  const { t } = useI18n();
  const profile = getProfile();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="no-print mt-auto border-t border-border bg-bg-secondary py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link
            to="/imprint"
            className="text-sm text-text-secondary transition-colors hover:underline"
          >
            {t('footer.imprint')}
          </Link>
          <Link
            to="/privacy"
            className="text-sm text-text-secondary transition-colors hover:underline"
          >
            {t('footer.privacy')}
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {profile.social.github && (
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 text-text-secondary transition-colors hover:text-text-primary"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
          )}
          {profile.social.linkedin && (
            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 text-text-secondary transition-colors hover:text-text-primary"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          )}
          <a
            href={`mailto:${profile.email}`}
            className="rounded-lg p-2 text-text-secondary transition-colors hover:text-text-primary"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>

        <p className="text-sm text-text-muted">
          {t('footer.copyright').replace('{year}', String(currentYear))}
        </p>
      </div>
    </footer>
  );
}
