import React from 'react';
import Image from 'next/image';
import ServicesCard from '@/components/ServicesCard';
import { useTranslations } from 'next-intl';
import { Metadata } from '@/types/metadata';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  const metadataByLocale: Record<string, Metadata> = {
    sl: {
      title: 'Zumra Coralic - Storitve',
      description:
        'Odkrijte naše storitve, vključno z NLP coachingom, mediacijo ter delavnicami in predavanji za podjetja in organizacije.',
      url: 'https://www.zumracoralic.com/storitve',
      openGraph: {
        title: 'Zumra Coralic - Storitve',
        description:
          'Odkrijte naše storitve, vključno z NLP coachingom, mediacijo ter delavnicami in predavanji za podjetja in organizacije.',
        url: 'https://www.zumracoralic.com/storitve',
        images: [
          {
            url: 'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/servicesHeader_oraf6m.png',
            width: 800,
            height: 600,
            alt: 'Zumra Coralic Services',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Zumra Coralic - Storitve',
        description:
          'Odkrijte naše storitve, vključno z NLP coachingom, mediacijo ter delavnicami in predavanji za podjetja in organizacije.',
        image:
          'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/servicesHeader_oraf6m.png',
      },
      canonical: 'https://www.zumracoralic.com/storitve',
    },
    bs: {
      title: 'Zumra Ćoralić - Usluge',
      description:
        'Otkrijte naše usluge, uključujući NLP coaching, medijaciju, te radionice i predavanja za kompanije i organizacije.',
      url: 'https://www.zumracoralic.com/bs/usluge',
      openGraph: {
        title: 'Zumra Ćoralić - Usluge',
        description:
          'Otkrijte naše usluge, uključujući NLP coaching, medijaciju, te radionice i predavanja za kompanije i organizacije.',
        url: 'https://www.zumracoralic.com/bs/usluge',
        images: [
          {
            url: 'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/servicesHeader_oraf6m.png',
            width: 800,
            height: 600,
            alt: 'Zumra Ćoralić Services',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Zumra Ćoralić - Usluge',
        description:
          'Otkrijte naše usluge, uključujući NLP coaching, medijaciju, te radionice i predavanja za kompanije i organizacije.',
        image:
          'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/servicesHeader_oraf6m.png',
      },
      canonical: 'https://www.zumracoralic.com/bs/usluge',
    },
  };

  const currentLocaleMetadata =
    metadataByLocale[locale] || metadataByLocale['sl']; // Default to Slovenian if locale is not found

  return {
    title: currentLocaleMetadata.title,
    description: currentLocaleMetadata.description,
    url: currentLocaleMetadata.url, // Ensure the URL is included at the top level
    openGraph: {
      title: currentLocaleMetadata.openGraph.title,
      description: currentLocaleMetadata.openGraph.description,
      url: currentLocaleMetadata.openGraph.url,
      images: currentLocaleMetadata.openGraph.images,
    },
    twitter: {
      card: currentLocaleMetadata.twitter.card,
      title: currentLocaleMetadata.twitter.title,
      description: currentLocaleMetadata.twitter.description,
      image: currentLocaleMetadata.twitter.image,
    },
    canonical: currentLocaleMetadata.canonical,
  };
}

export default function Page() {
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

        <div className='absolute inset-0 flex flex-col items-center lg:justify-center text-white m-8 pb-10 text-[35px] md:text-[56px] lg:text-5xl 3xl:text-8xl  mb-6 md:mb-16 tracking-wide leading-[1] text-center animate-fade-right animate-duration-[2000ms] animate-delay-[500ms]'>
          {n('services')}
        </div>
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
          link='services/mediation'
        />
        <ServicesCard
          srcImage='https://res.cloudinary.com/dbssbnuph/image/upload/v1724668808/zumracoralic/student_15941602_umqown.png'
          title={x('card3Title')}
          content={x('card3Content')}
          readMore={i('readMore')}
          link='services/workshop'
        />
      </div>
    </div>
  );
}
