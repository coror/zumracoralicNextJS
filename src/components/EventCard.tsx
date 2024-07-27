'use client';
import Image from 'next/image';
import Link from 'next/link';
import { truncateText } from '@/datalyer/contentful/utils';
import { useLocale } from 'next-intl';

function EventCard({ event, readMore }) {
  const truncatedContent = truncateText(event.content, 200);
  const locale = useLocale();

  const eventsLink = `/${locale}/events/${event.slug}`;

  return (
    <div className='flex flex-col md:flex-row w-full overflow-hidden shadow-lg group border-[1px]'>
      {/* Image Container */}
      <div className='relative w-full h-64 md:w-[40rem] md:h-96 overflow-hidden p-6'>
        <Link href={eventsLink}>
          <div className='w-full h-full overflow-hidden relative '>
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
      <div className='p-4 relative flex flex-col space-y-10'>
        <div>
          <Link href={eventsLink}>
            <h3 className='text-xl md:text-2xl xl:text-4xl my-2 text-gray-800 line-clamp-2 lg:line-clamp-none min-h-[3em] lg:min-h-[2em] lg:hover:text-[#d2ab74]'>
              {event.headline}
            </h3>
          </Link>

          <p className='text-xs md:text-sm text-[#d2ab74] mb-2'>
            {event.datePosted}
          </p>
        </div>

        <p className='text-sm md:text-base text-gray-700 mb-4'>
          {truncatedContent}
        </p>
        <Link href={eventsLink}>
          <p className=' text-white  bg-[#d2ab74] py-2 px-4 inline-block mt-2 transition-all duration-300 md:hover:text-[#d2ab74] md:hover:bg-transparent border-2 border-[#d2ab74] lg:absolute lg:right-10'>
            {readMore}...
          </p>
        </Link>
      </div>
    </div>
  );
}

export default EventCard;
