'use client';
import {parseAsArrayOf, parseAsString, useQueryState} from 'next-usequerystate';
import {useMemo} from 'react';
import PostListItem from '../../components/blog/PostListItem';
import {IBlogMetadata} from '../../models/mdxFiles';
import BlogsFilter from '../../modules/blog/BlogsFilter';
import {useTranslation} from '../i18n/client';
import SearchField from './SearchField';

const groupByYear = (blogs: IBlogMetadata[]) =>
  blogs.reduce<[string, IBlogMetadata[]][]>((groups, blog) => {
    const year = String(new Date(blog.date).getFullYear());
    const last = groups.at(-1);

    if (last?.[0] === year) {
      last[1].push(blog);
    } else {
      groups.push([year, [blog]]);
    }

    return groups;
  }, []);

const BlogsWrapper = ({blogs}: {blogs: IBlogMetadata[]}) => {
  const {t} = useTranslation('blog');
  const [selectedTags, setSelectedTags] = useQueryState(
    'tags',
    parseAsArrayOf(parseAsString).withDefault([]),
  );

  const [search, setSearch] = useQueryState('search');

  const query = search?.toLowerCase();
  const filtered = blogs.filter(
    blog =>
      (!query ||
        blog.title.toLowerCase().includes(query) ||
        blog.description.toLowerCase().includes(query)) &&
      selectedTags.every(tag => blog.tags.includes(tag)),
  );

  const tags = useMemo(() => {
    const counts = new Map<string, number>();
    blogs.forEach(blog =>
      blog.tags.forEach(tag => counts.set(tag, (counts.get(tag) ?? 0) + 1)),
    );

    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([tag]) => tag);
  }, [blogs]);

  return (
    <>
      <div className="mt-8 space-y-3">
        <SearchField />
        <BlogsFilter
          tags={tags}
          selectedTags={selectedTags}
          onClear={() => setSelectedTags(null)}
          handleTagClick={tag => {
            setSelectedTags(prev => {
              if (prev.includes(tag)) {
                return prev.length === 1 ? null : prev.filter(t => t !== tag);
              }

              return [...prev, tag];
            });
          }}
        />
      </div>

      {filtered.length > 0 ? (
        groupByYear(filtered).map(([year, posts], groupIndex) => (
          <section
            key={year}
            aria-labelledby={`year-${year}`}
            className="mt-10 border-t border-line pt-6"
          >
            <h2
              id={`year-${year}`}
              className="m-0 mb-4 text-left font-mono text-sm font-medium text-ink-muted"
            >
              {year}
            </h2>
            <ol className="m-0 list-none divide-y divide-line p-0">
              {posts.map((blog, index) => (
                <li key={blog.slug} className="py-6 first:pt-0">
                  <PostListItem
                    blog={blog}
                    priority={groupIndex === 0 && index === 0}
                  />
                </li>
              ))}
            </ol>
          </section>
        ))
      ) : (
        <section className="mt-10 border-t border-line pt-10 text-center">
          <p className="m-0 text-ink-muted">{t('noResults')}</p>
          <button
            type="button"
            className="mt-4 rounded-md border border-line px-4 py-2 text-sm hover:bg-panel"
            onClick={() => {
              setSelectedTags(null);
              setSearch(null);
            }}
          >
            {t('reset')}
          </button>
        </section>
      )}
    </>
  );
};

export default BlogsWrapper;
