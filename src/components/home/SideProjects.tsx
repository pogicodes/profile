import {createTranslation} from '@/app/i18n/server';
import SectionLabel from './SectionLabel';
import {sideProjects} from './side-projects';

export default async function SideProjects() {
  const {t} = await createTranslation('home');

  return (
    <section aria-labelledby="side-projects">
      <SectionLabel id="side-projects">{t('sideProjects.kicker')}</SectionLabel>
      <ul className="m-0 list-none space-y-4 p-0">
        {sideProjects.map(project => (
          <li key={project.key}>
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="group block"
            >
              <span className="text-sm font-semibold group-hover:text-accent">
                {project.name} ↗
              </span>
              <span className="block text-sm text-ink-muted">
                {t(`sideProjects.${project.key}.description`)}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
