import React from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { OpenGraphMetadata, TwitterMetadata, Metadata } from '@/types/metadata';

const metadataByLocale: Record<string, Metadata> = {
  sl: {
    title: 'Zumra Coralic - Mediacija',
    description:
      'Odkrijte naše storitve mediacije, ki vam pomagajo pri reševanju sporov in izboljšanju odnosov z uporabo strokovnih tehnik in pristopov.',
    url: 'https://www.zumracoralic.com/sl/mediacija',
    openGraph: {
      title: 'Zumra Coralic - Mediacija',
      description:
        'Odkrijte naše storitve mediacije, ki vam pomagajo pri reševanju sporov in izboljšanju odnosov z uporabo strokovnih tehnik in pristopov.',
      url: 'https://www.zumracoralic.com/sl/mediacija',
      images: [
        {
          url: 'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/mediationHeader_oraf6m.png',
          width: 800,
          height: 600,
          alt: 'Mediacija - Zumra Coralic',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Zumra Coralic - Mediacija',
      description:
        'Odkrijte naše storitve mediacije, ki vam pomagajo pri reševanju sporov in izboljšanju odnosov z uporabo strokovnih tehnik in pristopov.',
      image:
        'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/mediationHeader_oraf6m.png',
    },
    canonical: 'https://www.zumracoralic.com/sl/mediacija',
  },
  bs: {
    title: 'Zumra Ćoralić - Mediacija',
    description:
      'Otkrijte naše usluge medijacije koje vam pomažu u rješavanju sporova i poboljšanju odnosa koristeći stručne tehnike i pristupe.',
    url: 'https://www.zumracoralic.com/bs/mediacija',
    openGraph: {
      title: 'Zumra Ćoralić - Mediacija',
      description:
        'Otkrijte naše usluge medijacije koje vam pomažu u rješavanju sporova i poboljšanju odnosa koristeći stručne tehnike i pristupe.',
      url: 'https://www.zumracoralic.com/bs/mediacija',
      images: [
        {
          url: 'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/mediationHeader_oraf6m.png',
          width: 800,
          height: 600,
          alt: 'Mediacija - Zumra Ćoralić',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Zumra Ćoralić - Mediacija',
      description:
        'Otkrijte naše usluge medijacije koje vam pomažu u rješavanju sporova i poboljšanju odnosa koristeći stručne tehnike i pristupe.',
      image:
        'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/mediationHeader_oraf6m.png',
    },
    canonical: 'https://www.zumracoralic.com/bs/mediacija',
  },
};

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<{
  title: string;
  description: string;
  openGraph: OpenGraphMetadata;
  twitter: TwitterMetadata;
  canonical: string;
}> {
  const { locale } = params;

  const currentLocaleMetadata =
    metadataByLocale[locale] || metadataByLocale['sl']; // Default to Slovenian if locale is not found

  return {
    title: currentLocaleMetadata.title,
    description: currentLocaleMetadata.description,
    openGraph: {
      title: currentLocaleMetadata.title,
      description: currentLocaleMetadata.description,
      url: currentLocaleMetadata.url,
      images: [
        {
          url: 'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/mediationHeader_oraf6m.png',
          width: 800,
          height: 600,
          alt: 'Mediation - Zumra Coralic',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: currentLocaleMetadata.title,
      description: currentLocaleMetadata.description,
      image:
        'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/mediationHeader_oraf6m.png',
    },
    canonical: currentLocaleMetadata.url,
  };
}

export default function Page() {
  const x = useTranslations('Mediation');
  const i = useTranslations('Index');
  const locale = useLocale();

  return (
    <div className='bg-white pb-16 md:pb-40 pt-20 lg:pt-[8rem] overflow-hidden'>
      <div className='relative w-full md:h-[30rem] overflow-hidden '>
        <Image
          src='https://res.cloudinary.com/dbssbnuph/image/upload/v1725907784/194_3_emgvie.jpg'
          alt='naslovna'
          sizes='100vw'
          width={0}
          height={0}
          className='object-cover w-full h-full '
        />
        <div className='absolute inset-0 bg-gradient-to-b from-[#222428] to-transparent'></div>

        <div className='absolute inset-0 flex flex-col justify-center items-center text-white m-8 pb-10 text-3xl md:text-[56px] mb-6 md:mb-16 tracking-wide leading-[1] text-center animate-fade-right animate-duration-[2000ms] animate-delay-[500ms]'>
          {x('section')}
        </div>
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
            <Link href='/contact'>
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
