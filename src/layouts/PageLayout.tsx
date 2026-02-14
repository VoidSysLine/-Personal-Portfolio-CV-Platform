import type { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

export function PageLayout({ children, className = '' }: PageLayoutProps): ReactNode {
  return (
    <div className={`mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
