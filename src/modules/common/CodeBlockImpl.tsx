import {memo} from 'react';
import type {FunctionComponent} from 'react';
import clsx from 'clsx';
import {Highlight, themes} from 'prism-react-renderer';
import type {Language} from 'prism-react-renderer';
import ClipboardCopyButton from '../../components/ClipboardCopyButton';
import NextLink from '../../components/basic/NextLink';

export type CodeBlockProps = {
  children: string;
  className: string;
  noLine: boolean;
  noExt: boolean;
  noInline: boolean;
  noHeader: boolean;
  codePenID: string;
  fileName: string;
  add: string;
  del: string;
};

const executableExtensions = [
  'js',
  'jsx',
  'ts',
  'tsx',
  'html',
  'css',
  'json',
  'diff',
];

const CodeBlockImpl: FunctionComponent<CodeBlockProps> = ({
  noLine = false,
  noExt = false,
  noHeader = false,
  codePenID,
  fileName,
  children,
  className,
  add,
  del,
}) => {
  const language = className.replace(/language-/, '') as Language;

  const languageLabel = executableExtensions.some(ext => ext === language)
    ? `.${language}`
    : language;

  const addedLines = new Set<number>();
  const removedLines = new Set<number>();

  if (add) {
    for (const line of add.split(',')) {
      const [start, end] = line.split('-').map(Number);
      if (start && end) {
        for (let i = start; i <= end; i++) {
          addedLines.add(i);
        }
      } else {
        addedLines.add(start);
      }
    }
  }

  if (del) {
    for (const line of del.split(',')) {
      const [start, end] = line.split('-').map(Number);
      if (start && end) {
        for (let i = start; i <= end; i++) {
          removedLines.add(i);
        }
      } else {
        removedLines.add(start);
      }
    }
  }

  const showMarkers = Boolean(add || del);

  return (
    <div className="my-6">
      <div className="overflow-hidden rounded-lg bg-terminal text-terminal-ink ring-1 ring-black/10 dark:ring-white/10">
        {!noHeader && (
          <div className="flex h-9 items-center justify-between gap-4 border-b border-white/10 px-4 font-mono text-xs text-white/55">
            <span className="truncate text-xs">
              {fileName ? fileName : ''}
              {!noExt && !fileName?.endsWith(languageLabel) && languageLabel}
            </span>
            <ClipboardCopyButton value={children} />
          </div>
        )}
        <Highlight
          theme={themes.vsDark}
          code={children.trim()}
          language={language}
        >
          {({tokens, getLineProps, getTokenProps}) => (
            <pre className="m-0 overflow-x-auto py-3 font-mono text-[13px] leading-6 sm:text-sm [&_*]:text-[length:inherit]">
              <code className="grid min-w-max">
                {tokens.map((line, i) => {
                  const lineNumber = i + 1;
                  const isAdded = addedLines.has(lineNumber);
                  const isRemoved = removedLines.has(lineNumber);
                  const {className: lineClassName, style: lineStyle} =
                    getLineProps({line});

                  return (
                    <span
                      key={i}
                      style={lineStyle}
                      className={clsx(
                        lineClassName,
                        'flex min-h-6 px-4',
                        isAdded && 'bg-green-500/10',
                        isRemoved && 'bg-red-500/10',
                      )}
                    >
                      {!noLine && (
                        <span className="mr-4 inline-block w-6 shrink-0 text-right text-white/30 select-none">
                          {lineNumber}
                        </span>
                      )}
                      {showMarkers && (
                        <span
                          aria-hidden
                          className={clsx(
                            'mr-2 inline-block w-3 shrink-0 select-none',
                            isAdded && 'text-green-400',
                            isRemoved && 'text-red-400',
                          )}
                        >
                          {isAdded ? '+' : isRemoved ? '-' : ' '}
                        </span>
                      )}
                      <span>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({token})} />
                        ))}
                      </span>
                    </span>
                  );
                })}
              </code>
            </pre>
          )}
        </Highlight>
      </div>
      {codePenID && (
        <NextLink
          href={`https://codepen.io/codegino/pen/${codePenID}`}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-block font-mono text-xs text-accent"
        >
          Open in CodePen ↗
        </NextLink>
      )}
    </div>
  );
};

export default memo(CodeBlockImpl);
