import type { Localized, DateRange } from './common';

export interface EducationEntry {
  readonly id: string;
  readonly institution: Localized<string>;
  readonly degree: Localized<string>;
  readonly period: DateRange;
  readonly institutionUrl: string;
  readonly description: Localized<string>;
  readonly grade?: string;
}
