const WAKATIME_LANGUAGES_SVG =
  'https://wakatime.com/share/@codegino/aa8c74ed-2174-445a-805d-e46a869c3b8b.svg';

export type LanguageShare = {name: string; percent: number};

const decodeEntities = (text: string) =>
  text
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&#39;', "'")
    .replaceAll('&quot;', '"');

/**
 * Top languages from the last 7 days, as shares of code-only time.
 *
 * WakaTime only exposes this share as an SVG chart, so the legend entries
 * ("Markdown (39.49%)") are read out of it. A WakaTime JSON share would be
 * sturdier: swap this for it once one is created.
 */
export async function fetchTopLanguages(limit = 6): Promise<LanguageShare[]> {
  try {
    const response = await fetch(WAKATIME_LANGUAGES_SVG, {
      next: {revalidate: 60 * 60 * 24},
    });
    if (!response.ok) return [];

    const svg = await response.text();
    const entries = [...svg.matchAll(/>([^<>]+?) \(([\d.]+)%\)</g)].map(
      ([, name, percent]) => ({
        name: decodeEntities(name.trim()),
        percent: Number(percent),
      }),
    );

    // Image files are tracked by WakaTime but aren't code.
    const code = entries.filter(entry => !entry.name.startsWith('Image'));
    const total = code.reduce((sum, entry) => sum + entry.percent, 0);
    if (!total) return [];

    const top = code
      .filter(entry => entry.name !== 'Other')
      .slice(0, limit)
      .map(entry => ({...entry, percent: (entry.percent / total) * 100}));
    const rest = 100 - top.reduce((sum, entry) => sum + entry.percent, 0);

    return [...top, {name: 'Other', percent: rest}];
  } catch {
    return [];
  }
}
