'use client';
import {useRouter} from 'next/navigation';
import type {SubmitEvent} from 'react';
import {useState} from 'react';
import {useTranslation} from '@/app/i18n/client';
import BookACallButton from '@/components/booking/BookACallButton';
import {addSubscriberAction} from '@/components/subscribe.action';
import SectionLabel from './SectionLabel';

const inputClass =
  'w-full rounded-md border border-line bg-canvas px-3 py-2 text-sm outline-none focus:border-accent';

/** Newsletter sign-up and the contact options, merged into one sidebar card. */
export default function NewsletterCard() {
  const {t} = useTranslation('home');
  const {t: tNewsletter} = useTranslation('newsletter');
  const {t: tCommon} = useTranslation('common');
  const router = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setIsLoading(true);
    setError('');

    const result = await addSubscriberAction({
      email: String(form.get('email')),
      firstName: String(form.get('firstName')),
      lastName: '',
    });

    if (result.success) {
      router.push('/signup-success');
    } else {
      setError(result.message ?? '');
      setIsLoading(false);
    }
  };

  return (
    <section
      id="subscribe"
      aria-labelledby="newsletter"
      className="rounded-xl border border-line bg-panel p-5"
    >
      <SectionLabel id="newsletter">{tNewsletter('form.button')}</SectionLabel>
      <p className="m-0 text-sm">{t('newsletter.short')}</p>
      <form onSubmit={handleSubmit} className="mt-3 space-y-2">
        <label className="sr-only" htmlFor="newsletter-first-name">
          {tNewsletter('form.firstName')}
        </label>
        <input
          id="newsletter-first-name"
          name="firstName"
          required
          // `given-name` is a valid token; the rule's list is incomplete.
          // oxlint-disable-next-line jsx-a11y/autocomplete-valid
          autoComplete="given-name"
          placeholder={tNewsletter('form.firstName')}
          className={inputClass}
        />
        <label className="sr-only" htmlFor="newsletter-email">
          {tNewsletter('form.email')}
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className={inputClass}
        />
        {error ? (
          <p
            role="alert"
            className="m-0 text-sm text-red-600 dark:text-red-400"
          >
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-md bg-accent py-2 text-sm font-medium text-accent-ink disabled:opacity-60"
        >
          {tNewsletter('form.button')}
        </button>
      </form>
      <div
        id="contact"
        className="m-0 mt-4 border-t border-line pt-4 text-sm text-ink-muted"
      >
        {t('contact.ratherTalk')}{' '}
        <BookACallButton
          label={tCommon('bookACall')}
          title={tCommon('bookACallTitle')}
          closeLabel={tCommon('closeDialog')}
          className="inline-flex items-center gap-1.5 text-sm text-ink underline underline-offset-4 [&_svg]:hidden"
        />{' '}
        {t('contact.or')}{' '}
        <a
          href="mailto:carloginocatapang@gmail.com"
          className="text-sm text-ink underline underline-offset-4"
        >
          {t('contact.email')}
        </a>
        .
      </div>
    </section>
  );
}
