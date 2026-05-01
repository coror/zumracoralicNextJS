import React from 'react';
import Image from 'next/image';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { getServices } from '@/datalayer/contentful/service';
import { Link } from '@/navigation';
import ServicesComponent from '@/components/ServicesComponent';
import { PageMetadata } from '@/types/metadata';
import { buildPageMetadata, getAlternates, pickByLocale } from '@/utils/seo';
import JsonLd from '@/components/JsonLd';
import MeshGradient from '@/components/MeshGradient';

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

  const programsLabel = locale === 'bs' ? 'Programi' : 'Programi';

  return (
    <div className='relative pb-20 md:pb-32 overflow-hidden'>
      <MeshGradient variant='cream' fixed />

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

      {/* Cinematic banner */}
      <div className='relative w-full h-[20rem] md:h-[24rem] lg:h-[28rem] 3xl:h-[34rem] overflow-hidden'>
        <Image
          src='https://res.cloudinary.com/dbssbnuph/image/upload/v1724839774/zumracoralic/close-up-man-women-chairs_vkdzin.jpg'
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
            {i('workshop')}
          </p>
          <h1 className='text-3xl md:text-[56px] 4xl:text-[88px] tracking-tight leading-[1.1] text-[#222428]'>
            {x('section')}
          </h1>
        </div>
      </header>

      {/* Open-letter style body */}
      <article className='max-w-5xl mx-auto px-6 lg:px-12 space-y-14 md:space-y-20'>
        {/* Letter greeting */}
        <p className='text-2xl md:text-3xl lg:text-4xl italic leading-[1.3] tracking-tight text-[#222428]'>
          {x('sectionTitle1')}
        </p>

        <div className='space-y-6 text-sm md:text-lg 4xl:text-2xl leading-relaxed text-[#222428]/80'>
          <p>{x('sectionContent1')}</p>
          <p>{x('sectionContent2')}</p>
        </div>

        {/* Workshop photo */}
        <div className='relative aspect-[16/9] overflow-hidden rounded-2xl bg-neutral-100 shadow-[0_25px_50px_-15px_rgba(34,36,40,0.18)]'>
          <Image
            src='https://res.cloudinary.com/dbssbnuph/image/upload/v1724844782/zumracoralic/eta62_o6fbkf.webp'
            alt='delavnica'
            fill
            sizes='(max-width: 768px) 100vw, 60vw'
            className='object-cover'
          />
        </div>

        {/* What I offer */}
        <section>
          <h2 className='text-2xl md:text-4xl 4xl:text-6xl tracking-tight leading-[1.2] text-[#222428]'>
            {x('sectionTitle2')}
          </h2>
          <span
            aria-hidden='true'
            className='block w-12 h-px bg-[#df650e] mt-6 mb-8'
          />
          <p className='text-sm md:text-lg 4xl:text-2xl leading-relaxed text-[#222428] mb-8'>
            {x('sectionContentP1')}
          </p>
          <ul className='space-y-5 text-sm md:text-lg 4xl:text-2xl leading-relaxed text-[#222428]/80'>
            {(['L1', 'L2', 'L3'] as const).map((k) => (
              <li key={k} className='flex gap-4'>
                <span
                  aria-hidden='true'
                  className='mt-3 w-2 h-2 rounded-full bg-[#df650e] shrink-0'
                />
                <span>{x(`sectionContent${k}`)}</span>
              </li>
            ))}
          </ul>
          <p className='mt-10 text-sm md:text-lg 4xl:text-2xl leading-relaxed text-[#222428]/80'>
            {x('sectionContent4')}
          </p>
        </section>
      </article>

      {/* Simon Sinek pull-quote */}
      <section className='py-20 md:py-28'>
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

      {/* Testimonial — distinct white card treatment */}
      <section className='px-6'>
        <div className='max-w-4xl mx-auto'>
          <h2 className='text-2xl md:text-4xl lg:text-5xl tracking-tight leading-[1.2] text-[#222428] text-center mb-12 md:mb-16'>
            {x('sectionTitle3')}
          </h2>
          <article className='relative bg-white rounded-2xl shadow-[0_25px_50px_-15px_rgba(34,36,40,0.18)] px-8 md:px-14 py-12 md:py-16'>
            <span
              aria-hidden='true'
              className='select-none absolute -top-2 left-6 md:left-10 text-[6rem] md:text-[10rem] leading-none text-[#df650e]/15 font-serif'
            >
              &ldquo;
            </span>
            <blockquote className='relative text-sm md:text-lg 4xl:text-2xl italic leading-relaxed text-[#222428]/85'>
              {x('sectionContent5')}
            </blockquote>
            <p className='mt-8 text-sm md:text-base text-[#222428]/65'>
              <span className='block w-8 h-px bg-[#df650e] mb-3' />
              {x('sectionContentP2')}
            </p>
          </article>
        </div>
      </section>

      {/* Programs from Contentful */}
      <section className='mt-20 md:mt-28 px-6 lg:px-12'>
        <div className='max-w-5xl mx-auto'>
          <p className='text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#df650e] mb-4 text-center'>
            {programsLabel}
          </p>
          <span
            aria-hidden='true'
            className='block w-12 h-px bg-[#df650e] mx-auto mb-10 md:mb-14'
          />
          <ServicesComponent
            initialServices={services}
            locale={locale}
            readMore={i('readMore')}
            price={i('price')}
          />
        </div>
      </section>
    </div>
  );
}
