'use client';
import { useInView } from 'react-intersection-observer';
import React, { useEffect, useState } from 'react';
import LatestBlogsCard from './LatestBlogsCard';
import { useLocale } from 'next-intl';
import { fetchBlogPosts } from '../utils/request';
import { IoBookmarkOutline } from 'react-icons/io5';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';

export default function LatestBlogs({
  section,
  sectionTitle,
  sectionTitle2,
  button,
}) {
  const [blogs, setBlogs] = useState([]);

  const [animate, setAnimate] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // When the component comes into view, set animate to true
  useEffect(() => {
    if (inView) {
      setAnimate(true);
    }
  }, [inView]);

  const locale = useLocale();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedBlogs = await fetchBlogPosts(locale);
        console.log(fetchedBlogs);
        // Sort blogs by 'datum' in descending order and limit to the most recent 8
        const sortedBlogs = fetchedBlogs
          .sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted))
          .slice(0, 4);
        setBlogs(sortedBlogs);
      } catch (error) {
        console.error('Error fetching data in LatestBlogsComponent', error);
      }
    };
    fetchData();
  }, [locale]);

  return (
    <div className='bg-white py-10 md:py-24 relative flex flex-col ' ref={ref}>
      <div className='max-w-[1400px] mx-auto'>
        <div className='m-8 flex flex-col xl:flex-row xl:justify-between'>
          <div>
            <div>
              <div className='tracking-wider mb-6 md:text-xl'>{section}</div>
              <div
                className={`text-3xl md:text-[56px] mb-6  tracking-wide leading-[1] ${
                  animate
                    ? 'animate-fade-up animate-duration-[1000ms] animate-delay-[1000ms]'
                    : ''
                }`}
              >
                {sectionTitle}
              </div>
            </div>
            <div
              className={`text-sm md:text-lg  tracking-wider lg:leading-8 text-[#00000059] mb-6 ${
                animate
                  ? 'animate-fade-up animate-duration-[1000ms] animate-delay-[1200ms]'
                  : ''
              }`}
            >
              {sectionTitle2}
            </div>
          </div>

          <div
            className={`relative flex flex-col items-start justify-center h-full text-center  ${
              animate
                ? 'animate-fade-up animate-duration-[1000ms] animate-delay-[1200ms]'
                : ''
            }`}
          >
            <Link href='/contact'>
              <button className='bg-[#d2ab74] px-5 py-4 md:px-6 md:py-5 text-sm md:mt-20 md:text-xl lg:text-2xl hover:scale-105 md:hover:scale-110 transition duration-150 ease-out hover:ease-in hover:bg-[#b7905b] flex items-center'>
                {button}
              </button>
            </Link>
          </div>
        </div>
        {blogs.length > 0 ? (
          <div
            className={`grid grid-cols-2 gap-2 xl:gap-16 px-6 xl:grid-cols-4 ${
              animate
                ? 'animate-fade-up animate-duration-[1000ms] animate-delay-[1600ms]'
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
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}
