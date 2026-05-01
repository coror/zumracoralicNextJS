'use client';

import Image from 'next/image';
import { Link } from '@/navigation';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { getRichTextOptions } from '../datalayer/contentful/richTextUtils';
import { useState } from 'react';
import { parse } from 'date-fns';
import { bs as bsLocale, sl as slLocale } from 'date-fns/locale';
import { Event } from '@/types/event';
import JsonLd from './JsonLd';
import MeshGradient from './MeshGradient';

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
    <div className='relative pb-20 md:pb-32 overflow-hidden'>
      <MeshGradient variant='cream' fixed />

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

      {/* Cinematic banner */}
      <div className='relative w-full h-[22rem] md:h-[30rem] lg:h-[36rem] 3xl:h-[44rem] overflow-hidden'>
        <Image
          src={event.featuredImage.url}
          alt={event.featuredImage.alt}
          width={0}
          height={0}
          sizes='100vw'
          className='w-full h-full object-cover hero-ken-burns'
          priority
        />
        <div className='absolute inset-x-0 top-0 h-32 md:h-40 bg-gradient-to-b from-[#222428]/65 to-transparent' />
        <div className='absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-[#fdf6e8]' />
      </div>

      {/* Editorial header */}
      <header className='py-16 md:py-20'>
        <div className='max-w-4xl mx-auto px-6 text-center'>
          <nav aria-label='Breadcrumb' className='mb-10 md:mb-12'>
            <ol
              role='list'
              className='flex items-center justify-center flex-wrap gap-3 text-[10px] md:text-xs tracking-[0.25em] uppercase text-[#222428]/55'
            >
              <li>
                <Link
                  href='/'
                  className='hover:text-[#df650e] transition-colors'
                >
                  {home}
                </Link>
              </li>
              <li aria-hidden='true'>—</li>
              <li>
                <Link
                  href='/events'
                  className='hover:text-[#df650e] transition-colors'
                >
                  {eventsTitle}
                </Link>
              </li>
              <li aria-hidden='true'>—</li>
              <li className='text-[#df650e] line-clamp-1'>
                {event.seoTitle}
              </li>
            </ol>
          </nav>

          <p className='text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#df650e] mb-6'>
            {event.datum}
          </p>
          <h1 className='text-3xl md:text-[56px] 4xl:text-[88px] tracking-tight leading-[1.15] text-[#222428]'>
            {event.seoTitle}
          </h1>
          <span
            aria-hidden='true'
            className='block w-12 h-px bg-[#df650e] mx-auto mt-8'
          />
        </div>
      </header>

      {/* Rich-text body */}
      <article className='max-w-4xl xl:max-w-5xl mx-auto px-6 lg:px-12 prose prose-lg lg:prose-xl prose-headings:font-normal prose-headings:tracking-tight prose-p:text-[#222428]/80 prose-p:leading-relaxed prose-strong:text-[#222428] prose-a:text-[#df650e] prose-a:no-underline hover:prose-a:underline'>
        {documentToReactComponents(event.content, options)}
      </article>

      {/* Gallery */}
      {event.cloudinaryImage.length > 0 && (
        <section className='mt-20 md:mt-32 px-6 lg:px-12'>
          <div className='max-w-7xl mx-auto'>
            <div className='gallery-container'>
              <div className='gallery-grid'>
                {event.cloudinaryImage.map((image, index) => (
                  <button
                    key={index}
                    type='button'
                    className='gallery-item group rounded-2xl overflow-hidden shadow-[0_15px_30px_-15px_rgba(34,36,40,0.18)] hover:shadow-[0_25px_50px_-15px_rgba(223,101,14,0.28)] transition-shadow duration-500'
                    onClick={() => handleImageClick(image)}
                    aria-label='Open image'
                  >
                    <Image
                      src={image.secure_url}
                      alt={image.alt || ''}
                      width={0}
                      height={0}
                      sizes='(max-width: 768px) 100vw, 33vw'
                      className='gallery-image transition-all duration-500 ease-out group-hover:brightness-90 group-hover:scale-105'
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Lightbox */}
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
