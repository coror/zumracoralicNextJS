import React from 'react';
import Image from 'next/image';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { getServices } from '@/datalayer/contentful/service';
import { Link } from '@/navigation';
import ServicesComponent from '@/components/ServicesComponent';
import { PageMetadata } from '@/types/metadata';
import { buildPageMetadata, getAlternates, pickByLocale } from '@/utils/seo';
import JsonLd from '@/components/JsonLd';

export const revalidate = 3600;

const descriptions = {
  sl: 'Odkrijte naše delavnice in predavanja, zasnovane za podjetja in organizacije. Naša strokovna usposabljanja vam bodo pomagala izboljšati komunikacijo, timsko delo in organizacijsko kulturo.',
  bs: 'Otkrijte naše radionice i predavanja, osmišljena za kompanije i organizacije. Naša stručna obuka pomoći će vam poboljšati komunikaciju, timski rad i organizacijsku kulturu.',
};

const heroImage = {
  url: 'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/workshopsLecturesHeader_oraf6m.png',
  alt: 'Delavnice in predavanja - Zumra Coralic',
};

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<PageMetadata> {
  return buildPageMetadata({
    pathnameKey: '/services/workshop',
    locale: params.locale,
    titles: {
      sl: 'Zumra Coralic - Delavnice in predavanja za podjetja',
      bs: 'Zumra Ćoralić - Radionice i predavanja za kompanije',
    },
    descriptions,
    image: heroImage,
  });
}

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const [x, i, services] = await Promise.all([
    getTranslations('Workshop'),
    getTranslations('Index'),
    getServices(locale),
  ]);
  const url = getAlternates('/services/workshop', locale).canonical;

  return (
    <div className='bg-white pb-16 md:pb-40 pt-20 lg:pt-[8rem] overflow-hidden'>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name:
            locale === 'bs'
              ? 'Radionice i predavanja'
              : 'Delavnice in predavanja',
          serviceType: 'Workshops & Lectures',
          description: pickByLocale(descriptions, locale),
          url,
          areaServed: 'Slovenia',
          provider: {
            '@type': 'Person',
            name: locale === 'bs' ? 'Zumra Ćoralić' : 'Zumra Coralic',
            url: `https://www.zumracoralic.com/${locale}`,
          },
          image:
            'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/workshopsLecturesHeader_oraf6m.png',
        }}
      />
      <div className='relative w-full  md:h-[27rem] 3xl:h-[50rem] overflow-hidden '>
        <Image
          src='https://res.cloudinary.com/dbssbnuph/image/upload/v1724839774/zumracoralic/close-up-man-women-chairs_vkdzin.jpg'
          alt='naslovna'
          sizes='100vw'
          width={0}
          height={0}
          className='object-cover w-full h-full'
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
              href='/services'
              className='text-gray-400 hover:text-gray-600 transition flex items-center flex-row mx-1 text-center'
            >
              {i('allServices')}
            </Link>
          </li>
          <li className='text-gray-400 mx-1'>&gt;</li>
          <li className=''>
            <Link
              href='/services/workshop'
              className='text-gray-600  transition flex items-center flex-row mx-1 text-center '
            >
              {i('workshop')}
            </Link>
          </li>
        </ol>
      </nav>
      <div className='relative flex flex-col justify-center items-stretch mt-10 px-6  lg:max-w-[74rem] mx-auto text-left animate-fade-right animate-duration-[1000ms] animate-delay-[1500ms]'>
        <div className='font-bold text-lg md:text-xl italic text-left'>
          {x('sectionTitle1')}
        </div>
        <div className='mt-10 md:text-lg'>{x('sectionContent1')}</div>
        <div className='mt-10 md:text-lg'>{x('sectionContent2')}</div>

        <div className='md:min-w-[26rem] xl:flex xl:justify-center mt-10 md:mb-0 animate-fade-right animate-duration-[2000ms] animate-delay-[1200ms]'>
          <Image
            src='https://res.cloudinary.com/dbssbnuph/image/upload/v1724844782/zumracoralic/eta62_o6fbkf.webp'
            alt='delavnica'
            width={0}
            height={0}
            sizes='100vw'
            className='w-full h-full md:w-full md:h-auto max-w-[50rem]'
          />
        </div>

        <div>
          <div className='mt-10 text-xl md:text-2xl'>{x('sectionTitle2')}</div>
          <div className='mt-10 md:text-lg space-y-3'>
            <p>{x('sectionContentP1')}</p>
            <ul className='space-y-1'>
              <li>• {x('sectionContentL1')}</li>
              <li>• {x('sectionContentL2')}</li>
              <li>• {x('sectionContentL3')}</li>
            </ul>
          </div>
        </div>
        <div className='mt-10 md:text-lg'>{x('sectionContent4')}</div>
        <div className='mt-10  flex flex-col mx-auto '>
          <hr className='border-black border-t-2' />

          <div className='my-4 py-4 text-xl md:text-2xl font-bold text-center'>
            {x('quote1')}
          </div>
          <hr className='border-black border-t-2' />
        </div>
        <div className='mt-10 text-xl md:text-2xl'>{x('sectionTitle3')}</div>
        <div className='mt-10 md:text-lg italic'>{x('sectionContent5')}</div>
        <div className='mt-3 text-right'>{x('sectionContentP2')}</div>
        {/* <div className='mt-10 text-xl md:text-2xl'>{x('sectionTitle4')}</div> */}
        {/* <div className='mt-10 md:text-lg'>{x('sectionContent6')}</div> */}
        {/* <div className='mt-10 md:text-lg'>{x('sectionContent7')}</div> */}
        {/* <div className='mt-10 md:text-lg'>{x('sectionContent8')}</div> */}
        {/* <div className='mt-10 md:text-lg italic'>Zumra Ćoralić</div>
        <div className='mt-1 italic'>{x('sectionContent9')}</div> */}

        <ServicesComponent
          initialServices={services}
          locale={locale}
          readMore={i('readMore')}
          price={i('price')}
        />
      </div>
    </div>
  );
}
