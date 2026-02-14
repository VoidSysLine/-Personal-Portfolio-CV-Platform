import type { Localized, DateRange } from './common';

export interface CareerEntry {
  readonly id: string;
  readonly company: Localized<string>;
  readonly role: Localized<string>;
  readonly location: Localized<string>;
  readonly period: DateRange;
  readonly companyUrl: string;
  readonly description: Localized<readonly string[]>;
  readonly tags: readonly string[];
}
