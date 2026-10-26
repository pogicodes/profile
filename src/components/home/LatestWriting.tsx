import Image from 'next/image';
import {createTranslation} from '@/app/i18n/server';
import NextLink from '@/components/basic/NextLink';
import {getBlogBanner} from '@/data/blog-asset';
import type {IBlogMetadata} from '@/models/mdxFiles';
import SectionLabel from './SectionLabel';

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(new Date(date));

export default async function LatestWriting({blogs}: {blogs: IBlogMetadata[]}) {
  const {t} = await createTranslation('home');

  return (
    <section aria-labelledby="latest-writing">
      <SectionLabel id="latest-writing">{t('blogSection.kicker')}</SectionLabel>
      <ol className="m-0 list-none divide-y divide-line p-0">
        {blogs.map((blog, index) => {
          const banner = getBlogBanner(blog.slug);

          return (
            <li key={blog.slug} className="py-6 first:pt-0">
              <NextLink
                href={`/blog/${blog.slug}`}
                className="group grid gap-5 sm:grid-cols-[208px_1fr]"
              >
                <div className="relative aspect-video overflow-hidden rounded-lg bg-panel ring-1 ring-line">
                  {banner ? (
                    <Image
                      src={banner}
                      alt={blog.bannerDescription ?? blog.title}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 640px) 100vw, 208px"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none"
                    />
                  ) : null}
                </div>
                <div>
                  <div className="flex items-baseline justify-between gap-4 font-mono text-xs text-ink-muted">
                    <time dateTime={blog.date} className="text-xs">
                      {formatDate(blog.date)}
                    </time>
                    <span className="text-xs">
                      {blog.tags
                        .slice(0, 3)
                        .map(tag => `#${tag}`)
                        .join(' ')}
                    </span>
                  </div>
                  <h3 className="m-0 mt-2 text-xl font-semibold tracking-tight group-hover:text-accent">
                    {blog.title}
                  </h3>
                  <p className="m-0 mt-1.5 text-ink-muted">
                    {blog.description}
                  </p>
                </div>
              </NextLink>
            </li>
          );
        })}
      </ol>
      <NextLink
        href="/blog"
        className="mt-2 inline-block font-mono text-sm text-accent"
      >
        {t('blogSection.viewAll')} →
      </NextLink>
    </section>
  );
}
