import type { ReactNode } from 'react';
import { useI18n } from '@/hooks/useI18n';

export function LanguageSwitch(): ReactNode {
  const { locale, setLocale } = useI18n();

  return (
    <button
      onClick={() => setLocale(locale === 'de' ? 'en' : 'de')}
      className="rounded-lg px-3 py-2 text-sm font-medium transition-colors"
      style={{
        color: 'var(--color-text-secondary)',
        backgroundColor: 'transparent',
        border: '1px solid var(--color-border)',
      }}
      onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--color-bg-tertiary)')}
      onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
      aria-label={locale === 'de' ? 'Switch to English' : 'Auf Deutsch wechseln'}
    >
      {locale === 'de' ? 'EN' : 'DE'}
    </button>
  );
}
