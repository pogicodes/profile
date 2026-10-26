import {evaluate, type EvaluateOptions} from '@mdx-js/mdx';
import type {ComponentProps, FunctionComponent, JSX} from 'react';
import * as runtime from 'react/jsx-runtime';
import rehypeMdxCodeProps from 'rehype-mdx-code-props';
import ContentAnchor from '../common/AnchorTag';
import ContentBlockQuote from '../common/BlockquoteTag';
import ContentBookMark from '../common/BookmarkElement';
import ContentCodeBlock from '../common/CodeBlockElement';
import ContentImage from '../common/ImageTag';
import rehypeHeadingIds, {type TocItem} from './rehype-heading-ids';

const components: ComponentProps<FunctionComponent> = {
  inlineCode: ({children}: {children: JSX.Element}) => <code>{children}</code>,
  blockquote: ContentBlockQuote,
  Anchor: ContentAnchor,
  a: ContentAnchor,
  Img: ContentImage,
  Bookmark: ContentBookMark,
  // Older posts carry a hand-written TOC; the page now builds one for every
  // post from its headings, so these render nothing.
  TableOfContents: () => null,
  pre: ContentCodeBlock,
};

/** Compiles a post and returns its content plus the h2/h3 outline. */
export async function renderBlog(source: string) {
  const toc: TocItem[] = [];
  const {default: MDXContent} = await evaluate(source, {
    ...(runtime as Pick<EvaluateOptions, 'Fragment' | 'jsx' | 'jsxs'>),
    rehypePlugins: [rehypeMdxCodeProps, [rehypeHeadingIds, {toc}]],
  });

  const Content = () => <MDXContent components={components} />;

  return {Content, toc};
}
