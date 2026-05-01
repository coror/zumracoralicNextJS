import React from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { Link } from '@/navigation';
import { PageMetadata } from '@/types/metadata';
import { buildPageMetadata, getAlternates, pickByLocale } from '@/utils/seo';
import JsonLd from '@/components/JsonLd';
import MeshGradient from '@/components/MeshGradient';

const descriptions = {
  sl: 'Odkrijte naš NLP coaching, ki vam pomaga izboljšati osebno rast in doseči vaše cilje skozi učinkovite tehnike in strategije.',
  bs: 'Otkrijte naš NLP coaching koji vam pomaže poboljšati lični razvoj i postići svoje ciljeve kroz efikasne tehnike i strategije.',
};

const heroImage = {
  url: 'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/nlpCoachingHeader_oraf6m.png',
  alt: 'NLP Coaching - Zumra Coralic',
};

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<PageMetadata> {
  return buildPageMetadata({
    pathnameKey: '/services/coaching',
    locale: params.locale,
    titles: {
      sl: 'NLP Coaching - Zumra Coralic',
      bs: 'NLP Coaching - Zumra Ćoralić',
    },
    descriptions,
    image: heroImage,
  });
}

export default function Page({
  params: { locale: paramLocale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(paramLocale);
  const x = useTranslations('NLPCoachingPage');
  const i = useTranslations('Index');
  const locale = useLocale();
  const url = getAlternates('/services/coaching', locale).canonical;

  const personalLabel = locale === 'bs' ? 'Lično' : 'Osebno';
  const businessLabel = locale === 'bs' ? 'Poslovno' : 'Poslovno';

  return (
    <div className='relative pb-20 md:pb-32 overflow-hidden'>
      <MeshGradient variant='cream' fixed />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'NLP Coaching',
          serviceType: 'NLP Coaching',
          description: pickByLocale(descriptions, locale),
          url,
          areaServed: 'Slovenia',
          provider: {
            '@type': 'Person',
            name: locale === 'bs' ? 'Zumra Ćoralić' : 'Zumra Coralic',
            url: `https://www.zumracoralic.com/${locale}`,
          },
          image:
            'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/nlpCoachingHeader_oraf6m.png',
        }}
      />

      {/* Cinematic banner image — pure visual */}
      <div className='relative w-full h-[20rem] md:h-[24rem] lg:h-[28rem] 3xl:h-[34rem] overflow-hidden'>
        <Image
          src='https://res.cloudinary.com/dbssbnuph/image/upload/v1726086929/zumracoralic/conquer-top_1048-1819_lkkhyf.jpg'
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
        <div className='max-w-3xl mx-auto px-6 text-center'>
          {/* Refined breadcrumb */}
          <nav aria-label='Breadcrumb' className='mb-10 md:mb-12'>
            <ol
              role='list'
              className='flex items-center justify-center gap-3 text-[10px] md:text-xs tracking-[0.25em] uppercase text-[#222428]/55'
            >
              <li>
                <Link
                  href='/services'
                  className='hover:text-[#df650e] transition-colors'
                >
                  {i('allServices')}
                </Link>
              </li>
              <li aria-hidden='true'>—</li>
              <li className='text-[#df650e]'>{x('section')}</li>
            </ol>
          </nav>

          <p className='text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#df650e] mb-6'>
            {i('coaching')}
          </p>
          <h1 className='text-3xl md:text-[56px] 4xl:text-[88px] tracking-tight leading-[1.1] text-[#222428]'>
            {x('section')}
          </h1>
        </div>
      </header>

      {/* Lead pull-quote */}
      <section className='pb-12 md:pb-20'>
        <div className='max-w-3xl mx-auto px-6 text-center'>
          <span
            aria-hidden='true'
            className='block w-12 h-px bg-[#df650e] mx-auto mb-10'
          />
          <blockquote className='text-2xl md:text-3xl lg:text-4xl italic leading-[1.3] tracking-tight text-[#222428]'>
            {x('quote1')}
          </blockquote>
          <span
            aria-hidden='true'
            className='block w-12 h-px bg-[#df650e] mx-auto mt-10'
          />
        </div>
      </section>

      {/* Body content */}
      <article className='max-w-5xl mx-auto px-6 lg:px-12'>
        <p className='text-sm md:text-lg 4xl:text-2xl leading-relaxed text-[#222428]/80'>
          {x('sectionContent1')}
        </p>

        <h2 className='mt-16 md:mt-24 text-2xl md:text-4xl 4xl:text-6xl tracking-tight leading-[1.2] text-[#222428]'>
          {x('sectionTitle1')}
        </h2>
        <span
          aria-hidden='true'
          className='block w-12 h-px bg-[#df650e] mt-6 mb-12'
        />

        {/* Two-column "Personal" + "Business" sections */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-10'>
          <section>
            <p className='text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#df650e] mb-3'>
              {personalLabel}
            </p>
            <p className='text-sm md:text-lg 4xl:text-2xl leading-relaxed text-[#222428] mb-6'>
              {x('sectionContentP1')}
            </p>
            <ul className='space-y-4 text-sm md:text-lg 4xl:text-xl leading-relaxed text-[#222428]/80'>
              {(['L1', 'L2', 'L3', 'L4'] as const).map((k) => (
                <li key={k} className='flex gap-3'>
                  <span
                    aria-hidden='true'
                    className='mt-3 w-2 h-2 rounded-full bg-[#df650e] shrink-0'
                  />
                  <span>{x(`sectionContent${k}`)}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <p className='text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#df650e] mb-3'>
              {businessLabel}
            </p>
            <p className='text-sm md:text-lg 4xl:text-2xl leading-relaxed text-[#222428] mb-6'>
              {x('sectionContentP2')}
            </p>
            <ul className='space-y-4 text-sm md:text-lg 4xl:text-xl leading-relaxed text-[#222428]/80'>
              {(['L5', 'L6', 'L7', 'L8'] as const).map((k) => (
                <li key={k} className='flex gap-3'>
                  <span
                    aria-hidden='true'
                    className='mt-3 w-2 h-2 rounded-full bg-[#df650e] shrink-0'
                  />
                  <span>{x(`sectionContent${k}`)}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <p className='mt-16 md:mt-24 text-base md:text-lg lg:text-xl italic leading-relaxed text-[#222428]/85 text-center'>
          {x('sectionContent2')}
        </p>
      </article>

      {/* Pricing card */}
      <section className='mt-16 md:mt-24 px-6'>
        <div className='max-w-2xl mx-auto bg-white rounded-2xl shadow-[0_25px_50px_-15px_rgba(34,36,40,0.18)] px-6 md:px-12 py-12 md:py-16 text-center'>
          <p className='text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#222428]/55 mb-4'>
            {x('price')}
          </p>
          <p className='text-5xl md:text-6xl lg:text-7xl tracking-tight text-[#222428] mb-2'>
            {x('currency')}
          </p>
          <p className='text-sm md:text-base italic text-[#222428]/65 mb-10'>
            {x('perHour')}
          </p>
          <span
            aria-hidden='true'
            className='block w-12 h-px bg-[#df650e] mx-auto mb-8'
          />
          <p className='text-sm md:text-lg 4xl:text-2xl leading-relaxed text-[#222428]/80 mb-10'>
            {x('sectionContent6')}
          </p>
          <Link href='/contact'>
            <button className='btn-primary'>{x('button')}</button>
          </Link>
        </div>
      </section>
    </div>
  );
}
