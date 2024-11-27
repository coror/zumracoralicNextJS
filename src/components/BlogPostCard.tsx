'use client';
import Image from 'next/image';
import Link from 'next/link';
import { truncateText } from '@/datalyer/contentful/utils';
import { useLocale } from 'next-intl';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BlogPost } from '@/types/blogPost';
import { Locale } from 'date-fns';
import { bs, sl } from 'date-fns/locale';

function BlogPostCard({
  blogPost,
  readMore,
}: {
  readMore: string;
  blogPost: BlogPost;
}) {
  const truncatedContent = truncateText(
    documentToHtmlString(blogPost.content),
    150
  );
  const locale = useLocale();

  // const localeMap: { [key: string]: Locale } = {
  //   sl,
  //   bs,
  // };

  // const currentLocale = localeMap[locale] || sl;

  // if (blogPost.datePosted.endsWith('.')) {
  //   return {
  //     ...blogPost,
  //     datePosted: blogPost.datePosted.slice(0, -1),
  //   };
  // }

  const blogPostsLink = `/${locale}/blogs/${blogPost.slug}`;

  return (
    <div className='max-w-sm rounded overflow-hidden shadow-lg'>
      {/* Image Container */}
      <div className='relative w-full h-64 md:h-64 group'>
        <Link href={blogPostsLink}>
          <Image
            src={blogPost.featuredImage.url}
            alt={blogPost.seoTitle}
            className='w-full h-full object-cover rounded-t transition ease-in-out group-hover:brightness-90 cursor-pointer'
            sizes='100vw'
            width={0}
            height={0}
          />
        </Link>
      </div>

      {/* Text Content */}
      <div className='p-4'>
        <h3 className='text-xl md:text-2xl font-bold my-2 text-gray-800 line-clamp-2 min-h-[3em] '>
          {blogPost.headline}
        </h3>
        <p className='text-xs md:text-sm text-gray-500 mb-2 min-h-[3em]'>
          {blogPost.datePosted}
        </p>
        <p className='text-sm md:text-base text-gray-700 mb-4 line-clamp-3 min-h-[4em]'>
          {truncatedContent}
        </p>
        <Link href={blogPostsLink}>
          <p className=' text-black  bg-[#FFE6BC] py-2 px-4 inline-block mt-2 transition-all duration-300 md:hover:bg-[#f99d5b] md:hover:bg-transparent border-2 border-[#FFE6BC] '>
            {readMore}...
          </p>
        </Link>
      </div>
    </div>
  );
}

export default BlogPostCard;
