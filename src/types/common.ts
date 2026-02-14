export type Locale = 'de' | 'en';
export type Localized<T> = Record<Locale, T>;
export type Theme = 'light' | 'dark';

export interface DateRange {
  readonly start: string;
  readonly end: string | null;
}

export type ProjectId = string & { readonly __brand: 'ProjectId' };
export type CertificateId = string & { readonly __brand: 'CertificateId' };

export type Document =
  | { type: 'certificate'; category: 'professional' | 'academic'; pdfPath: string }
  | { type: 'testimonial'; issuer: string; pdfPath: string }
  | { type: 'projectDoc'; projectId: string; pdfPath: string };

export interface StatItem {
  readonly value: number;
  readonly label: Localized<string>;
  readonly suffix?: string;
}
