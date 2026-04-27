'use client';
import { useInView } from 'react-intersection-observer';
import React, { useEffect, useMemo, useState } from 'react';
import UpcomingEventCard from './UpcomingEventCard';
import { Event } from '@/types/event';

export default function UpcomingEvents({
  initialEvents,
  locale,
  readMore,
  sectionTitle,
}: {
  initialEvents: Event[];
  locale: string;
  readMore: string;
  sectionTitle: string;
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
    const currentDate = new Date();
    return [...initialEvents]
      .filter((event) => new Date(event.datum) >= currentDate)
      .sort(
        (a, b) => new Date(a.datum).getTime() - new Date(b.datum).getTime(),
      );
  }, [initialEvents]);

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
    </div>
  );
}
