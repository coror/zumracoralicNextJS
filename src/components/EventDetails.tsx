'use client';

import Image from 'next/image';
import { IoIosCalendar } from 'react-icons/io';
import Link from 'next/link';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { getRichTextOptions } from '../datalayer/contentful/richTextUtils';
import { useState } from 'react';
import { parse } from 'date-fns';
import { bs as bsLocale, sl as slLocale } from 'date-fns/locale';
import { Event } from '@/types/event';
import JsonLd from './JsonLd';

function toIsoDate(dateStr: string, locale: string): string | undefined {
  try {
    const parsed = parse(dateStr, 'd. MMMM yyyy', new Date(), {
      locale: locale === 'bs' ? bsLocale : slLocale,
    });
    if (isNaN(parsed.getTime())) return undefined;
    return parsed.toISOString().split('T')[0];
  } catch {
    return undefined;
  }
}

const EventDetails = ({
  event,
  locale,
  eventsTitle,
  home,
}: {
  event: Event;
  locale: string;
  eventsTitle: string;
  home: string;
}) => {
  const [selectedImage, setSelectedImage] = useState<
    Event['cloudinaryImage'][number] | null
  >(null);

  const options = getRichTextOptions();

  const handleImageClick = (image: Event['cloudinaryImage'][number]) => {
    setSelectedImage(image);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const startDate = toIsoDate(event.datum, locale);
  const eventUrl = `https://www.zumracoralic.com/${locale}/${
    locale === 'bs' ? 'dogadaji' : 'dogodki'
  }/${event.slug}`;

  return (
    <div className='relative pt-32'>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Event',
          name: event.seoTitle,
          ...(startDate ? { startDate } : {}),
          image: event.featuredImage.url,
          url: eventUrl,
          eventStatus: 'https://schema.org/EventScheduled',
          eventAttendanceMode:
            'https://schema.org/OfflineEventAttendanceMode',
          ...(event.location
            ? {
                location: {
                  '@type': 'Place',
                  name: event.location,
                  address: event.location,
                },
              }
            : {}),
          organizer: {
            '@type': 'Person',
            name: locale === 'bs' ? 'Zumra Ćoralić' : 'Zumra Coralic',
            url: `https://www.zumracoralic.com/${locale}`,
          },
        }}
      />
      <div className='relative w-full h-96 md:h-[27rem] 3xl:h-[50rem] flex items-center justify-center'>
        <Image
          src={event.featuredImage.url}
          alt={event.featuredImage.alt}
          width={0}
          height={0}
          sizes='100vw'
          className=' w-full h-full object-cover'
          priority
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60'></div>
      </div>

      <nav className='my-4' aria-label='Breadcrumb'>
        <ol
          role='list'
          className='flex items-center px-6 justify-center  text-xs md:text-base'
        >
          <li>
            <Link
              href='/'
              className='text-gray-400 hover:text-gray-600 transition flex items-center flex-row mx-1'
            >
              {home}
            </Link>
          </li>
          <li className='text-gray-400 mx-1'>&gt;</li>
          <li>
            <Link
              href={`/${locale}/events`}
              className='text-gray-400 hover:text-gray-600 transition flex items-center flex-row mx-1'
            >
              {eventsTitle}
            </Link>
          </li>
          <li className='text-gray-400 mx-1'>&gt;</li>
          <li className='text-gray-600  mx-1   line-clamp-1'>
            {event.seoTitle}
          </li>
        </ol>
      </nav>
      <div className='relative  p-4 mt-24  mx-5 lg:max-w-[60rem] lg:mx-auto'>
        <h1 className='text-3xl md:text-5xl text-black mb-4 '>
          {event.seoTitle}
        </h1>
        <div className='text-sm lg:text-xl text-[#777777] mb-12'>
          <IoIosCalendar className='inline' />
          {' '}{event.datum}
        </div>
        <div className='prose leading-8 my-20  lg:min-w-[60rem]'>
          {documentToReactComponents(event.content, options)}
        </div>
      </div>

      {event.cloudinaryImage.length > 0 && (
        <div className='gallery-container '>
          <div className='gallery-grid'>
            {event.cloudinaryImage.map((image, index) => (
              <div
                key={index}
                className='gallery-item group'
                onClick={() => handleImageClick(image)}
              >
                <Image
                  src={image.secure_url}
                  alt={image.alt || ''}
                  width={0}
                  height={0}
                  sizes='100vw'
                  className='gallery-image transition ease-in-out group-hover:brightness-75'
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedImage && (
        <div className='lightbox' onClick={handleClose}>
          <div
            className='lightbox-content'
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage.secure_url}
              alt={selectedImage.alt || ''}
              width={selectedImage.width}
              height={selectedImage.height}
              className='lightbox-image'
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
