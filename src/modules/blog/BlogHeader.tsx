import {createTranslation} from '../../app/i18n/server';
import {BlurringImage} from '../../components/BlurringImage';
import NextLink from '../../components/basic/NextLink';
import type {IBlogMetadata} from '../../models/mdxFiles';
import type {BlurImageType} from '../../utils/image-blur.utils';

type Props = {
  blog: IBlogMetadata;
  readingMinutes: number;
  // Optional: drafts have no banner asset mapped yet.
} & Partial<Pick<BlurImageType, 'svg' | 'img'>>;

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));

export default async function BlogHeader({
  blog,
  readingMinutes,
  img,
  svg,
}: Props) {
  const {t} = await createTranslation('blog');

  return (
    <header>
      <NextLink
        href="/blog"
        className="font-mono text-xs text-ink-muted hover:text-accent"
      >
        ← {t('allPosts').toLowerCase()}
      </NextLink>
      <h1 className="m-0 mt-5 text-left text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-5xl">
        {blog.title}
      </h1>
      {blog.description ? (
        <p className="m-0 mt-4 text-lg text-balance text-ink-muted">
          {blog.description}
        </p>
      ) : null}
      <p className="m-0 mt-5 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-ink-muted">
        <time dateTime={blog.date} className="text-xs">
          {formatDate(blog.date)}
        </time>
        <span aria-hidden className="text-xs">
          ·
        </span>
        <span className="text-xs">{t('minRead', {count: readingMinutes})}</span>
        {blog.tags?.length ? (
          <>
            <span aria-hidden className="text-xs">
              ·
            </span>
            {blog.tags.map(tag => (
              <NextLink
                key={tag}
                href={`/blog?tags=${encodeURIComponent(tag)}`}
                className="text-xs hover:text-accent"
              >
                #{tag}
              </NextLink>
            ))}
          </>
        ) : null}
      </p>
      {img && svg && !blog.hideBanner ? (
        <figure className="m-0 mt-8">
          <div className="relative aspect-video overflow-hidden rounded-xl ring-1 ring-line">
            <BlurringImage
              alt={blog.bannerDescription}
              title={blog.bannerDescription}
              img={img}
              svg={svg}
              fill
              sizes="(max-width: 768px) 100vw, 720px"
              priority={true}
              className="object-cover object-center"
            />
          </div>
          {blog.bannerDescription ? (
            <figcaption className="mt-2 font-mono text-xs text-ink-muted">
              {blog.bannerDescription}
            </figcaption>
          ) : null}
        </figure>
      ) : null}
    </header>
  );
}
