'use client';
import { useInView } from 'react-intersection-observer';
import React, { useEffect, useState } from 'react';
import LatestBlogsCard from './LatestBlogsCard';
import { useLocale } from 'next-intl';
import { fetchBlogPosts } from '../utils/request';
import Spinner from './Spinner';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';
import { BlogPost } from '@/types/blogPost';
import { Locale, parse } from 'date-fns';
import { bs, sl } from 'date-fns/locale'; // Add locales you need

export default function LatestBlogs({
  section,
  sectionTitle,
  sectionTitle2,
  button,
}: {
  section: string;
  sectionTitle: string;
  sectionTitle2: string;
  button: string;
}) {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

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
        setLoading(true);
        const fetchedBlogs = await fetchBlogPosts(locale);

        const localeMap: { [key: string]: Locale } = {
          sl: sl,
          bs: bs,
        };

        const currentLocale = localeMap[locale] || sl;

        // Sort blogs by 'datum' in descending order and limit to the most recent 8
        const sortedBlogs = fetchedBlogs
          .sort(
            (a: BlogPost, b: BlogPost) =>
              parse(b.datePosted, 'd. MMMM yyyy', new Date(), {
                locale: currentLocale,
              }).getTime() -
              parse(a.datePosted, 'd. MMMM yyyy', new Date(), {
                locale: currentLocale,
              }).getTime()
          )
          .slice(0, 4);
        setBlogs(sortedBlogs);
      } catch (error) {
        console.error('Error fetching data in LatestBlogsComponent', error);
      } finally {
        setLoading(false);
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
            <Link href={`${locale}/blog`}>
              <button className='bg-[#ffe6bc] px-5 py-4 md:px-6 md:py-5 text-sm md:mt-20 md:text-xl lg:text-2xl hover:scale-105 md:hover:scale-110 transition duration-150 ease-out hover:ease-in  flex items-center'>
                {button}
              </button>
            </Link>
          </div>
        </div>
        {loading ? (
          <Spinner loading={loading} />
        ) : (
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
        )}
      </div>
    </div>
  );
}
