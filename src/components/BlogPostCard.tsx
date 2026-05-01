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
    <article className='group flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_15px_30px_-15px_rgba(34,36,40,0.18)] hover:shadow-[0_25px_50px_-20px_rgba(223,101,14,0.25)] transition-shadow duration-500'>
      <Link href={href} className='block relative w-full aspect-[4/3] overflow-hidden bg-neutral-100'>
        <Image
          src={blogPost.featuredImage.url}
          alt={blogPost.seoTitle}
          className='object-cover transition-transform duration-700 ease-out group-hover:scale-105'
          sizes='(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw'
          fill
        />
      </Link>

      <div className='flex flex-col flex-1 p-6 md:p-7'>
        <p className='text-[10px] md:text-xs tracking-[0.25em] uppercase text-[#df650e] mb-3'>
          {blogPost.datePosted}
        </p>
        <Link href={href}>
          <h3 className='text-xl md:text-2xl leading-snug text-[#222428] line-clamp-2 min-h-[3em] mb-3 transition-colors group-hover:text-[#df650e]'>
            {blogPost.headline}
          </h3>
        </Link>
        <p className='text-sm md:text-base leading-relaxed text-[#222428]/65 line-clamp-3 min-h-[4.5em] mb-6'>
          {truncatedContent}
        </p>
        <Link href={href} className='mt-auto'>
          <span className='inline-flex items-center gap-2 text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-[#222428] hover:text-[#df650e] transition-colors'>
            {readMore}
            <span
              aria-hidden='true'
              className='inline-block transition-transform duration-300 group-hover:translate-x-1'
            >
              →
            </span>
          </span>
        </Link>
      </div>
    </article>
  );
}

export default BlogPostCard;
