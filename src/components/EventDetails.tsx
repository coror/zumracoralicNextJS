import Image from 'next/image';
import { IoIosCalendar } from 'react-icons/io';
import Link from 'next/link';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { getRichTextOptions } from '../datalyer/contentful/richTextUtils';
import { useState } from 'react';
import { Event } from '@/types/event';

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

  return (
    <div className='relative pt-32'>
      <div className='relative w-full h-96 lg:h-[36rem] 3xl:h-[60rem] flex items-center justify-center'>
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
