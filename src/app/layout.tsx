import {Viewport} from 'next';
import GlobalEffects from './global-effects';
import {Providers} from './providers';
import {IBM_Plex_Mono, IBM_Plex_Sans} from 'next/font/google';
import {twMerge} from 'tailwind-merge';
import {LocaleProvider} from './hooks/locale-provider';
import Header from '@/components/header/Header';
import Footer from '@/components/Footer';
import '../../styles/tailwind.css';
import '../styles/animations.css';
import '../styles/custom.css';
import {FALLBACK_LOCALE} from './i18n/settings';
import {SpeedInsights} from '@vercel/speed-insights/next';

export const viewport: Viewport = {
  themeColor: [
    {
      media: '(prefers-color-scheme: dark)',
      color: 'black',
    },
    {
      media: '(prefers-color-scheme: light)',
      color: 'white',
    },
  ],
};

export const dynamic = 'force-static';

export const metadata = {
  metadataBase: new URL(process.env.CNAME as string),
  verification: {
    google: process.env.NEXT_PUBLIC_GOOOGLE_SITE_VERIFICATION,
  },
  authors: [
    {
      name: 'Carlo Gino Catapang',
    },
  ],
  keywords: [
    'React',
    'React Native',
    'Javascript',
    'Typescript',
    'Remix',
    'NodeJS',
    'HTML',
    'CSS',
  ],
};

// next/font self-hosts these and generates size-adjusted fallbacks, so text
// doesn't shift when the web fonts swap in.
const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plex-sans',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-mono',
});

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html
      lang={FALLBACK_LOCALE}
      className={twMerge(plexSans.variable, plexMono.variable)}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="stylesheet"
          href="https://sdk.birdeatsbug.com/latest/style.css"
        ></link>
      </head>
      <body>
        <LocaleProvider value={FALLBACK_LOCALE}>
          <Providers>
            <Header />
            {children}
            <Footer />
          </Providers>
        </LocaleProvider>
        <SpeedInsights />
        <GlobalEffects />
      </body>
    </html>
  );
}
