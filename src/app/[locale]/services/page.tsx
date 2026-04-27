import React from 'react';
import Image from 'next/image';
import ServicesCard from '@/components/ServicesCard';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { PageMetadata } from '@/types/metadata';
import { buildPageMetadata } from '@/utils/seo';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<PageMetadata> {
  return buildPageMetadata({
    pathnameKey: '/services',
    locale: params.locale,
    titles: {
      sl: 'Zumra Coralic - Storitve',
      bs: 'Zumra Ćoralić - Usluge',
    },
    descriptions: {
      sl: 'Odkrijte naše storitve, vključno z NLP coachingom, mediacijo ter delavnicami in predavanji za podjetja in organizacije.',
      bs: 'Otkrijte naše usluge, uključujući NLP coaching, medijaciju, te radionice i predavanja za kompanije i organizacije.',
    },
    image: {
      url: 'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/servicesHeader_oraf6m.png',
      alt: 'Zumra Coralic Services',
    },
  });
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const x = useTranslations('OfferCard');
  const i = useTranslations('Index');
  const n = useTranslations('Navigation');

  return (
    <div className='bg-white pb-16 md:pb-40 pt-20 lg:pt-[8rem] overflow-hidden '>
      <div className='relative w-full md:h-[27rem] 3xl:h-[50rem] overflow-hidden '>
        <Image
          src='https://res.cloudinary.com/dbssbnuph/image/upload/v1726085545/zumracoralic/394_p2ucyw.jpg'
          alt='naslovna'
          sizes='100vw'
          width={0}
          height={0}
          className='object-cover w-full h-full transform '
        />
        <div className='absolute inset-0 bg-gradient-to-b from-[#222428] to-transparent'></div>

        <h1 className='absolute inset-0 flex flex-col items-center lg:justify-center text-white m-8 pb-10 text-[35px] md:text-[56px] lg:text-5xl 3xl:text-8xl  mb-6 md:mb-16 tracking-wide leading-[1] text-center animate-fade-right animate-duration-[2000ms] animate-delay-[500ms]'>
          {n('services')}
        </h1>
      </div>

      <div className='relative flex flex-col lg:flex-row justify-center items-stretch mt-10 px-6 lg:space-x-10'>
        <ServicesCard
          srcImage='https://res.cloudinary.com/dbssbnuph/image/upload/v1724668808/zumracoralic/nlp_10306121_qtczai.png'
          title={x('card1Title')}
          content={x('card1Content')}
          readMore={i('readMore')}
          link='/services/coaching'
        />
        <ServicesCard
          srcImage='https://res.cloudinary.com/dbssbnuph/image/upload/v1724668808/zumracoralic/discussion_8976614_pyyumr.png'
          title={x('card2Title')}
          content={x('card2Content')}
          readMore={i('readMore')}
          link='/services/mediation'
        />
        <ServicesCard
          srcImage='https://res.cloudinary.com/dbssbnuph/image/upload/v1724668808/zumracoralic/student_15941602_umqown.png'
          title={x('card3Title')}
          content={x('card3Content')}
          readMore={i('readMore')}
          link='/services/workshop'
        />
      </div>
    </div>
  );
}
