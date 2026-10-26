import {createTranslation} from '@/app/i18n/server';
import NextLink from '@/components/basic/NextLink';
import SectionLabel from './SectionLabel';

export default async function AboutBlurb() {
  const {t} = await createTranslation('home');
  const {t: tResume} = await createTranslation('resume');

  return (
    <section aria-labelledby="about-blurb">
      <SectionLabel id="about-blurb">{t('about.kicker')}</SectionLabel>
      <p className="m-0 text-sm leading-relaxed">{tResume('tagline')}</p>
      <NextLink href="/about" className="mt-2 inline-block text-sm text-accent">
        {t('about.more')} →
      </NextLink>
    </section>
  );
}
