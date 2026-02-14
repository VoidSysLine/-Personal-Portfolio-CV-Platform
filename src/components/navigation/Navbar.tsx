import { useState, useEffect, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';
import { NavLink } from './NavLink';
import { MobileMenu } from './MobileMenu';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitch } from './LanguageSwitch';
import { cn } from '@/lib/cn';

export function Navbar(): ReactNode {
  const { t } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { to: '/', label: t('nav.profile') },
    { to: '/career', label: t('nav.career') },
    { to: '/education', label: t('nav.education') },
    { to: '/projects', label: t('nav.projects') },
    { to: '/certificates', label: t('nav.certificates') },
    { to: '/blog', label: t('nav.blog') },
    { to: '/testimonials', label: t('nav.testimonials') },
    { to: '/contact', label: t('nav.contact') },
  ];

  return (
    <header
      className={cn(
        'no-print sticky top-0 z-50 transition-all duration-300',
        isScrolled
          ? 'shadow-md backdrop-blur-md'
          : ''
      )}
      style={{
        backgroundColor: isScrolled
          ? 'color-mix(in srgb, var(--color-bg-primary) 85%, transparent)'
          : 'var(--color-bg-primary)',
        borderBottom: isScrolled ? '1px solid var(--color-border)' : 'none',
      }}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8" aria-label="Main navigation">
        <Link
          to="/"
          className="text-lg font-bold tracking-tight transition-colors hover:opacity-80"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Portfolio
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map(item => (
            <NavLink key={item.to} to={item.to}>
              {item.label}
            </NavLink>
          ))}
          <div className="ml-4 flex items-center gap-2">
            <LanguageSwitch />
            <ThemeToggle />
          </div>
        </div>

        <button
          className="rounded-lg p-2 transition-colors md:hidden"
          style={{ color: 'var(--color-text-primary)' }}
          onClick={() => setIsMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </nav>

      <MobileMenu
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        navItems={navItems}
      />
    </header>
  );
}
