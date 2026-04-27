'use client';
import { useInView } from 'react-intersection-observer';
import React, { useEffect, useMemo, useState } from 'react';
import LatestEventsCard from './LatestEventsCard';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Locale, parse } from 'date-fns';
import { bs, sl } from 'date-fns/locale';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';
import { Event } from '@/types/event';

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

  const events = useMemo(() => {
    const localeMap: { [key: string]: Locale } = { sl, bs };
    const currentLocale = localeMap[locale] || sl;
    const now = new Date();

    return [...initialEvents]
      .filter((event) => {
        const eventDate = parse(event.datum, 'd. MMMM yyyy', new Date(), {
          locale: currentLocale,
        });
        return eventDate <= now;
      })
      .sort(
        (a, b) =>
          parse(b.datum, 'd. MMMM yyyy', new Date(), {
            locale: currentLocale,
          }).getTime() -
          parse(a.datum, 'd. MMMM yyyy', new Date(), {
            locale: currentLocale,
          }).getTime(),
      )
      .slice(0, 8);
  }, [initialEvents, locale]);

  return (
    <div className='bg-white py-10 md:py-24 relative'>
      <div
        className={`mx-auto max-w-[1600px] transition-opacity duration-2000 transform ${
          animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}
        ref={ref}
      >
        <div
          className={`m-8 text-3xl md:text-[56px] mb-6 md:mb-16 tracking-wide leading-[1] text-center ${
            animate
              ? 'animate-fade-up animate-duration-[1000ms] animate-delay-[500ms]'
              : ''
          }`}
        >
          {sectionTitle}
        </div>
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={1}
          loop={true}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1280: {
              slidesPerView: 3,
            },
          }}
          className={`max-w-[1600px]  ${
            animate
              ? 'animate-fade-up animate-duration-[1000ms] animate-delay-[600ms]'
              : ''
          }`}
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

        <div
          className={`relative flex flex-col items-center justify-center h-full text-center ${
            animate
              ? 'animate-fade-up animate-duration-[1000ms] animate-delay-[750ms]'
              : ''
          }`}
        >
          <Link href={`${locale}/events`}>
            <button className='bg-[#FFE6BC]  px-5 py-4 md:px-6 md:py-5 text-sm md:mt-20 md:text-xl lg:text-2xl hover:scale-105 md:hover:scale-110 transition duration-150 ease-out hover:ease-in flex items-center'>
              {button}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
