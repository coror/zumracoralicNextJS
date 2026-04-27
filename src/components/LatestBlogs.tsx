'use client';
import { useInView } from 'react-intersection-observer';
import React, { useEffect, useMemo, useState } from 'react';
import LatestBlogsCard from './LatestBlogsCard';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from '@/navigation';
import { BlogPost } from '@/types/blogPost';
import { sortByDate } from '@/utils/sortByDate';

export default function LatestBlogs({
  initialBlogs,
  locale,
  section,
  sectionTitle,
  sectionTitle2,
  button,
}: {
  initialBlogs: BlogPost[];
  locale: string;
  section: string;
  sectionTitle: string;
  sectionTitle2: string;
  button: string;
}) {
  const [animate, setAnimate] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      setAnimate(true);
    }
  }, [inView]);

  const blogs = useMemo(
    () => sortByDate(initialBlogs, locale, 'datePosted').slice(0, 4),
    [initialBlogs, locale],
  );

  return (
    <div className='bg-white py-10 md:py-24 relative flex flex-col'>
      <div
        className={`mx-auto max-w-[1400px] transition-opacity duration-2000 transform ${
          animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}
        ref={ref}
      >
        <div className='m-8 flex flex-col xl:flex-row xl:justify-between'>
          <div>
            <div>
              <div className='tracking-wider mb-6 md:text-xl'>{section}</div>
              <div
                className={`text-3xl md:text-[56px] mb-6  tracking-wide leading-[1] ${
                  animate
                    ? 'animate-fade-up animate-duration-[1000ms] animate-delay-[500ms]'
                    : ''
                }`}
              >
                {sectionTitle}
              </div>
            </div>
            <div
              className={`text-sm md:text-lg  tracking-wider lg:leading-8 text-[#00000059] mb-6 ${
                animate
                  ? 'animate-fade-up animate-duration-[1000ms] animate-delay-[600ms]'
                  : ''
              }`}
            >
              {sectionTitle2}
            </div>
          </div>

          <div
            className={`relative flex flex-col items-start justify-center h-full text-center  ${
              animate
                ? 'animate-fade-up animate-duration-[1000ms] animate-delay-[600ms]'
                : ''
            }`}
          >
            <Link href='/blogs'>
              <button className='bg-[#ffe6bc] px-5 py-4 md:px-6 md:py-5 text-sm md:mt-20 md:text-xl lg:text-2xl hover:scale-105 md:hover:scale-110 transition duration-150 ease-out hover:ease-in  flex items-center'>
                {button}
              </button>
            </Link>
          </div>
        </div>
        <div
          className={`grid grid-cols-2 gap-2 xl:gap-16 px-6 xl:grid-cols-4 ${
            animate
              ? 'animate-fade-up animate-duration-[1000ms] animate-delay-[800ms]'
              : ''
          }`}
        >
          {blogs.map((blog) => (
            <LatestBlogsCard
              key={blog.id}
              headline={blog.headline}
              date={blog.datePosted}
              featuredImage={blog.featuredImage.url}
              slug={blog.slug}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
