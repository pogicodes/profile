'use client';

import clsx from 'clsx';
import {useState, type FunctionComponent} from 'react';
import {useTranslation} from '../../app/i18n/client';

const VISIBLE_TAGS = 8;

const BlogsFilter: FunctionComponent<{
  /** Most-used first. */
  tags: string[];
  selectedTags: string[];
  handleTagClick: (tag: string) => void;
  onClear: () => void;
}> = ({tags, handleTagClick, selectedTags, onClear}) => {
  const {t} = useTranslation('blog');
  const [isExpanded, setIsExpanded] = useState(false);

  // Selected tags stay visible even when the list is collapsed.
  const visibleTags = isExpanded
    ? tags
    : tags.filter(
        (tag, index) => index < VISIBLE_TAGS || selectedTags.includes(tag),
      );
  const hiddenCount = tags.length - visibleTags.length;

  const chipClass =
    'rounded px-2 py-1 font-mono text-xs transition-colors hover:bg-panel hover:text-ink';

  return (
    <fieldset className="m-0 flex min-w-0 flex-wrap items-center gap-1 border-0 p-0">
      <legend className="sr-only">{t('filterByTags')}</legend>
      {visibleTags.map(tag => {
        const isSelected = selectedTags.includes(tag);

        return (
          <button
            key={tag}
            type="button"
            aria-pressed={isSelected}
            onClick={() => handleTagClick(tag)}
            className={clsx(
              chipClass,
              isSelected
                ? 'bg-accent text-accent-ink hover:bg-accent hover:text-accent-ink'
                : 'text-ink-muted',
            )}
          >
            #{tag}
          </button>
        );
      })}
      {hiddenCount > 0 || isExpanded ? (
        <button
          type="button"
          aria-expanded={isExpanded}
          onClick={() => setIsExpanded(expanded => !expanded)}
          className={clsx(chipClass, 'text-accent')}
        >
          {isExpanded ? t('fewerTags') : t('moreTags', {count: hiddenCount})}
        </button>
      ) : null}
      {selectedTags.length ? (
        <button
          type="button"
          onClick={onClear}
          className={clsx(chipClass, 'text-ink-muted underline')}
        >
          {t('clearTags')}
        </button>
      ) : null}
    </fieldset>
  );
};

export default BlogsFilter;
