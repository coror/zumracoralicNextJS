import Link from 'next/link';
import BlogPostDetails from './BlogPostDetails';
import { HiArrowLongRight, HiArrowLongLeft } from 'react-icons/hi2';
import Image from 'next/image';
import { BlogPost } from '@/types/blogPost';
import { Locale, parse } from 'date-fns';
import { bs, sl } from 'date-fns/locale';

const BlogPostPageComponent = ({
  initialBlogPost,
  initialBlogPosts,
  locale,
  home,
  blogs,
  previousPostText,
  nextPostText,
}: {
  initialBlogPost: BlogPost;
  initialBlogPosts: BlogPost[];
  locale: string;
  home: string;
  blogs: string;
  previousPostText: string;
  nextPostText: string;
}) => {
  const localeMap: { [key: string]: Locale } = { sl, bs };
  const currentLocale = localeMap[locale] || sl;

  const sortedBlogs = [...initialBlogPosts].sort(
    (a, b) =>
      parse(b.datePosted, 'd. MMMM yyyy', new Date(), {
        locale: currentLocale,
      }).getTime() -
      parse(a.datePosted, 'd. MMMM yyyy', new Date(), {
        locale: currentLocale,
      }).getTime(),
  );

  const blogPost = initialBlogPost;
  const slug = blogPost.slug;

  const currentIndex = sortedBlogs.findIndex((post) => post.slug === slug);
  const previousIndex =
    currentIndex === 0 ? sortedBlogs.length - 1 : currentIndex - 1;
  const nextIndex =
    currentIndex === sortedBlogs.length - 1 ? 0 : currentIndex + 1;

  const previousPost = sortedBlogs[previousIndex];
  const nextPost = sortedBlogs[nextIndex];

  return (
    <div className='relative min-h-screen'>
      <div>
        <div>
          <BlogPostDetails
            blogPost={blogPost}
            locale={locale}
            home={home}
            blogs={blogs}
          />
        </div>

        <div className='mx-4 lg:w-[60rem]  lg:mx-auto my-20 lg:mt-44 flex flex-col lg:flex-row items-center justify-center lg:justify-between space-y-16 lg:space-y-0'>
          {previousPost && previousPost.slug !== slug && (
            <Link href={`/${locale}/blogs/${previousPost.slug}`}>
              <div className='flex flex-row  justify-center w-full h-auto group'>
                <div className='w-28 h-28  min-w-32 min-h-32 transition ease-in-out group-hover:brightness-75'>
                  <Image
                    src={previousPost.featuredImage.url}
                    alt={previousPost.featuredImage.alt}
                    width={0}
                    height={0}
                    sizes='100vw'
                    className='w-full h-full object-cover rounded-full'
                  />
                </div>
                <div className='ml-6'>
                  <span className='uppercase font-bold tracking-widest text-[#aaaaaa] block'>
                    {previousPostText}
                  </span>
                  <div className='font-bold text-lg  lg:max-w-64 '>
                    <HiArrowLongLeft className='inline mr-1' />
                    {previousPost.seoTitle}
                  </div>
                </div>
              </div>
            </Link>
          )}
          {nextPost && nextPost.slug !== slug && (
            <Link href={`/${locale}/blogs/${nextPost.slug}`}>
              <div className='flex flex-row-reverse  justify-center text-right group'>
                <div className='w-28 h-28  min-w-32 min-h-32 transition ease-in-out group-hover:brightness-75'>
                  <Image
                    src={nextPost.featuredImage.url}
                    alt={nextPost.featuredImage.alt}
                    width={0}
                    height={0}
                    sizes='100vw'
                    className='w-full h-full object-cover rounded-full'
                  />
                </div>
                <div className='mr-6 text-right'>
                  <span className='uppercase font-bold tracking-widest text-[#aaaaaa] block'>
                    {nextPostText}
                  </span>
                  <div className='font-bold text-lg  lg:max-w-64 text-right'>
                    {nextPost.seoTitle}
                    <HiArrowLongRight className='inline ml-1' />
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPostPageComponent;
