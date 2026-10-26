'use client';
import {useMemo} from 'react';
import {useTranslation} from '@/app/i18n/client';
import type {TypewriterChunk, TypewriterStep} from '@/utils/typewriter-hook';
import {useTypewriter} from '@/utils/typewriter-hook';

type TypedLine = {
  hasPrompt: boolean;
  texts: Extract<TypewriterChunk, {kind: 'text'}>[];
};

function Prompt() {
  return (
    <span aria-hidden className="mr-2 text-terminal-accent select-none">
      ❯
    </span>
  );
}

const lineClass = 'm-0 min-h-[1lh] text-[1em] leading-[inherit]';

export default function HomeTerminal() {
  const {t} = useTranslation('home');
  const {t: tResume} = useTranslation('resume');

  const steps = useMemo<TypewriterStep[]>(
    () => [
      {kind: 'delay', ms: 600},
      {kind: 'text', value: t('greetings.1')},
      {kind: 'break'},
      {kind: 'prompt'},
      {kind: 'delay', ms: 400},
      {kind: 'text', value: t('greetings.2')},
      {kind: 'delay', ms: 400},
      {kind: 'text', value: t('greetings.3')},
      {kind: 'delay', ms: 800},
      {kind: 'backspace', count: Number(t('greetings.del1'))},
      {kind: 'text', value: t('greetings.4')},
      {kind: 'delay', ms: 900},
      {kind: 'backspace', count: Number(t('greetings.del2'))},
      {
        kind: 'text',
        value: t('greetings.5'),
        className: 'font-semibold text-terminal-accent',
      },
      {kind: 'break'},
      {kind: 'prompt'},
      {kind: 'text', value: t('greetings.6')},
      {kind: 'delay', ms: 900},
      {kind: 'break'},
      {kind: 'prompt'},
      {kind: 'text', value: t('greetings.7')},
      {kind: 'text', value: t('greetings.8')},
      {kind: 'text', value: t('greetings.9')},
      {kind: 'break'},
      {kind: 'prompt'},
      {kind: 'text', value: t('greetings.10')},
    ],
    [t],
  );

  const {chunks} = useTypewriter(steps, {charDelay: 18});

  const lines = useMemo(
    () =>
      chunks.reduce<TypedLine[]>(
        (grouped, chunk) => {
          if (chunk.kind === 'break') {
            return [...grouped, {hasPrompt: false, texts: []}];
          }

          const current = grouped.at(-1)!;
          const updated =
            chunk.kind === 'prompt'
              ? {...current, hasPrompt: true}
              : {...current, texts: [...current.texts, chunk]};

          return [...grouped.slice(0, -1), updated];
        },
        [{hasPrompt: true, texts: []}],
      ),
    [chunks],
  );

  return (
    <div className="overflow-hidden rounded-xl bg-terminal text-terminal-ink ring-1 ring-black/10 dark:ring-white/5">
      <div className="flex h-10 items-center gap-2 border-b border-white/10 px-4">
        <span aria-hidden className="size-3 rounded-full bg-[#ff5f57]" />
        <span aria-hidden className="size-3 rounded-full bg-[#febc2e]" />
        <span aria-hidden className="size-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-white/50">
          gino@stockholm: ~
        </span>
      </div>
      {/* Fixed height so the page doesn't move while the greeting types. */}
      <div className="h-[19lh] p-5 font-mono text-[13px] leading-relaxed sm:h-[15lh] sm:text-[15px] [&_*]:text-[1em]">
        {/* Pre-printed so who I am is readable before any typing happens. */}
        <p className={lineClass}>
          <Prompt />
          whoami
        </p>
        <h1 className="m-0 text-left text-[1em] leading-[inherit] font-semibold text-terminal-accent">
          Carlo Gino Catapang
        </h1>
        <p className={`${lineClass} text-white/55`}>
          {tResume('jobTitle')} · Tre · Stockholm, Sweden
        </p>
        <p className={`${lineClass} mt-[1lh]`}>
          <Prompt />
          ./{t('greetings.filename')}
        </p>
        <div aria-label={t('greetings.1')}>
          {lines.map((line, index) => (
            <p key={index} className={lineClass}>
              {line.hasPrompt ? <Prompt /> : null}
              {line.texts.map((chunk, chunkIndex) => (
                <span key={chunkIndex} className={chunk.className}>
                  {chunk.value}
                </span>
              ))}
              {index === lines.length - 1 ? (
                <span aria-hidden className="animate-blink">
                  ▍
                </span>
              ) : null}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
