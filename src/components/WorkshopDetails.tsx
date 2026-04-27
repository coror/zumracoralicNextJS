import React from 'react';
import Link from 'next/link';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { getRichTextOptions } from '@/datalayer/contentful/richTextUtils';
import Image from 'next/image';
import { Service } from '@/types/service';
import JsonLd from './JsonLd';

export default function WorkshopDetails({
  initialService,
  locale,
  allServices,
  workshop,
  connect,
  currency,
  cost,
}: {
  initialService: Service;
  locale: string;
  allServices: string;
  workshop: string;
  connect: string;
  currency: string;
  cost: string;
}) {
  const service = initialService;
  const options = getRichTextOptions();

  return (
    <div className='relative pt-32 pb-10'>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: service.headline,
          serviceType: service.type,
          description: service.seoDescription,
          url: `https://www.zumracoralic.com/${locale}/${
            locale === 'bs'
              ? 'usluge/radionice-predavanja'
              : 'storitve/delavnice-predavanja'
          }/${service.slug}`,
          areaServed: 'Slovenia',
          provider: {
            '@type': 'Person',
            name: locale === 'bs' ? 'Zumra Ćoralić' : 'Zumra Coralic',
            url: `https://www.zumracoralic.com/${locale}`,
          },
          image: service.headlineImage?.[0]?.original_secure_url,
          ...(typeof service.price === 'number'
            ? {
                offers: {
                  '@type': 'Offer',
                  price: service.price,
                  priceCurrency: 'EUR',
                },
              }
            : {}),
        }}
      />
      <div className='relative w-full md:h-[27rem] 3xl:h-[50rem] overflow-hidden '>
        <Image
          src={service.headlineImage[0].original_secure_url}
          alt='naslovna'
          sizes='100vw'
          width={0}
          height={0}
          className='object-cover w-full h-full'
          priority
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
              {allServices}
            </Link>
          </li>
          <li className='text-gray-400 mx-1'>&gt;</li>
          <li className=''>
            <Link
              href={`/${locale}/services/workshop`}
              className='text-gray-400 hover:text-gray-600 transition flex items-center flex-row mx-1 text-center '
            >
              {workshop}
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
          <h1 className='mt-5 md:mt-10 text-xl md:text-2xl lg:text-4xl font-bold text-center'>
            {service.headline}
          </h1>
          <div className='mt-8 italic text-center md:text-xl'>
            {service.type}
          </div>
        </div>

        <div className=' prose leading-8 my-10 lg:min-w-[60rem]'>
          {documentToReactComponents(service.content, options)}
        </div>

        <div className='mt-10 md:text-lg text-center'>
          <strong>{cost}:</strong> {service.price} {currency}
        </div>

        <div className='my-10 text-center'>
          <Link href={`/${locale}/contact`}>
            <button className='bg-[#FFE6BC] px-5 py-4 md:px-6 md:py-5 text-sm md:text-xl lg:text-2xl hover:scale-105 md:hover:scale-110 transition duration-150 ease-out hover:ease-in hover:bg-[#b7905b]'>
              {connect}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
