'use client';
import React, { useMemo, useState } from 'react';
import { Pagination } from '@mui/material';
import { Locale, parse } from 'date-fns';
import { bs, sl } from 'date-fns/locale';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import EventCard from './EventCard';
import { Event } from '@/types/event';

export default function EventsComponent({
  initialEvents,
  locale,
  readMore,
  title,
}: {
  initialEvents: Event[];
  locale: string;
  readMore: string;
  title: string;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const events = useMemo(() => {
    const localeMap: { [key: string]: Locale } = { sl, bs };
    const currentLocale = localeMap[locale] || sl;
    return [...initialEvents].sort((a, b) => {
      const dateA = parse(a.datum, 'd. MMMM yyyy', new Date(), {
        locale: currentLocale,
      });
      const dateB = parse(b.datum, 'd. MMMM yyyy', new Date(), {
        locale: currentLocale,
      });
      return dateB.getTime() - dateA.getTime();
    });
  }, [initialEvents, locale]);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0 });
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentEvents = events.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className='bg-white relative pb-10 pt-36 px-6'>
      <h1 className='m-8 text-3xl md:text-[56px] mb-6 md:mb-16 tracking-wide leading-[1] text-center  animate-fade-right animate-duration-[2000ms] animate-delay-[500ms]'>
        {title}
      </h1>
      <div className='flex flex-col space-y-10 max-w-[1800px] animate-fade-right animate-duration-[2000ms] animate-delay-[1200ms] mx-auto'>
        {currentEvents.map((event) => (
          <div key={event.id}>
            <EventCard event={event} readMore={readMore} />
          </div>
        ))}
      </div>
      <div className='flex justify-center mt-8'>
        <Pagination
          count={Math.ceil(events.length / postsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          shape='rounded'
          variant='outlined'
          color='primary'
        />
      </div>
    </div>
  );
}
