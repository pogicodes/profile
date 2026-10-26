'use client';
import {GitHubCalendar} from 'react-github-calendar';
import NextLink from './basic/NextLink';
import {useTranslation} from '@/app/i18n/client';
import {Zoom} from 'react-awesome-reveal';

export default function CustomGithubCalendar() {
  const {t} = useTranslation('resume');

  return (
    <Zoom triggerOnce>
      <div className="my-10 flex flex-col items-center rounded-xl p-1 dark:bg-neutral-800">
        <p className="mb-5 text-lg">
          <>
            {t('my')}&nbsp;
            <NextLink
              href="https://github.com/pogicodes"
              target="_blank"
              aria-label="Github profile"
              rel="noreferrer"
              title="Link to my Github profile"
              className="underline-on-hover underline--dark text-lg text-primary-900 dark:text-primary-300"
            >
              Github
            </NextLink>
            &nbsp;{t('activity')}
          </>
        </p>

        <div className="max-w-lg overflow-x-auto pb-4  sm:max-w-6xl [&_.react-activity-calendar]:px-10">
          <GitHubCalendar
            username="pogicodes"
            fontSize={30}
            blockMargin={4}
            blockRadius={1}
            blockSize={12}
          ></GitHubCalendar>
        </div>
      </div>
    </Zoom>
  );
}
