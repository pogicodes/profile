import SectionLabel from '@/components/SectionLabel';
import SubscribeForm from '@/components/SubscribeForm';
import {newCommonMetaTags} from '@/frontend-utils/meta-tags';
import type {IBlogMetadata} from '@/models/mdxFiles';
import {getBlogsMetadata} from '@/utils/mdx.utils';
import BlogsWrapper from './BlogsWrapper';
import {createTranslation} from '../i18n/server';

export const metadata = {
  ...newCommonMetaTags('Blogs Page', '/blog'),
  title: 'My Blogs Listing Page | CodeGino | Carlo Gino Catapang',
};

export const dynamic = 'force-dynamic';

async function BlogPage() {
  const {
    props: {blogs},
  } = await getStaticProps();
  const {t} = await createTranslation('blog');
  const {t: tNewsletter} = await createTranslation('newsletter');

  return (
    <main className="mx-auto max-w-4xl px-5 py-10 lg:py-14">
      <div className="flex items-baseline justify-between gap-4">
        <h1 className="m-0 text-left text-3xl font-semibold tracking-tight sm:text-4xl">
          {t('myBlogs')}
        </h1>
        <p className="m-0 font-mono text-xs text-ink-muted">
          {t('postCount', {count: blogs.length})}
        </p>
      </div>

      <BlogsWrapper blogs={blogs} />

      <section
        id="subscribe"
        aria-labelledby="blog-newsletter"
        className="mt-12 rounded-xl border border-line bg-panel p-6"
      >
        <SectionLabel id="blog-newsletter">
          {tNewsletter('form.button')}
        </SectionLabel>
        <p className="m-0 mb-4 max-w-prose text-ink-muted">
          {tNewsletter('subtitle')}
        </p>
        <SubscribeForm layout="inline" />
      </section>
    </main>
  );
}

export default BlogPage;

const getStaticProps = async () => {
  let blogs = await getBlogsMetadata();

  blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return {
    props: {
      blogs: blogs as IBlogMetadata[],
    },
  };
};
