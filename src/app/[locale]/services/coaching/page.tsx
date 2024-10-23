import React from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { OpenGraphMetadata, TwitterMetadata, Metadata } from '@/types/metadata';

const metadataByLocale: Record<string, Metadata> = {
  sl: {
    title: 'NLP Coaching - Zumra Coralic',
    description:
      'Odkrijte naš NLP coaching, ki vam pomaga izboljšati osebno rast in doseči vaše cilje skozi učinkovite tehnike in strategije.',
    url: 'https://www.zumracoralic.com/sl/nlp-coaching',
    openGraph: {
      title: 'NLP Coaching - Zumra Coralic',
      description:
        'Odkrijte naš NLP coaching, ki vam pomaga izboljšati osebno rast in doseči vaše cilje skozi učinkovite tehnike in strategije.',
      url: 'https://www.zumracoralic.com/sl/nlp-coaching',
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
      title: 'NLP Coaching - Zumra Coralic',
      description:
        'Odkrijte naš NLP coaching, ki vam pomaga izboljšati osebno rast in doseči vaše cilje skozi učinkovite tehnike in strategije.',
      image:
        'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/nlpCoachingHeader_oraf6m.png',
    },
    canonical: 'https://www.zumracoralic.com/sl/nlp-coaching',
  },
  bs: {
    title: 'NLP Coaching - Zumra Ćoralić',
    description:
      'Otkrijte naš NLP coaching koji vam pomaže poboljšati lični razvoj i postići svoje ciljeve kroz efikasne tehnike i strategije.',
    url: 'https://www.zumracoralic.com/bs/nlp-coaching',
    openGraph: {
      title: 'NLP Coaching - Zumra Ćoralić',
      description:
        'Otkrijte naš NLP coaching koji vam pomaže poboljšati lični razvoj i postići svoje ciljeve kroz efikasne tehnike i strategije.',
      url: 'https://www.zumracoralic.com/bs/nlp-coaching',
      images: [
        {
          url: 'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/nlpCoachingHeader_oraf6m.png',
          width: 800,
          height: 600,
          alt: 'NLP Coaching - Zumra Ćoralić',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'NLP Coaching - Zumra Ćoralić',
      description:
        'Otkrijte naš NLP coaching koji vam pomaže poboljšati lični razvoj i postići svoje ciljeve kroz efikasne tehnike i strategije.',
      image:
        'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/nlpCoachingHeader_oraf6m.png',
    },
    canonical: 'https://www.zumracoralic.com/bs/nlp-coaching',
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
          url: 'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/nlpCoachingHeader_oraf6m.png',
          width: 800,
          height: 600,
          alt: 'NLP Coaching - Zumra Coralic',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: currentLocaleMetadata.title,
      description: currentLocaleMetadata.description,
      image:
        'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/nlpCoachingHeader_oraf6m.png',
    },
    canonical: currentLocaleMetadata.url,
  };
}

export default function Page() {
  const x = useTranslations('NLPCoachingPage');
  const i = useTranslations('Index');
  const locale = useLocale();

  return (
    <div className='bg-white pb-16 md:pb-40 pt-20 lg:pt-[8rem] overflow-hidden'>
      <div className='relative w-full  md:h-[30rem] overflow-hidden '>
        <Image
          src='https://res.cloudinary.com/dbssbnuph/image/upload/v1726086929/zumracoralic/conquer-top_1048-1819_lkkhyf.jpg'
          alt='naslovna'
          sizes='100vw'
          width={0}
          height={0}
          className='object-cover w-full h-full'
        />
        <div className='absolute inset-0 bg-gradient-to-b from-[#222428] to-transparent'></div>

        <div className='absolute inset-0 flex flex-col justify-center items-center text-white m-8 pb-10 text-3xl md:text-[56px] mb-6 md:mb-16 tracking-wide leading-[1] animate-fade-right animate-duration-[2000ms] animate-delay-[500ms]'>
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
              href={`/${locale}/services/coaching`}
              className='text-gray-600 hover:text-gray-600 transition flex items-center flex-row mx-1 text-center '
            >
              {i('coaching')}
            </Link>
          </li>
        </ol>
      </nav>
      <div className='relative flex flex-col justify-center items-stretch mt-10 px-6  lg:max-w-[60rem] mx-auto text-left animate-fade-right animate-duration-[1000ms] animate-delay-[1500ms]'>
        <div className='font-bold text-center text-lg md:text-xl italic'>
          {x('quote1')}
        </div>
        <div className='mt-10 md:text-lg'>{x('sectionContent1')}</div>
        <div className='mt-10 text-xl md:text-2xl'>{x('sectionTitle1')}</div>
        <div className='mt-10 md:text-lg space-y-3'>
          <p className='text-[#df650e]'>{x('sectionContentP1')}</p>
          <ul className='space-y-1'>
            <li>• {x('sectionContentL1')}</li>
            <li>• {x('sectionContentL2')}</li>
            <li>• {x('sectionContentL3')}</li>
            <li>• {x('sectionContentL4')}</li>
          </ul>
        </div>
        <div className='mt-10 md:text-lg space-y-3'>
          <p className='text-[#df650e]'>{x('sectionContentP2')}</p>
          <ul className='space-y-1'>
            <li>• {x('sectionContentL5')}</li>
            <li>• {x('sectionContentL6')}</li>
            <li>• {x('sectionContentL7')}</li>
            <li>• {x('sectionContentL8')}</li>
          </ul>
        </div>
        <div className='mt-10 md:text-lg'>{x('sectionContent2')}</div>
        <div className='border-2 border-[#FFE6BC] flex flex-col items-center justify-center mt-10 mx-5 text-center'>
          <div className='mt-10 md:text-lg'>
            <strong>{x('price')}:</strong> {x('currency')} {x('perHour')}
          </div>
          <div className='mt-10 md:text-lg'>{x('sectionContent6')}</div>
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
