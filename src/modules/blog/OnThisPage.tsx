'use client';
import clsx from 'clsx';
import {useEffect, useState} from 'react';
import {useTranslation} from '../../app/i18n/client';
import type {TocItem} from './rehype-heading-ids';

/** Highlights the heading the reader is currently in. */
function useActiveId(idList: string) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const headings = idList
      .split(' ')
      .filter(Boolean)
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(entry => entry.isIntersecting);
        if (visible.length) setActiveId(visible[0].target.id);
      },
      // A band near the top of the viewport, below the sticky header.
      {rootMargin: '-80px 0px -70% 0px'},
    );
    headings.forEach(heading => observer.observe(heading));
    return () => observer.disconnect();
  }, [idList]);

  return activeId;
}

function TocList({
  toc,
  activeId,
  onNavigate,
}: {
  toc: TocItem[];
  activeId?: string | null;
  onNavigate?: () => void;
}) {
  return (
    <ul className="m-0 list-none space-y-1.5 p-0">
      {toc.map(item => (
        <li key={item.id} className={clsx(item.depth === 3 && 'pl-3')}>
          <a
            href={`#${item.id}`}
            onClick={onNavigate}
            aria-current={item.id === activeId ? 'location' : undefined}
            className={clsx(
              'block text-sm leading-snug transition-colors hover:text-ink',
              item.id === activeId ? 'text-accent' : 'text-ink-muted',
            )}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function OnThisPage({
  toc,
  variant,
}: {
  toc: TocItem[];
  variant: 'sidebar' | 'inline';
}) {
  const {t} = useTranslation('blog');
  // Joined so the observer only resets when the headings actually change.
  const activeId = useActiveId(
    variant === 'sidebar' ? toc.map(item => item.id).join(' ') : '',
  );
  const [isOpen, setIsOpen] = useState(false);

  if (toc.length < 2) return null;

  if (variant === 'inline') {
    return (
      <details
        open={isOpen}
        onToggle={event => setIsOpen(event.currentTarget.open)}
        className="mb-8 rounded-lg border border-line bg-panel"
      >
        <summary className="cursor-pointer px-4 py-3 font-mono text-sm text-ink-muted lowercase">
          {t('onThisPage')}
        </summary>
        <nav aria-label={t('onThisPage')} className="px-4 pb-4">
          <TocList toc={toc} onNavigate={() => setIsOpen(false)} />
        </nav>
      </details>
    );
  }

  return (
    <nav aria-label={t('onThisPage')}>
      <p className="m-0 mb-3 font-mono text-xs text-ink-muted lowercase">
        <span aria-hidden className="text-xs text-accent">
          //{' '}
        </span>
        {t('onThisPage')}
      </p>
      <TocList toc={toc} activeId={activeId} />
    </nav>
  );
}
