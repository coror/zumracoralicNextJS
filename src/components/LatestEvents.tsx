'use client';
import { useInView } from 'react-intersection-observer';
import React, { useEffect, useState } from 'react';
import LatestEventsCard from './LatestEventsCard';
import { useLocale } from 'next-intl';
import { fetchEvents } from '../utils/request';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IoBookmarkOutline } from 'react-icons/io5';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';

export default function LatestEvents() {
  const [events, setEvents] = useState([]);

  const locale = useLocale();

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedEvents = await fetchEvents(locale);
        console.log(fetchedEvents);
        // Sort events by 'datum' in descending order and limit to the most recent 8
        const sortedEvents = fetchedEvents
          .sort((a, b) => new Date(b.datum) - new Date(a.datum))
          .slice(0, 8);
        setEvents(sortedEvents);
      } catch (error) {
        console.error('Error fetching data in LatestEventsComponent', error);
      }
    };
    fetchData();
  }, [locale]);

  return (
    <div className='bg-[#F6EDDA] py-10 md:py-24 relative' ref={ref}>
      <div
        className={`m-8 text-3xl md:text-[56px] mb-6 md:mb-16 tracking-wide leading-[1] text-center ${
          animate
            ? 'animate-fade-up animate-duration-[1000ms] animate-delay-[1000ms]'
            : ''
        }`}
      >
        Zadnji dogodki
      </div>
      {events.length > 0 ? (
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
              ? 'animate-fade-up animate-duration-[1000ms] animate-delay-[1200ms]'
              : ''
          }`}
          style={{
            '--swiper-navigation-color': '#000000',
            '--swiper-pagination-color': '#000000',
          }}
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
      ) : (
        <div className='text-center mx-auto'>Loading...</div>
      )}

      <div
        className={`relative flex flex-col items-center justify-center h-full text-center ${
          animate
            ? 'animate-fade-up animate-duration-[1000ms] animate-delay-[1500ms]'
            : ''
        }`}
      >
        <Link href='/contact'>
          <button className='bg-gray-500  px-5 py-4 md:px-6 md:py-5 text-sm md:mt-20 md:text-xl lg:text-2xl hover:scale-105 md:hover:scale-110 transition duration-150 ease-out hover:ease-in hover:bg-[#9c9c9c] flex items-center'>
            <IoBookmarkOutline className='inline mx-1' />
            POGLEJ VSE
          </button>
        </Link>
      </div>
    </div>
  );
}
