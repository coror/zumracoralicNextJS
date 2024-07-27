'use client';
import { fetchEvents } from '@/utils/request';
import { useLocale } from 'next-intl';
import React, { useEffect, useState } from 'react';
import EventPostCard from './EventPostCard';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import Link from 'next/link';
import Spinner from './Spinner';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import EventCard from './EventCard';

export default function EventsComponent({ readMore, title }) {
  const [events, setEvents] = useState([]);
  const locale = useLocale();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedEvents = await fetchEvents(locale);
        const sortedEvents = fetchedEvents.sort(
          (a, b) => new Date(b.datePosted) - new Date(a.datePosted)
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

  return (
    <div className='bg-white relative pb-10 pt-36 px-6'>
      <div className='m-8 text-3xl md:text-[56px] mb-6 md:mb-16 tracking-wide leading-[1] text-center'>
        {title}
      </div>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <div className='flex flex-col space-y-10 lg:w-[80rem] lg:mx-auto'>
          {events.map((event, index) => (
            <div key={event.id}>
              <EventCard event={event} readMore={readMore} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
