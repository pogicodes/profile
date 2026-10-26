import type {ReactNode} from 'react';
import {createTranslation} from '@/app/i18n/server';
import ContributionCalendar from './ContributionCalendar';
import SectionLabel from '@/components/SectionLabel';
import {fetchTopLanguages} from './wakatime';

function Card({
  label,
  detail,
  href,
  linkText,
  children,
}: {
  label: string;
  detail: string;
  href: string;
  linkText: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-col rounded-xl border border-line bg-panel p-5">
      <p className="m-0 mb-4 flex items-baseline justify-between gap-3 font-mono text-xs whitespace-nowrap text-ink-muted">
        <span className="text-xs">
          {label}
          <span className="hidden text-xs sm:inline"> · {detail}</span>
        </span>
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="text-xs hover:text-accent"
        >
          {linkText} ↗
        </a>
      </p>
      {children}
    </div>
  );
}

export default async function CodingActivity() {
  const {t} = await createTranslation('home');
  const languages = await fetchTopLanguages();

  return (
    <section
      aria-labelledby="coding-activity"
      className="border-t border-line py-12"
    >
      <SectionLabel id="coding-activity">{t('activity.kicker')}</SectionLabel>
      <div className="grid gap-6 lg:grid-cols-[auto_minmax(0,1fr)]">
        <Card
          label={t('activity.contributions')}
          detail={t('activity.last12Months')}
          href="https://github.com/pogicodes"
          linkText="github"
        >
          <ContributionCalendar />
        </Card>

        {languages.length ? (
          <Card
            label={t('activity.languages')}
            detail={t('activity.last7Days')}
            href="https://wakatime.com/@codegino"
            linkText="wakatime"
          >
            <ul className="m-0 my-auto list-none space-y-3 p-0 font-mono text-xs">
              {languages.map((language, index) => (
                <li key={language.name}>
                  <div className="mb-1 flex justify-between">
                    <span className="text-xs">{language.name}</span>
                    <span className="text-xs text-ink-muted tabular-nums">
                      {language.percent.toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-line">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{
                        width: `${language.percent}%`,
                        opacity:
                          language.name === 'Other' ? 0.35 : 1 - index * 0.1,
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        ) : null}
      </div>
    </section>
  );
}
