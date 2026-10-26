import SectionLabel from '../../components/SectionLabel';
import type {CategorizedSkill, Skill} from '../../models/skill';
import {createTranslation} from '../i18n/server';

const byLevelDesc = (a: Skill, b: Skill) => b.level - a.level;

function SkillList({skills}: {skills: Skill[]}) {
  return (
    <ul className="m-0 flex list-none flex-wrap gap-x-1 p-0">
      {[...skills].sort(byLevelDesc).map((skill, index) => (
        <li key={skill.id}>
          <a
            href={skill.url}
            target="_blank"
            rel="noreferrer"
            className="hover:text-accent"
          >
            {skill.name}
          </a>
          {index < skills.length - 1 ? (
            <span aria-hidden className="text-ink-muted">
              ,
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

export default async function ResumeSkills({
  skills,
}: {
  skills: CategorizedSkill[];
}) {
  const {t} = await createTranslation('resume');

  const highlights =
    skills.find(group => group.category === 'highlights')?.skills ?? [];
  const groups = [
    ...(highlights.length ? [{label: t('coreStack'), skills: highlights}] : []),
    ...skills
      .filter(
        group => group.category !== 'highlights' && group.skills.length > 0,
      )
      .map(group => ({label: group.category, skills: group.skills})),
  ];

  return (
    <section
      id="skills"
      aria-labelledby="resume-skills"
      className="mt-14 print:mt-8"
    >
      <SectionLabel id="resume-skills">{t('skills')}</SectionLabel>
      <dl className="m-0 grid gap-x-8 gap-y-3 sm:grid-cols-[9.5rem_minmax(0,1fr)]">
        {groups.map(group => (
          <div key={group.label} className="contents">
            <dt className="font-mono text-xs text-ink-muted lowercase sm:pt-1">
              {group.label}
            </dt>
            <dd className="m-0 mb-2 sm:mb-0">
              <SkillList skills={group.skills} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
