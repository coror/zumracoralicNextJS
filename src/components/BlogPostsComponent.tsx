'use client';
import React, { useMemo, useState } from 'react';
import BlogPostCard from './BlogPostCard';
import { Navigation, Pagination as SwiperPagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { Link } from '@/navigation';
import Pagination from './Pagination';
import MeshGradient from './MeshGradient';

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

  // Hero curated to the 5 most-recent posts so it feels editorial
  // ("featured / recent") instead of duplicating the grid below.
  const heroBlogs = useMemo(() => blogs.slice(0, 5), [blogs]);

  const handlePageChange = (value: number) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0 });
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogs.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className='relative pb-16 md:pb-24'>
      <MeshGradient variant='cream' fixed />

      {/* Hero swiper — 5 latest posts, magazine-cover composition */}
      <div className='relative'>
        <button
          className='blogs-prev hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center text-white/70 hover:text-white transition-colors'
          aria-label='Previous'
          type='button'
        >
          <svg
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='w-9 h-9 lg:w-11 lg:h-11'
          >
            <path d='M15 19l-7-7 7-7' />
          </svg>
        </button>
        <button
          className='blogs-next hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center text-white/70 hover:text-white transition-colors'
          aria-label='Next'
          type='button'
        >
          <svg
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='w-9 h-9 lg:w-11 lg:h-11'
          >
            <path d='M9 5l7 7-7 7' />
          </svg>
        </button>

        <Swiper
          modules={[Navigation, SwiperPagination]}
          slidesPerView={1}
          loop={true}
          navigation={{
            nextEl: '.blogs-next',
            prevEl: '.blogs-prev',
          }}
          pagination={{ clickable: true }}
          className='blogs-hero-swiper'
        >
          {heroBlogs.map((blog, index) => (
            <SwiperSlide key={blog.id}>
              <Link
                href={{
                  pathname: '/blogs/[slug]',
                  params: { slug: blog.slug },
                }}
                className='group relative block w-full h-[22rem] md:h-[28rem] xl:h-[32rem] 3xl:h-[38rem] overflow-hidden'
              >
                <Image
                  src={blog.featuredImage.url}
                  alt={blog.seoTitle}
                  className='absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.04]'
                  sizes='100vw'
                  width={0}
                  height={0}
                  priority={index === 0}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
                {/* Bottom-heavy gradient — image breathes at top, text sits in dark zone */}
                <div className='absolute inset-0 bg-gradient-to-b from-[#222428]/40 via-[#222428]/30 to-[#222428]/85' />

                {/* Magazine-cover text composition: bottom-left anchored */}
                <div className='relative z-10 h-full flex items-end'>
                  <div className='w-full max-w-7xl mx-auto px-6 lg:px-12 pb-16 md:pb-20'>
                    <div className='max-w-3xl text-white animate-fade-up animate-duration-700 animate-delay-[400ms]'>
                      <p className='text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#FFE6BC] mb-4 md:mb-6'>
                        {blog.datePosted}
                      </p>
                      <h2 className='text-3xl md:text-[56px] 4xl:text-[88px] tracking-tight leading-[1.1] mb-6 md:mb-8'>
                        {blog.seoTitle}
                      </h2>
                      <span className='inline-flex items-center gap-2 text-xs md:text-sm font-medium tracking-[0.2em] uppercase border-b border-white/60 pb-1 transition-colors group-hover:text-[#FFE6BC] group-hover:border-[#FFE6BC]'>
                        {readMore}
                        <span
                          aria-hidden='true'
                          className='inline-block transition-transform duration-300 group-hover:translate-x-1'
                        >
                          →
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Editorial section header bridging hero → grid */}
      <div className='pt-20 md:pt-28 pb-14 md:pb-20'>
        <div className='max-w-3xl mx-auto px-6 text-center'>
          <h1 className='text-3xl md:text-[56px] 4xl:text-[88px] tracking-tight leading-[1.1] mb-7 text-[#222428]'>
            Blog
          </h1>
          <span
            aria-hidden='true'
            className='block w-12 h-px bg-[#df650e] mx-auto'
          />
        </div>
      </div>

      {/* Card grid */}
      <div className='max-w-7xl mx-auto px-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-12 xl:gap-16'>
          {currentPosts.map((blog) => (
            <BlogPostCard
              key={blog.id}
              blogPost={blog}
              readMore={readMore}
            />
          ))}
        </div>

        {blogs.length > postsPerPage && (
          <div className='flex justify-center mt-16 md:mt-20'>
            <Pagination
              count={Math.ceil(blogs.length / postsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
