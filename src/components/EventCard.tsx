'use client';
import Image from 'next/image';
import Link from 'next/link';
import { truncateText } from '@/datalyer/contentful/utils';
import { useLocale } from 'next-intl';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { Event } from '@/types/event';

function EventCard({ event, readMore }: { event: Event; readMore: string }) {
  const truncatedContent = truncateText(
    documentToHtmlString(event.content),
    200
  );
  const locale = useLocale();

  const eventsLink = `/${locale}/events/${event.slug}`;

  return (
    <div className='flex flex-col md:flex-row w-full overflow-hidden shadow-lg group border-[1px] bg-white'>
      {/* Image Container */}
      <div className='relative md:w-1/3 h-64  md:h-96 overflow-hidden p-6'>
        <Link href={eventsLink}>
          <div className='h-full overflow-hidden relative md:max-w-96'>
            <Image
              src={event.featuredImage.url}
              alt={event.seoTitle}
              className='w-full h-full object-cover transform transition-transform transition-filter duration-500 ease-in-out md:group-hover:scale-105 md:group-hover:brightness-90'
              sizes='100vw'
              width={0}
              height={0}
            />
          </div>
        </Link>
      </div>

      {/* Text Content */}
      <div className='p-4 relative flex flex-col space-y-10 text-center lg:text-left md:w-2/3'>
        <div>
          <Link href={eventsLink}>
            <h3 className='text-xl md:text-2xl xl:text-4xl my-2 text-gray-800 line-clamp-2 lg:line-clamp-none min-h-[3em] lg:min-h-[2em] lg:transition lg:duration-300 lg:hover:text-[#000000]'>
              {event.headline}
            </h3>
          </Link>

          <p className='text-xs md:text-sm text-gray-700 mb-2'>{event.datum}</p>
        </div>

        <p className='text-sm md:text-base text-gray-700 mb-4'>
          {truncatedContent}
        </p>
        <Link href={eventsLink}>
          <p className=' text-black  bg-[#FFE6BC] py-2 px-4 inline-block mt-2 transition-all duration-300 md:hover:bg-[#f99d5b] md:hover:bg-transparent border-2 border-[#FFE6BC] lg:absolute lg:right-10'>
            {readMore}...
          </p>
        </Link>
      </div>
    </div>
  );
}

export default EventCard;
