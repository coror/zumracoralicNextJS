import React, { useMemo } from 'react';
import UpcomingEventCard from './UpcomingEventCard';
import { Event } from '@/types/event';
import Reveal, { RevealStagger } from './Reveal';

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
  const events = useMemo(() => {
    const currentDate = new Date();
    return [...initialEvents]
      .filter((event) => new Date(event.datum) >= currentDate)
      .sort(
        (a, b) => new Date(a.datum).getTime() - new Date(b.datum).getTime(),
      );
  }, [initialEvents]);

  if (events.length === 0) {
    return null;
  }

  return (
    <section className='bg-white py-16 md:py-24 4xl:py-32 relative'>
      <Reveal variant='up' delay={100}>
        <h2 className='text-3xl md:text-[56px] 4xl:text-[88px] mb-12 md:mb-16 4xl:mb-24 tracking-wide leading-[1] text-center'>
          {sectionTitle}
        </h2>
      </Reveal>
      <RevealStagger
        gap={80}
        startDelay={100}
       
        className='max-w-[1400px] mx-auto'
      >
        {events.map((event) => (
          <div key={event.id}>
            <UpcomingEventCard
              event={event}
              locale={locale}
              readMore={readMore}
            />
          </div>
        ))}
      </RevealStagger>
    </section>
  );
}
