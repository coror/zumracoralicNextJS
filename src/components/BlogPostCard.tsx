'use client';
import Image from 'next/image';
import Link from 'next/link';
import { truncateText } from '@/datalyer/contentful/utils';
import { useLocale } from 'next-intl';

function BlogPostCard({ blogPost, readMore, isFeatured }) {
  const truncatedContent = truncateText(blogPost.content, 170);
  const locale = useLocale();

  const blogPostsLink = `/${locale}/blog/${blogPost.slug}`;

  return (
    <div className='flex flex-col my-2 items-center justify-center'>
      {/* Image Container */}
      <div
        className={`w-full h-64 ${isFeatured ? 'md:h-[600px]' : ' md:h-72'}`}
      >
        <Image
          src={blogPost.featuredImage.url}
          alt={blogPost.seoTitle}
          className='w-full h-full object-cover'
          sizes='100vw'
          width={0}
          height={0}
        />
      </div>

      {/* Text Content */}
      <div className='mt-4 flex flex-col items-left md:space-y-2'>
        <h3
          className={`text-xl md:text-4xl my-2  ${
            isFeatured ? 'text-lg' : ''
          }`}
        >
          {blogPost.headline}
        </h3>
        <p className=' text-xs md:text-lg text-[#00000059]'>
          {blogPost.datePosted}
        </p>
        <p className=' text-sm md:text-xl  text-[#000000]/70'>{truncatedContent}</p>
        <Link
          href={blogPostsLink}
          className=' text-sm text-blue-600 underline mt-2'
        >
          {readMore}
        </Link>
      </div>
    </div>
  );
}

export default BlogPostCard;
