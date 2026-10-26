'use client';

import {useState} from 'react';
import {useTranslation} from '../../app/i18n/client';
import SectionLabel from '../../components/SectionLabel';
import SubscribeForm from '../../components/SubscribeForm';
import NextLink from '../../components/basic/NextLink';
import type {IBlogMetadata} from '../../models/mdxFiles';

const linkClass = 'text-xs lowercase transition-colors hover:text-accent';

function CopyLinkButton({url}: {url: string}) {
  const {t} = useTranslation('blog');
  const [isCopied, setIsCopied] = useState(false);

  return (
    <button
      type="button"
      className={linkClass}
      onClick={async () => {
        await navigator.clipboard.writeText(url);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }}
    >
      <span aria-live="polite" className="text-xs">
        {isCopied ? `${t('copied')} ✓` : t('copyLink')}
      </span>
    </button>
  );
}

const BlogFooter = ({blog}: {blog: IBlogMetadata}) => {
  const {t} = useTranslation('blog');
  const {t: tNewsletter} = useTranslation('newsletter');
  const url = `https://carlogino.com/blog/${blog.slug}`;
  const encodedUrl = encodeURIComponent(url);

  return (
    <footer className="mt-16 border-t border-line pt-8">
      <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-ink-muted lowercase">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="text-xs">
            <span aria-hidden className="text-xs text-accent">
              //{' '}
            </span>
            {t('share')}
          </span>
          <CopyLinkButton url={url} />
          <a
            href={`https://x.com/intent/post?url=${encodedUrl}&text=${encodeURIComponent(blog.title)}`}
            target="_blank"
            rel="noreferrer"
            className={linkClass}
          >
            x ↗
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
            target="_blank"
            rel="noreferrer"
            className={linkClass}
          >
            linkedin ↗
          </a>
        </div>
        <a
          href="https://l.carlogino.com/bmac"
          target="_blank"
          rel="noreferrer"
          className={linkClass}
        >
          buy me a coffee ↗
        </a>
      </div>

      <section
        aria-labelledby="post-newsletter"
        className="mt-8 rounded-xl border border-line bg-panel p-6"
      >
        <SectionLabel id="post-newsletter">
          {tNewsletter('form.button')}
        </SectionLabel>
        <p className="m-0 mb-4 text-ink-muted">{tNewsletter('subtitle')}</p>
        <SubscribeForm layout="inline" />
      </section>

      <NextLink
        href="/blog"
        className="mt-8 inline-block font-mono text-sm text-accent"
      >
        ← {t('allPosts').toLowerCase()}
      </NextLink>
    </footer>
  );
};

export default BlogFooter;
