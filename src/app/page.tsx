import type {NextPage} from 'next';
import AboutBlurb from '../components/home/AboutBlurb';
import CodingActivity from '../components/home/CodingActivity';
import HomeTerminal from '../components/home/HomeTerminal';
import LatestWriting from '../components/home/LatestWriting';
import NewsletterCard from '../components/home/NewsletterCard';
import NowPanel from '../components/home/NowPanel';
import SideProjects from '../components/home/SideProjects';
import {newCommonMetaTags} from '../frontend-utils/meta-tags';
import {getBlurringImage} from '../utils/contentful.utils';
import {getBlogsMetadata} from '../utils/mdx.utils';

export const metadata = {
  ...newCommonMetaTags('Home Page', '/'),
  title: 'Home Page | Code Gino | Carlo Gino Catapang',
};

const HomePage: NextPage = async () => {
  const {
    props: {profileImage, profileSvg, blogs},
  } = await getStaticProps();

  return (
    <>
      <script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'http://schema.org/',
            '@type': 'Person',
            name: 'Carlo Gino Catapang',
            jobTitle: 'Senior Software Engineer',
            url: 'https://carlogino.com',
          }),
        }}
      />
      <main className="mx-auto max-w-6xl px-5">
        <div className="grid gap-6 py-10 lg:grid-cols-[1.5fr_1fr] lg:py-14">
          <HomeTerminal />
          <NowPanel img={profileImage} svg={profileSvg} latestBlog={blogs[0]} />
        </div>

        <div className="grid gap-12 border-t border-line py-12 lg:grid-cols-[1fr_320px]">
          <LatestWriting blogs={blogs} />
          <aside className="space-y-10 lg:sticky lg:top-20 lg:self-start">
            <SideProjects />
            <AboutBlurb />
            <NewsletterCard />
          </aside>
        </div>

        <CodingActivity />
      </main>
    </>
  );
};

const getStaticProps = async () => {
  const {img: profileImage, svg: profileSvg} = await getBlurringImage(
    'profile_picture.jpg',
  );

  const blogs = (await getBlogsMetadata())
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return {
    props: {
      blogs,
      profileImage,
      profileSvg,
    },
  };
};

export default HomePage;
