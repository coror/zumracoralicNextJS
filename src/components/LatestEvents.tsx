'use client';
import React, { useMemo } from 'react';
import LatestEventsCard from './LatestEventsCard';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { parse } from 'date-fns';
import { bs, sl } from 'date-fns/locale';
import Reveal from './Reveal';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from '@/navigation';
import { Event } from '@/types/event';
import { sortByDate } from '@/utils/sortByDate';

export default function LatestEvents({
  initialEvents,
  locale,
  sectionTitle,
  button,
}: {
  initialEvents: Event[];
  locale: string;
  sectionTitle: string;
  button: string;
}) {
  const events = useMemo(() => {
    const currentLocale = locale === 'bs' ? bs : sl;
    const now = new Date();
    const past = initialEvents.filter((event) => {
      const eventDate = parse(event.datum, 'd. MMMM yyyy', new Date(), {
        locale: currentLocale,
      });
      return eventDate <= now;
    });
    return sortByDate(past, locale, 'datum').slice(0, 8);
  }, [initialEvents, locale]);

  return (
    <section className='py-16 md:py-24 4xl:py-32'>
      <div className='mx-auto max-w-[1600px]'>
        <Reveal variant='up' delay={100}>
          <h2 className='text-3xl md:text-[56px] 4xl:text-[88px] mb-12 md:mb-16 4xl:mb-24 tracking-wide leading-[1] text-center'>
            {sectionTitle}
          </h2>
        </Reveal>

        <Reveal variant='up' delay={100}>
          <div className='relative max-w-[1100px] lg:max-w-[1100px] xl:max-w-[1300px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] mx-auto lg:px-16 xl:px-20 2xl:px-24'>
            <button
              className='events-prev hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 xl:w-12 xl:h-12 items-center justify-center text-[#222428]/50 hover:text-[#222428] transition-colors'
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
                className='w-7 h-7 xl:w-9 xl:h-9'
              >
                <path d='M15 19l-7-7 7-7' />
              </svg>
            </button>
            <button
              className='events-next hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 xl:w-12 xl:h-12 items-center justify-center text-[#222428]/50 hover:text-[#222428] transition-colors'
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
                className='w-7 h-7 xl:w-9 xl:h-9'
              >
                <path d='M9 5l7 7-7 7' />
              </svg>
            </button>
            <Swiper
              modules={[Navigation, Pagination]}
              slidesPerView={1}
              loop={true}
              navigation={{
                nextEl: '.events-next',
                prevEl: '.events-prev',
              }}
              pagination={{ clickable: true }}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className='!pb-14 md:!pb-16'
            >
              {events.map((event) => (
                <SwiperSlide key={event.id}>
                  <LatestEventsCard
                    headline={event.headline}
                    date={event.datum}
                    featuredImage={event.featuredImage.url}
                    slug={event.slug}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </Reveal>

        <Reveal
          variant='up'
          delay={500}
          className='relative flex flex-col items-center justify-center h-full text-center'
        >
          <Link href='/events'>
            <button className='btn-ghost md:mt-20'>{button}</button>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
