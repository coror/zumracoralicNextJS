import React from 'react';
import Image from 'next/image';
import ServicesCard from '@/components/ServicesCard';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { PageMetadata } from '@/types/metadata';
import { buildPageMetadata } from '@/utils/seo';
import MeshGradient from '@/components/MeshGradient';
import { Link } from '@/navigation';

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

const intros: Record<string, string> = {
  sl: 'Tri poti, eno skupno izhodišče — sodelovanje, ki vam pomaga prepoznati lastne vzorce in zgraditi bolj izpolnjujoče odnose, doma in v poklicnem okolju.',
  bs: 'Tri puta, jedno zajedničko polazište — saradnja koja vam pomaže da prepoznate vlastite obrasce i izgradite ispunjenije odnose, kod kuće i u radnom okruženju.',
};

const ctas: Record<string, { lead: string; button: string }> = {
  sl: {
    lead: 'Niste prepričani, kje začeti?',
    button: 'Pogovorite se z mano',
  },
  bs: {
    lead: 'Niste sigurni gdje da počnete?',
    button: 'Razgovarajmo',
  },
};

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const x = useTranslations('OfferCard');
  const i = useTranslations('Index');
  const n = useTranslations('Navigation');

  const intro = intros[locale] ?? intros.sl;
  const cta = ctas[locale] ?? ctas.sl;

  return (
    <div className='relative pb-20 md:pb-32 overflow-hidden'>
      <MeshGradient variant='cream' fixed />

      {/* Cinematic banner image — pure visual, no text overlay */}
      <div className='relative w-full h-[22rem] md:h-[30rem] lg:h-[36rem] 3xl:h-[44rem] overflow-hidden'>
        <Image
          src='https://res.cloudinary.com/dbssbnuph/image/upload/v1726085545/zumracoralic/394_p2ucyw.jpg'
          alt=''
          aria-hidden='true'
          sizes='100vw'
          width={0}
          height={0}
          className='object-cover w-full h-full hero-ken-burns'
          priority
        />
        {/* Top fade keeps the navbar legible against the image */}
        <div className='absolute inset-x-0 top-0 h-32 md:h-40 bg-gradient-to-b from-[#222428]/65 to-transparent' />
        {/* Bottom fade so the image flows into the cream bg below */}
        <div className='absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-[#fdf6e8]' />
      </div>

      {/* Editorial header sits in cream space below the banner */}
      <header className='py-20 md:py-28'>
        <div className='max-w-3xl mx-auto px-6 text-center'>
          <p className='text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#df650e] mb-6'>
            {n('services')}
          </p>
          <h1 className='text-3xl md:text-[56px] 4xl:text-[88px] tracking-tight leading-[1.1] mb-7 text-[#222428]'>
            {n('services')}
          </h1>
          <span
            aria-hidden='true'
            className='block w-12 h-px bg-[#df650e] mx-auto mb-10'
          />
          <p className='text-sm md:text-lg 4xl:text-2xl italic leading-relaxed text-[#222428]/80'>
            {intro}
          </p>
        </div>
      </header>

      {/* Cards row — kept as-is per user request */}
      <div className='max-w-7xl mx-auto px-6 lg:px-12 pt-8'>
        <div className='relative flex flex-col lg:flex-row justify-center items-stretch lg:space-x-10'>
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

      {/* Closing soft CTA */}
      <div className='max-w-2xl mx-auto px-6 mt-20 md:mt-32 text-center'>
        <span
          aria-hidden='true'
          className='block w-12 h-px bg-[#df650e] mx-auto mb-10'
        />
        <p className='text-xl md:text-2xl italic leading-snug text-[#222428]/85 mb-8'>
          {cta.lead}
        </p>
        <Link href='/contact'>
          <button className='btn-ghost'>{cta.button}</button>
        </Link>
      </div>
    </div>
  );
}
