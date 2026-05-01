import React from 'react';
import { Link } from '@/navigation';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { getRichTextOptions } from '@/datalayer/contentful/richTextUtils';
import Image from 'next/image';
import { Service } from '@/types/service';
import JsonLd from './JsonLd';
import MeshGradient from './MeshGradient';

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
  const hasPrice = typeof service.price === 'number';

  return (
    <div className='relative pb-20 md:pb-32 overflow-hidden'>
      <MeshGradient variant='cream' fixed />

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
          ...(hasPrice
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

      {/* Cinematic banner */}
      <div className='relative w-full h-[22rem] md:h-[30rem] lg:h-[36rem] 3xl:h-[44rem] overflow-hidden'>
        <Image
          src={service.headlineImage[0].original_secure_url}
          alt=''
          aria-hidden='true'
          sizes='100vw'
          width={0}
          height={0}
          className='object-cover w-full h-full hero-ken-burns'
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
                  href='/services'
                  className='hover:text-[#df650e] transition-colors'
                >
                  {allServices}
                </Link>
              </li>
              <li aria-hidden='true'>—</li>
              <li>
                <Link
                  href='/services/workshop'
                  className='hover:text-[#df650e] transition-colors'
                >
                  {workshop}
                </Link>
              </li>
              <li aria-hidden='true'>—</li>
              <li className='text-[#df650e] line-clamp-1'>
                {service.headline}
              </li>
            </ol>
          </nav>

          <p className='text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#df650e] mb-6'>
            {service.type}
          </p>
          <h1 className='text-3xl md:text-[56px] 4xl:text-[88px] tracking-tight leading-[1.1] text-[#222428]'>
            {service.headline}
          </h1>
          <span
            aria-hidden='true'
            className='block w-12 h-px bg-[#df650e] mx-auto mt-8'
          />
        </div>
      </header>

      {/* Rich-text body */}
      <article className='max-w-4xl xl:max-w-5xl mx-auto px-6 lg:px-12 prose prose-lg lg:prose-xl prose-headings:font-normal prose-headings:tracking-tight prose-p:text-[#222428]/80 prose-p:leading-relaxed prose-strong:text-[#222428] prose-a:text-[#df650e] prose-a:no-underline hover:prose-a:underline'>
        {documentToReactComponents(service.content, options)}
      </article>

      {/* Pricing card + CTA */}
      <section className='mt-16 md:mt-24 px-6'>
        <div className='max-w-2xl mx-auto bg-white rounded-2xl shadow-[0_25px_50px_-15px_rgba(34,36,40,0.18)] px-6 md:px-12 py-12 md:py-16 text-center'>
          {hasPrice && (
            <>
              <p className='text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#222428]/55 mb-4'>
                {cost}
              </p>
              <p className='text-5xl md:text-6xl lg:text-7xl tracking-tight text-[#222428] mb-2'>
                {service.price}
                <span className='text-3xl md:text-4xl lg:text-5xl ml-2 text-[#df650e]'>
                  {currency}
                </span>
              </p>
              <span
                aria-hidden='true'
                className='block w-12 h-px bg-[#df650e] mx-auto mt-10 mb-10'
              />
            </>
          )}
          <Link href='/contact'>
            <button className='btn-primary'>{connect}</button>
          </Link>
        </div>
      </section>
    </div>
  );
}
