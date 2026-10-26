import Image, {type ImageProps} from 'next/image';

const BlogImg = ({width = 1100, height = 600, ...props}: ImageProps) => (
  <span className="my-8 block">
    <Image
      {...props}
      width={width}
      height={height}
      alt={props.alt || 'An image of a blog post'}
      title={props.title || 'An image of a blog post'}
      placeholder="blur"
      sizes="(max-width: 768px) 100vw, 720px"
      className="h-auto w-full rounded-lg object-contain object-center"
      blurDataURL="/assets/blog-placeholder.jpeg"
    />
  </span>
);

export default BlogImg;
