'use client';
import React, { useMemo, useState } from 'react';
import BlogPostCard from './BlogPostCard';
import { Navigation, Pagination as SwiperPagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { Link } from '@/navigation';
import Pagination from './Pagination';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { BlogPost } from '@/types/blogPost';
import { sortByDate } from '@/utils/sortByDate';

export default function BlogPostsComponent({
  initialBlogs,
  locale,
  readMore,
}: {
  initialBlogs: BlogPost[];
  locale: string;
  readMore: string;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const blogs = useMemo(
    () => sortByDate(initialBlogs, locale, 'datePosted'),
    [initialBlogs, locale],
  );

  const handlePageChange = (value: number) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0 });
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogs.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className='bg-white relative pb-10'>
      <div>
        <Swiper
          modules={[Navigation, SwiperPagination]}
          slidesPerView={1}
          loop={true}
          navigation
          pagination={{ clickable: true }}
          className=''
        >
          {blogs.map((blog, index) => (
            <SwiperSlide key={blog.id} className=''>
              <div className='relative w-full h-96 md:h-[27rem] 3xl:h-[50rem] flex items-center justify-center   animate-fade-right animate-duration-[2000ms] animate-delay-[800ms]'>
                <Image
                  src={blog.featuredImage.url}
                  alt={blog.seoTitle}
                  className='absolute inset-0 w-full h-full object-cover'
                  sizes='100vw'
                  width={0}
                  height={0}
                  priority={index === 0}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60'></div>
                <div className='relative z-10 p-4 mt-24 md:mt-60  text-center text-white space-y-8'>
                  <Link
                    href={{ pathname: '/blogs/[slug]', params: { slug: blog.slug } }}
                    className='text-3xl md:text-5xl lg:text-6xl '
                  >
                    <h2 className='hover:scale-105 md:hover:scale-110 transition duration-150 ease-out hover:ease-in'>
                      {blog.seoTitle}
                    </h2>
                  </Link>
                  <div>
                    <Link
                      href={{ pathname: '/blogs/[slug]', params: { slug: blog.slug } }}
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
      </div>
      <h1 className='m-8 text-3xl md:text-[56px] mb-6 md:mb-16 tracking-wide leading-[1] text-center   animate-fade-right animate-duration-[2000ms] animate-delay-[800ms]'>
        Blog
      </h1>
      <div>
        <div className='space-y-7 md:space-y-0 grid grid-cols-1 md:grid-cols-2 gap-2 xl:gap-16 px-6 xl:grid-cols-3 xl:w-[80rem] mx-auto  animate-fade-right animate-duration-[2000ms] animate-delay-[1200ms]'>
          {currentPosts.map((blog) => (
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
          />
        </div>
      </div>
    </div>
  );
}
