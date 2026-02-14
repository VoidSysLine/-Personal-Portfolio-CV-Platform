import type { ReactNode } from 'react';
import { Github, FileText } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';
import { Card } from '@/components/ui/Card';
import { TechBadge } from './TechBadge';
import type { ProjectEntry } from '@/types/project';

interface ProjectCardProps {
  project: ProjectEntry;
}

export function ProjectCard({ project }: ProjectCardProps): ReactNode {
  const { locale, t } = useI18n();

  return (
    <Card hover>
      {project.thumbnail && (
        <div className="mb-4 -mx-6 -mt-6 h-48 overflow-hidden rounded-t-xl bg-bg-tertiary">
          <img
            src={project.thumbnail}
            alt={project.title[locale]}
            className="h-full w-full object-cover"
            loading="lazy"
            onError={e => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      )}

      <div className="flex items-start justify-between gap-2">
        <h3 className="text-lg font-semibold text-text-primary">
          {project.title[locale]}
        </h3>
        <span className="shrink-0 rounded-full bg-bg-tertiary px-2 py-0.5 text-xs text-text-muted">
          {project.date}
        </span>
      </div>

      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
        {project.shortDescription[locale]}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tags.map(tag => (
          <TechBadge key={tag} name={tag} />
        ))}
      </div>

      <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-text-primary"
            aria-label="GitHub Repository"
          >
            <Github size={16} />
            GitHub
          </a>
        )}
        {!project.githubUrl && (
          <span className="flex items-center gap-1.5 text-sm text-text-muted opacity-40">
            <Github size={16} />
            GitHub
          </span>
        )}
        {project.documentationPdf && (
          <a
            href={project.documentationPdf}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-accent transition-colors hover:text-accent-hover"
          >
            <FileText size={16} />
            {t('common.viewPdf')}
          </a>
        )}
      </div>
    </Card>
  );
}
