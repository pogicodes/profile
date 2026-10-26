import type {HTMLAttributes} from 'react';

const BlockQuote = (props: HTMLAttributes<HTMLQuoteElement>) => {
  return (
    <blockquote
      className="dark:ring-nutral-800 m-0 my-4 box-border  border-b border-l-4 border-primary-300 bg-neutral-50 p-2
      text-xl ring-1 ring-neutral-200 dark:bg-neutral-900"
      {...props}
    />
  );
};

export default BlockQuote;
