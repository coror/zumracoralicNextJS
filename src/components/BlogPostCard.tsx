import Image from 'next/image';
import { Link } from '@/navigation';
import { truncateText } from '@/datalayer/contentful/utils';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BlogPost } from '@/types/blogPost';

function BlogPostCard({
  blogPost,
  readMore,
}: {
  readMore: string;
  blogPost: BlogPost;
}) {
  const truncatedContent = truncateText(
    documentToHtmlString(blogPost.content),
    150,
  );

  const href = {
    pathname: '/blogs/[slug]' as const,
    params: { slug: blogPost.slug },
  };

  return (
    <div className='xl:max-w-[35rem] rounded overflow-hidden shadow-lg'>
      <div className='relative w-full h-64 md:h-64 group'>
        <Link href={href}>
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
        <Link href={href}>
          <p className='inline-flex items-center gap-2 text-sm font-medium tracking-wide uppercase text-[#222428] mt-4 hover:text-[#df650e] transition-colors'>
            {readMore} <span aria-hidden='true'>→</span>
          </p>
        </Link>
      </div>
    </div>
  );
}

export default BlogPostCard;
