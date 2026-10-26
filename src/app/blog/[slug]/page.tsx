import {getBlogBanner} from '@/data/blog-asset';
import {newCommonMetaTags} from '@/frontend-utils/meta-tags';
import type {IBlogMetadata} from '@/models/mdxFiles';
import {renderBlog} from '@/modules/blog/BlogContent';
import BlogFooter from '@/modules/blog/BlogFooter';
import BlogHeader from '@/modules/blog/BlogHeader';
import OnThisPage from '@/modules/blog/OnThisPage';
import {blurImage} from '@/utils/image-blur.utils';
import {BLOGS_PATH, getBlogsMetadata} from '@/utils/mdx.utils';
import fs from 'fs';
import matter from 'gray-matter';
import type {Metadata, NextPage} from 'next';
import path from 'path';

export const generateMetadata = async (props: {
  params: Promise<{slug: string}>;
}): Promise<Metadata> => {
  const params = await props.params;
  const postFilePath = path.join(BLOGS_PATH, `${params.slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const {data: blog} = matter(source);
  blog.slug = params.slug;

  const bannerUrl = getBlogBanner(params.slug) || undefined;

  return {
    ...newCommonMetaTags(blog.title, `/blog/${blog.slug}`),
    title: blog.title,
    description: blog.description,
    keywords: blog.keywords?.join(','),
    openGraph: {
      url: `https://carlogino.com/blog/${blog.slug}`,
      type: 'article',
      title: blog.title,
      description: blog.description,
      images: bannerUrl,
    },
    twitter: {
      title: blog.title,
      description: blog.description,
      images: bannerUrl,
      creator: '@codegino',
      site: '@codegino',
    },
  };
};

const BlogPage: NextPage<{
  params: Promise<{
    slug: string;
  }>;
}> = async ({params}) => {
  const param = await params;
  const {
    frontMatter: blog,
    img,
    svg,
    content,
  } = await getStaticProps(param.slug);

  const {Content, toc} = await renderBlog(content);

  if (!blog) {
    return (
      <div className="h-[80vh] w-full bg-transparent pt-10 text-center">
        <h2>Please wait</h2>
        <h3>Using magic to load content...</h3>
      </div>
    );
  }

  return (
    <>
      <script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: blog.title,
            image: getBlogBanner(blog.slug),
            editor: 'Carlo Gino Catapang',
            author: 'Carlo Gino Catapang',
            genre: blog.tags?.join(' '),
            keywords: blog.keywords?.join(' '),
            url: `https://carlogino.com/blog/${blog.slug}`,
            dateCreated: blog.date,
            dateModified: blog.dateUpdated,
            description: blog.description,
            articleBody: `${blog.title}. ${blog.description}`,
          }),
        }}
      />

      <main className="mx-auto max-w-6xl px-5 py-10 lg:py-14">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-16">
          <div className="max-w-[720px] min-w-0">
            <BlogHeader
              blog={blog}
              readingMinutes={readingMinutes(content)}
              img={img}
              svg={svg}
            />
            <div className="mt-10 lg:hidden">
              <OnThisPage toc={toc} variant="inline" />
            </div>
            <article className="prose-blog mt-10 lg:mt-12">
              <Content />
            </article>
            <BlogFooter blog={blog} />
          </div>
          <aside className="hidden lg:block">
            <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
              <OnThisPage toc={toc} variant="sidebar" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
};

const WORDS_PER_MINUTE = 220;

const readingMinutes = (content: string) =>
  Math.max(1, Math.round(content.split(/\s+/).length / WORDS_PER_MINUTE));

const getStaticProps = async (slug: string) => {
  const postFilePath = path.join(BLOGS_PATH, `${slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const {content, data} = matter(source);

  const bannerUrl = getBlogBanner(slug);
  // Drafts have no banner asset yet; plaiceholder cannot blur nothing.
  const {img, svg} = bannerUrl
    ? await blurImage(bannerUrl)
    : {img: undefined, svg: undefined};

  return {
    content,
    frontMatter: {
      ...data,
      slug,
    } as IBlogMetadata,
    img,
    svg,
  };
};

export const generateStaticParams = async () => {
  return (await getBlogsMetadata()).map(meta => {
    return {
      slug: meta.slug,
    };
  });
};

export default BlogPage;
