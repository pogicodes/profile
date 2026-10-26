'use client';
import {useEffect, useRef, useSyncExternalStore} from 'react';
import {useTheme} from 'next-themes';
import {GitHubCalendar} from 'react-github-calendar';

const calendarTheme = {
  light: ['#e4e1d7', '#b9dcc2', '#7cc296', '#3f9a5c', '#1f7a3a'],
  dark: ['#1c2119', '#1d4a2a', '#2a7a42', '#3fb465', '#5ee08a'],
};

// react-activity-calendar renders different markup on the server, so it only
// renders after hydration.
const emptySubscribe = () => () => {};

export default function ContributionCalendar() {
  const {resolvedTheme} = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  // The calendar loads async and scrolls inside its own container; once it
  // overflows, jump to the newest month so phones see recent activity first.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      container.querySelectorAll<HTMLElement>('*').forEach(element => {
        if (element.scrollWidth > element.clientWidth) {
          element.scrollLeft = element.scrollWidth;
        }
      });
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="my-auto min-h-[150px] overflow-x-auto pb-1 text-xs text-ink-muted [&_*]:text-[length:inherit]"
    >
      {isMounted ? (
        <GitHubCalendar
          username="pogicodes"
          theme={calendarTheme}
          colorScheme={resolvedTheme === 'dark' ? 'dark' : 'light'}
          blockSize={10}
          blockMargin={3}
          blockRadius={2}
          fontSize={12}
        />
      ) : null}
    </div>
  );
}
