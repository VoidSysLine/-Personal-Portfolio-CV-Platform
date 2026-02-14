import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { NavLink } from './NavLink';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitch } from './LanguageSwitch';

interface NavItem {
  to: string;
  label: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: readonly NavItem[];
}

export function MobileMenu({ isOpen, onClose, navItems }: MobileMenuProps): ReactNode {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-50 h-full w-72 p-6 shadow-xl md:hidden"
            style={{ backgroundColor: 'var(--color-bg-primary)' }}
          >
            <div className="mb-8 flex items-center justify-between">
              <span className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>
                Menu
              </span>
              <button
                onClick={onClose}
                className="rounded-lg p-2 transition-colors"
                style={{ color: 'var(--color-text-secondary)' }}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {navItems.map(item => (
                <NavLink key={item.to} to={item.to} onClick={onClose} className="w-full text-base">
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="mt-8 flex items-center gap-3 border-t pt-6" style={{ borderColor: 'var(--color-border)' }}>
              <LanguageSwitch />
              <ThemeToggle />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
