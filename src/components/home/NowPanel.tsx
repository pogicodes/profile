import {createTranslation} from '@/app/i18n/server';
import {BlurringImage} from '@/components/BlurringImage';
import NextLink from '@/components/basic/NextLink';
import type {IBlogMetadata} from '@/models/mdxFiles';
import type {BlurImageType} from '@/utils/image-blur.utils';
import Eyes from './Eyes';
import SectionLabel from './SectionLabel';
import {sideProjects} from './side-projects';

type Props = Pick<BlurImageType, 'img' | 'svg'> & {latestBlog?: IBlogMetadata};

const termClass = 'font-mono text-sm text-ink-muted';
const valueClass = 'm-0 text-sm';

export default async function NowPanel({img, svg, latestBlog}: Props) {
  const {t} = await createTranslation('home');
  const {t: tResume} = await createTranslation('resume');

  return (
    <aside className="flex flex-col justify-between gap-6 rounded-xl border border-line bg-panel p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative size-16 shrink-0 overflow-hidden rounded-full ring-2 ring-line">
            <BlurringImage
              img={img}
              svg={svg}
              alt="Carlo Gino Catapang"
              width={128}
              height={128}
            />
          </div>
          <SectionLabel as="p" className="mb-0">
            {t('now.label')}
          </SectionLabel>
        </div>
        <Eyes size={44} />
      </div>

      <dl className="m-0 grid grid-cols-[88px_1fr] gap-x-3 gap-y-3">
        <dt className={termClass}>{t('now.role')}</dt>
        <dd className={valueClass}>
          {tResume('jobTitle')} {tResume('at')}{' '}
          <a
            href="https://www.tre.se"
            target="_blank"
            rel="noreferrer"
            className="text-sm underline underline-offset-4"
          >
            Tre
          </a>
        </dd>
        <dt className={termClass}>{t('now.based')}</dt>
        <dd className={valueClass}>Stockholm, Sweden</dd>
        {latestBlog ? (
          <>
            <dt className={termClass}>{t('now.writing')}</dt>
            <dd className={valueClass}>
              <NextLink
                href={`/blog/${latestBlog.slug}`}
                className="text-sm underline underline-offset-4"
              >
                {latestBlog.title}
              </NextLink>
            </dd>
          </>
        ) : null}
        <dt className={termClass}>{t('now.building')}</dt>
        <dd className={valueClass}>
          {sideProjects.map(project => project.name).join(', ')}
        </dd>
      </dl>

      <div className="flex flex-wrap gap-3">
        <NextLink
          href="/blog"
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-ink"
        >
          {t('now.readBlog')}
        </NextLink>
        <NextLink
          href="/resume"
          className="rounded-md border border-line bg-canvas px-4 py-2 text-sm font-medium"
        >
          {t('now.resume')}
        </NextLink>
      </div>
    </aside>
  );
}
