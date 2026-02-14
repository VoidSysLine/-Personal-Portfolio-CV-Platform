import type { CareerEntry } from '@/types/career';
import type { EducationEntry } from '@/types/education';
import type { ProjectEntry } from '@/types/project';
import type { CertificateEntry } from '@/types/certificate';
import type { BlogEntry } from '@/types/blog';
import type { TestimonialEntry } from '@/types/testimonial';
import type { I18nTranslations } from '@/types/i18n';

import careerData from '@/data/career.json';
import educationData from '@/data/education.json';
import projectsData from '@/data/projects.json';
import certificatesData from '@/data/certificates.json';
import blogData from '@/data/blog.json';
import testimonialsData from '@/data/testimonials.json';
import profileData from '@/data/profile.json';
import legalData from '@/data/legal.json';
import deTranslations from '@/data/i18n/de.json';
import enTranslations from '@/data/i18n/en.json';

import type { Locale } from '@/types/common';

export function getCareerEntries(): readonly CareerEntry[] {
  return careerData as unknown as CareerEntry[];
}

export function getEducationEntries(): readonly EducationEntry[] {
  return educationData as unknown as EducationEntry[];
}

export function getProjectEntries(): readonly ProjectEntry[] {
  return projectsData as unknown as ProjectEntry[];
}

export function getCertificateEntries(): readonly CertificateEntry[] {
  return certificatesData as unknown as CertificateEntry[];
}

export function getBlogEntries(): readonly BlogEntry[] {
  return blogData as unknown as BlogEntry[];
}

export function getTestimonialEntries(): readonly TestimonialEntry[] {
  return testimonialsData as unknown as TestimonialEntry[];
}

export function getProfile() {
  return profileData;
}

export function getLegal() {
  return legalData;
}

export function getTranslations(locale: Locale): I18nTranslations {
  return (locale === 'de' ? deTranslations : enTranslations) as unknown as I18nTranslations;
}

export async function loadBlogMarkdown(locale: Locale, filename: string): Promise<string> {
  const response = await fetch(`/src/data/blog/${locale}/${filename}`);
  if (!response.ok) {
    throw new Error(`Failed to load blog post: ${filename}`);
  }
  return response.text();
}
