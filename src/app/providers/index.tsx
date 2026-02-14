import type { ReactNode } from 'react';
import { ThemeProvider } from './ThemeProvider';
import { I18nProvider } from './I18nProvider';
import { HelmetProvider } from 'react-helmet-async';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps): ReactNode {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <I18nProvider>
          {children}
        </I18nProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}
