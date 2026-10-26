import BookACallButton from '../../components/booking/BookACallButton';
import {createTranslation} from '../i18n/server';

const actionClass =
  'inline-flex items-center gap-1.5 rounded-md border border-line px-3 py-1.5 font-mono text-xs lowercase transition-colors hover:border-accent hover:text-accent';

export default async function ResumeContact() {
  const {t} = await createTranslation('resume');

  return (
    <section
      aria-labelledby="resume-contact"
      className="mt-16 rounded-xl border border-line bg-panel p-6 print:hidden"
    >
      <h2
        id="resume-contact"
        className="m-0 text-left text-xl font-semibold tracking-tight"
      >
        {t('ctaTitle')}
      </h2>
      <p className="m-0 mt-2 text-ink-muted">{t('ctaSubtitle')}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <a
          href="mailto:carloginocatapang@gmail.com"
          className="rounded-md bg-accent px-3 py-1.5 font-mono text-xs text-accent-ink lowercase"
        >
          {t('emailMe')}
        </a>
        <BookACallButton
          label={t('bookACall')}
          title={t('bookACallTitle')}
          closeLabel={t('closeDialog')}
          className={actionClass}
        />
      </div>
    </section>
  );
}
