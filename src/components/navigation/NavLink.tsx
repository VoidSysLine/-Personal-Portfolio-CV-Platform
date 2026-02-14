import type { ReactNode } from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { cn } from '@/lib/cn';

interface NavLinkProps {
  to: string;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function NavLink({ to, children, onClick, className }: NavLinkProps): ReactNode {
  return (
    <RouterNavLink
      to={to}
      end={to === '/'}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
          isActive
            ? 'text-[var(--color-accent)] bg-[var(--color-accent-light)]'
            : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]',
          className
        )
      }
    >
      {children}
    </RouterNavLink>
  );
}
