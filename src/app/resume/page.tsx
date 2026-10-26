import {NextPage} from 'next';
import {newCommonMetaTags} from '../../frontend-utils/meta-tags';
import {getBlurringImage} from '../../utils/contentful.utils';
import {fectchExperiences, fetchSkills} from '../../utils/resume-props';
import ResumeContact from './ResumeContact';
import ResumeExperience from './ResumeExperience';
import ResumeHeader from './ResumeHeader';
import ResumeSkills from './ResumeSkills';

export const metadata = {
  ...newCommonMetaTags('Resume Page', '/resume'),
  title: 'Carlo Gino Catapang | Code Gino | Resume',
};

const ResumePage: NextPage = async () => {
  const {
    props: {
      workExperiences,
      educationExperiences,
      skills,
      profileSvg,
      profileImage,
      resumePdfUrl,
      resumeWordUrl,
    },
  } = await getStaticProps();

  return (
    <main className="mx-auto max-w-3xl px-5 py-12 sm:py-16 print:max-w-none print:p-0">
      <ResumeHeader
        img={profileImage}
        svg={profileSvg}
        resumePdfUrl={resumePdfUrl}
        resumeWordUrl={resumeWordUrl}
      />
      <ResumeExperience
        workExperiences={workExperiences}
        educationExperiences={educationExperiences}
      />
      <ResumeSkills skills={skills} />
      <ResumeContact />
    </main>
  );
};

const getStaticProps = async () => {
  const experiences = await fectchExperiences();
  const skills = await fetchSkills();

  const {img, svg} = await getBlurringImage('profile_picture.jpg');

  // Stored in Supabase Storage (public bucket: "resume").
  // To publish an update, upload over the same object name so these URLs stay valid.
  const resumeBaseUrl =
    'https://wqxykwsooyvgyappeyat.supabase.co/storage/v1/object/public/resume';
  const resumePdfUrl = `${resumeBaseUrl}/carlo-gino-catapang-resume.pdf`;
  const resumeWordUrl = `${resumeBaseUrl}/carlo-gino-catapang-resume.docx`;

  return {
    props: {
      ...experiences,
      skills,
      resumePdfUrl,
      resumeWordUrl,
      profileImage: img,
      profileSvg: svg,
    },
  };
};

export default ResumePage;
