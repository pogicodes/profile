import {BlurringImage} from '../../components/BlurringImage';
import type {BlurImageType} from '../../utils/image-blur.utils';
import {createTranslation} from '../i18n/server';

const summary = {
  company: 'Tre',
  companyWebsite: 'https://www.tre.se',
  email: 'carloginocatapang@gmail.com',
  location: 'Stockholm, Sweden',
  name: 'Carlo Gino Catapang',
};

const contactLinks = [
  {label: summary.email, href: `mailto:${summary.email}`},
  {label: 'carlogino.com', href: 'https://carlogino.com'},
  {
    label: 'linkedin.com/in/codegino',
    href: 'https://www.linkedin.com/in/codegino',
  },
  {label: 'github.com/pogicodes', href: 'https://github.com/pogicodes'},
];

const linkClass = 'text-xs hover:text-accent print:text-ink';

export default async function ResumeHeader({
  img,
  svg,
  resumePdfUrl,
  resumeWordUrl,
}: Pick<BlurImageType, 'svg' | 'img'> & {
  resumePdfUrl: string;
  resumeWordUrl: string;
}) {
  const {t} = await createTranslation('resume');

  return (
    <header className="flex flex-col-reverse gap-6 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <h1 className="m-0 text-left text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">
          {summary.name}
        </h1>
        <p className="m-0 mt-1 text-lg text-ink-muted">
          {t('jobTitle')} {t('at')}{' '}
          <a
            href={summary.companyWebsite}
            target="_blank"
            rel="noreferrer"
            className="text-lg text-accent hover:underline print:text-ink"
          >
            {summary.company}
          </a>
        </p>
        <p className="m-0 mt-4 max-w-2xl leading-relaxed">{t('tagline')}</p>

        <ul className="m-0 mt-4 flex list-none flex-wrap gap-x-4 gap-y-1 p-0 font-mono text-xs text-ink-muted">
          <li className="text-xs">{summary.location}</li>
          <li className="text-xs">
            10+ {t('yearsOfExperience')} · 5 {t('companies')}
          </li>
        </ul>
        <ul className="m-0 mt-1 flex list-none flex-wrap gap-x-4 gap-y-1 p-0 font-mono text-xs text-ink-muted">
          {contactLinks.map(link => (
            <li key={link.href} className="text-xs">
              <a href={link.href} className={linkClass}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="m-0 mt-5 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs print:hidden">
          <a
            href={resumePdfUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-xs text-accent lowercase hover:underline"
          >
            {t('downloadPdf')} ↓
          </a>
          <a
            href={resumeWordUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-xs text-accent lowercase hover:underline"
          >
            {t('downloadWord')} ↓
          </a>
        </p>
      </div>

      <div className="relative size-24 shrink-0 overflow-hidden rounded-xl ring-1 ring-line sm:size-28 print:hidden">
        <BlurringImage
          img={img}
          svg={svg}
          alt="Carlo Gino"
          title="Carlo Gino"
          fill
          sizes="112px"
          className="object-cover"
        />
      </div>
    </header>
  );
}
