import type { Localized } from './common';

export interface TestimonialEntry {
  readonly id: string;
  readonly quote: Localized<string>;
  readonly name: string;
  readonly position: Localized<string>;
  readonly company: string;
  readonly companyUrl?: string;
}
