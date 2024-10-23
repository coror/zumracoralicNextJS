import React from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import ServicesComponent from '@/components/ServicesComponent';
import { OpenGraphMetadata, TwitterMetadata, Metadata } from '@/types/metadata';

const metadataByLocale: Record<string, Metadata> = {
  sl: {
    title: 'Zumra Coralic - Delavnice in predavanja za podjetja',
    description:
      'Odkrijte naše delavnice in predavanja, zasnovane za podjetja in organizacije. Naša strokovna usposabljanja vam bodo pomagala izboljšati komunikacijo, timsko delo in organizacijsko kulturo.',
    url: 'https://www.zumracoralic.com/sl/storitve/delavnice-predavanja',
    openGraph: {
      title: 'Delavnice in predavanja - Zumra Coralic',
      description:
        'Odkrijte naš NLP coaching, ki vam pomaga izboljšati osebno rast in doseči vaše cilje skozi učinkovite tehnike in strategije.',
      url: 'https://www.zumracoralic.com/sl/storitve/delavnice-predavanja',
      images: [
        {
          url: 'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/nlpCoachingHeader_oraf6m.png',
          width: 800,
          height: 600,
          alt: 'NLP Coaching - Zumra Coralic',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Delavnice in predavanja - Zumra Coralic',
      description:
        'Odkrijte naš NLP coaching, ki vam pomaga izboljšati osebno rast in doseči vaše cilje skozi učinkovite tehnike in strategije.',
      image:
        'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/nlpCoachingHeader_oraf6m.png',
    },
    canonical: 'https://www.zumracoralic.com/sl/storitve/delavnice-predavanja',
  },
  bs: {
    title: 'Zumra Ćoralić - Radionice i predavanja za kompanije',
    description:
      'Otkrijte naše radionice i predavanja, osmišljena za kompanije i organizacije. Naša stručna obuka pomoći će vam poboljšati komunikaciju, timski rad i organizacijsku kulturu.',
    url: 'https://www.zumracoralic.com/bs/usluge/radionice-predavanja',
    openGraph: {
      title: 'Radionice i predavanja - Zumra Ćoralić',
      description:
        'Otkrijte naš NLP coaching koji vam pomaže poboljšati lični razvoj i postići svoje ciljeve kroz efikasne tehnike i strategije.',
      url: 'https://www.zumracoralic.com/bs/usluge/radionice-predavanja',
      images: [
        {
          url: 'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/nlpCoachingHeader_oraf6m.png',
          width: 800,
          height: 600,
          alt: 'Radionice i predavanja - Zumra Ćoralić',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Radionice i predavanja - Zumra Ćoralić',
      description:
        'Otkrijte naš NLP coaching koji vam pomaže poboljšati lični razvoj i postići svoje ciljeve kroz efikasne tehnike i strategije.',
      image:
        'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/nlpCoachingHeader_oraf6m.png',
    },
    canonical: 'https://www.zumracoralic.com/bs/usluge/radionice-predavanja',
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
          url: 'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/workshopsLecturesHeader_oraf6m.png',
          width: 800,
          height: 600,
          alt: 'Workshops and Lectures for Companies - Zumra Coralic',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: currentLocaleMetadata.title,
      description: currentLocaleMetadata.description,
      image:
        'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/workshopsLecturesHeader_oraf6m.png',
    },
    canonical: currentLocaleMetadata.url,
  };
}

export default function Page() {
  const x = useTranslations('Workshop');
  const i = useTranslations('Index');
  const locale = useLocale();

  return (
    <div className='bg-white pb-16 md:pb-40 pt-20 lg:pt-[8rem] overflow-hidden'>
      <div className='relative w-full  md:h-[30rem] overflow-hidden '>
        <Image
          src='https://res.cloudinary.com/dbssbnuph/image/upload/v1724839774/zumracoralic/close-up-man-women-chairs_vkdzin.jpg'
          alt='naslovna'
          sizes='100vw'
          width={0}
          height={0}
          className='object-cover w-full h-full'
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
              href={`/${locale}/services/workshop`}
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

        <ServicesComponent readMore={i('readMore')} price={i('price')} />
      </div>
    </div>
  );
}
