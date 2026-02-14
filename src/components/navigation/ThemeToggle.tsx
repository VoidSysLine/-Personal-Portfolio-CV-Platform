import type { ReactNode } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

export function ThemeToggle(): ReactNode {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="rounded-lg p-2 transition-colors"
      style={{
        color: 'var(--color-text-secondary)',
        backgroundColor: 'transparent',
      }}
      onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--color-bg-tertiary)')}
      onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}
