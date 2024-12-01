'use client';

import { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import BlogPostDetails from './BlogPostDetails';
import { fetchBlogPost, fetchBlogPosts } from '@/utils/request';
import { useLocale } from 'next-intl';
import { HiArrowLongRight, HiArrowLongLeft } from 'react-icons/hi2';
import Image from 'next/image';
import Spinner from './Spinner';
import { BlogPost } from '@/types/blogPost';
import { Locale, parse } from 'date-fns';
import { bs, sl } from 'date-fns/locale';

const BlogPostPageComponent = ({
  home,
  blogs,
  previousPostText,
  nextPostText,
}: {
  home: string;
  blogs: string;
  previousPostText: string;
  nextPostText: string;
}) => {
  const { slug } = useParams();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const locale = useLocale();

  useEffect(() => {
    console.log('Current locale:', locale);

    const fetchBlogPostData = async () => {
      if (!slug || !locale) {
        console.log('Slug or currentLocale is undefined:', slug, locale);
        return;
      }
      setLoading(true); // Set loading to true before fetching new data
      try {
        const fetchedBlogPost = await fetchBlogPost(slug, locale);
        const fetchedBlogPosts = await fetchBlogPosts(locale);

        const localeMap: { [key: string]: Locale } = {
          sl,
          bs,
        };

        const currentLocale = localeMap[locale] || sl;

        const sortedBlogs = fetchedBlogPosts.sort(
          (a: BlogPost, b: BlogPost) =>
            parse(b.datePosted, 'd. MMMM yyyy', new Date(), {
              locale: currentLocale,
            }).getTime() -
            parse(a.datePosted, 'd. MMMM yyyy', new Date(), {
              locale: currentLocale,
            }).getTime()
        );

        setBlogPost(fetchedBlogPost);
        setBlogPosts(sortedBlogs);
      } catch (error) {
        console.error('Error fetching blogPost:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchBlogPostData(); // Always trigger fetch on component mount or slug change
  }, [slug, locale]); // Re-fetch whenever slug or language changes

  if (!blogPost && !loading) {
    notFound(); // Handle not found scenario
  }

  const currentIndex = blogPosts.findIndex((post) => post.slug === slug);
  const previousIndex =
    currentIndex === 0 ? blogPosts.length - 1 : currentIndex - 1;
  const nextIndex =
    currentIndex === blogPosts.length - 1 ? 0 : currentIndex + 1;

  const previousPost = blogPosts[previousIndex];
  const nextPost = blogPosts[nextIndex];

  return (
    <div className='relative min-h-screen'>
      {loading && (
        <div className='fixed inset-0 flex items-center justify-center'>
          <Spinner loading={loading} />
        </div>
      )}
      {!loading && blogPost && (
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
            {previousPost && (
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
                    <h1 className='uppercase font-bold tracking-widest text-[#aaaaaa] '>
                      {previousPostText}
                    </h1>
                    <div className='font-bold text-lg  lg:max-w-64 '>
                      <HiArrowLongLeft className='inline mr-1' />
                      {previousPost.seoTitle}
                    </div>
                  </div>
                </div>
              </Link>
            )}
            {nextPost && (
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
                    <h1 className='uppercase font-bold tracking-widest text-[#aaaaaa]'>
                      {nextPostText}
                    </h1>
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
      )}
    </div>
  );
};

export default BlogPostPageComponent;
