'use client';

import { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import BlogPostDetails from './BlogPostDetails';
import { fetchBlogPost, fetchBlogPosts } from '@/utils/request';
import { useLocale } from 'next-intl';
import { HiArrowLongRight, HiArrowLongLeft } from 'react-icons/hi2';
import Image from 'next/image';

const BlogPostPageComponent = () => {
  const { slug } = useParams();
  const [blogPost, setBlogPost] = useState(null);
  const [blogPosts, setBlogPosts] = useState([]);
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

        setBlogPost(fetchedBlogPost);
        setBlogPosts(fetchedBlogPosts);
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
  const previousIndex = (currentIndex === 0) ? blogPosts.length - 1 : currentIndex - 1;
  const nextIndex = (currentIndex === blogPosts.length - 1) ? 0 : currentIndex + 1;
  
  const previousPost = blogPosts[previousIndex];
  const nextPost = blogPosts[nextIndex];

  return (
    <div className=''>
      {!loading && blogPost && (
        <div>
          <div className=''>
            <BlogPostDetails blogPost={blogPost} />
          </div>

          <div className='mx-4 lg:w-[60rem] lg:mx-auto my-20 flex flex-col lg:flex-row items-center justify-center lg:justify-between space-y-16 lg:space-y-0'>
            {previousPost && (
              <Link href={`/${locale}/blogs/${previousPost.slug}`}>
                <div className='flex flex-row items-center justify-center '>
                  <div className='w-28 h-28  '>
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
                    <h1 className='uppercase font-bold tracking-widest text-[#aaaaaa]'>
                      Previous Post
                    </h1>
                    <div className='font-bold text-lg'>
                      <HiArrowLongLeft className='inline mr-1' />
                      {previousPost.seoTitle}
                    </div>
                  </div>
                </div>
              </Link>
            )}
            {nextPost && (
              <Link href={`/${locale}/blogs/${nextPost.slug}`}>
                <div className='flex flex-row-reverse items-center justify-center  text-right'>
                  <div className='w-28 h-28 '>
                    <Image
                      src={nextPost.featuredImage.url}
                      alt={nextPost.featuredImage.alt}
                      width={0}
                      height={0}
                      sizes='100vw'
                      className='w-full h-full object-cover rounded-full'
                    />
                  </div>
                  <div className='mr-6'>
                    <h1 className='uppercase font-bold tracking-widest text-[#aaaaaa]'>
                      Next Post
                    </h1>
                    <div className='font-bold text-lg'>
                      {nextPost.seoTitle}
                      <HiArrowLongRight className='inline ml-1' />
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>
          <nav className='my-4' aria-label='Breadcrumb'>
            <ol role='list' className='flex items-center px-10'>
              <li>
                <Link
                  href='/'
                  className='text-gray-400 hover:text-gray-600 transition flex items-center flex-row mx-1'
                >
                  Home
                </Link>
              </li>
              <li className='text-gray-400 mx-1'>&gt;</li>
              <li>
                <Link
                  href={`/${locale}/blogs`}
                  className='text-gray-400 hover:text-gray-600 transition flex items-center flex-row mx-1'
                >
                  Blogs
                </Link>
              </li>
              <li className='text-gray-400 mx-1'>&gt;</li>
              <li className='text-gray-600 mx-1'>{blogPost.seoTitle}</li>
            </ol>
          </nav>
        </div>
      )}
    </div>
  );
};

export default BlogPostPageComponent;
