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

export default function Page({
  params: { locale: paramLocale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(paramLocale);
  const x = useTranslations('Mediation');
  const i = useTranslations('Index');
  const locale = useLocale();
  const url = getAlternates('/services/mediation', locale).canonical;

  return (
    <div className='relative pb-20 md:pb-32 overflow-hidden'>
      <MeshGradient variant='cream' fixed />

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

      {/* Cinematic banner */}
      <div className='relative w-full h-[20rem] md:h-[24rem] lg:h-[28rem] 3xl:h-[34rem] overflow-hidden'>
        <Image
          src='https://res.cloudinary.com/dbssbnuph/image/upload/v1725907784/194_3_emgvie.jpg'
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
            {i('mediation')}
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
      <article className='max-w-5xl mx-auto px-6 lg:px-12 space-y-16 md:space-y-24'>
        <section>
          <h2 className='text-2xl md:text-4xl 4xl:text-6xl tracking-tight leading-[1.2] text-[#222428]'>
            {x('sectionTitle1')}
          </h2>
          <span
            aria-hidden='true'
            className='block w-12 h-px bg-[#df650e] mt-6 mb-8'
          />
          <p className='text-sm md:text-lg 4xl:text-2xl leading-relaxed text-[#222428]/80'>
            {x('sectionContent1')}
          </p>
        </section>

        <section>
          <h2 className='text-2xl md:text-4xl 4xl:text-6xl tracking-tight leading-[1.2] text-[#222428]'>
            {x('sectionTitle2')}
          </h2>
          <span
            aria-hidden='true'
            className='block w-12 h-px bg-[#df650e] mt-6 mb-8'
          />
          <p className='text-sm md:text-lg 4xl:text-2xl leading-relaxed text-[#222428]/80'>
            {x('sectionContent2')}
          </p>
        </section>

        {/* Prednosti list */}
        <section>
          <p className='text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#df650e] mb-4'>
            {x('sectionContentP1')}
          </p>
          <ul className='space-y-5 text-sm md:text-lg 4xl:text-2xl leading-relaxed text-[#222428]/80'>
            {(['L1', 'L2', 'L3', 'L4'] as const).map((k) => (
              <li key={k} className='flex gap-4'>
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
          <h2 className='text-2xl md:text-4xl 4xl:text-6xl tracking-tight leading-[1.2] text-[#222428]'>
            {x('sectionTitle3')}
          </h2>
          <span
            aria-hidden='true'
            className='block w-12 h-px bg-[#df650e] mt-6 mb-8'
          />
          <p className='text-sm md:text-lg 4xl:text-2xl leading-relaxed text-[#222428]/80'>
            {x('sectionContent3')}
          </p>
        </section>

        <p className='text-sm md:text-lg 4xl:text-2xl italic leading-relaxed text-[#222428]/85 text-center'>
          {x('sectionContent4')}
        </p>
      </article>

      {/* Pricing card with two-tier pricing */}
      <section className='mt-16 md:mt-24 px-6'>
        <div className='max-w-2xl mx-auto bg-white rounded-2xl shadow-[0_25px_50px_-15px_rgba(34,36,40,0.18)] px-6 md:px-12 py-12 md:py-16 text-center'>
          <p className='text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#222428]/55 mb-8'>
            {x('price')}
          </p>

          <div className='space-y-6 mb-10'>
            <div>
              <p className='text-4xl md:text-5xl lg:text-6xl tracking-tight text-[#222428]'>
                {x('currency1')}
              </p>
              <p className='text-sm md:text-base italic text-[#222428]/65 mt-1'>
                {x('perHour')}
              </p>
            </div>
            <div className='text-[#df650e] text-2xl md:text-3xl'>+</div>
            <div>
              <p className='text-4xl md:text-5xl lg:text-6xl tracking-tight text-[#222428]'>
                {x('currency2')}
              </p>
              <p className='text-sm md:text-base italic text-[#222428]/65 mt-1'>
                {x('writtenDeal').trim()}
              </p>
            </div>
          </div>

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
