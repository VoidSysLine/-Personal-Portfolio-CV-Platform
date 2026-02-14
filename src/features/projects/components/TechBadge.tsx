import type { ReactNode } from 'react';
import { Badge } from '@/components/ui/Badge';

interface TechBadgeProps {
  name: string;
}

export function TechBadge({ name }: TechBadgeProps): ReactNode {
  return <Badge variant="accent">{name}</Badge>;
}
