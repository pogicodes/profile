import type {FC} from 'react';
import {createTranslation} from '../app/i18n/server';
import NextLink from './basic/NextLink';
import BookACallButton from './booking/BookACallButton';
import {socialLinks} from './social/social-links';

const CURRENT_YEAR = new Date().getFullYear();

const Footer: FC = async () => {
  const {t} = await createTranslation('common');

  return (
    <footer className="border-t border-line print:hidden">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 font-mono text-xs text-ink-muted lowercase sm:flex-row sm:items-center sm:justify-between">
        <ul className="m-0 flex list-none flex-wrap gap-x-4 gap-y-1 p-0">
          {socialLinks.map(social => (
            <li key={social.url}>
              <a
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="text-xs transition-colors hover:text-accent"
              >
                {social.label} ↗
              </a>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <BookACallButton
            label={t('bookACall')}
            title={t('bookACallTitle')}
            closeLabel={t('closeDialog')}
            className="inline-flex items-center gap-1.5 text-xs lowercase transition-colors hover:text-accent"
          />
          <NextLink
            href="/rss.xml"
            className="text-xs transition-colors hover:text-accent"
          >
            {t('rssFeed')}
          </NextLink>
          <NextLink
            href="/sitemap.xml"
            className="text-xs transition-colors hover:text-accent"
          >
            {t('sitemap')}
          </NextLink>
          <span className="text-xs">© {CURRENT_YEAR} Carlo Gino Catapang</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
