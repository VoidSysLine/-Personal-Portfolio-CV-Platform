import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { ScrollToTop } from '@/components/common/ScrollToTop';

export function MainLayout(): ReactNode {
  return (
    <div className="flex min-h-screen flex-col" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
