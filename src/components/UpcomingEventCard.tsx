import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Event } from '@/types/event';

export default function UpcomingEventCard({
  event,
  locale,
  readMore,
}: {
  event: Event;
  locale: string;
  readMore: string;
}) {
  const eventDate = new Date(event.datum);

  // Manually format the date for consistency across locales
  const day = eventDate.getDate();
  let month = eventDate
    .toLocaleDateString(locale, { month: 'short' })
    .toUpperCase()
    .replaceAll('.', '');

  if (locale === 'bs' && month.startsWith('M')) {
    const monthNumber = month.replace('M', '') as keyof typeof monthMap; // Narrowing the type

    const monthMap: {
      [key in
        | '01'
        | '02'
        | '03'
        | '04'
        | '05'
        | '06'
        | '07'
        | '08'
        | '09'
        | '10'
        | '11'
        | '12']: string;
    } = {
      '01': 'JAN',
      '02': 'FEB',
      '03': 'MAR',
      '04': 'APR',
      '05': 'MAY',
      '06': 'JUN',
      '07': 'JUL',
      '08': 'AUG',
      '09': 'SEP',
      '10': 'OCT',
      '11': 'NOV',
      '12': 'DEC',
    };

    // Check if monthNumber is a valid key
    if (monthMap[monthNumber]) {
      month = monthMap[monthNumber];
    }
  }

  console.log(`Day: ${day}, Month: ${month} (Locale: ${locale})`);

  return (
    <div className='relative mx-10 my-10 border-2 h-[30rem] group md:h-44'>
      <div
        className='absolute inset-0 bg-cover opacity-10 bg-center bg-no-repeat md:transition-opacity md:duration-1000 md:group-hover:opacity-50'
        style={{
          backgroundImage: `url(${event.featuredImage.url})`,
        }}
      ></div>
      <div className='relative h-full px-4 py-10 text-black z-10 flex flex-col md:flex-row items-center justify-center text-center space-y-16 md:justify-between md:text-left md:space-x-3 md:space-y-0'>
        <div className='md:text-center'>
          <div className='font-bold'>{month}</div>
          <div className='text-7xl -mt-5 opacity-40'>{day}</div>
        </div>
        <div className='md:w-[70rem]'>
          <div className='text-2xl md:text-3xl'>{event.headline}</div>
          <div className='mt-1'>{event.location}</div>
        </div>

        <div className='px-6 py-3 lg:w-36 bg-black text-white md:transition-transform md:transform md:hover:translate-y-[-5px] md:ease-in-out md:duration-300 text-center'>
          <Link href={`/${locale}/events/${event.slug}`} className=''>
            {readMore}
          </Link>
        </div>
      </div>
    </div>
  );
}
