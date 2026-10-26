import {createTranslation} from '@/app/i18n/server';
import NextLink from '@/components/basic/NextLink';
import PostListItem from '@/components/blog/PostListItem';
import SectionLabel from '@/components/SectionLabel';
import type {IBlogMetadata} from '@/models/mdxFiles';

export default async function LatestWriting({blogs}: {blogs: IBlogMetadata[]}) {
  const {t} = await createTranslation('home');

  return (
    <section aria-labelledby="latest-writing">
      <SectionLabel id="latest-writing">{t('blogSection.kicker')}</SectionLabel>
      <ol className="m-0 list-none divide-y divide-line p-0">
        {blogs.map((blog, index) => (
          <li key={blog.slug} className="py-6 first:pt-0">
            <PostListItem blog={blog} priority={index === 0} />
          </li>
        ))}
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
