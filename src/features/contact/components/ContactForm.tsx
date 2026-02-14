import { useState, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { Send, CheckCircle } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';
import { Button } from '@/components/ui/Button';
import type { ContactFormData } from '../schemas/contactSchema';

export function ContactForm(): ReactNode {
  const { locale, t } = useI18n();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    const mailtoLink = `mailto:mail@example.com?subject=${encodeURIComponent(data.subject || '')}&body=${encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`)}`;
    window.location.href = mailtoLink;
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <CheckCircle size={48} style={{ color: 'var(--color-success)' }} />
        <p className="text-lg font-medium" style={{ color: 'var(--color-text-primary)' }}>
          {t('contact.successMessage')}
        </p>
        <Button variant="outline" onClick={() => setIsSubmitted(false)}>
          {locale === 'de' ? 'Neue Nachricht' : 'New Message'}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div>
        <input
          {...register('name', { required: t('contact.validation.nameRequired') })}
          placeholder={t('contact.namePlaceholder')}
          className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition-colors focus:ring-2"
          style={{
            backgroundColor: 'var(--color-bg-primary)',
            borderColor: errors.name ? 'var(--color-error)' : 'var(--color-border)',
            color: 'var(--color-text-primary)',
          }}
        />
        {errors.name && (
          <p className="mt-1 text-sm" style={{ color: 'var(--color-error)' }}>
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <input
          {...register('email', {
            required: t('contact.validation.emailInvalid'),
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: t('contact.validation.emailInvalid') },
          })}
          type="email"
          placeholder={t('contact.emailPlaceholder')}
          className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition-colors focus:ring-2"
          style={{
            backgroundColor: 'var(--color-bg-primary)',
            borderColor: errors.email ? 'var(--color-error)' : 'var(--color-border)',
            color: 'var(--color-text-primary)',
          }}
        />
        {errors.email && (
          <p className="mt-1 text-sm" style={{ color: 'var(--color-error)' }}>
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <input
          {...register('subject')}
          placeholder={t('contact.subjectPlaceholder')}
          className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition-colors focus:ring-2"
          style={{
            backgroundColor: 'var(--color-bg-primary)',
            borderColor: 'var(--color-border)',
            color: 'var(--color-text-primary)',
          }}
        />
      </div>

      <div>
        <textarea
          {...register('message', { required: t('contact.validation.messageRequired') })}
          rows={5}
          placeholder={t('contact.messagePlaceholder')}
          className="w-full resize-none rounded-lg border px-4 py-3 text-sm outline-none transition-colors focus:ring-2"
          style={{
            backgroundColor: 'var(--color-bg-primary)',
            borderColor: errors.message ? 'var(--color-error)' : 'var(--color-border)',
            color: 'var(--color-text-primary)',
          }}
        />
        {errors.message && (
          <p className="mt-1 text-sm" style={{ color: 'var(--color-error)' }}>
            {errors.message.message}
          </p>
        )}
      </div>

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        <Send size={16} />
        {t('contact.submit')}
      </Button>
    </form>
  );
}
