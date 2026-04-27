import React from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { PageMetadata } from '@/types/metadata';
import { buildPageMetadata, getAlternates, pickByLocale } from '@/utils/seo';
import JsonLd from '@/components/JsonLd';

const descriptions = {
  sl: 'Odkrijte naše storitve mediacije, ki vam pomagajo pri reševanju sporov in izboljšanju odnosov z uporabo strokovnih tehnik in pristopov.',
  bs: 'Otkrijte naše usluge medijacije koje vam pomažu u rješavanju sporova i poboljšanju odnosa koristeći stručne tehnike i pristupe.',
};

const heroImage = {
  url: 'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/mediationHeader_oraf6m.png',
  alt: 'Mediacija - Zumra Coralic',
};

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<PageMetadata> {
  return buildPageMetadata({
    pathnameKey: '/services/mediation',
    locale: params.locale,
    titles: {
      sl: 'Zumra Coralic - Mediacija',
      bs: 'Zumra Ćoralić - Mediacija',
    },
    descriptions,
    image: heroImage,
  });
}

export default function Page() {
  const x = useTranslations('Mediation');
  const i = useTranslations('Index');
  const locale = useLocale();
  const url = getAlternates('/services/mediation', locale).canonical;

  return (
    <div className='bg-white pb-16 md:pb-40 pt-20 lg:pt-[8rem] overflow-hidden'>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: locale === 'bs' ? 'Medijacija' : 'Mediacija',
          serviceType: 'Mediation',
          description: pickByLocale(descriptions, locale),
          url,
          areaServed: 'Slovenia',
          provider: {
            '@type': 'Person',
            name: locale === 'bs' ? 'Zumra Ćoralić' : 'Zumra Coralic',
            url: `https://www.zumracoralic.com/${locale}`,
          },
          image:
            'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/mediationHeader_oraf6m.png',
        }}
      />
      <div className='relative w-full md:h-[27rem] 3xl:h-[50rem] overflow-hidden '>
        <Image
          src='https://res.cloudinary.com/dbssbnuph/image/upload/v1725907784/194_3_emgvie.jpg'
          alt='naslovna'
          sizes='100vw'
          width={0}
          height={0}
          className='object-cover w-full h-full '
        />
        <div className='absolute inset-0 bg-gradient-to-b from-[#222428] to-transparent'></div>

        <h1 className='absolute inset-0 flex flex-col justify-center items-center text-white m-8 pb-10 text-3xl md:text-[56px] mb-6 md:mb-16 tracking-wide leading-[1] text-center animate-fade-right animate-duration-[2000ms] animate-delay-[500ms]'>
          {x('section')}
        </h1>
      </div>

      <nav className='my-4' aria-label='Breadcrumb'>
        <ol
          role='list'
          className='flex items-center px-4 justify-center text-xs md:text-base'
        >
          <li>
            <Link
              href={`/${locale}/services/`}
              className='text-gray-400 hover:text-gray-600 transition flex items-center flex-row mx-1 text-center'
            >
              {i('allServices')}
            </Link>
          </li>
          <li className='text-gray-400 mx-1'>&gt;</li>
          <li className=''>
            <Link
              href={`/${locale}/services/mediation`}
              className='text-gray-600 hover:text-gray-600 transition flex items-center flex-row mx-1 text-center '
            >
              {i('mediation')}
            </Link>
          </li>
        </ol>
      </nav>

      <div className='relative flex flex-col justify-center items-stretch mt-10 px-6 lg:max-w-[60rem] mx-auto text-left animate-fade-right animate-duration-[1000ms] animate-delay-[1500ms]'>
        <div className='font-bold text-lg md:text-xl italic text-center'>
          {x('quote1')}
        </div>
        <div className='mt-10 text-xl md:text-2xl'>{x('sectionTitle1')}</div>
        <div className='mt-10 md:text-lg'>{x('sectionContent1')}</div>
        <div className='mt-10 text-xl md:text-2xl'>{x('sectionTitle2')}</div>
        <div className='mt-10 md:text-lg'>{x('sectionContent2')}</div>

        <div className='mt-10 md:text-lg space-y-3'>
          <p className='text-[#df650e]'>{x('sectionContentP1')}</p>
          <ul className='space-y-1'>
            <li>• {x('sectionContentL1')}</li>
            <li>• {x('sectionContentL2')}</li>
            <li>• {x('sectionContentL3')}</li>
            <li>• {x('sectionContentL4')}</li>
          </ul>
        </div>
        <div className='mt-10 text-xl md:text-2xl'>{x('sectionTitle3')}</div>
        <div className='mt-10 md:text-lg'>{x('sectionContent3')}</div>
        <div className='mt-10 md:text-lg'>{x('sectionContent4')}</div>

        <div className='border-2 border-[#FFE6BC] flex flex-col items-center justify-center mt-10 mx-5 text-center'>
          <div className='mt-10 md:text-lg'>
            <strong>{x('price')}:</strong> {x('currency1')} {x('perHour')} +{' '}
            {x('currency2')}
            {x('writtenDeal')}
          </div>
          <div className='mt-10 md:text-lg text-center'>
            {x('sectionContent6')}
          </div>
          <div className='my-10 '>
          <Link href={`/${locale}/contact`}>
              <button className='bg-[#FFE6BC] px-5 py-4 md:px-6 md:py-5  text-sm  md:text-xl lg:text-2xl hover:scale-105 md:hover:scale-110 transition duration-150 ease-out hover:ease-in hover:bg-[#b7905b]'>
                {x('button')}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
