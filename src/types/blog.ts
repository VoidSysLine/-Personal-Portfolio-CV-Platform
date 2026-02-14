import type { Localized } from './common';

export interface BlogEntry {
  readonly id: string;
  readonly title: Localized<string>;
  readonly date: string;
  readonly teaser: Localized<string>;
  readonly tags: readonly string[];
  readonly markdownFile: Localized<string>;
  readonly featured: boolean;
}
