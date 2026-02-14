import { createContext, useState, useCallback, useEffect, useMemo, type ReactNode } from 'react';
import type { Locale } from '@/types/common';
import type { I18nTranslations } from '@/types/i18n';
import { getTranslations } from '@/lib/dataLoader';

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  translations: I18nTranslations;
}

export const I18nContext = createContext<I18nContextValue | null>(null);

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps): ReactNode {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const stored = localStorage.getItem('locale');
    if (stored === 'de' || stored === 'en') return stored;
    return navigator.language.startsWith('de') ? 'de' : 'en';
  });

  const translations = useMemo(() => getTranslations(locale), [locale]);

  useEffect(() => {
    document.documentElement.setAttribute('lang', locale);
    localStorage.setItem('locale', locale);
  }, [locale]);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
  }, []);

  const t = useCallback(
    (key: string): string => {
      const keys = key.split('.');
      let result: unknown = translations;
      for (const k of keys) {
        if (result && typeof result === 'object' && k in result) {
          result = (result as Record<string, unknown>)[k];
        } else {
          return key;
        }
      }
      return typeof result === 'string' ? result : key;
    },
    [translations]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, translations }}>
      {children}
    </I18nContext.Provider>
  );
}
