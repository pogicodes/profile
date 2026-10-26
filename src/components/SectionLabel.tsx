import type {ReactNode} from 'react';
import clsx from 'clsx';

/** Small mono "// label" used as the heading of every home section. */
export default function SectionLabel({
  as: Tag = 'h2',
  id,
  className,
  children,
}: {
  as?: 'h2' | 'p';
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      id={id}
      className={clsx(
        'm-0 mb-4 font-mono text-xs font-medium text-ink-muted lowercase',
        className,
      )}
    >
      <span aria-hidden className="text-xs text-accent">
        //{' '}
      </span>
      {children}
    </Tag>
  );
}
