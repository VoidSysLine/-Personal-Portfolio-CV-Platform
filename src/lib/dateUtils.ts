import type { Locale } from '@/types/common';

export function formatPeriod(
  start: string,
  end: string | null,
  locale: Locale,
  presentLabel: string = locale === 'de' ? 'Heute' : 'Present'
): string {
  const startFormatted = formatMonthYear(start, locale);
  const endFormatted = end ? formatMonthYear(end, locale) : presentLabel;
  return `${startFormatted} – ${endFormatted}`;
}

export function formatMonthYear(dateStr: string, locale: Locale): string {
  const [year, month] = dateStr.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString(locale === 'de' ? 'de-DE' : 'en-US', {
    month: 'short',
    year: 'numeric',
  });
}

export function formatDate(dateStr: string, locale: Locale): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale === 'de' ? 'de-DE' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function calculateYearsOfExperience(careerEntries: ReadonlyArray<{ period: { start: string } }>): number {
  if (careerEntries.length === 0) return 0;
  const earliestStart = careerEntries.reduce((min, entry) => {
    return entry.period.start < min ? entry.period.start : min;
  }, careerEntries[0].period.start);
  const [year, month] = earliestStart.split('-').map(Number);
  const startDate = new Date(year, month - 1);
  const now = new Date();
  const years = (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  return Math.floor(years);
}

export function calculateReadingTime(text: string, wordsPerMinute: number = 200): number {
  const wordCount = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}
