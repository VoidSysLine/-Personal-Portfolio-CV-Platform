import { useEffect, useCallback, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const sizeStyles = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-[95vw] max-h-[95vh]',
};

export function Modal({ isOpen, onClose, children, title, size = 'md' }: ModalProps): ReactNode {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscape]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className={`relative w-full overflow-hidden rounded-xl shadow-2xl ${sizeStyles[size]}`}
            style={{
              backgroundColor: 'var(--color-bg-primary)',
              border: '1px solid var(--color-border)',
            }}
          >
            {title && (
              <div
                className="flex items-center justify-between border-b px-6 py-4"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <h2 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  className="rounded-lg p-1.5 transition-colors hover:bg-[var(--color-bg-tertiary)]"
                  style={{ color: 'var(--color-text-secondary)' }}
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>
            )}
            {!title && (
              <button
                onClick={onClose}
                className="absolute right-4 top-4 z-10 rounded-lg p-1.5 transition-colors hover:bg-[var(--color-bg-tertiary)]"
                style={{ color: 'var(--color-text-secondary)' }}
                aria-label="Close"
              >
                <X size={20} />
              </button>
            )}
            <div className="overflow-y-auto" style={{ maxHeight: '85vh' }}>
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
