'use client';
import {useState} from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import {usePathname} from 'next/navigation';
import {useTranslation} from '../../app/i18n/client';
import DarkModeToggle from '../DarkModeToggle';
import NextLink from '../basic/NextLink';
import {socialLinks} from '../social/social-links';
import {navigationLinks} from './nav-links';

const isActive = (path: string | null, url: string) =>
  !!path && url.startsWith('/') && (path === url || path.startsWith(`${url}/`));

export default function Header() {
  const path = usePathname();
  const {t} = useTranslation('common');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = navigationLinks.map(link => ({
    ...link,
    text: t(link.label).toLowerCase(),
    active: isActive(path, link.url),
  }));

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
        <NextLink
          href="/"
          aria-label="Code Gino home"
          className="flex items-center gap-2 font-mono text-sm font-semibold"
        >
          <Image
            priority
            src="/assets/logo.svg"
            alt=""
            width={28}
            height={28}
            className="size-7 rounded-full bg-white p-0.5"
          />
          codegino
        </NextLink>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="m-0 flex list-none items-center gap-1 p-0">
            {links.map(link => (
              <li key={link.url}>
                <NextLink
                  href={link.url}
                  target={link.target}
                  aria-current={link.active ? 'page' : undefined}
                  className={clsx(
                    'rounded px-2 py-1 font-mono text-sm transition-colors hover:bg-panel hover:text-ink',
                    link.active ? 'text-accent' : 'text-ink-muted',
                  )}
                >
                  ~/{link.text}
                </NextLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <DarkModeToggle />
          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen(open => !open)}
            className="rounded px-2 py-1 font-mono text-sm text-ink-muted hover:bg-panel hover:text-ink md:hidden"
          >
            {isMenuOpen ? 'close' : 'menu'}
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <nav
          id="mobile-menu"
          aria-label="Main"
          className="border-t border-line px-5 pt-3 pb-5 md:hidden"
        >
          <ul className="m-0 list-none p-0">
            {links.map(link => (
              <li key={link.url}>
                <NextLink
                  href={link.url}
                  target={link.target}
                  aria-current={link.active ? 'page' : undefined}
                  onClick={() => setIsMenuOpen(false)}
                  className={clsx(
                    'block py-2 font-mono text-base',
                    link.active ? 'text-accent' : 'text-ink',
                  )}
                >
                  ~/{link.text}
                </NextLink>
              </li>
            ))}
          </ul>
          <ul className="m-0 mt-3 flex list-none flex-wrap gap-x-4 gap-y-1 border-t border-line p-0 pt-4 font-mono text-xs text-ink-muted">
            {socialLinks.map(social => (
              <li key={social.url}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs hover:text-accent"
                >
                  {social.label.toLowerCase()} ↗
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
