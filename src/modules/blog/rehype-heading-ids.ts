export type TocItem = {id: string; label: string; depth: 2 | 3};

// Minimal hast shape; avoids pulling in @types/hast for one plugin.
type HastNode = {
  type: string;
  tagName?: string;
  name?: string;
  value?: string;
  properties?: Record<string, unknown>;
  attributes?: {name?: string; value?: unknown}[];
  children?: HastNode[];
};

const textOf = (node: HastNode): string =>
  node.type === 'text'
    ? (node.value ?? '')
    : (node.children ?? []).map(textOf).join('');

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

/**
 * Gives every h2/h3 an id and collects them into `toc`.
 *
 * Older posts mark headings with `<Bookmark id="…" />`; that id is reused so
 * existing links keep working and no duplicate id is created.
 */
export default function rehypeHeadingIds({toc}: {toc: TocItem[]}) {
  return (tree: HastNode) => {
    const usedIds = new Set<string>();

    const walk = (node: HastNode) => {
      if (
        node.type === 'element' &&
        (node.tagName === 'h2' || node.tagName === 'h3')
      ) {
        const label = textOf(node).trim();
        if (!label) return;

        const bookmarkId = node.children
          ?.find(
            child =>
              child.type === 'mdxJsxTextElement' && child.name === 'Bookmark',
          )
          ?.attributes?.find(attribute => attribute.name === 'id')?.value;

        let id: string;
        if (typeof bookmarkId === 'string') {
          id = bookmarkId;
        } else {
          const base = slugify(label) || 'section';
          id = base;
          for (let n = 2; usedIds.has(id); n++) id = `${base}-${n}`;
          node.properties = {...node.properties, id};
        }

        usedIds.add(id);
        toc.push({id, label, depth: node.tagName === 'h2' ? 2 : 3});
        return;
      }

      node.children?.forEach(walk);
    };

    walk(tree);
  };
}
