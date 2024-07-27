// BlogPostsComponent.js
'use client';
import { fetchBlogPosts } from '@/utils/request';
import { useLocale } from 'next-intl';
import React, { useEffect, useState } from 'react';
import BlogPostCard from './BlogPostCard';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import Link from 'next/link';
import Spinner from './Spinner';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function BlogPostsComponent({ readMore }) {
  const [blogs, setBlogs] = useState([]);
  const locale = useLocale();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedBlogs = await fetchBlogPosts(locale);
        const sortedBlogs = fetchedBlogs.sort(
          (a, b) => new Date(b.datePosted) - new Date(a.datePosted)
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

  return (
    <div className='bg-white relative pb-10'>
      <div>
        {loading ? (
          <div className='flex items-center justify-center h-96 md:h-[44rem]'>
            <Spinner loading={loading} />
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={1}
            loop={true}
            navigation
            pagination={{ clickable: true }}
            className=''
          >
            {blogs.map((blog) => (
              <SwiperSlide key={blog.id} className=''>
                <div className='relative w-full h-96 md:h-[44rem] flex items-center justify-center'>
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
      <div className='m-8 text-3xl md:text-[56px] mb-6 md:mb-16 tracking-wide leading-[1] text-center'>
        Blog
      </div>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <div className='grid grid-cols-1 gap-2 xl:gap-16 px-6 xl:grid-cols-3 lg:w-[80rem] lg:mx-auto'>
          {blogs.map((blog, index) => (
            <div key={blog.id}>
              <BlogPostCard blogPost={blog} readMore={readMore} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
