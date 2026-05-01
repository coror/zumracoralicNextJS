'use client';
import React, { useMemo, useState } from 'react';
import Pagination from './Pagination';
import EventCard from './EventCard';
import MeshGradient from './MeshGradient';
import { Event } from '@/types/event';
import { sortByDate } from '@/utils/sortByDate';

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

  const events = useMemo(
    () => sortByDate(initialEvents, locale, 'datum'),
    [initialEvents, locale],
  );

  const handlePageChange = (value: number) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0 });
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentEvents = events.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className='relative pt-32 md:pt-44 pb-20 md:pb-28'>
      <MeshGradient variant='cream' fixed />

      {/* Editorial header */}
      <header className='max-w-3xl mx-auto px-6 text-center mb-20 md:mb-32'>
        <h1 className='text-3xl md:text-[56px] 4xl:text-[88px] tracking-tight leading-[1.1] mb-7 text-[#222428]'>
          {title}
        </h1>
        <span
          aria-hidden='true'
          className='block w-12 h-px bg-[#df650e] mx-auto'
        />
      </header>

      {/* Zigzag magazine-spread cards */}
      <div className='max-w-7xl mx-auto px-6 lg:px-12'>
        <div className='space-y-20 md:space-y-32'>
          {currentEvents.map((event, idx) => (
            <EventCard
              key={event.id}
              event={event}
              readMore={readMore}
              reverse={idx % 2 === 1}
            />
          ))}
        </div>

        {events.length > postsPerPage && (
          <div className='flex justify-center mt-20 md:mt-28'>
            <Pagination
              count={Math.ceil(events.length / postsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
