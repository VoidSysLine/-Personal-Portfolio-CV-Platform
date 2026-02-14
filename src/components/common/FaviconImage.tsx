import { useState, type ReactNode } from 'react';
import { Building2 } from 'lucide-react';
import { getFaviconUrl } from '@/lib/faviconService';
import { cn } from '@/lib/cn';

interface FaviconImageProps {
  url: string;
  alt: string;
  size?: number;
  className?: string;
  fallbackIcon?: ReactNode;
}

export function FaviconImage({
  url,
  alt,
  size = 24,
  className,
  fallbackIcon,
}: FaviconImageProps): ReactNode {
  const [hasError, setHasError] = useState(false);
  const faviconUrl = getFaviconUrl(url);

  if (hasError || !faviconUrl) {
    return (
      <span className={cn('inline-flex items-center justify-center rounded', className)}>
        {fallbackIcon || <Building2 size={size} className="text-text-muted" />}
      </span>
    );
  }

  return (
    <img
      src={faviconUrl}
      alt={alt}
      width={size}
      height={size}
      className={cn('inline-block rounded', className)}
      onError={() => setHasError(true)}
      loading="lazy"
    />
  );
}
