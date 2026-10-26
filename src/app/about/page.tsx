import type {Metadata, NextPage} from 'next';
import {BlurringImage} from '../../components/BlurringImage';
import NextLink from '../../components/basic/NextLink';
import CodingActivity from '../../components/home/CodingActivity';
import SectionLabel from '../../components/SectionLabel';
import {socialLinks} from '../../components/social/social-links';
import {newCommonMetaTags} from '../../frontend-utils/meta-tags';
import {getBlurringImage} from '../../utils/contentful.utils';
import {createTranslation} from '../i18n/server';
import {aboutMeData} from '@/models/static-content';

export async function generateMetadata(): Promise<Metadata> {
  return {
    ...newCommonMetaTags('About Page', '/about'),
    title: 'About Page | Code Gino | Carlo Gino Catapang',
  };
}

const AboutMePage: NextPage = async () => {
  const {t} = await createTranslation('home');
  const {t: tResume} = await createTranslation('resume');
  const {
    props: {paragraphs, img, svg},
  } = await getStaticProps();

  return (
    <main className="mx-auto max-w-6xl px-5">
      <div className="grid gap-12 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_280px]">
        <article aria-labelledby="about-title" className="max-w-[680px]">
          <SectionLabel as="p">{t('about.kicker')}</SectionLabel>
          <h1
            id="about-title"
            className="m-0 text-left text-3xl leading-tight font-semibold tracking-tight sm:text-4xl"
          >
            {t('about.title')}
          </h1>
          <p className="m-0 mt-4 text-lg text-balance text-ink-muted">
            {tResume('tagline')}
          </p>

          <div className="mt-8 flex flex-col gap-5 text-[1.0625rem] leading-[1.75]">
            {paragraphs.map(paragraph => (
              <p key={paragraph} className="m-0 text-[length:inherit]">
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        <aside className="space-y-10 lg:sticky lg:top-20 lg:self-start">
          <div className="relative aspect-square w-40 overflow-hidden rounded-xl ring-1 ring-line lg:w-full">
            <BlurringImage
              img={img}
              svg={svg}
              alt="Carlo Gino Catapang"
              title="Carlo Gino Catapang"
              fill
              sizes="(min-width: 1024px) 280px, 160px"
              priority
              className="object-cover"
            />
          </div>

          <section aria-labelledby="about-elsewhere">
            <SectionLabel id="about-elsewhere">
              {t('about.elsewhere')}
            </SectionLabel>
            <ul className="m-0 list-none space-y-1.5 p-0 font-mono text-sm">
              {socialLinks.map(link => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm lowercase hover:text-accent"
                  >
                    {link.label} ↗
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="mailto:carloginocatapang@gmail.com"
                  className="text-sm hover:text-accent"
                >
                  email
                </a>
              </li>
            </ul>
          </section>

          <section aria-labelledby="about-more">
            <SectionLabel id="about-more">{t('about.seeAlso')}</SectionLabel>
            <ul className="m-0 list-none space-y-1.5 p-0 font-mono text-sm">
              <li>
                <NextLink href="/resume" className="text-sm hover:text-accent">
                  ~/resume
                </NextLink>
              </li>
              <li>
                <NextLink href="/blog" className="text-sm hover:text-accent">
                  ~/blog
                </NextLink>
              </li>
              <li>
                <a
                  href="https://github.com/pogicodes/profile"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm lowercase hover:text-accent"
                >
                  {t('about.source')} ↗
                </a>
              </li>
            </ul>
          </section>
        </aside>
      </div>

      <CodingActivity />
    </main>
  );
};

const getStaticProps = async () => {
  // First-person bio; the third-person copy is kept in the data for reuse.
  const bio = aboutMeData.find(item => item.key === 'about_me_long_1st_pov');
  const paragraphs = (bio?.content ?? '')
    .split(/\n\s*\n/)
    .map(paragraph => paragraph.trim())
    .filter(Boolean);

  const {img, svg} = await getBlurringImage('profile_picture.jpg');

  return {
    props: {
      paragraphs,
      img,
      svg,
    },
  };
};

export default AboutMePage;
