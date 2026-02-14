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
            ? 'text-accent bg-accent-light'
            : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary',
          className
        )
      }
    >
      {children}
    </RouterNavLink>
  );
}
