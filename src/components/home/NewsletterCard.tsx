'use client';
import {useTranslation} from '@/app/i18n/client';
import SubscribeForm from '@/components/SubscribeForm';
import BookACallButton from '@/components/booking/BookACallButton';
import SectionLabel from '@/components/SectionLabel';

/** Newsletter sign-up and the contact options, merged into one sidebar card. */
export default function NewsletterCard() {
  const {t} = useTranslation('home');
  const {t: tNewsletter} = useTranslation('newsletter');
  const {t: tCommon} = useTranslation('common');

  return (
    <section
      id="subscribe"
      aria-labelledby="newsletter"
      className="rounded-xl border border-line bg-panel p-5"
    >
      <SectionLabel id="newsletter">{tNewsletter('form.button')}</SectionLabel>
      <p className="m-0 text-sm">{t('newsletter.short')}</p>
      <SubscribeForm className="mt-3" />
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
