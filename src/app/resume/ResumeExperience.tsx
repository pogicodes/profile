import dompurify from 'isomorphic-dompurify';
import type {ReactNode} from 'react';
import SectionLabel from '../../components/SectionLabel';
import type {EducationExperience, WorkExperience} from '../../models/resume';
import {createTranslation} from '../i18n/server';

const formatMonth = (date: string) =>
  new Intl.DateTimeFormat('en', {year: 'numeric', month: 'short'}).format(
    new Date(date),
  );

function Entry({
  exp,
  present,
  children,
}: {
  exp: WorkExperience | EducationExperience;
  present: string;
  children?: ReactNode;
}) {
  // The data marks an ongoing role by giving it the same start and end date.
  const isCurrent = exp.endDate === exp.startDate;

  return (
    <li className="grid gap-x-8 gap-y-1 border-t border-line py-6 break-inside-avoid-page first:border-t-0 first:pt-0 sm:grid-cols-[9.5rem_minmax(0,1fr)] print:py-4">
      <p className="m-0 font-mono text-xs text-ink-muted tabular-nums sm:pt-1">
        {formatMonth(exp.startDate)} –{' '}
        {isCurrent ? (
          <span className="text-xs text-accent print:text-ink">{present}</span>
        ) : (
          formatMonth(exp.endDate)
        )}
      </p>
      <div className="min-w-0">
        <h3 className="m-0 text-left text-lg font-semibold">{exp.title}</h3>
        <p className="m-0 text-ink-muted">
          <a
            href={exp.url}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-ink hover:text-accent"
          >
            {exp.organization}
          </a>
          <span className="text-sm"> · {exp.role}</span>
        </p>
        {children}
      </div>
    </li>
  );
}

export default async function ResumeExperience({
  workExperiences,
  educationExperiences,
}: {
  workExperiences: WorkExperience[];
  educationExperiences: EducationExperience[];
}) {
  const {t} = await createTranslation('resume');

  return (
    <>
      <section aria-labelledby="resume-work" className="mt-14 print:mt-8">
        <SectionLabel id="resume-work">{t('workExperiences')}</SectionLabel>
        <ol className="m-0 list-none p-0">
          {workExperiences.map(exp => (
            <Entry key={exp.id} exp={exp} present={t('present')}>
              <div
                className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted print:text-ink [&_*]:text-[length:inherit] [&_li]:mb-1 [&_p]:m-0 [&_p]:mt-3 [&_p:first-child]:mt-0 [&_strong]:font-medium [&_strong]:text-ink [&_ul]:m-0 [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul_ul]:list-[circle]"
                dangerouslySetInnerHTML={{
                  __html: dompurify.sanitize(exp.markdown),
                }}
              />
            </Entry>
          ))}
        </ol>
      </section>

      <section aria-labelledby="resume-education" className="mt-14 print:mt-8">
        <SectionLabel id="resume-education">{t('education')}</SectionLabel>
        <ol className="m-0 list-none p-0">
          {educationExperiences.map(exp => (
            <Entry key={exp.id} exp={exp} present={t('present')} />
          ))}
        </ol>
      </section>
    </>
  );
}
