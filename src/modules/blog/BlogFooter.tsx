'use client';

import {FaEnvelopeOpenText} from '@react-icons/all-files/fa/FaEnvelopeOpenText';
import {FaTwitter} from '@react-icons/all-files/fa/FaTwitter';
import Coffee from '../../components/Coffee';
import SubscribeButton from '../../components/basic/Button';
import NextLink from '../../components/basic/NextLink';
import {IBlogMetadata} from '../../models/mdxFiles';
import ShareToSocialMedia from './ShareToSocialMedia';

const BlogFooter = ({blog}: {blog: IBlogMetadata}) => {
  return (
    <footer className="m-auto flex w-full flex-col text-center">
      <ShareToSocialMedia blog={blog} />

      <p className="my-4 text-neutral-700 dark:text-neutral-300">
        If you find this useful and you want to support me
      </p>
      <Coffee />

      <p className="my-4 text-neutral-700 dark:text-neutral-300">
        Get latest updates directly into your mailbox.
      </p>
      <form action={`/#subscribe`} className="flex justify-center">
        <SubscribeButton className="flex items-center bg-primary-900 px-5 font-semibold">
          <FaEnvelopeOpenText size={25} className="mr-2 text-white" />
          <span className="text-white">Subscribe to my Newsletter</span>
        </SubscribeButton>
      </form>

      <p className="mb-2 mt-4 text-neutral-700 dark:text-neutral-300">
        <i>Connect with me</i>
      </p>
      <NextLink
        href="https://x.com/pogicodes"
        aria-label="Follow me on Twitter"
        target="_blank"
        className="mt-2"
        rel="noreferrer"
      >
        <span className="relative h-10 rounded-3xl bg-[#1da1f2] px-6 py-2 text-white hover:shadow-xs hover:shadow-neutral-800">
          <FaTwitter /> Follow @codegino
        </span>
      </NextLink>
    </footer>
  );
};

export default BlogFooter;
