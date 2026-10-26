import type {HTMLAttributes} from 'react';

// Styled by `.prose-blog`.
const BlockQuote = (props: HTMLAttributes<HTMLQuoteElement>) => (
  <blockquote {...props} />
);

export default BlockQuote;
