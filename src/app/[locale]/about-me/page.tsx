import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { PageMetadata } from '@/types/metadata';
import { buildPageMetadata, getAlternates, pickByLocale } from '@/utils/seo';
import JsonLd from '@/components/JsonLd';
import MeshGradient from '@/components/MeshGradient';

const titles = {
  sl: 'O meni - Zumra Coralic',
  bs: 'O meni - Zumra Ćoralić',
};

const descriptions = {
  sl: 'Spoznajte več o Zumri Coralic, certificirani NLP coach in mediatorici. Preberite več o njenem ozadju, izkušnjah in pristopu.',
  bs: 'Saznajte više o Zumri Ćoralić, certificiranoj NLP trenerici i medijatorici. Pročitajte više o njenoj pozadini, iskustvu i pristupu.',
};

const heroImage = {
  url: 'https://res.cloudinary.com/dbssbnuph/image/upload/v1725115974/zumracoralic/aboutmeHeader_oraf6m.png',
  alt: 'Zumra Coralic - O meni',
};

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<PageMetadata> {
  return buildPageMetadata({
    pathnameKey: '/about-me',
    locale: params.locale,
    titles,
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
  const t = useTranslations('AboutMePage');
  const locale = useLocale();
  const aboutUrl = getAlternates('/about-me', locale).canonical;

  const eyebrows =
    locale === 'bs'
      ? ['O meni', 'Moj put', 'Porodica', 'Uvjerenja']
      : ['O meni', 'Moja pot', 'Družina', 'Prepričanja'];

  return (
    <div className='relative pb-20 md:pb-32'>
      <MeshGradient variant='cream' fixed />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: locale === 'bs' ? 'Zumra Ćoralić' : 'Zumra Coralic',
          jobTitle: 'NLP Coach & Mediator',
          url: aboutUrl,
          description: pickByLocale(descriptions, locale),
          image:
            'https://res.cloudinary.com/dbssbnuph/image/upload/v1726001052/zumracoralic/IMG_0704_qh6mdm.jpg',
          sameAs: [
            'https://si.linkedin.com/in/zumra-%C4%87orali%C4%87-bb084497',
          ],
        }}
      />

      {/* Type-led editorial header */}
      <header className='pt-28 md:pt-44 pb-16 md:pb-24'>
        <div className='max-w-3xl mx-auto px-6 text-center'>
          <p className='text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#df650e] mb-6'>
            {eyebrows[0]}
          </p>
          <h1 className='text-3xl md:text-[56px] 4xl:text-[88px] tracking-tight leading-[1.1] mb-7 text-[#222428]'>
            Zumra Ćoralić
          </h1>
          <span
            aria-hidden='true'
            className='block w-12 h-px bg-[#df650e] mx-auto mb-8'
          />
          <p className='text-sm md:text-lg 4xl:text-2xl italic leading-relaxed text-[#222428]/75'>
            {t('description')}
          </p>
        </div>
      </header>

      <div className='max-w-[1500px] xl:max-w-[1600px] 3xl:max-w-[1800px] mx-auto px-6 lg:px-12 2xl:px-16'>
        {/* Section 1 — text + portrait with warm cream-offset shadow */}
        <section className='grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 lg:gap-24 items-start py-16 md:py-24'>
          <div className='md:col-span-7'>
            <p className='text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#df650e] mb-5'>
              {eyebrows[1]}
            </p>
            <h2 className='text-2xl md:text-4xl 4xl:text-6xl tracking-tight leading-[1.15] mb-8 text-[#222428]'>
              {t('sectionTitle1')}
            </h2>
            <div className='space-y-5 text-sm md:text-lg 4xl:text-2xl leading-relaxed text-[#222428]/80'>
              <p>{t('sectionContent1')}</p>
              <p>{t('sectionContent2')}</p>
            </div>
          </div>
          <div className='md:col-span-5 md:pt-6'>
            <div className='max-w-[24rem] mx-auto md:mx-0'>
              <Image
                src='https://res.cloudinary.com/dbssbnuph/image/upload/v1726001052/zumracoralic/IMG_0704_qh6mdm.jpg'
                alt={
                  locale === 'bs' ? 'Zumra Ćoralić' : 'Zumra Coralic'
                }
                width={0}
                height={0}
                sizes='(max-width: 768px) 100vw, 30vw'
                className='w-full h-auto rounded-2xl shadow-[16px_-16px_0_0_#FFE6BC,0_25px_50px_-15px_rgba(223,101,14,0.3)] md:shadow-[24px_-24px_0_0_#FFE6BC,0_30px_60px_-20px_rgba(223,101,14,0.3)]'
              />
            </div>
          </div>
        </section>

        {/* Pull-quote 1 — centered with bookend dividers */}
        <section className='py-16 md:py-24'>
          <div className='max-w-3xl mx-auto text-center'>
            <span
              aria-hidden='true'
              className='block w-12 h-px bg-[#df650e] mx-auto mb-10'
            />
            <blockquote className='text-2xl md:text-4xl lg:text-5xl italic leading-[1.25] tracking-tight text-[#222428]'>
              {t('quote1')}
            </blockquote>
            <span
              aria-hidden='true'
              className='block w-12 h-px bg-[#df650e] mx-auto mt-10'
            />
          </div>
        </section>

        {/* Section 2 — sons photo on left, text on right */}
        <section className='grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center py-16 md:py-24'>
          <div className='md:order-1'>
            <Image
              src='https://res.cloudinary.com/dbssbnuph/image/upload/v1726001052/zumracoralic/IMG-6a7cdd4a36fd6a9a30bf4db5df337a1f-V_t7u3g9.jpg'
              alt='sinova'
              width={0}
              height={0}
              sizes='(max-width: 768px) 100vw, 50vw'
              className='w-full h-auto rounded-2xl shadow-[0_25px_50px_-15px_rgba(223,101,14,0.28)]'
            />
          </div>
          <div className='md:order-2'>
            <p className='text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#df650e] mb-5'>
              {eyebrows[2]}
            </p>
            <h2 className='text-2xl md:text-4xl 4xl:text-6xl tracking-tight leading-[1.15] mb-8 text-[#222428]'>
              {t('sectionTitle2')}
            </h2>
            <div className='space-y-5 text-sm md:text-lg 4xl:text-2xl leading-relaxed text-[#222428]/80'>
              <p>{t('sectionContent3')}</p>
              <p>{t('sectionContent4')}</p>
              <p>{t('sectionContent5')}</p>
              <p>{t('sectionContent6')}</p>
            </div>
          </div>
        </section>

        {/* Pull-quote 2 — left-bar variant for variety */}
        <section className='py-16 md:py-24'>
          <div className='max-w-4xl mx-auto pl-6 md:pl-10 border-l-2 border-[#df650e]'>
            <blockquote className='text-2xl md:text-4xl lg:text-5xl italic leading-[1.25] tracking-tight text-[#222428]'>
              {t('quote2')}
            </blockquote>
          </div>
        </section>

        {/* Section 3 — text on left, graduation photo on right */}
        <section className='grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center py-16 md:py-24'>
          <div className='md:order-2'>
            <Image
              src='https://res.cloudinary.com/dbssbnuph/image/upload/v1726001052/zumracoralic/1_wzq7nm.jpg'
              alt='graduation'
              width={0}
              height={0}
              sizes='(max-width: 768px) 100vw, 50vw'
              className='w-full h-auto rounded-2xl shadow-[0_25px_50px_-15px_rgba(223,101,14,0.28)]'
            />
          </div>
          <div className='md:order-1'>
            <p className='text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#df650e] mb-5'>
              {eyebrows[3]}
            </p>
            <h2 className='text-2xl md:text-4xl 4xl:text-6xl tracking-tight leading-[1.15] mb-8 text-[#222428]'>
              {t('sectionTitle3')}
            </h2>
            <div className='space-y-5 text-sm md:text-lg 4xl:text-2xl leading-relaxed text-[#222428]/80'>
              <p>{t('sectionContent7')}</p>
              <p>{t('sectionContent11')}</p>
            </div>
          </div>
        </section>

        {/* Closing signature flourish */}
        <div className='pt-16 md:pt-24 text-center'>
          <span
            aria-hidden='true'
            className='block w-12 h-px bg-[#df650e] mx-auto mb-8'
          />
          <p className='text-2xl md:text-3xl italic tracking-tight text-[#222428]'>
            — Zumra Ćoralić
          </p>
        </div>
      </div>
    </div>
  );
}
