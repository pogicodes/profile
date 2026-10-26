'use client';

import {parseAsString, useQueryState} from 'next-usequerystate';
import {useEffect, useState} from 'react';
import {useTranslation} from '../i18n/client';
import SearchIcon from '../assets/icons/search-icon';
import CloseIcon from '../assets/icons/close-icon';

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 200,
  ...props
}: {
  value: string | null;
  onChange: (value: string | null) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = useState(initialValue);
  const [previousInitialValue, setPreviousInitialValue] =
    useState(initialValue);

  // Sync the prop into state during render rather than in an effect, so the
  // stale value is never painted first. https://react.dev/learn/you-might-not-need-an-effect
  if (initialValue !== previousInitialValue) {
    setPreviousInitialValue(initialValue);
    setValue(initialValue);
  }

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (value !== initialValue) {
      timeout = setTimeout(() => {
        if (value === '') {
          onChange(null);
          return;
        }
        onChange(value);
      }, debounce);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [debounce, onChange, value, initialValue]);

  return (
    <input
      {...props}
      className="w-full rounded-md border border-line bg-canvas py-2 pr-9 pl-9 text-sm outline-none focus:border-accent [&::-webkit-search-cancel-button]:hidden"
      value={value ?? ''}
      onChange={e => setValue(e.target.value)}
    />
  );
}

export default function SearchField() {
  const {t} = useTranslation('blog');
  const [searchFilter, setSearchFilter] = useQueryState(
    'search',
    parseAsString
      .withOptions({
        shallow: false,
        scroll: false,
        history: 'replace',
      })
      .withDefault(''),
  );

  const handleGlobalFilterChange = (value: string | null) => {
    if (!value) {
      setSearchFilter(null);
    } else {
      setSearchFilter(value);
    }
  };

  return (
    <div className="relative flex w-full items-center">
      <SearchIcon className="pointer-events-none absolute left-3 size-4 text-ink-muted" />
      <DebouncedInput
        type="search"
        aria-label={t('search')}
        placeholder={t('search')}
        value={searchFilter}
        onChange={handleGlobalFilterChange}
      />
      {searchFilter && (
        <button
          type="button"
          aria-label="Clear search"
          className="absolute right-3 flex size-4 text-ink-muted hover:text-ink"
          onClick={() => {
            setSearchFilter(null);
          }}
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
}
