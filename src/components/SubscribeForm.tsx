'use client';
import clsx from 'clsx';
import {useRouter} from 'next/navigation';
import type {SubmitEvent} from 'react';
import {useId, useState} from 'react';
import {useTranslation} from '../app/i18n/client';
import {addSubscriberAction} from './subscribe.action';

const inputClass =
  'w-full min-w-0 rounded-md border border-line bg-canvas px-3 py-2 text-sm outline-none focus:border-accent';

/** Newsletter sign-up fields. `inline` puts them on one row from `sm` up. */
export default function SubscribeForm({
  layout = 'stacked',
  className,
}: {
  layout?: 'stacked' | 'inline';
  className?: string;
}) {
  const {t} = useTranslation('newsletter');
  const router = useRouter();
  const id = useId();
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
    <form onSubmit={handleSubmit} className={className}>
      <div
        className={clsx(
          'flex flex-col gap-2',
          layout === 'inline' && 'sm:flex-row',
        )}
      >
        <label className="sr-only" htmlFor={`${id}-first-name`}>
          {t('form.firstName')}
        </label>
        <input
          id={`${id}-first-name`}
          name="firstName"
          required
          // `given-name` is a valid token; the rule's list is incomplete.
          // oxlint-disable-next-line jsx-a11y/autocomplete-valid
          autoComplete="given-name"
          placeholder={t('form.firstName')}
          className={inputClass}
        />
        <label className="sr-only" htmlFor={`${id}-email`}>
          {t('form.email')}
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className={inputClass}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="shrink-0 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-ink disabled:opacity-60"
        >
          {t('form.button')}
        </button>
      </div>
      {error ? (
        <p
          role="alert"
          className="m-0 mt-2 text-sm text-red-600 dark:text-red-400"
        >
          {error}
        </p>
      ) : null}
    </form>
  );
}
