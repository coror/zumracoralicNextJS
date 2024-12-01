// BlogPostsComponent.js
'use client';
import { fetchBlogPosts } from '@/utils/request';
import { useLocale } from 'next-intl';
import React, { useEffect, useState } from 'react';
import BlogPostCard from './BlogPostCard';
import { Navigation, Pagination as SwiperPagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import Link from 'next/link';
import Spinner from './Spinner';
import { Pagination } from '@mui/material';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { BlogPost } from '@/types/blogPost';
import { Locale, parse } from 'date-fns';
import { bs, sl } from 'date-fns/locale';

export default function BlogPostsComponent({ readMore }: { readMore: string }) {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const locale = useLocale();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedBlogs = await fetchBlogPosts(locale);

        const localeMap: { [key: string]: Locale } = {
          sl: sl,
          bs: bs,
        };

        const currentLocale = localeMap[locale] || sl;

        const sortedBlogs = fetchedBlogs.sort(
          (a: BlogPost, b: BlogPost) =>
            parse(b.datePosted, 'd. MMMM yyyy', new Date(), {
              locale: currentLocale,
            }).getTime() -
            parse(a.datePosted, 'd. MMMM yyyy', new Date(), {
              locale: currentLocale,
            }).getTime()
        );
        setBlogs(sortedBlogs);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [locale]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  // Pagination logic: slice the blogs array to show only the posts for the current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogs.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className='bg-white relative pb-10'>
      <div>
        {loading ? (
          <div className='flex items-center justify-center h-96 md:h-[44rem]'>
            <Spinner loading={loading} />
          </div>
        ) : (
          <Swiper
            modules={[Navigation, SwiperPagination]}
            slidesPerView={1}
            loop={true}
            navigation
            pagination={{ clickable: true }}
            className=''
          >
            {blogs.map((blog) => (
              <SwiperSlide key={blog.id} className=''>
                <div className='relative w-full h-96 md:h-[27rem] 3xl:h-[50rem] flex items-center justify-center   animate-fade-right animate-duration-[2000ms] animate-delay-[800ms]'>
                  <Image
                    src={blog.featuredImage.url}
                    alt={blog.seoTitle}
                    className='absolute inset-0 w-full h-full object-cover'
                    sizes='100vw'
                    width={0}
                    height={0}
                    priority
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60'></div>
                  <div className='relative z-10 p-4 mt-24 md:mt-60  text-center text-white space-y-8'>
                    <Link
                      href={`/${locale}/blogs/${blog.slug}`}
                      className='text-3xl md:text-5xl lg:text-6xl '
                    >
                      <h1 className='hover:scale-105 md:hover:scale-110 transition duration-150 ease-out hover:ease-in'>
                        {blog.seoTitle}
                      </h1>
                    </Link>
                    <div>
                      <Link
                        href={`/${locale}/blogs/${blog.slug}`}
                        className='mt-4 inline-block bg-transparent text-white px-6 py-2 rounded-lg md:text-lg font-medium border-2 border-white md:hover:bg-white md:hover:text-black'
                      >
                        {readMore}
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      <div className='m-8 text-3xl md:text-[56px] mb-6 md:mb-16 tracking-wide leading-[1] text-center   animate-fade-right animate-duration-[2000ms] animate-delay-[800ms]'>
        Blog
      </div>
      <div>
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <>
            <div className='space-y-7 md:space-y-1 grid grid-cols-1 md:grid-cols-2 gap-2 xl:gap-16 px-6 xl:grid-cols-3 xl:w-[80rem] mx-auto  animate-fade-right animate-duration-[2000ms] animate-delay-[1200ms]'>
              {currentPosts.map((blog, index) => (
                <div key={blog.id}>
                  <BlogPostCard blogPost={blog} readMore={readMore} />
                </div>
              ))}
            </div>
            <div className='flex justify-center mt-8'>
              <Pagination
                count={Math.ceil(blogs.length / postsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                shape='rounded'
                variant='outlined'
                color='primary'
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
