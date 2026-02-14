import { useState, useMemo, type ReactNode } from 'react';
import { useI18n } from '@/hooks/useI18n';
import { getProjectEntries } from '@/lib/dataLoader';
import { SectionHeading } from '@/components/common/SectionHeading';
import { ProjectGrid } from './components/ProjectGrid';
import { cn } from '@/lib/cn';

export default function ProjectsPage(): ReactNode {
  const { t } = useI18n();
  const projects = getProjectEntries();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach(p => p.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter(p => p.tags.includes(activeFilter));
  }, [projects, activeFilter]);

  return (
    <>
      <title>{t('nav.projects')} — Portfolio</title>

      <SectionHeading title={t('nav.projects')} />

      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveFilter('all')}
          className={cn(
            'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
            activeFilter === 'all' ? 'bg-accent text-white' : 'bg-bg-tertiary text-text-secondary'
          )}
        >
          {t('common.filterAll')}
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setActiveFilter(tag)}
            className={cn(
              'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
              activeFilter === tag ? 'bg-accent text-white' : 'bg-bg-tertiary text-text-secondary'
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      {filteredProjects.length > 0 ? (
        <ProjectGrid projects={filteredProjects} />
      ) : (
        <p className="text-center py-12 text-text-muted">
          {t('common.noResults')}
        </p>
      )}
    </>
  );
}
