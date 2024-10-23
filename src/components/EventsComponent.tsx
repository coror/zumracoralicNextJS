'use client';
import { fetchEvents } from '@/utils/request';
import { useLocale } from 'next-intl';
import React, { useEffect, useState } from 'react';
import Spinner from './Spinner';
import { Pagination } from '@mui/material';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import EventCard from './EventCard';
import { Event } from '@/types/event';

export default function EventsComponent({
  readMore,
  title,
}: {
  readMore: string;
  title: string;
}) {
  const [events, setEvents] = useState<Event[]>([]);
  const locale = useLocale();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedEvents = await fetchEvents(locale);
        const sortedEvents = fetchedEvents.sort(
          (a: Event, b: Event) =>
            new Date(b.datum).getTime() - new Date(a.datum).getTime()
        );
        setEvents(sortedEvents);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [locale]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentEvents = events.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className='bg-white relative pb-10 pt-36 px-6'>
      <div className='m-8 text-3xl md:text-[56px] mb-6 md:mb-16 tracking-wide leading-[1] text-center  animate-fade-right animate-duration-[2000ms] animate-delay-[500ms]'>
        {title}
      </div>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <>
          <div className='flex flex-col space-y-10 lg:w-[80rem] lg:mx-auto    animate-fade-right animate-duration-[2000ms] animate-delay-[1200ms]'>
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
        </>
      )}
    </div>
  );
}
