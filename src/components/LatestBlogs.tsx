import React, { useMemo } from 'react';
import LatestBlogsCard from './LatestBlogsCard';
import Reveal, { RevealStagger } from './Reveal';

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
  const blogs = useMemo(
    () => sortByDate(initialBlogs, locale, 'datePosted').slice(0, 4),
    [initialBlogs, locale],
  );

  return (
    <section className='py-16 md:py-24 4xl:py-32 flex flex-col'>
      <div className='mx-auto max-w-[1400px] 2xl:max-w-[1700px] 3xl:max-w-[1900px] px-6'>
        <div className='mb-12 md:mb-16 4xl:mb-24 flex flex-col xl:flex-row xl:justify-between'>
          <div>
            <Reveal variant='up' delay={100}>
              <div className='tracking-wider mb-6 md:text-xl 4xl:text-2xl uppercase text-[#222428]/60'>
                {section}
              </div>
            </Reveal>
            <Reveal variant='up' delay={250}>
              <h2 className='text-3xl md:text-[56px] 4xl:text-[88px] mb-6 4xl:mb-10 tracking-wide leading-[1]'>
                {sectionTitle}
              </h2>
            </Reveal>
            <Reveal variant='fade' delay={400}>
              <p className='text-sm md:text-lg 4xl:text-2xl tracking-wider lg:leading-8 4xl:leading-[2.25rem] text-[#00000059] mb-6'>
                {sectionTitle2}
              </p>
            </Reveal>
          </div>

          <Reveal
            variant='up'
            delay={500}
            className='relative flex flex-col items-start justify-center h-full text-center'
          >
            <Link href='/blogs'>
              <button className='btn-ghost md:mt-20'>{button}</button>
            </Link>
          </Reveal>
        </div>

        <RevealStagger
          variant='up'
          gap={70}
          startDelay={100}
         
          className='grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10 xl:gap-12 xl:grid-cols-4'
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
        </RevealStagger>
      </div>
    </section>
  );
}
