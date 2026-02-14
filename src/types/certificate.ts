import type { Localized } from './common';

export type CertificateCategory = 'professional' | 'academic' | 'training' | 'certification';

export interface CertificateEntry {
  readonly id: string;
  readonly title: Localized<string>;
  readonly issuer: Localized<string>;
  readonly issuerUrl: string;
  readonly date: string;
  readonly category: CertificateCategory;
  readonly pdfPath: string;
  readonly description: Localized<string>;
}
