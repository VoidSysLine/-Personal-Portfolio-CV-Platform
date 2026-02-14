import type { Localized } from './common';

export type PdfViewerMode = 'inline' | 'modal';

export interface ProjectEntry {
  readonly id: string;
  readonly title: Localized<string>;
  readonly shortDescription: Localized<string>;
  readonly fullDescription: Localized<string>;
  readonly thumbnail: string;
  readonly tags: readonly string[];
  readonly category: string;
  readonly githubUrl: string;
  readonly documentationPdf: string;
  readonly pdfViewerMode: PdfViewerMode;
  readonly date: string;
  readonly featured: boolean;
}
