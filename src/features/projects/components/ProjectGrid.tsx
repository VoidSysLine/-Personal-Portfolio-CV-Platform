import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ProjectCard } from './ProjectCard';
import type { ProjectEntry } from '@/types/project';

interface ProjectGridProps {
  projects: readonly ProjectEntry[];
}

export function ProjectGrid({ projects }: ProjectGridProps): ReactNode {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </div>
  );
}
