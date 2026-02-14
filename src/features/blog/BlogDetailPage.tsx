import { useState, useEffect, type ReactNode } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { useI18n } from '@/hooks/useI18n';
import { getBlogEntries } from '@/lib/dataLoader';
import { formatDate, calculateReadingTime } from '@/lib/dateUtils';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';

export default function BlogDetailPage(): ReactNode {
  const { slug } = useParams<{ slug: string }>();
  const { locale, t } = useI18n();
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const entry = getBlogEntries().find(e => e.id === slug);

  useEffect(() => {
    if (!entry) return;

    const filename = entry.markdownFile[locale];
    setIsLoading(true);
    setError(null);

    fetch(`/src/data/blog/${locale}/${filename}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load');
        return res.text();
      })
      .then(text => {
        setContent(text);
        setIsLoading(false);
      })
      .catch(() => {
        setError(locale === 'de' ? 'Artikel konnte nicht geladen werden.' : 'Failed to load article.');
        setIsLoading(false);
      });
  }, [entry, locale]);

  if (!entry) {
    return (
      <div className="py-20 text-center">
        <p className="text-text-muted">
          {locale === 'de' ? 'Artikel nicht gefunden.' : 'Article not found.'}
        </p>
        <Link to="/blog" className="mt-4 inline-block">
          <Button variant="outline">{t('common.backToOverview')}</Button>
        </Link>
      </div>
    );
  }

  const readingTime = content ? calculateReadingTime(content) : 0;

  return (
    <>
      <title>{entry.title[locale]} — Blog</title>
      <meta name="description" content={entry.teaser[locale]} />

      <Link to="/blog" className="inline-flex items-center gap-1.5 mb-8 text-sm text-accent transition-colors hover:text-accent-hover">
        <ArrowLeft size={16} />
        {t('common.backToOverview')}
      </Link>

      <article className="mx-auto max-w-3xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary sm:text-4xl">
            {entry.title[locale]}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-text-muted">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {formatDate(entry.date, locale)}
            </span>
            {readingTime > 0 && (
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {readingTime} min {locale === 'de' ? 'Lesezeit' : 'read'}
              </span>
            )}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {entry.tags.map(tag => (
              <Badge key={tag} variant="accent">{tag}</Badge>
            ))}
          </div>
        </header>

        {isLoading && (
          <div className="space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        )}

        {error && (
          <p className="rounded-lg border border-error p-4 text-error">
            {error}
          </p>
        )}

        {!isLoading && !error && (
          <div className="prose prose-slate max-w-none text-text-secondary dark:prose-invert">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
              {content}
            </ReactMarkdown>
          </div>
        )}
      </article>
    </>
  );
}
