import type {AnchorHTMLAttributes} from 'react';

const isExternal = (href?: string) => !!href && /^https?:\/\//.test(href);

const BlogAnchor = ({
  children,
  href,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a
    href={href}
    {...(isExternal(href) ? {target: '_blank', rel: 'noreferrer'} : {})}
    {...props}
  >
    {children}
  </a>
);

export default BlogAnchor;
