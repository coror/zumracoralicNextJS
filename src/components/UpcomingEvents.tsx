'use client';
import { useInView } from 'react-intersection-observer';
import { fetchEvents } from '@/utils/request';
import { useLocale } from 'next-intl';
import React, { useEffect } from 'react';
import { useState } from 'react';
import UpcomingEventCard from './UpcomingEventCard';
import Spinner from './Spinner';
import { Event } from '@/types/event';

export default function UpcomingEvents({
  readMore,
  sectionTitle,
}: {
  readMore: string;
  sectionTitle: string;
}) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
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
        setLoading(true);
        const fetchedEvents = await fetchEvents(locale);

        const currentDate = new Date();

        const upcomingEvents = fetchedEvents
          .filter((event: Event) => new Date(event.datum) >= currentDate)
          .sort(
            (a: Event, b: Event) =>
              new Date(a.datum).getTime() - new Date(b.datum).getTime()
          );

        setEvents(upcomingEvents);
      } catch (error) {
        console.log('Error fetcht events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [locale]);

  if (events.length === 0) {
    return <div></div>;
  }

  return (
    <div className={`bg-white py-10 relative`} ref={ref}>
      <div
        className={`m-8 text-3xl md:text-[56px] mb-6 md:mb-16 tracking-wide leaading-[1] text-center ${
          animate
            ? 'animate-fade-up animate-duration-[1000ms] animate-delay-[500ms]'
            : ''
        }`}
      >
        {sectionTitle}
      </div>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <ul
          className={` max-w-[1400px] mx-auto ${
            animate
              ? 'animate-fade-up animate-duration-[1000ms] animate-delay-[1200ms]'
              : ''
          }`}
        >
          {events.map((event) => (
            <li key={event.id}>
              <UpcomingEventCard
                event={event}
                locale={locale}
                readMore={readMore}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
