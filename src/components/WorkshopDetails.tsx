'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchService } from '@/utils/request';
import { notFound, useParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import Spinner from './Spinner';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { getRichTextOptions } from '@/datalyer/contentful/richTextUtils';
import Image from 'next/image';
import { Service } from '@/types/service';

export default function WorkshopDetails() {
  const { slug } = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  const locale = useLocale();

  const options = getRichTextOptions();

  console.log(service?.headlineImage);

  useEffect(() => {
    const fetchEventData = async () => {
      if (!slug || !locale) {
        console.log('Slug or current Locale is undefined', slug, locale);
        return;
      }
      setLoading(true);
      try {
        const fetchedService = await fetchService(slug, locale);
        setService(fetchedService);
      } catch (error) {
        console.log('Error fetching service', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEventData();
  }, [slug, locale]);

  if (!service && !loading) {
    notFound(); // Handle not found scenario
  }

  return (
    <div className='relative pt-32 pb-10'>
      {loading && (
        <div className=''>
          <Spinner loading={loading} />
        </div>
      )}
      {!loading && service && (
        <>
          <div className='relative w-full md:h-96 xl:h-[44rem] overflow-hidden '>
            <Image
              src={service.headlineImage[0].original_secure_url}
              alt='naslovna'
              sizes='100vw'
              width={0}
              height={0}
              className='object-cover w-full h-full'
            />
            <div className='absolute inset-0 bg-gradient-to-b from-[#222428] to-transparent'></div>
          </div>
          <nav className='mt-4' aria-label='Breadcrumb'>
            <ol
              role='list'
              className='flex items-center px-4 justify-center text-xs md:text-base'
            >
              <li>
                <Link
                  href={`/${locale}/services/`}
                  className='text-gray-400 hover:text-gray-600 transition flex items-center flex-row mx-1 text-center'
                >
                  Vse storitve
                </Link>
              </li>
              <li className='text-gray-400 mx-1'>&gt;</li>
              <li className=''>
                <Link
                  href={`/${locale}/services/workshop`}
                  className='text-gray-400 hover:text-gray-600 transition flex items-center flex-row mx-1 text-center '
                >
                  Za podjetja in organizacije
                </Link>
              </li>
              <li className='text-gray-400 mx-1'>&gt;</li>
              <li className='text-gray-600  mx-1 text-center line-clamp-2'>
                {service.headline}
              </li>
            </ol>
          </nav>
          <div className='relative p-4 mx-5 lg:max-w-[60rem] lg:mx-auto flex flex-col items-center animate-fade-right animate-duration-[1000ms] animate-delay-[1500ms]'>
            <div>
              <div className='mt-5 md:mt-10 text-xl md:text-2xl lg:text-4xl font-bold text-center'>
                {service.headline}
              </div>
              <div className='mt-8 italic text-center md:text-xl'>
                {service.type}
              </div>
            </div>

            <div className=' prose leading-8 my-10 lg:min-w-[60rem]'>
              {documentToReactComponents(service.content, options)}
            </div>

            <div className='mt-10 md:text-lg text-center'>
              <strong>Cena:</strong> {service.price} €
            </div>

            <div className='my-10 text-center'>
              <Link href='/contact'>
                <button className='bg-[#FFE6BC] px-5 py-4 md:px-6 md:py-5 text-sm md:text-xl lg:text-2xl hover:scale-105 md:hover:scale-110 transition duration-150 ease-out hover:ease-in hover:bg-[#b7905b]'>
                  Stopi v stik
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
