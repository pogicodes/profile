import Image from 'next/image';
import NextLink from '@/components/basic/NextLink';
import {getBlogBanner} from '@/data/blog-asset';
import type {IBlogMetadata} from '@/models/mdxFiles';

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(new Date(date));

/** One post in a list: cover thumbnail, date and tags, title, description. */
export default function PostListItem({
  blog,
  priority = false,
  headingLevel: Heading = 'h3',
}: {
  blog: IBlogMetadata;
  priority?: boolean;
  headingLevel?: 'h2' | 'h3';
}) {
  const banner = getBlogBanner(blog.slug);

  return (
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
            priority={priority}
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
          <span className="text-right text-xs">
            {blog.tags
              .slice(0, 3)
              .map(tag => `#${tag}`)
              .join(' ')}
          </span>
        </div>
        <Heading className="m-0 mt-2 text-left text-xl font-semibold tracking-tight group-hover:text-accent">
          {blog.title}
        </Heading>
        <p className="m-0 mt-1.5 text-ink-muted">{blog.description}</p>
      </div>
    </NextLink>
  );
}
