import type { ReactNode } from 'react';
import { useI18n } from '@/hooks/useI18n';

export function LanguageSwitch(): ReactNode {
  const { locale, setLocale } = useI18n();

  return (
    <button
      onClick={() => setLocale(locale === 'de' ? 'en' : 'de')}
      className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-bg-tertiary"
      aria-label={locale === 'de' ? 'Switch to English' : 'Auf Deutsch wechseln'}
    >
      {locale === 'de' ? 'EN' : 'DE'}
    </button>
  );
}
